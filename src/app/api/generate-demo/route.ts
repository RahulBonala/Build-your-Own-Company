import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const { idea, summary, selections } = await req.json();

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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
        return NextResponse.json({ error: data }, { status: response.status });
    }

    let html: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    html = html
        .replace(/^```html\n?/i, '')
        .replace(/^```\n?/i, '')
        .replace(/\n?```$/i, '')
        .trim();

    return NextResponse.json({ html });
}
