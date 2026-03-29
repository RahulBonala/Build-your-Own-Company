const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error(
    'Missing GEMINI_API_KEY environment variable. ' +
      'Copy .env.example to .env.local and add your key.'
  );
}

export const env = {
  GEMINI_API_KEY,
  GEMINI_API_URL:
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
} as const;
