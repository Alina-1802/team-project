import detection from '@assets/img/lessons/2-image-detection.webp'
import styles from "@pages/lekcja/konkretna/style.module.css";

export default function C2Lesson1() {
    return (
        <>
            <h1>Rozdział 2 Jak myśli komputer? Odkryj sekrety AI!</h1>

            <h2>Lekcja 1 Jak AI widzi świat?</h2>

            <p>Komputer nie ma oczu, uszu ani rąk jak człowiek, ale potrafi "widzieć" świat za pomocą sensorów, kamer i
                mikrofonów. W rzeczywistości nie odbiera on obrazu w taki sposób, jak ludzkie oko – zamiast tego
                przekształca świat w dane. Na przykład kamera robi zdjęcie, które dla człowieka jest oczywistym widokiem
                kota, ale dla komputera to po prostu miliony małych kolorowych punktów, czyli pikseli, ułożonych w
                określony sposób. Podobnie mikrofony przechwytują dźwięk, który komputer zamienia na cyfrowe fale,
                pozwalając mu analizować mowę i muzykę. Nawet samochody autonomiczne używają specjalnych skanerów,
                takich jak LiDAR, które wysyłają wiązki światła i mierzą czas, jaki zajmuje ich odbicie, by tworzyć
                trójwymiarowy obraz otoczenia. Dzięki temu sztuczna inteligencja może wykrywać przeszkody, ludzi na
                przejściu dla pieszych czy znaki drogowe.</p>

            <p>Jednym z najważniejszych osiągnięć w dziedzinie widzenia komputerowego jest zdolność AI do rozpoznawania
                i identyfikowania obiektów na obrazach. Aby nauczyć komputer, jak wygląda pies, samochód czy litera „A”,
                potrzebuje on dużej ilości przykładów. Proces ten nazywa się trenowaniem AI. Najpierw komputer analizuje
                setki tysięcy zdjęć konkretnego obiektu – na przykład kotów. Każde z nich jest oznaczone jako „kot”,
                więc AI uczy się szukać cech wspólnych, takich jak kształt uszu, ogon czy specyficzny wzór na sierści. Z
                czasem sztuczna inteligencja zaczyna rozpoznawać koty na nowych obrazach, których nigdy wcześniej nie
                widziała. Oczywiście nie zawsze działa to idealnie – AI może czasem pomylić kota z małym psem albo z
                futrzastym poduszkowcem, ale im więcej się uczy, tym jest w tym lepsza. Dzięki tej technologii możemy
                teraz korzystać z filtrów na Instagramie, które rozpoznają twarz i dodają do niej zabawne efekty, albo z
                systemów rozpoznawania twarzy w telefonach, które pozwalają odblokować urządzenie jednym
                spojrzeniem. </p>

            <div className={styles.horizontalImage}>
                <img src={detection}
                     alt={"Obrazek przedstawiający rozpoznane i oznaczone obiekty przez AI na ilustracji"}/>
                <span>Przykład wyniku oznaczania rozpoznanych obiektów na otrzymanym obrazie. Źródło: <a
                    href="https://futuristech.com.au/services/computer-vision/object-detection/">futuristech.com.au</a>
                </span>
            </div>

        </>
    )
}