import type { Metadata } from "next";
import "./globals.css";
import { ibmPlexMono, newsreader } from "./fonts";

export const metadata: Metadata = {
  title: "Abraar Jihaad H | Software Engineer",
  description: "The portfolio of Abraar Jihaad H, a software engineer building useful digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
