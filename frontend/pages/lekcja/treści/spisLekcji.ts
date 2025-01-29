import Wprowadzenie from "./Wprowadzenie.tsx";
import Druga from "./Druga.tsx";
import Routes from "@type/Routes.ts";

export default [
    {
        key: "wprowadzenie",
        title: "Wprowadzenie",
        component: Wprowadzenie,
    },
    {
        key: "druga",
        title: "Lekcja druga",
        component: Druga,
    },
].map(x => ({...x, url: `${Routes.LEKCJA}/${x.key}`}))