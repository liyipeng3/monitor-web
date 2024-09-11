import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fontCool = localFont({
  src: "./fonts/FontCool.ttf",
  variable: "--font-cool",
})

export const metadata: Metadata = {
  title: "Monitor Web",
  description: "Monitor anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
    <head>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name='apple-mobile-web-app-status-bar-style' content='black'/>
      <meta name="viewport" content="width=device-width, viewport-fit=cover"/>
    </head>

    <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontCool.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
