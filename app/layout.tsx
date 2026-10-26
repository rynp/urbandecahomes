import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingQuickContact from '@/components/FloatingQuickContact';
import JsonLd from '@/components/JsonLd';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';
import { constructMetadata } from '@/lib/seo';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF0C8',
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
    <html lang="en-PH" className={`${montserrat.variable} ${poppins.variable}`}>
      <head>
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebSiteSchema()} />
      </head>
      <body className="font-sans text-[#3E1C15] bg-[#FAF8F2] flex flex-col min-h-screen antialiased selection:bg-[#FCEBA2] selection:text-[#3E1C15]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingQuickContact />
      </body>
    </html>
  );
}
