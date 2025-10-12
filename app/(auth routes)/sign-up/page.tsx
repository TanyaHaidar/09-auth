import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Create Account</h1>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}
