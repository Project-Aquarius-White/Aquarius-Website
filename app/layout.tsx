import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; // Cyberpunk appropriate
import "./globals.css";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono", // Keeping variable name to match tailwind config
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Aquarius | Paper Reproduction Protocol",
  description: "Transform SOTA research papers into production-ready code. Build mastery through reproduction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased min-h-screen bg-black text-white relative`}>
        {/* CRT Scanline Overlay from globals.css */}
        <div className="scanlines fixed inset-0 z-50 pointer-events-none" />



        {/* Main Content */}
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
