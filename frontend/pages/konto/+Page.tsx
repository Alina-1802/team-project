import useAppContext from "@hooks/useAppContext.ts";
import useResultsQuery from "@pages/konto/hooks/useResultsQuery.ts";
import {quizIds} from "@assets/spisLekcji.ts";
import {useIsClient} from "@hooks/useIsClient.ts";
import {useEffect} from "react";
import useUserQuery from "@pages/konto/hooks/useUserQuery.ts";

export default function Page() {
    const {getValue} = useAppContext()
    const isClient = useIsClient()
    const token = getValue('token')

    const resultsQuery = useResultsQuery({
        quiz_id: quizIds.at(0) ?? 1,
        enabled: token !== undefined,
        retry: false,
    })
    const userQuery = useUserQuery({
        enabled: token !== undefined
    })

    useEffect(() => {
        console.log('results',resultsQuery.status, resultsQuery.data)
    }, [resultsQuery.status]);

    if (!isClient || resultsQuery.isLoading || userQuery.isLoading)
        return (<main>Ładowanie...</main>)

    if (!token)
        return (<main>Musisz być zalogowany</main>)

    return (
        <main>
            <h2>Twoje konto</h2>
            {userQuery.isError && <p>Błąd pobierania informacji o Twoim koncie: {userQuery.error?.response?.message}</p>}
            {userQuery.isSuccess && (
                <div>
                    <p>Witaj! To Twoje dane:</p>
                    <p>Imię: {userQuery.data.first_name}</p>
                    <p>Nazwisko: {userQuery.data.last_name}</p>
                    <p>Nick: {userQuery.data.username}</p>
                    <p>Email: {userQuery.data.email}</p>
                </div>
            )}
            <p>Wyniki quizów:</p>
            {resultsQuery.isError && <p>Błąd pobierania Twoich wyników: {resultsQuery.error?.response?.message}</p>}
            {resultsQuery.isSuccess && <p>Tutaj coś trzeba obsłużyć</p>}
        </main>
    )
}