import Link from "next/link";
import css from "./NotFound.module.css";

export const metadata = {
  title: "Page not found | NoteHub",
  description: "The page you are looking for does not exist in NoteHub.",
  openGraph: {
    title: "Page not found | NoteHub",
    description: "The page you are looking for does not exist in NoteHub.",
    url: "https://your-site.com/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page Not Found</h1>
        <p className={css.text}>
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className={css.link}>
          Go back home
        </Link>
      </div>
    </main>
  );
}
