import styles from "../pages/styles/home.module.scss";

export default function Home() {
  return (
    <h1 className={styles.title}>
      Hello <span>World</span>
    </h1>
  );
}
