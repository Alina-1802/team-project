import styles from './style.module.css'
import useAppContext from "@hooks/useAppContext.ts";
import {useMemo} from "react";
import {useIsClient} from "@hooks/useIsClient.ts";
import useResultsQuery from "@pages/konto/hooks/useResultsQuery.ts";
import {quizzes} from "@assets/spisLekcji.ts";

export default function ResultsHistory({quizId}: { quizId?: number }) {
    const {getValue} = useAppContext()
    const isClient = useIsClient()
    const token = getValue('token')
    const isSingleQuiz = useMemo(() => typeof quizId !== 'undefined', [quizId])

    const resultsQuery = useResultsQuery({
        quiz_id: quizId,
        enabled: token !== undefined && quizId !== -1,
        retry: false,
    })

    const data = useMemo(() => {
        return resultsQuery.data?.map((result, index) =>
            ({...result, quizData: quizzes.find(x => x.id === result.quiz_id)})
        )
    }, [resultsQuery.data])

    const message =
        !isClient || resultsQuery.isLoading ? 'Ładowanie wyników...'
            : (!token ? 'Musisz być zalogowany aby zobaczyć swoje wyniki'
                : (resultsQuery.data?.length === 0 || quizId === -1 ? 'Nie znaleziono poprzednich wykonań' : ''))

    if (message)
        return (
            <div className={styles.container}>
                <p>{message}</p>
            </div>
        )

    return (
        <div className={styles.container}>
            <p>
                {isSingleQuiz ? 'Wszystkie wyniki:' : 'Wyniki quizu:'}
            </p>
            {resultsQuery.isError && <p>Błąd pobierania Twoich wyników: {resultsQuery.error?.response?.message}</p>}
            {resultsQuery.isSuccess && data?.length && (
                <ul>
                    {data.map((result, index) => (
                        <li key={index}>
                            <p>{!isSingleQuiz && (`'${result.quizData?.shortTitle}': `)}{result.scored_points} z {result.quizData?.questions.length} ({(new Date(result.created_at))?.toLocaleString()})</p>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}