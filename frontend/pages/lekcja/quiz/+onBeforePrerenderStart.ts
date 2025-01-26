import spisLekcji from "@assets/spisLekcji.ts";

export function onBeforePrerenderStart() {
    const allQuestions = spisLekcji
        .flatMap(x => {
            if (!x.quiz) return []
            return [
                ...x.quiz.questions.map(q => q.url),
                x.quiz.startUrl,
                x.quiz.koniecUrl,
            ]
        })
        .filter(x => x)
    console.log(allQuestions)
    return allQuestions
}