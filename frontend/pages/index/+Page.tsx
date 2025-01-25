import styles from "./style.module.css";
import smile from "@assets/img/main/brain_smille.png";
import Routes from "@type/Routes.ts";

export default function Page() {
    return (
        <>
            <article className={styles.container}>
                <label className={styles.title}>AIQuizzHub nauka przez zabawę dla dzieci i młodzieży</label>
                <label className={styles.sub_title}>Zaprasza do rozpoczęcia wspólnej przygody</label>
                <img src={smile} alt=""/>
                <label className={styles.join_to_us}>Dołącz już dziś</label>
                <a href={Routes.LOGOWANIE} className={styles.registerButton}>Rejestracja -&gt;</a>
            </article>
        </>
    );
}
