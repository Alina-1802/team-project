import {usePageContext} from "vike-react/usePageContext";
import spisLekcji from "@assets/spisLekcji.ts";
import {useMemo} from "react";

export default function useLessonData() {
    const pageContext = usePageContext()
    return useMemo(() => {
        return spisLekcji.find(x => x.key === pageContext.routeParams.id)
    }, [pageContext.routeParams.id, spisLekcji?.length])
}