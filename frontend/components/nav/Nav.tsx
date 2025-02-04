import styles from './style.module.css'
import clsx from "clsx";
import Routes from "@type/Routes";
import useAppContext from "@hooks/useAppContext.ts";
import useIsLogged from "@hooks/useIsLogged.ts";
import {useMemo} from "react";

export default function Nav({activeRoute}: { activeRoute?: string }) {
    const {getValue} = useAppContext()
    const email = getValue('email')
    const links = useNavLinks()

    return (
        <nav className={styles.main_nav}>
            <div className={styles.nav_header}>
                <label className={styles.icon}>
                    <i className="fa-brands fa-square-facebook"></i>
                </label>
                <label className={styles.icon}>
                    <i className="fa-brands fa-instagram"></i>
                </label>
                <label className={clsx(styles.icon, styles.right_icon)} suppressHydrationWarning={true}>
                    {email && (
                        <>
                            <i className="fa-solid fa-envelope" suppressHydrationWarning={true}></i> {email}
                        </>
                    )}
                </label>
            </div>
            <label>AIQuizhub</label>
            <ul className={styles.main_nav_list} suppressHydrationWarning={true}>
                {links.map((link, i) => (
                    <li key={i} className={clsx(styles.main_nav_item, activeRoute === link.url && styles.active)}>
                        <a href={link.url}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

function useNavLinks() {
    const isLogged = useIsLogged()

    return useMemo(() => {
        const links = [
            {url: Routes.INDEX, label: 'Home'},
            {url: Routes.LEKCJA, label: 'Lekcje'},
            {url: Routes.O_NAS, label: 'O nas'},
        ]
        if (isLogged) {
            links.push({url: Routes.WYLOGOWANIE, label: 'Wylogowanie'})
        } else {
            links.push({url: Routes.LOGOWANIE, label: 'Logowanie'})
        }
        return links
    }, [isLogged])
}
