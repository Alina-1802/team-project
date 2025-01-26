import Wprowadzenie from "@components/lessons-contents/Wprowadzenie.tsx";
import Druga from "@components/lessons-contents/Druga.tsx";
import Routes from "@type/Routes.ts";

const quiz1 = {
    title: "Quiz wprowadzający",
    id: 1,
    description: "Pierwszy z quizów sprawdza Twoją wiedzę z pierwszej lekcji i pokazuje, jak wyglądają quizy w naszej aplikacji." +
        "<br/>Możesz wykonywać go wiele razy, aby poprawić swój wynik, ale jeśli nie chcesz, to lekcja zostanie oznaczona jako ukończona po pierwszym podejściu.",
    questions: [
        {
            id: 1,
            question: "Ile to 2+2?",
            answers: [
                {id: 1, text: "4", correct: true},
                {id: 2, text: "3"},
                {id: 3, text: "5"},
                {id: 4, text: "22"},
            ]
        },
        {
            id: 2,
            question: "Jak bardzo jesteś zadowolony z studiów?",
            answers: [
                {id: 1, text: "Nie wiem"},
                {id: 2, text: "Trochę nie"},
                {id: 3, text: "Zdecydowanie nie"},
                {id: 4, text: "Kotek", correct: true},
            ]
        },
    ]
}

export default [
    {
        key: "wprowadzenie",
        title: "Wprowadzenie",
        component: Wprowadzenie,
        quiz: quiz1,
    },
    {
        key: "druga",
        title: "Lekcja druga",
        component: Druga,
    },
].map(x => {
    const lessonUrl = `${Routes.LEKCJA}/${x.key}`
    const quizUrl = x.quiz ? `${lessonUrl}${Routes.LEKCJA_QUIZ}` : undefined
    const quiz = x.quiz ? {
        ...x.quiz,
        startUrl: quizUrl + Routes.LEKCJA_QUIZ_START,
        koniecUrl: quizUrl + Routes.LEKCJA_QUIZ_KONIEC,
        questions: x.quiz.questions.map(q => ({...q, url: `${quizUrl}/${q.id}`}))
    } : undefined
    return {...x, url: lessonUrl, quiz}
})
