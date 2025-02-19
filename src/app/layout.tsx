import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODOアプリ",
  description: "シンプルなTODOアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900`}>
        <div className="min-h-screen backdrop-blur-sm">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
