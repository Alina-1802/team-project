import useAppContext from "@hooks/useAppContext.ts";
import {useIsClient} from "@hooks/useIsClient.ts";
import useUserQuery from "@pages/konto/hooks/useUserQuery.ts";
import ResultsHistory from "@components/results-history/ResultsHistory.tsx";
import styles from './style.module.css'

export default function Page() {
    const {getValue} = useAppContext()
    const isClient = useIsClient()
    const token = getValue('token')

    const userQuery = useUserQuery({
        enabled: token !== undefined
    })

    if (!isClient || userQuery.isLoading)
        return (<main>Ładowanie...</main>)

    if (!token)
        return (<main>Musisz być zalogowany</main>)

    return (
        <main className={styles.main}>
            <h2>Twoje konto</h2>
            {userQuery.isError &&
                <p>Błąd pobierania informacji o Twoim koncie: {userQuery.error?.response?.message}</p>}
            {userQuery.isSuccess && (
                <div>
                    <p>Witaj! To Twoje dane:</p>
                    <p>Imię: {userQuery.data.first_name}</p>
                    <p>Nazwisko: {userQuery.data.last_name}</p>
                    <p>Nick: {userQuery.data.username}</p>
                    <p>Email: {userQuery.data.email}</p>
                </div>
            )}
            <ResultsHistory/>
        </main>
    )
}