// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';

import './../styles/globals.css';
import { LocaleProvider } from '@/components/site/locale-provider';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
 import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const arabic = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ui.qentrah.com'),
  title: {
    default: 'DUI — qentrah Design System',
    template: '%s · DUI',
  },
  description: 'Open-source React components, blocks, and agent skills for product teams. Built with Tailwind CSS and shadcn/ui.',
  applicationName: 'DUI',
  keywords: ['DUI', 'qentrah', 'React', 'Tailwind CSS', 'shadcn', 'component library', 'agent skills', 'design system', 'UI components'],
  authors: [{ name: 'qentrah', url: 'https://qentrah.com' }],
  creator: 'Ahmed Mansour',
  publisher: 'qentrah',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'DUI',
    title: 'DUI — qentrah Design System',
    description: 'Open-source React components, blocks, and agent skills for product teams. Built with Tailwind CSS and shadcn/ui.',
    images: [{ url: '/DUI_logo.png', width: 271, height: 120, alt: 'DUI Design System' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DUI — qentrah Design System',
    description: 'Open-source React components, blocks, and agent skills for product teams. Built with Tailwind CSS and shadcn/ui.',
    images: ['/DUI_logo.png'],
    creator: '@qentrah',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${arabic.variable}`} suppressHydrationWarning>
        <LocaleProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
