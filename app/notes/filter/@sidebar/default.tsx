import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Personal", "Work", "Todo", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <nav>
        <ul className={css.list}>
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.link}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
