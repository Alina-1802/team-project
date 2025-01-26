import useAppContext from "@hooks/useAppContext.ts";
import {useEffect} from "react";
import useLessonData from "@hooks/useLessonData.ts";

type Props = {
    points: number,
    max: number,
}

export default function Finished(props: Props) {
    const lesson = useLessonData()
    const {setValue, getValue} = useAppContext()
    const answers = getValue('quizAnswers')

    // to trzbe zmienic, bo to nie powinno byc w zależności od renderu (useEffect)
    // tylko po pierwszym wejsciu musi isc zapis then usuniecie odpowiedzi
    // a na wyjsciu powinno być i tak usunięcie, wiec moze to na mount / unmount
    useEffect(() => {
        console.log('quiz skończony, to teraz zapis wyniku do bazy i usunięcie danych', props.points, 'quiz id:', lesson?.quiz?.id)
        setValue('quizResult', props.points)
        setValue('quizAnswers', [])

        return () => {
            console.log('czyszczenie wyników quizu')
            setValue('quizResult', undefined)
        }
    }, []);

    return (
        <>
            <p>Gratulacje, ukończyłeś quiz!</p>
            <p>Twój wynik to: {props.points} z {props.max}</p>
        </>
    )
}