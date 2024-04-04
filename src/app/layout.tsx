import type { Metadata } from "next";
import { cn } from "@/lib/utils";

import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mombolo's URL Shortener",
  description:
    "A simple URL shortener built with Next.js, Typescript, and Supabase",
  openGraph: {
    title: "Mombolo's URL Shortener",
    description:
      "A simple URL shortener built with Next.js, Typescript, and Supabase",
    type: "website",
    url: "https://url.prani.tech",
    images: [
      {
        url: "/momboloLogo.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          urbanist.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
