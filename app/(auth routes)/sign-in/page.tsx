import styles from "./SignInPage.module.css";

export default function SignInPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>
    </div>
  );
}
