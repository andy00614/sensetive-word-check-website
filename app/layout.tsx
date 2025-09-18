import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "中文敏感词检测API - 专业内容审核服务",
  description: "专业的中文敏感词检测服务，结合本地算法和Azure AI，为您的应用提供快速、准确、全面的内容审核。支持政治、暴力、色情等多类敏感词检测。",
  keywords: "敏感词检测,内容审核,中文敏感词,文本检测,内容过滤,敏感词API,内容安全,文本审核",
  authors: [{ name: "Andy" }],
  creator: "Andy",
  publisher: "敏感词检测API",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "中文敏感词检测API - 专业内容审核服务",
    description: "专业的中文敏感词检测服务，结合本地算法和Azure AI，为您的应用提供快速、准确、全面的内容审核。",
    type: "website",
    locale: "zh_CN",
    siteName: "敏感词检测API",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "敏感词检测API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "中文敏感词检测API - 专业内容审核服务",
    description: "专业的中文敏感词检测服务，结合本地算法和Azure AI，为您的应用提供快速、准确、全面的内容审核。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
