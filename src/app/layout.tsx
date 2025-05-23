
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { PWALoader } from '@/components/pwa-loader';
import { AppCustomizationProvider } from '@/context/app-customization-context';
import { ThemeApplicator } from '@/components/layout/theme-applicator'; // Import ThemeApplicator

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tiny Scholars Hub', 
  description: 'A friendly hub for play school students, parents, and teachers.',
  manifest: '/manifest.json', 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#A7D9ED" /> 
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" /> 
        <meta name="apple-mobile-web-app-title" content="Tiny Scholars Hub" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-152x152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-120x120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-76x76.png" sizes="76x76" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" /> 
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <AppCustomizationProvider>
          <ThemeApplicator /> {/* Apply theme from context */}
          {children}
          <Toaster />
          <PWALoader /> 
        </AppCustomizationProvider>
      </body>
    </html>
  );
}
