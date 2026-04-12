import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NV Studio - Digital Marketing Agency Gwalior',
  description: 'Grow your business with NV Studio. Professional digital marketing, video production, SMM, Meta Ads, and Chatbot services in Morar, Gwalior.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={`${sora.variable} ${inter.variable} font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col`}>
        {children}
        <FloatingWhatsApp />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
