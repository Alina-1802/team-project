import useAppContext from "@hooks/useAppContext.ts";
import {useEffect, useRef, useState} from "react";
import useLessonData from "@hooks/useLessonData.ts";
import {useIsClient} from "@hooks/useIsClient.ts";
import useSaveScoreMutation from "@pages/lekcja/quiz/useSaveScoreMutation.ts";
import useQuizNavigation from "@hooks/useQuizNavigation.ts";
import {navigate} from "vike/client/router";

type Props = {
    points: number,
    max: number,
}

export default function Finished(props: Props) {
    const isClient = useIsClient()
    const lesson = useLessonData()
    const {isFinished} = useQuizNavigation()
    const {setValue, getValue} = useAppContext()
    const token = getValue('token')
    const quizResult = getValue('quizResult')
    const savedPoints = useRef<null | number>(null)
    const retried = useRef(false)
    const quiz = lesson?.quiz
    const [message, setMessage] = useState('')

    const mutation = useSaveScoreMutation({
        onSuccess: () => {
            console.log('kozacko, zapisane')
            setValue('quizResult', props.points)
            setValue('quizAnswers', [])
            setMessage('Twój wynik został zapisany!')
        },
        onError: (error) => {
            setMessage(`Wystąpił błąd w trakcie zapisu, spróbuj ponownie później. (${error?.response?.message})`)
            savedPoints.current = null;
            retry()
        }
    })

    const save = () => {
        if(!isFinished) {
            console.log('quiz nie jest ukończony')
            return;
        }

        if (quizResult !== undefined) {
            console.log('wynik już zapisany', quizResult)
            return;
        }

        if (savedPoints.current !== null || !quiz || !token) {
            console.log('nie można zapisać', savedPoints.current, quiz?.id, token)
            retry()
            return;
        }

        savedPoints.current = props.points;
        mutation.mutate({
            quiz_id: quiz.id.toString(),
            scored_points: props.points.toString(),
            date: new Date().toISOString(),
        });
    }

    const retry = () => {
        if (!retried.current) {
            retried.current = true;
            setTimeout(() => {
                setMessage('')
                save()
            }, 1000)
        }
    }

    useEffect(() => {
        save()
    }, []);

    if (!isClient)
        return <p>Ładowanie...</p>

    if(!isFinished) {
        navigate(quiz?.startUrl ?? lesson?.url ?? '/')
        return <p>Quiz nie jest ukończony</p>
    }

    return (
        <>
            <p>Gratulacje, ukończyłeś quiz!</p>
            <p>Twój wynik to: {props.points} z {props.max}</p>
            {quizResult !== undefined ? (
                <p>Twój wynik już jest zapisany.</p>
            ) : message && <p>{message}</p>}
        </>
    )
}