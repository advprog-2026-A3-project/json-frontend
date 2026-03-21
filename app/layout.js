import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jastip JSON",
  description: "Aplikasi Jastip Terpercaya",
};

export default function RootLayout({ children }) {
  return (
      <html lang="id">
      <body className={inter.className}>
      <Navbar />

      {/* children adalah isi dari masing-masing page (login, register, profile) */}
      <main>
        {children}
      </main>
      </body>
      </html>
  );
}
