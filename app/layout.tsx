import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SupabaseProvider from "@/components/supabase-provider";
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laulutunkki v.2",
  description: "Athenen laulutunkki v.2",
};

export const viewport: Viewport = {
  themeColor: "black",
  maximumScale: 1,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />

      <body className={openSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>{children}</SupabaseProvider>

          <Toaster position="bottom-center" duration={2000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
