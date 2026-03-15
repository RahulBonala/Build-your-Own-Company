import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { idea, summary, selections } = await req.json();

    const designTier  = selections?.design    || 'minimal';
    const dbTier      = selections?.database  || 'starter';
    const testingTier = selections?.testing   || 'basic';
    const marketingTier = selections?.marketing || 'launch';

    const prompt = `Build a stunning, complete single-page landing website.

STARTUP IDEA: "${idea}"

DESIGN BRIEF FROM FOUNDER:
${summary}

SELECTED TECH STACK:
- Design tier: ${designTier}
- Database: ${dbTier}
- Testing: ${testingTier}
- Marketing: ${marketingTier}

STRICT REQUIREMENTS:
1. Output ONLY raw HTML starting with <!DOCTYPE html> — no markdown, no code fences, no explanation
2. Single self-contained file: all CSS in <style> tag, all JS in <script> tag
3. Include in <head>: <script src="https://cdn.tailwindcss.com"></script> and a Google Fonts <link>
4. Use Tailwind utility classes for all styling
5. Build these sections in order:
   a. HERO — full-height, gradient background, bold headline, subheadline, email input + CTA button
   b. FEATURES — 3 cards with large emoji icons, titles, 2-sentence descriptions
   c. HOW IT WORKS — 3 numbered steps with icons
   d. SOCIAL PROOF — 2 testimonial cards with avatar (https://i.pravatar.cc/56?u=alex and https://i.pravatar.cc/56?u=sarah), name, role, quote
   e. FINAL CTA BANNER — gradient background, bold text, email input + button
   f. FOOTER — logo text, tagline, 3 nav links, copyright
6. Add CSS @keyframes fadeInUp on all sections + IntersectionObserver in JS for scroll reveals
7. Derive 2 primary brand colors from the idea and brief, set as CSS variables --primary and --secondary
8. Choose one Google Font that fits the brand
9. Must be fully mobile responsive
10. The final HTML must be at least 200 lines — do not cut corners

OUTPUT: Raw HTML only. Start immediately with <!DOCTYPE html>. Nothing before or after it.`;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 8192,
                    temperature: 0.9,
                },
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: data }, { status: response.status });
    }

    let html: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    // Strip any accidental markdown fences Gemini sometimes adds
    html = html
        .replace(/^```html\n?/i, '')
        .replace(/^```\n?/i, '')
        .replace(/\n?```$/i, '')
        .trim();

    return NextResponse.json({ html });
}
