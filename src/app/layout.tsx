import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyTechBlog",
  description:
    "A personal blog site where you can post and manage technical articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
