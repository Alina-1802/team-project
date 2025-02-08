import detection from '@assets/img/lessons/2-image-detection.webp'
import styles from "@pages/lekcja/konkretna/style.module.css";

export default function Chapter2() {
    return (
        <>
            <h1>Rozdział 2 Jak myśli komputer? Odkryj sekrety AI!</h1>

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

            <p>Uczenie maszynowe to sposób, w jaki sztuczna inteligencja zdobywa wiedzę i staje się coraz mądrzejsza.
                Zamiast programować ją krok po kroku, dajemy jej ogromne ilości danych i pozwalamy, by sama znalazła w
                nich wzorce. To trochę jak nauka jazdy na rowerze – nikt nie daje nam dokładnej instrukcji, jak utrzymać
                równowagę, tylko próbujemy, upadamy, poprawiamy błędy i w końcu jeździmy coraz lepiej. Podobnie AI
                dostaje dane, analizuje je i poprawia swoje błędy, aż zaczyna rozpoznawać obiekty, przewidywać przyszłe
                zdarzenia czy prowadzić rozmowy.</p>

            {/* tu jest o rodzajach uczenia, ewentualnie to można wrzucić do innej lekcji, jeśli bardziej by wam pasowało */}

            <p>Sztuczna inteligencja uczy się na kilka sposobów, a każdy z nich znajduje zastosowanie w różnych
                dziedzinach. W uczeniu nadzorowanym AI otrzymuje zestaw danych z gotowymi odpowiedziami – na przykład
                tysiące zdjęć kotów i psów, gdzie każde zdjęcie jest odpowiednio oznaczone. Dzięki temu może analizować
                cechy wspólne dla każdej kategorii, a następnie samodzielnie klasyfikować nowe obrazy. Natomiast w
                uczeniu nienadzorowanym AI nie dostaje gotowych etykiet – musi sama odkryć wzorce w danych. To trochę
                jak układanie puzzli bez obrazka na pudełku – komputer analizuje różne elementy i próbuje znaleźć między
                nimi powiązania. Przykładem może być analiza zachowań użytkowników w sklepie internetowym – AI może
                grupować klientów na podstawie ich preferencji zakupowych, pomagając firmom lepiej dopasować oferty i
                personalizować reklamy. W ten sposób AI może wykrywać także nieoczywiste zależności, które umykają
                tradycyjnym metodom analizy, pomagając na przykład w identyfikacji oszustw finansowych, przewidywaniu
                trendów rynkowych czy nawet w odkrywaniu nowych zależności w badaniach naukowych.</p>

            <p>Trzecią metodą nauki jest uczenie ze wzmocnieniem, które przypomina sposób, w jaki uczą się ludzie grając
                w gry komputerowe. AI podejmuje decyzje i otrzymuje nagrody za dobre wybory, a jeśli popełni błąd,
                dostaje ujemne punkty i musi spróbować ponownie. Tego rodzaju nauka jest wykorzystywana w robotyce,
                autonomicznych pojazdach czy optymalizacji procesów produkcyjnych. Co ciekawe, w ten sposób sztuczna
                inteligencja uczy się na bazie doświadczeń, a nie sztywnych reguł – rozwija coś na wzór intuicji,
                chociaż nie w sposób, w jaki robi to człowiek. Przykładem jest AlphaGo, AI, które pokonało mistrzów
                świata w grze Go. Nie stosowało ono klasycznych strategii, które można znaleźć w podręcznikach, lecz
                poprzez tysiące gier z samym sobą odkryło zupełnie nowe sposoby rozgrywki, których nawet ludzie by nie
                przewidzieli. </p>

            <p>Sztuczna inteligencja podejmuje decyzje na podstawie wzorców, które odkryła podczas treningu, oraz
                informacji, które aktualnie otrzymuje. W przypadku systemów wykorzystujących uczenie maszynowe proces
                ten polega na analizie danych wejściowych i porównaniu ich z wcześniej nauczonymi schematami. Na
                przykład asystent głosowy rozpoznaje słowa użytkownika, dopasowuje je do znanych komend i generuje
                odpowiedź na podstawie zgromadzonych informacji. W bardziej zaawansowanych modelach, takich jak sieci
                neuronowe, decyzje są podejmowane poprzez przetwarzanie danych na wielu poziomach – od rozpoznania
                podstawowych cech, takich jak kształty czy dźwięki, aż po bardziej abstrakcyjne zależności i kontekst
                sytuacyjny. Dzięki temu AI może np. nie tylko zidentyfikować obiekt na zdjęciu, ale także określić, w
                jakim znajduje się otoczeniu i jaka jest jego rola w danej scenie. </p>
        </>
    )
}