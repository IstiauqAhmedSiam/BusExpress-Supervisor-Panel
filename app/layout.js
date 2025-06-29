import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"]
});


export const metadata = {
  title: "Supervisor Panel",
  description: "BusExpress",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
              <link rel="manifest" href="/manifest.json" />
              <link rel="apple-touch-icon" href="/assets/icon/logo.png" />
              <meta name="theme-color" content="#000000" />
            </head>
            <body
                className={`${inter.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}