import spisLekcji from "@assets/spisLekcji.ts";

// służy do wygenerowania listy dostępnych gier - wykonywane tylko i wyłącznie w trakcie builda

export function onBeforePrerenderStart() {
    return spisLekcji.map(x => x.game?.url).filter(x => x)
}