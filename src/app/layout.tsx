//--------------6/9/2025 9:21 PM--------------//

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/Theme";
import ToastProvider from "@/components/Toast";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import UIProvider from "@/components/UI";

const jetbrains = JetBrains_Mono({
  variable: "--font-JBMono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bunvia",
  description:
    "Bunvia is my 2nd project and also my very first NextJS project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} antialiased`}>
        <ThemeProvider>
          <PageTransition>
            <ToastProvider>
              <UIProvider>
                <Header />
                <Nav />
                {children}
              </UIProvider>
            </ToastProvider>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
