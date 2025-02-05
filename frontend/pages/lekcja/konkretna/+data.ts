import {PageContext} from "vike/types";
import {useConfig} from "vike-react/useConfig";
import spisLekcji from "@assets/spisLekcji.ts";

// https://vike.dev/useConfig

export default function data(pageContext: PageContext) {
    const lesson = spisLekcji.find(x => x.key === pageContext.routeParams.id)
    const config = useConfig()
    if (lesson)
        config({
            title: lesson?.title,
            // description: lesson?.description
        })
}