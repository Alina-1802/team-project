import detection from '@assets/img/lessons/2-image-detection.webp'
import styles from "@pages/lekcja/konkretna/style.module.css";

export default function Chapter2() {
    return (
        <>
            <article className={styles.article_box}>
                <header className={styles.hedder_text}>Czym różni się AI od robotów?</header>
                <p className={styles.normal_text}>
                    🤖 Czy każdy robot to AI? Nie! AI i roboty to dwa różne pojęcia, które często są mylone.
                    <br/><br/>
                    Nie każdy robot ma sztuczną inteligencję, a AI może działać nawet bez robota!
                    <br/><br/>
                    AI to oprogramowanie, które potrafi się uczyć, analizować dane i podejmować decyzje.
                    <ul>
                        <li>Nie musi być fizycznym obiektem (nie potrzebuje ciała)!</li>
                        <li>AI może działać na komputerze, telefonie, w chmurze</li>
                    </ul>
                </p>
            </article>
            <article className={styles.article_box}>
                <header className={styles.hedder_text}>📢 Przykład AI:</header>
                <ul>
                    <li>ChatGPT, Google Assistant, Siri – rozumieją i odpowiadają na pytania.</li>
                    <li>Filtry na Instagramie – rozpoznają twarz i dodają efekty.</li>
                    <li>Tłumacz Google – analizuje teksty i tłumaczy języki.</li>
                    <li>AI w medycynie – pomaga diagnozować choroby na podstawie zdjęć.</li>
                </ul>
                <p>AI może działać na komputerze, telefonie, w chmurze – nie potrzebuje ciała!</p>
                <br/><br/>
                <p>Roboty to fizyczne maszyny, nie muszą mieć sztucznej inteligencji – mogą po prostu działać według
                    zaprogramowanych instrukcji.</p>
                <p>Przykłady robotów:</p>
                <ul>
                    <li>Robot kuchenny – miesza i kroi składniki, ale nie „myśli”.</li>
                    <li>Ramiona robotyczne w fabrykach – montują samochody, ale nie uczą się nowych rzeczy.</li>
                    <li>Zabawki-roboty – poruszają się według prostego programu.</li>
                </ul>
                <table>
                    <tr>
                        <th>Cechy</th>
                        <th>AI (Sztuczna Inteligencja)</th>
                        <th>Robot</th>
                    </tr>
                    <tr>
                        <td>Czy ma ciało?</td>
                        <td className="incorrect">❌ Nie — to tylko oprogramowanie</td>
                        <td className="correct">✅ Tak — to fizyczna maszyna</td>
                    </tr>
                    <tr>
                        <td>Czy myśli?</td>
                        <td className="correct">✅ Tak — analizuje dane i uczy się</td>
                        <td className="incorrect">❌ Nie — działa według instrukcji</td>
                    </tr>
                    <tr>
                        <td>Czy może się uczyć?</td>
                        <td className="correct">✅ Tak — AI rozwija się i poprawia</td>
                        <td className="incorrect">❌ Nie — roboty bez AI robią zawsze to samo</td>
                    </tr>
                    <tr>
                        <td>Przykłady</td>
                        <td>Google Assistant, ChatGPT, Netflix</td>
                        <td>Odkurzacz Roomba, robot kuchenny</td>
                    </tr>
                </table>
            </article>
        </>
    )
}
