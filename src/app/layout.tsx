import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.brand,
    template: `%s · ${site.brand}`,
  },
  description: `${site.tagline}. ${site.heroSupport}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
