import { IBM_Plex_Mono, Newsreader } from "next/font/google";

export const newsreader = Newsreader({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});
