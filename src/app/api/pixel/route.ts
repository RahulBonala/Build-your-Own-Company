import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/lib/env';
import { rateLimit } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

const messageSchema = z.object({
  role: z.string(),
  content: z.string(),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  idea: z.string().min(1).max(500),
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

    const { messages, idea } = parsed.data;

    const systemInstruction = `You are Pixel — a warm AI product architect at BuilderBox. The founder's idea: "${idea}".

Ask exactly 5 questions, one per reply, numbered "Q1/5:" to "Q5/5:".

After the 5th answer reply ONLY with:
DONE||[3 sentences: visual style, color palette, key sections, one standout element]

Topics:
- Q1/5: Target user and pain point
- Q2/5: Design vibe — give options A, B, C
- Q3/5: Three must-have sections
- Q4/5: Primary call-to-action
- Q5/5: The one unforgettable feature

Keep each question under 35 words. One emoji max. Tailor to the specific idea.`;

    const geminiContents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `${env.GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.8,
          },
        }),
      }
    );

    if (response.status === 429) {
      return NextResponse.json(
        { error: 'RATE_LIMIT', message: 'Rate limit reached. Please wait a moment.' },
        { status: 429 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      logger.error('Gemini API error', { status: response.status, error: data });
      return NextResponse.json(
        { error: 'UPSTREAM_ERROR', message: 'AI service unavailable. Please try again.' },
        { status: 502 }
      );
    }

    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return NextResponse.json({ text });
  } catch (error) {
    logger.error('pixel route error', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
