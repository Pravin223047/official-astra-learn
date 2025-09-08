import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";


const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astra Learn",
  description: "AI-Powered Learning & Interview Preparation platform",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <ConvexClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${monaSans.variable} antialiased`} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster />
            <SignedIn>
              {children}
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
