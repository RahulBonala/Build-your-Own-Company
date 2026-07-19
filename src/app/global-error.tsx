'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#19140f', color: '#efe7da' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '28rem' }}>
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#ff6b1a',
              color: '#19140f',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
