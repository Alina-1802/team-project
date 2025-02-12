import {usePageContext} from "vike-react/usePageContext";
import spisLekcji from "@assets/spisLekcji.ts";
import {useMemo} from "react";

export default function useLessonNavigation() {
    const pageContext = usePageContext()

    return useMemo(() => {
        const current = spisLekcji.find(x => x.key === pageContext.routeParams.id)
        if (!current) {
            return {current: undefined, next: undefined, prev: undefined}
        }
        return {
            current,
            next: spisLekcji.find(x => x.index === current.index + 1),
            prev: spisLekcji.find(x => x.index === current.index - 1),
        }
    }, [pageContext.routeParams.id, spisLekcji?.length])
}