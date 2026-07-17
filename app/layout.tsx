// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import './../styles/globals.css';
import { LocaleProvider } from '@/components/site/locale-provider';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
 
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const arabic = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export const metadata: Metadata = {
  title: 'DUI — qentrah Design System',
  description: 'A bilingual React component library distributed through the shadcn CLI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.variable} ${arabic.variable}`}>
        <LocaleProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
