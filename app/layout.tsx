import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CoinProvider } from './providers';
import Advertisement from './components/Advertisement';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizyfun',
  description: 'Play quizzes and win coins!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 min-h-screen flex items-center justify-center`}>
        {/* Mobile Container - no phone frame, just a clean centered mobile view */}
        <div className="relative w-full max-w-[430px] h-[695px] bg-slate-900 shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 flex flex-col overflow-hidden">

            <CoinProvider>
              <div className="flex-1 ">
                {children}
              </div>
            </CoinProvider>
          </div>
        </div>
      </body>
    </html>
  );
}