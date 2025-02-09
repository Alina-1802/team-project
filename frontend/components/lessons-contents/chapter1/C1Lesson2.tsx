import detection from '@assets/img/lessons/2-image-detection.webp'
import mop from '@assets/img/lessons/mop.svg'
import styles from "@pages/lekcja/konkretna/style.module.css";

export default function Chapter2() {
    return (
        <>
            <article className={styles.article_box}>
                <header className={styles.hedder_text}>Jak maszyny uczą się i podejmują decyzję?</header>
                <p className={styles.normal_text}>
                    🧠 Czy AI jest mądrzejsza od ludzi? Nie! AI może analizować ogromne ilości danych, ale nie ma
                    intuicji ani uczuć.
                    <br/><br/>
                    Jak uczy się AI?
                    Dostaje dane (np. tysiące zdjęć kotów i psów).
                    Szuka wzorców (np. „koty mają wąsy i spiczaste uszy”).
                    Przewiduje odpowiedź (np. „to wygląda jak kot!”).
                    Jeśli się pomyli, poprawia swoje błędy.
                    <br/><br/>
                    💡 To nazywamy uczeniem maszynowym (machine learning).
                </p>
            </article>
            <article className={styles.article_box}>
                <header className={styles.hedder_text}>📢 Przykład uczenia AI:</header>
                <p>Wyobraź sobie, że uczymy AI rozpoznawać zwierzęta.</p>
                <ul>
                    <li>Dajemy jej 1000 zdjęć psów i 1000 zdjęć kotów.</li>
                    <li>AI analizuje różnice.</li>
                    <li>🐶 Psy mają szerokie pyski i często otwarte usta.</li>
                    <li>🐱 Koty mają spiczaste uszy i dłuższe wąsy.</li>
                </ul>
                <p>Po nauce AI może samodzielnie zgadywać, co jest na zdjęciu!</p>
                <br/><br/>
                <p>Innym świetnym przykładem będzie pies mop czyli Komodor</p>
                <ul>
                    <li>Dajemy komputerowi zadanie: Rozpoznaj, czy na zdjęciu jest pies rasy Komondor czy zwykły mop!
                    </li>
                    <li>AI dostaje setki zdjęć:<br/>📌 Komondory – duże psy z długą, dredowaną sierścią.<br/>📌 Mopy –
                        zwykłe akcesoria do sprzątania, z długimi frędzlami.
                    </li>
                </ul>
                <figure className={styles.image_and_text}>
                    <img src={mop} alt="albo pies albo mop nikt nie wie"></img>
                    <figcaption>💡 Ludzki mózg od razu widzi różnicę! <br/>Ale dla komputera… oba obiekty wyglądają
                        podobnie! 😲
                    </figcaption>
                </figure>
            </article>

        </>
    )
}
