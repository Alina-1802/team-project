import useQuizNavigation from "@hooks/useQuizNavigation.ts";
import useAppContext from "@hooks/useAppContext.ts";
import {useEffect} from "react";

type Props = {
    title: string,
    description: string,
}

export default function Start(props: Props) {
    const {setValue} = useAppContext()
    const {lastValidUrl} = useQuizNavigation()

    useEffect(() => {
        // to może powinno być na wyjściu z quizu, a nie wejściu na start,
        // bo teoretycznie można wejść na odpowiednie pytanie pomijając start
        setValue('quizAnswers', undefined)
        setValue('quizResult', undefined)
    }, []);

    return (
        <>
            <h2>Tytuł quizu: {props.title}</h2>
            <h4 dangerouslySetInnerHTML={{__html: props.description}}/>
            <a href={lastValidUrl}>Rozpocznij quiz</a>
        </>
    )
}