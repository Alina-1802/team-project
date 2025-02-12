import styles from "./style.module.css";

export default function GameLoader({path}: { path: string }) {

    return (
        <div className={styles.gameContainer}>
            <iframe
                src={path}
                width="100%"
                height="100%"
                allowFullScreen
            />
        </div>
    )
}