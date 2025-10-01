"use client";

import css from "./TagsMenu.module.css";

const tags = ["All", "Personal", "Work", "Todo", "Meeting", "Shopping"];

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a
              href={`/notes/filter/${tag === "All" ? "" : tag}`}
              className={css.menuLink}
            >
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
