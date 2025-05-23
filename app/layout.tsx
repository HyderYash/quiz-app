import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CoinProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Win coins by answering quiz questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CoinProvider>
          <div className="max-w-3xl mx-auto px-4 py-8">
            {children}
          </div>
        </CoinProvider>
      </body>
    </html>
  );
}