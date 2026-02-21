import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getSession } from "@/lib/auth";
import { SessionProvider } from "@/context/SessionContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RevoShop",
  description: "An e-commerce app created by the author as a practice.",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-stone-400 h-full w-full text-black flex flex-col items-center">
          <Header/>
          <SessionProvider sessionUser={session ? {name: session.name, priviledge: session.priviledge} : null}>
            <CartProvider>
              {children}
            </CartProvider>
          </SessionProvider>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
