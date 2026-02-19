import { alata, teachers } from "./fonts";
import "./globals.css";

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
