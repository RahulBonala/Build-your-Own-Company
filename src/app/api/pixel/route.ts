import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { messages, idea } = await req.json();

    const systemInstruction = `You are Pixel — a sharp, warm AI product architect at BuilderBox, a premium agency. A founder has this startup idea: "${idea}".

Your job: ask exactly 5 questions (one per reply), numbered "Q1/5:" through "Q5/5:", to understand what demo website to build for them.

After you receive the 5th answer, reply with exactly this format and nothing else:
DONE||[Write 3 sentences describing the site you will build: the visual style, colour palette, key sections, and one standout interactive element.]

Question topics (adapt wording to the specific idea):
- Q1/5: Target user — who is this for, what pain does it solve?
- Q2/5: Design vibe — give exactly 3 options labelled A, B, C
- Q3/5: Three must-have landing page sections
- Q4/5: The primary call-to-action
- Q5/5: The single most unique feature — what makes this unforgettable?

Rules:
- Keep each question under 40 words
- Be warm, startup-focused, slightly excited
- Use at most one emoji per message
- Tailor every question to the specific idea — never ask generic questions`;

    // Convert messages from Anthropic format {role, content} to Gemini format
    // Gemini uses "user" and "model" (not "assistant")
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
                system_instruction: {
                    parts: [{ text: systemInstruction }],
                },
                contents: geminiContents,
                generationConfig: {
                    maxOutputTokens: 400,
                    temperature: 0.8,
                },
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data }, { status: response.status });
    }

    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return NextResponse.json({ text });
}
