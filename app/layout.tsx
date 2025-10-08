import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "NoteHub — Simple notes app",
  description: "NoteHub — store, search and manage your notes.",
  openGraph: {
    title: "NoteHub — Simple notes app",
    description: "NoteHub — store, search and manage your notes.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}{modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
