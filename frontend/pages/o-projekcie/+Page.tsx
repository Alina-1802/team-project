import styles from "./style.module.css";

export default function Page() {

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
          <article className={styles.box}>
            <header>Rozdzał I</header>
              <p>Cel: Zrozumienie podstawowych pojęć i zastosowań AI w codziennym życiu.</p>
              <ul>
                  <li>Co to jest sztuczna inteligencja?</li>
                  <li>Jak maszyny "uczą się"?</li>
                  <li>Roboty i AI – czym się różnią?</li>
              </ul>
          </article>
        </main>
    );
}
