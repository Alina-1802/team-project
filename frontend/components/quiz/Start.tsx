import useQuizNavigation from "@hooks/useQuizNavigation.ts";
import ResultsHistory from "@components/results-history/ResultsHistory.tsx";

type Props = {
    title: string,
    description: string,
}

export default function Start(props: Props) {
    const {lastValidUrl, quizId} = useQuizNavigation()

    return (
        <>
            <h2>{props.title}</h2>
            <h4 dangerouslySetInnerHTML={{__html: props.description}}/>
            <p>Możesz wykonywać go wiele razy, aby poprawić swój wynik, ale jeśli nie chcesz, to lekcja zostanie
                oznaczona jako ukończona po pierwszym podejściu. (Oczywiście o ile jesteś zalogowany)</p>
            <a href={lastValidUrl}>Rozpocznij quiz</a>
            <ResultsHistory quizId={quizId ?? -1}/>
        </>
    )
}