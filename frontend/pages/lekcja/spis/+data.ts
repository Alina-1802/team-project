import {PageContext} from "vike/types";
import {useConfig} from "vike-react/useConfig";
import spisLekcji from "@assets/spisLekcji.ts";

// https://vike.dev/useConfig

export default function data() {
    const config = useConfig()
        config({
            title: "Wszystkie lekcje AIQuizzHub",
        })
}