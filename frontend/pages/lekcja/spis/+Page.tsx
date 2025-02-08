import spisLekcji from "@assets/spisLekcji.ts";
import styles from "@pages/lekcja/spis/style.module.css";

export default function Page() {

    return (
        <main>
            <p>Lekcje: </p>
            <nav className={styles.bento_grid}>
                <ul className={styles.bento_grid}>
                {spisLekcji.map((x, i) => (
                    <li className={styles.box} key={i}>
                        <a className={styles.li}  href={x.url}>{x.title}</a>
                    </li>
                ))}
                </ul>
            </nav>
        </main>
    )
}