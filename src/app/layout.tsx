import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ibmPlexMono, newsreader } from "./fonts";

export const metadata: Metadata = {
  title: "Abraar Jihaad H | Software Engineer",
  description: "The portfolio of Abraar Jihaad H, a software engineer building useful digital products.",
};

const themeInitScript = `
  (() => {
    try {
      const savedTheme = window.localStorage.getItem("portfolio-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        document.documentElement.dataset.theme = savedTheme;
      }
    } catch {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="theme-background theme-text min-h-full flex flex-col">
        {children}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </body>
    </html>
  );
}
