import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Modal from 'react-modal';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Terra e Sol',
  description: 'Desenvolvido por Gabriel Mello',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
