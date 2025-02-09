import detection from '@assets/img/lessons/2-image-detection.webp'
import styles from "@pages/lekcja/konkretna/style.module.css";

export default function Chapter2() {
    return (
        <>
            <article className={styles.article_box}>
                <header className={styles.hedder_text}>Rozdział 2 Jak myśli komputer? Odkryj sekrety AI!</header>
                <p className={styles.normal_text}>
                    Wyobraź sobie, że twój telefon potrafi odblokować się, gdy na niego spojrzysz. Gdy pytasz Asystenta Google, jaka jest pogoda on odpowaiada w kilka sekund. A kiedy włączasz Netflixa dostajesz idealne rekomendacje filmów.
                    <br/>
                    <br/>
                    Czy to magia? NIe! To AI!
                    <br/>
                    <br/>
                    Sztuczna inteligencja (Artificial Intelligence, AI) to technologia, która pozwala komputerom uczyć się, analizować dane i podejmować decyzje – ale nie tak jak człowiek.
                    <br/>
                    <br/>
                    Ludzie uczą się z doświadczeń, natomiast AI uczy się na podstawie ogromnej ilości danych i wzorców.
                </p>
            </article>
            <article className={styles.article_box}>
                <header className={styles.hedder_text}>📢 Przykłady AI w codziennym życiu:</header>
                <ul>
                    <li>Filtry na Instagramie – AI rozpoznaje twarz i dodaje efekt.</li>
                    <li>Siri, Google Assistant, Alexa – AI rozumie Twoje pytania i odpowiada.</li>
                    <li>Netflix i YouTube – AI sugeruje filmy, które mogą Ci się spodobać.</li>
                    <li>Samochody autonomiczne – AI analizuje drogę i pomaga prowadzić auto.</li>
                </ul>
                <footer>💬 Zastanów się: Gdzie jeszcze w swoim życiu spotkałeś AI?</footer>
            </article>
        </>
    )
}