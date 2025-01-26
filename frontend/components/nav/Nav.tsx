import styles from './style.module.css'
import clsx from "clsx";
import Routes from "@type/Routes";
import useAppContext from "@hooks/useAppContext.ts";

export default function Nav({activeRoute}: { activeRoute?: string }) {
    const {getValue} = useAppContext()
    const email = getValue('email')

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
                    <i className="fa-solid fa-envelope"></i> {email}
                </label>
            </div>
            <label>AIQuizhub</label>
            <ul className={styles.main_nav_list}>
                {links.map((link, i) => (
                    <li key={i} className={clsx(styles.main_nav_item, activeRoute === link.url && styles.active)}>
                        <a href={link.url}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
const links = [
    {url: Routes.INDEX, label: 'Home'},
    {url: Routes.LOGOWANIE, label: 'Logowanie'},
    {url: Routes.LEKCJA, label: 'Lekcje'},
    {url: Routes.O_NAS, label: 'O nas'},
]