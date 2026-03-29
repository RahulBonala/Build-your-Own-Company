function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name} environment variable. ` +
        'Copy .env.example to .env.local and add your key.'
    );
  }
  return value;
}

export const env = {
  get GEMINI_API_KEY() {
    return requireEnv('GEMINI_API_KEY');
  },
  GEMINI_API_URL:
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
} as const;
