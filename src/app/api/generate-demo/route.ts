import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

export const maxDuration = 60;

const requestSchema = z.object({
  idea: z.string().min(1).max(500),
  summary: z.string().max(2000).optional().default(''),
  selections: z
    .object({
      design: z.string().optional(),
    })
    .passthrough()
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    if (rateLimit(ip).limited) {
      return NextResponse.json(
        { error: 'RATE_LIMIT', message: 'Too many requests. Please wait and try again.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message ?? 'Invalid request body' },
        { status: 400 }
      );
    }

    const { idea, summary, selections } = parsed.data;
    const designTier = selections?.design || 'minimal';

    const prompt = `Build a single-page HTML landing website.

IDEA: "${idea}"
BRIEF: ${summary}
DESIGN TIER: ${designTier}

OUTPUT RULES:
- Raw HTML only starting with <!DOCTYPE html> — zero markdown, zero explanation
- <script src="https://cdn.tailwindcss.com"></script> + one Google Font in <head>
- CSS vars --primary and --secondary derived from the idea
- Sections: hero (gradient, headline, subtext, email+CTA btn), features (3 emoji cards), how-it-works (3 steps), 2 testimonials (https://i.pravatar.cc/48?u=a and https://i.pravatar.cc/48?u=b), CTA banner, footer
- CSS @keyframes fadeInUp + IntersectionObserver scroll reveals
- Fully mobile responsive

Start with <!DOCTYPE html> immediately.`;

    const response = await fetch(
      `${env.GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 3500,
            temperature: 0.7,
          },
        }),
      }
    );

    if (response.status === 429) {
      return NextResponse.json(
        { error: 'RATE_LIMIT', message: 'Free API quota reached. Please wait 60 seconds and try again.' },
        { status: 429 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      logger.error('Gemini API error', { status: response.status, error: data });
      return NextResponse.json(
        { error: 'UPSTREAM_ERROR', message: 'AI generation failed. Please try again.' },
        { status: 502 }
      );
    }

    let html: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    html = html
      .replace(/^```html\n?/i, '')
      .replace(/^```\n?/i, '')
      .replace(/\n?```$/i, '')
      .trim();

    return NextResponse.json({ html });
  } catch (error) {
    logger.error('generate-demo route error', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
