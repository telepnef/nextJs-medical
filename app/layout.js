import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tight Alright",
  description: "Tight Alright Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="text-primary-tail_grids antialiased">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
