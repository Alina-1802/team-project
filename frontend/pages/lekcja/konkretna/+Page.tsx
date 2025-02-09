import {navigate} from "vike/client/router";
import Routes from "@type/Routes.ts";
import useLessonData from "@hooks/useLessonData.ts";
import styles from "./style.module.css";

export default function Page() {
    const lesson = useLessonData()

    if (!lesson) {
        navigate(Routes.LEKCJA)
        return <></>
    }

    return (
        <main className={styles.main}>
            <p><a href={Routes.LEKCJA}>Powrót do listy lekcji</a></p>
            {/*to jest konkretna lekcja o id: {lesson.key}*/}
            {lesson.component && <lesson.component/>}
            {lesson.game && (
                <>
                    <p>Zapraszamy do gry aby utrwalić wiedzę z lekcji!</p>
                    <p><a href={lesson.game.url}>Zagraj w grę</a></p>
                </>
            )}
            {lesson.quiz && (
                <>
                    <p>Skończyłeś już lekcję? Spróbuj rozwiązać quiz!</p>
                    <a ><button className={styles.nex_button}>Przejdz do kolejnej  lekcji </button></a>
                    <p><a href={lesson.quiz.startUrl}>Przejdź do quizu</a></p>
                </>
            )}
        </main>
    )
}

