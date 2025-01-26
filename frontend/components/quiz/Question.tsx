import styles from './style.module.css'
import clsx from "clsx";
import useAppContext from "@hooks/useAppContext.ts";
import useQuizNavigation from "@hooks/useQuizNavigation.ts";
import NotFound from "@components/quiz/NotFound.tsx";
import {navigate} from "vike/client/router";

type Props = {}

export default function Question(props: Props) {
    const {currentQuestion, saveAnswer, lastValidUrl} = useQuizNavigation()
    const {getValue} = useAppContext()
    const answers = getValue('quizAnswers')
    const selected = answers?.find(x => x.questionId === currentQuestion?.id)?.answerId ?? null

    if (!currentQuestion || !lastValidUrl) {
        return <NotFound/>
    }

    const onSelect = (answerId: number) => {
        saveAnswer(currentQuestion.id, answerId)
    }

    const onClickNext = () => {
        navigate(lastValidUrl)
    }

    return (
        <>
            <h4>{currentQuestion.question}</h4>
            {currentQuestion.answers.map((answer, index) => (
                <div
                    key={index}
                    className={clsx(styles.question, selected === answer.id && styles.selected)}
                    onClick={() => onSelect(answer.id)}
                >
                    {answer.text}
                </div>
            ))}
            <button type={'button'} className={styles.nextButton} onClick={onClickNext}>Dalej</button>
        </>
    )
}