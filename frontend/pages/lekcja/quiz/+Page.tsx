import {navigate} from "vike/client/router";
import Routes from "@type/Routes.ts";
import useLessonData from "@hooks/useLessonData.ts";
import useAppContext from "@hooks/useAppContext.ts";
import Start from "@components/quiz/Start.tsx";
import {useMemo} from "react";
import Question from "@components/quiz/Question.tsx";
import {usePageContext} from "vike-react/usePageContext";
import NotFound from "@components/quiz/NotFound.tsx";
import Finished from "@components/quiz/Finished.tsx";
import useQuizNavigation from "@hooks/useQuizNavigation.ts";
import styles from "./style.module.css";

export default function Page() {
    const lesson = useLessonData()
    const quiz = useQuizNavigation()
    const {getValue} = useAppContext()
    const pageContext = usePageContext()
    const step = pageContext.routeParams.step
    const result = getValue('quizResult')

    if (!lesson) {
        navigate(Routes.LEKCJA)
        return <></>
    }

    const content = useMemo(() => {
        if (!lesson.quiz)
            return <NotFound/>
        if (step === 'koniec' || quiz.isSaved)
            return <Finished points={result ?? quiz.points} max={lesson.quiz.questions.length}/>
        if (step === 'start')
            return <Start title={lesson.quiz.title} description={lesson.quiz.description}/>
        if (quiz.currentQuestion) {
            return <Question/>
        } else {
            return <h4>nieznany krok: {step}</h4>
        }
    }, [lesson.key, step, result, quiz.currentQuestion?.id])

    return (
        <main className={styles.quizContainer}>
            <p><a href={lesson.url}>Powrót do lekcji</a></p>
            {/*<p>quiz lekcji o id: {lesson.key}</p>*/}
            {/*<p>etap lub numer pytania: {step}</p>*/}
            {content}
        </main>
    )
}

