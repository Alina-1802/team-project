import useLessonData from "@hooks/useLessonData.ts";
import useAppContext from "@hooks/useAppContext.ts";
import {usePageContext} from "vike-react/usePageContext";
import {useCallback, useMemo} from "react";

export default function useQuizNavigation() {
    const lesson = useLessonData()
    const {setValue, getValue} = useAppContext()
    const pageContext = usePageContext()
    const step = pageContext.routeParams.step
    const stepNumber = Number.parseInt(step)
    const answers = getValue('quizAnswers')
    const result = getValue('quizResult')

    return {
        ...useMemo(() => {
            // console.log('memo answers', answers)
            const q = lesson?.quiz?.questions
            const qid = answers?.map(x => x.questionId)
            const isSaved = result !== undefined
            const remainingQuestions = isSaved ? [] : q?.filter(x => !qid?.length || !qid?.includes(x.id))
            const currentQuestion = q?.find(x => x.id === stepNumber)
            // console.log('memo remaining', remainingQuestions)
            const isFinished = remainingQuestions?.length === 0
            const points = q?.filter(x =>
                answers?.find(y => y.questionId === x.id)?.answerId === (x.answers.find(y => y.correct)?.id ?? -1)
            ).length ?? 0
            return {
                remainingQuestions,
                currentQuestion: currentQuestion ?? remainingQuestions?.[0],
                isFinished,
                isSaved,
                points,
                lastValidUrl: remainingQuestions?.at(0)?.url ?? lesson?.quiz?.koniecUrl,
            }
        }, [answers, lesson?.quiz?.questions, result, step]),
        saveAnswer: useCallback((questionId: number, answerId: number) => {
            if (result !== undefined) {
                console.warn('po zapisie quizu już nie można go modyfikować')
                return
            }
            setValue('quizAnswers', [...answers?.filter(x => x.questionId !== questionId) ?? [], {
                questionId,
                answerId
            }])
        }, [answers]),

    }
}