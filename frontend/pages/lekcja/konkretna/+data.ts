import { PageContext } from "vike/types";
import {useConfig} from "vike-react/useConfig";
import spisLekcji from "@pages/lekcja/treści/spisLekcji.ts";

// https://vike.dev/useConfig

export default function data(pageContext: PageContext) {
    const lekcja = spisLekcji.find(x => x.key === pageContext.routeParams.id)
    const config = useConfig()
    config({
        title: lekcja?.title,
        // description: lekcja?.description
    })
}