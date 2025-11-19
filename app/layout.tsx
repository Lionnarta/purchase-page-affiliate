import { Metadata } from "next";
import "@/app/ui/styles/globals.css";
import { hind } from "@/app/ui/fonts/fonts";

export const metadata: Metadata = {
  title: "Purchase App",
  description:
    "Here is simple purchase page that capture affiliate based on url parameter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hind.className} antialiased`}>{children}</body>
    </html>
  );
}
