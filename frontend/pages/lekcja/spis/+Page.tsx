import spisLekcji from "@assets/spisLekcji.ts";
import styles from "./style.module.css";

export default function Page() {

    return (
        <main>
            <h1 className={styles.title}>Lekcje: </h1>
            <ul className={styles.bento_grid}>
                {spisLekcji.map((x, i) => (
                    <li className={styles.box} key={i}>
                        <a className={styles.li} href={x.url}>{x.title}</a>
                    </li>
                ))}
            </ul>
        </main>
    )
}