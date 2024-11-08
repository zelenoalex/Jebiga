import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/lib/auth-provider";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes - nexJS server actions project",
  description: "Personal project to learn server actions.",
  keywords: "next, react, project, server, action, 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
           storageKey="website_theme"
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="grow my-5">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
