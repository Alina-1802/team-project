import styles from './style.module.css'
import clsx from "clsx";
import Routes from "@type/Routes";

export default function Nav() {
    return (
        <nav className={styles.main_nav}>
            <div className={styles.nav_header}>
                <label className={styles.icon}>
                    <i className="fa-brands fa-square-facebook"></i>
                </label>
                <label className={styles.icon}>
                    <i className="fa-brands fa-instagram"></i>
                </label>
                <label className={clsx(styles.icon, styles.right_icon)}>
                    <i className="fa-solid fa-envelope"></i> meowmeowmeow@gmail.meow
                </label>
            </div>
            <label>AIQuizhub</label>
            <ul className={styles.main_nav_list}>
                <li className={styles.main_nav_item}><a href={Routes.INDEX}>Home</a></li>
                <li className={styles.main_nav_item}><a href={Routes.LOGOWANIE}>Logowanie</a></li>
                <li className={styles.main_nav_item}><a href={Routes.O_NAS}>O nas</a></li>
            </ul>
        </nav>
    )
}