import spisLekcji from "@assets/spisLekcji.ts";

export function onBeforePrerenderStart() {
    return spisLekcji
        .flatMap(x => {
            if (!x.quiz) return []
            return [
                ...x.quiz.questions.map(q => q.url),
                x.quiz.startUrl,
                x.quiz.koniecUrl,
            ]
        })
        .filter(x => !!x)
}