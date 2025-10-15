import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub — your notes manager",
  description:
    "Create, organize, and manage your notes easily with NoteHub. Filter by tags and never lose your ideas!",
  openGraph: {
    title: "NoteHub — your notes manager",
    description:
      "Create, organize, and manage your notes easily with NoteHub. Filter by tags and never lose your ideas!",
    url: "https://08-zustand-seven-beryl.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            {modal}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
