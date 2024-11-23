import type {PageContextServer} from "vike/types";

export type Data = {
    example: string;
}

export const data = async (pageContext: PageContextServer) => {

    return {
        example: "this is data on pre render: data"
    }
}