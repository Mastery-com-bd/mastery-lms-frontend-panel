import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "@/provider/Provider";
import StoreProvider from "@/provider/StoreProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mastery LMS",
  description: "Learning Management System By Mastery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-white`}
      >
        <StoreProvider>
          <Provider>
            {children}
            <Toaster position="top-center" richColors />
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
