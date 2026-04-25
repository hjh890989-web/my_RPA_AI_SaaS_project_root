import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/contexts/user-context';
import { cn } from '@/lib/utils';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'FactoryAI',
  description: 'AI-based production management SaaS for smart factories.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn('font-body antialiased', notoSansKR.variable)}>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
