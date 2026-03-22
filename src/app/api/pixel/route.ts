import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { messages, idea } = await req.json();

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

    const geminiContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }));

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
        return NextResponse.json({ error: data }, { status: response.status });
    }

    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return NextResponse.json({ text });
}
