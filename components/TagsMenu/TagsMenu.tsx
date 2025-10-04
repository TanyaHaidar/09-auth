"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import css from "./TagsMenu.module.css";

const TAGS = ["All", "Personal", "Work", "Todo", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        open &&
        target &&
        !buttonRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => setOpen((s) => !s);
  const onSelect = () => setOpen(false);

  return (
    <div className={css.menuContainer}>
      <button
        ref={buttonRef}
        type="button"
        className={css.menuButton}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        Notes ▾
      </button>

      {open && (
        <ul ref={menuRef} className={css.menuList} role="menu">
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem} role="none">
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                role="menuitem"
                onClick={onSelect}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
