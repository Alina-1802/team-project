import Wprowadzenie from "@components/lessons-contents/Wprowadzenie.tsx";
import Druga from "@components/lessons-contents/Druga.tsx";
import Routes from "@type/Routes.ts";
import Chapter2 from "@components/lessons-contents/Chapter2.tsx";

const quiz1 = {
    title: "Quiz wprowadzający",
    id: 1,
    description: "Pierwszy z quizów sprawdza Twoją wiedzę z pierwszej lekcji i pokazuje, jak wyglądają quizy w naszej aplikacji.",
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

const quizChapter2 = {
    title: "Quiz z rodziału 'Jak myśli komputer?'",
    id: 2,
    description: "Quiz pozwoli Ci sprawdzić, jak dobrze przyswoiłeś informacje z lekcji o tym, jak sztuczna inteligencja myśli i się uczy.",
    questions: [
        {
            id: 1,
            question: "Jak komputer „widzi” świat?",
            answers: [
                {id: 1, text: "Tak samo jak ludzkie oko, bo ma wbudowane sztuczne siatkówki"},
                {id: 2, text: "Zamienia obraz na cyfrowe dane, analizując piksele i wzory", correct: true},
                {id: 3, text: "Odbiera obrazy jako dźwięki i przekształca je na mowę"},
                {id: 4, text: "Tworzy rysunki na podstawie opisów słownych"}
            ]
        },
        {
            id: 2,
            question: "Jakie urządzenie pozwala komputerowi tworzyć trójwymiarowy obraz otoczenia?",
            answers: [
                {id: 1, text: "Mikrofon"},
                {id: 2, text: "LiDAR", correct: true},
                {id: 3, text: "Klawiatura"},
                {id: 4, text: "Modem"}
            ]
        },
        {
            id: 3,
            question: "Jak komputer uczy się rozpoznawać obiekty na obrazach?",
            answers: [
                {id: 1, text: "Dostaje ogromną ilość zdjęć i szuka na nich cech wspólnych", correct: true},
                {id: 2, text: "Tworzy rysunki i porównuje je z rzeczywistością"},
                {id: 3, text: "Uczy się poprzez rozmowy z ludźmi"},
                {id: 4, text: "Zgaduję losowo, aż trafi na poprawną odpowiedź"}
            ]
        },
        {
            id: 4,
            question: "Czym różni się uczenie nadzorowane od nienadzorowanego?",
            answers: [
                {
                    id: 1,
                    text: "W uczeniu nadzorowanym AI dostaje dane z gotowymi odpowiedziami, a w nienadzorowanym szuka wzorców samodzielnie",
                    correct: true
                },
                {id: 2, text: "W uczeniu nienadzorowanym komputer uczy się szybciej"},
                {id: 3, text: "Uczenie nadzorowane jest mniej skuteczne"},
                {id: 4, text: "Obie metody działają tak samo, ale mają inne nazwy"}
            ]
        },
        {
            id: 5,
            question: "Jak AI uczy się w modelu uczenia ze wzmocnieniem?",
            answers: [
                {id: 1, text: "Dostaje nagrody za dobre decyzje i ujemne punkty za błędy", correct: true},
                {id: 2, text: "Zapamiętuje wszystkie możliwe odpowiedzi"},
                {id: 3, text: "Działa tylko wtedy, gdy dostanie dokładne instrukcje"},
                {id: 4, text: "Losowo wykonuje różne ruchy bez celu"}
            ]
        },
        {
            id: 6,
            question: "Jak AI podejmuje decyzje?",
            answers: [
                {id: 1, text: "Zawsze wybiera losową opcję"},
                {id: 2, text: "Porównuje dane wejściowe z wcześniej nauczonymi wzorcami", correct: true},
                {id: 3, text: "Działa według jednego niezmiennego algorytmu"},
                {id: 4, text: "Podejmuje decyzje w taki sam sposób jak człowiek"}
            ]
        },
        {
            id: 7,
            question: "Co jest jednym z przykładów wykorzystania AI w rozpoznawaniu obrazów?",
            answers: [
                {id: 1, text: "Dodawanie efektów do zdjęć na Instagramie", correct: true},
                {id: 2, text: "Tworzenie muzyki na podstawie dźwięków"},
                {id: 3, text: "Naprawa uszkodzonych zdjęć"},
                {id: 4, text: "Przewidywanie przyszłych wydarzeń na podstawie historii zdjęć"}
            ]
        },
        {
            id: 8,
            question: "Czym jest proces trenowania AI?",
            answers: [
                {id: 1, text: "AI samodzielnie szuka książek i uczy się z nich"},
                {id: 2, text: "AI dostaje dane i uczy się z nich rozpoznawać wzorce", correct: true},
                {id: 3, text: "AI odtwarza dane, aby poznać historie"},
                {id: 4, text: "AI tworzy swoje własne dane na podstawie wyników matematycznych"}
            ]
        },
    ]
}

const lessons = [
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
        game: {
            title: "Super giera o AI",
            path: '/games/first/index.html', // that's from public folder
        }
    },
    {
        key: "jak-mysli-komputer",
        title: "Rozdział 2 Jak myśli komputer? Odkryj sekrety AI!",
        component: Chapter2,
        quiz: quizChapter2,
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
    const game = x.game ? {
        ...x.game,
        url: `${lessonUrl}${Routes.LEKCJA_GRA}`,
    } : undefined
    return {...x, url: lessonUrl, quiz, game}
})

export default lessons

export const quizzes = lessons.map(x => x.quiz).filter(x => x)
