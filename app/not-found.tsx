import Link from "next/link";
import type { Metadata } from "next";
import css from "./NotFound.module.css";

export const metadata: Metadata = {
  title: "Page not found | NoteHub",
  description: "The page you are looking for does not exist in NoteHub.",
  openGraph: {
    title: "Page not found | NoteHub",
    description: "The requested page could not be found in NoteHub.",
    url: "https://08-zustand-seven-beryl.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.text}>
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className={css.link}>
          Go back to Home
        </Link>
      </div>
    </main>
  );
}