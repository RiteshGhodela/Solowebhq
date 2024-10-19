import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Solowebhq",
  description: "Web Agency - Create, Design, Maintain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Loader/>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
