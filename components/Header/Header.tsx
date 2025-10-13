"use client";

import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";
import styles from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home" className={styles.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={styles.navigation}>
          <li>
            <Link href="/" prefetch={false} className={styles.navigationLink}>
              Home
            </Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
