import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://byoc.studio'),
  title: {
    default: 'Build Your Own Company (BYOC)',
    template: '%s | BYOC',
  },
  description:
    'Build your company with our futuristic agency construction kit. Choose modules, preview your demo, and launch.',
  keywords: ['agency builder', 'company builder', 'startup kit', 'web development', 'BYOC'],
  openGraph: {
    title: 'Build Your Own Company (BYOC)',
    description:
      'Build your company with our futuristic agency construction kit. Choose modules, preview your demo, and launch.',
    url: 'https://byoc.studio',
    siteName: 'BYOC',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your Own Company (BYOC)',
    description:
      'Build your company with our futuristic agency construction kit.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-obsidian text-silver`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyber-cyan focus:text-obsidian focus:rounded-lg focus:font-bold"
        >
          Skip to content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
