import spisLekcji from "@pages/lekcja/treści/spisLekcji.ts";


export default function Page() {

    return (
        <main>
            <p>spis wszystkich lekcji: </p>
            {spisLekcji.map((x, i) => (
                <p key={i}>
                    <a href={x.url}>{x.title}</a>
                </p>
            ))}
        </main>
    )
}