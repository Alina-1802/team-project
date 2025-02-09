import styles from "./style.module.css";
import {useState} from "react";
import human from '@assets/img/main/robot_human.svg';
type Chapter = {
    title: string;
    description: string;
    topics: string[];
};

const Chapters: Chapter[] = [
    {
        title: "Rozdział I",
        description: "Cel: Zrozumienie podstawowych pojęć i zastosowań AI w codziennym życiu.",
        topics: [
            "Co to jest sztuczna inteligencja?",
            "Jak maszyny 'uczą się'?",
            "Roboty i AI – czym się różnią?"
        ]
    },
    {
        title: "Rozdział II",
        description: "Cel: Poznanie podstawowych mechanizmów AI oraz logicznego myślenia.",
        topics: [
            "Jak AI \"widzi\" świat?",
            "Uczenie maszynowe?",
            "Jak AI podejmuje decyzje?"
        ]
    },
    {
        title: "Rozdział III",
        description: "Cel: Zrozumienie praktycznego wpływu AI na różne dziedziny życia.",
        topics: [
            "AI w medycynie, edukacji, przemyśle i rozrywce",
            "AI w kreatywności",
            "Etyka AI"
        ]
    },
    {
        title: "Rozdział IV",
        description: "Cel: Rozwinięcie umiejętności programowania w kontekście AI.",
        topics: [
            "Podstawy programowania w Pythonie",
            "O tworzeniu modeli słów kilka, na przykładzie mopa i psa."
        ]
    }
];
export default function Page() {
    const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
    return (
        <main className={styles.main}>
          <h1 className={styles.caption}>O nas - zespół AIQuizzHub</h1>
          <article className={styles.article_basic}>
            <header>O projekcie</header>
            <p>Nasz projekt to nowoczesna strona internetowa stworzona z myślą o dzieciach i młodzieży, która wprowadza w fascynujący świat sztucznej inteligencji (AI). Dzięki interaktywnym lekcjom, i przykładach z życia uczniowie w prosty i przystępny sposób mogą poznać podstawy AI, a dzięki temu rozwijać kreatywne myślenie, a w przyszłości także i umiejętności programowania. Naszym celem jest inspirowanie młodych umysłów do odkrywania nowych technologii i przygotowanie ich na przyszłość w cyfrowym świecie. I mamy nadzieję, że poprzez tą platformę zainspirujemy nie jeden.</p>
          </article>
          <article className={`${styles.article_basic} ${styles.article_basic_reverse}`}>
             <header>Struktura kursu</header>
             <p>Projekt składa się z czterech głównych rozdziałów, które stopniowo wprowadzają w temat sztucznej inteligencji - od podstawowych pojęć, przez działanie mechanizmów AI, aż po naukę programowania.</p>
          </article>
          <div className={styles.row_colums}>
              {Chapters.map((chapter) => (
                  <article key={chapter.title} className={styles.box}>
                      <header>{chapter.title}</header>
                      <p>{chapter.description}</p>
                      <ul>
                          {chapter.topics.map((topic, topicIndex) => (
                              <li key={topicIndex}>{topic}</li>
                          ))}
                      </ul>
                  </article>
              ))}

          </div>
           <span className={styles.article_image}>
               <article className={styles.article_basic}>
                   <header>Dla kogo jest ten projekt?</header>
                   <ul>
                       <li>Młodzież, chcąca poznać podstawy Ai w przystępny sposób</li>
                       <li>Nauczyciele szukający nowoczesnych materiałów do nauczania AI</li>
                       <li>Pasjonatów nowych technologii i przyszłości cyfrowej</li>
                   </ul>
               </article>
                <figure>
                    <img src={human} alt="Opis obrazka" loading="lazy"/>
                </figure>
            </span>
            <article className={`${styles.article_basic} ${styles.article_basic_reverse}`}>
                <header>Nasza wizja na przyszłość</header>
                <ul>
                    <li>Nowe moduły tematyczne</li>
                    <li>Podział na poziomy (podstawowy, średniozaawansowany, zaawansowany) - Wszystko w jednym miejscu,
                        zainteresowana osoba, będzie tutaj mogła zacząć swoją niezwykłą przygodę z AI, ale platforma
                        umożliwi jej także dalszy rozwój.
                    </li>
                    <li>Dodatkowa opcja rejestracji dla nauczycieli, która umożliwi dostęp do materiałów edukacyjnych,
                        rozwiązań i nie tylko.
                    </li>
                </ul>
            </article>
        </main>
    );
}
