import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Adamina, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingQuickContact from '@/components/FloatingQuickContact';
import JsonLd from '@/components/JsonLd';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';
import { constructMetadata } from '@/lib/seo';

const adamina = Adamina({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-adamina',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#e8cf7b',
};

export const metadata: Metadata = constructMetadata({
  title: 'Urban Deca Homes Philippines | Affordable Move-In Ready Condos',
  description:
    'Explore Urban Deca Homes developments in Manila (Tondo), Ortigas (Pasig), and Cubao (Quezon City). Move-in ready condos, low cash-out promos, and Pag-IBIG financing up to 30 years.',
  path: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PH" className={`${adamina.variable} ${poppins.variable}`}>
      <head>
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebSiteSchema()} />
      </head>
      <body className="font-sans text-charcoal-900 bg-stone-50 flex flex-col min-h-screen antialiased selection:bg-gold-200 selection:text-charcoal-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingQuickContact />
      </body>
    </html>
  );
}
