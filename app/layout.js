import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Jastip JSON",
  description: "Aplikasi Jastip Terpercaya",
};

export default function RootLayout({ children }) {
  return (
      <html lang="id">
      <body className={plusJakartaSans.className}>
      <Toaster position="bottom-right" />
      <Navbar />

      <main>
        {children}
      </main>
      </body>
      </html>
  );
}
