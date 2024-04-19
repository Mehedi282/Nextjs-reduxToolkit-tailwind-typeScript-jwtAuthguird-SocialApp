import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxRapper from "@/redux/provider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxRapper>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </head>
        <body className={inter.className}>
          <Navbar />
          {children}

        </body>
      </html>
    </ReduxRapper>
  );
}
