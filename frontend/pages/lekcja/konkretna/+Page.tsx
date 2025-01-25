import {usePageContext} from "vike-react/usePageContext";
import spisLekcji from "@pages/lekcja/treści/spisLekcji.ts";
import {navigate} from "vike/client/router";
import Routes from "@type/Routes.ts";

export default function Page() {
    const pageContext = usePageContext()
    const lekcja = spisLekcji.find(x => x.key === pageContext.routeParams.id)

    if (!lekcja) {
        navigate(Routes.LEKCJA)
    }

    return (
        <main>
            <p><a href={Routes.LEKCJA}>Powrót do listy lekcji</a></p>
            to jest konkretna lekcja o id: {pageContext.routeParams.id}
            {lekcja?.component && <lekcja.component/>}
        </main>
    )
}

