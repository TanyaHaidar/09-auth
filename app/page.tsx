import styles from "./Home.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to NoteHub</h1>
        <p className={styles.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes.
        </p>
        <p className={styles.description}>
          It helps keep your thoughts organized and accessible in one place.
        </p>
      </div>
    </main>
  );
}
