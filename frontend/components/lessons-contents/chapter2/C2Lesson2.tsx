import detection from '@assets/img/lessons/2-image-detection.webp'
import styles from "@pages/lekcja/konkretna/style.module.css";

export default function C2Lesson2() {
    return (
        <>
            <h1>Rozdział 2 Jak myśli komputer? Odkryj sekrety AI!</h1>

            <h2>Lekcja 2 Jak AI się uczy?</h2>

            <p>Uczenie maszynowe to sposób, w jaki sztuczna inteligencja zdobywa wiedzę i staje się coraz mądrzejsza.
                Zamiast programować ją krok po kroku, dajemy jej ogromne ilości danych i pozwalamy, by sama znalazła w
                nich wzorce. To trochę jak nauka jazdy na rowerze – nikt nie daje nam dokładnej instrukcji, jak utrzymać
                równowagę, tylko próbujemy, upadamy, poprawiamy błędy i w końcu jeździmy coraz lepiej. Podobnie AI
                dostaje dane, analizuje je i poprawia swoje błędy, aż zaczyna rozpoznawać obiekty, przewidywać przyszłe
                zdarzenia czy prowadzić rozmowy.</p>

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
        </>
    )
}