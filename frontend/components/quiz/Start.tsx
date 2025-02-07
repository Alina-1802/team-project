import useQuizNavigation from "@hooks/useQuizNavigation.ts";
type Props = {
    title: string,
    description: string,
}

export default function Start(props: Props) {
    const {lastValidUrl} = useQuizNavigation()

    return (
        <>
            <h2>Tytuł quizu: {props.title}</h2>
            <h4 dangerouslySetInnerHTML={{__html: props.description}}/>
            <a href={lastValidUrl}>Rozpocznij quiz</a>
        </>
    )
}