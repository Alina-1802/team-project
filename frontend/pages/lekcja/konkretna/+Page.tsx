import {navigate} from "vike/client/router";
import Routes from "@type/Routes.ts";
import styles from "./style.module.css";
import useLessonNavigation from "@hooks/useLessonNavigation.ts";

export default function Page() {
    const {current: lesson, next, prev} = useLessonNavigation()

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
                    <p>Zapraszamy do gry aby utrwalić wiedzę z tego rozdziału!</p>
                    <p><a href={lesson.game.url}>Zagraj w grę</a></p>
                </>
            )}
            {lesson.quiz && (
                <>
                    <p>Skończyłeś już? Spróbuj rozwiązać quiz!</p>
                    <p><a href={lesson.quiz.startUrl}>Przejdź do quizu</a></p>
                </>
            )}
            <div className={styles.navigationButtons}>
                {prev && (
                    <button className={styles.nex_button} onClick={() => navigate(prev?.url)}>Wróć do poprzedniej lekcji</button>
                )}
                {next && (
                    <button className={styles.nex_button} onClick={() => navigate(next?.url)}>Idź do kolejnej lekcji</button>
                )}
            </div>
        </main>
    )
}

