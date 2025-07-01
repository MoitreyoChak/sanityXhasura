import { draftMode } from "next/headers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PreviewProvider } from "@/components/PreviewProvider";
import { token } from "@/lib/sanity";
import { VisualEditing } from "next-sanity";
import { AuthProvider } from '@/context/AuthContext';

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Content Hub",
  description: "A modern content hub built with Next.js and Sanity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <AuthProvider>
          <PreviewProvider token={token}>
            <div className="relative flex min-h-dvh flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            {draftMode().isEnabled && <VisualEditing />}
          </PreviewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
