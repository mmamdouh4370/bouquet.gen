import { Inter } from "next/font/google";
import { ClerkProvider, ThemeProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {dark} from "@clerk/themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bouquet.Gen",
  description: "Generate bouquets using AI",
};

export default function RootLayout({ children }){
  return (
    <ClerkProvider 
      appearance={{ 
        variables: { 
          colorBackground: '#fceee9',
          colorPrimary: '#667b68',
        }
      }}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
