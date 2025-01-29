import spisLekcji from "@pages/lekcja/treści/spisLekcji.ts";

// służy do wygenerowania listy dostępnych lekcji - wykonywane tylko i wyłącznie w trakcie builda

export function onBeforePrerenderStart() {
    return spisLekcji.map(x => x.url)
}