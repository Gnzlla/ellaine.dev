import { alata, teachers } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "LAINE",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${alata.className} ${teachers.className}`}>
      <body>{children}</body>
    </html>
  );
}
