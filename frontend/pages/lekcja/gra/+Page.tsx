import styles from "./style.module.css";
import {navigate} from "vike/client/router";
import Routes from "@type/Routes.ts";
import useLessonData from "@hooks/useLessonData.ts";
import GameLoader from "@components/game-loader/GameLoader.tsx";

export default function Page() {
    const lesson = useLessonData()

    if (!lesson?.game) {
        navigate(lesson?.url || Routes.LEKCJA)
        return <></>
    }

    return (
        <main className={styles.container}>
            <p><a href={Routes.LEKCJA}>Powrót do listy lekcji</a></p>
            {/*to jest gra lekcji o id: {lesson.key}*/}
            <GameLoader path={lesson.game.path}/>
        </main>
    )
}

