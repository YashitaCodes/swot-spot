import type { Metadata } from "next";
import { Manrope } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "The SWOT Spot",
  description: "Let's Jumps to Validating Your Next Big Business Idea",
};

const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontHeading.variable} ${fontBody.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
