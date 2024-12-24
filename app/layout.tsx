import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Wrapper from "@/components/Wrapper";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Nest",
  description: "Pesan Travel di Indonesia!",
  icons: {
    icon: "/icons/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <main className="min-h-screen flex flex-col bg-secondary">
              <Navbar />
              <section className="flex-grow">
                <Wrapper>{children}</Wrapper>
              </section>
              <Footer />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
