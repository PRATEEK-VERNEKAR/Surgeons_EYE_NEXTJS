import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from './context/AuthProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surgeons Eye",
  description: "AI guide for surgical understandings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col"> {/* Ensures full viewport height */}
            <Navbar />
            <main className="px-4 py-8 flex-grow "> {/* Flexible content area with padding */}
              {children}
            </main>
            <Footer />
          </div>  
        </AuthProvider>
      </body>
    </html>
  );
}
