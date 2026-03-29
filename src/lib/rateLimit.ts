const windowMs = 60_000;
const maxRequests = 10;

const hits = new Map<string, number[]>();

export function rateLimit(identifier: string): { limited: boolean } {
  const now = Date.now();
  const timestamps = hits.get(identifier) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    hits.set(identifier, recent);
    return { limited: true };
  }

  recent.push(now);
  hits.set(identifier, recent);
  return { limited: false };
}
