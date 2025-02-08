import {useState} from "react";
import styles from "./style.module.css";
import alina from '@assets/img/main/alina.svg';
import pawel from '@assets/img/main/pawel.svg';
import bartek from '@assets/img/main/bartek.svg';
import oula from '@assets/img/main/oula.svg';

type TeamMember = {
    id: number;
    name: string;
    img: string;
    role: string;
    description: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Alina Stec",
        img: alina,
        role: "Lider, Game Developer",
        description: "Tworzy wspaniałe gry, treści edukacyjne oraz pilnuje nas, aby wszystko miało sens."
    },
    {
        id: 2,
        name: "Paweł Knap",
        img: pawel,
        role: "Frontend Developer & Integrator",
        description: "Magik, co zrobił, że wszystko działa, a to przecież największa magia w IT."
    },
    {
        id: 3,
        name: "Bartosz Nowak",
        img: bartek,
        role: "Backend Developer",
        description: "Fan optymalizacji i minimalizmu w kodzie, chętny do podejmowania nowych wyzwań."
    },
    {
        id: 4,
        name: "Aleksandra Piaskowa",
        img: oula,
        role: "UX/UI Designer & Frontend Developer",
        description: "Projektowanie i wdrażanie intuicyjnych interfejsów użytkownika."
    }
];

export default function Page() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    return (
        <main className={styles.main}>
            {selectedMember === null && (
                <>
                    <h1 className={styles.caption}>O nas - zespół AIQuizzHub</h1>
                    <article className={styles.article_basic}>
                        <header>Kim jesteśmy?</header>
                        <p>Jesteśmy zespołem studentów I-go roku studiów magisterskich z Informatyki. Każde z nas ma
                            inne umiejętności i podejście do programowania, mimo tego połączyła nas pasja do tworzenia
                            kreatywnych rozwiązań i chęć stworzenia czegoś, co będzie miało realną wartość.</p>
                    </article>
                    <article className={`${styles.article_basic} ${styles.article_basic_reverse}`}>
                        <header>Jak to się zaczęło?</header>
                        <p>Na początku każdy miał trochę inną wizję na ten projekt, ale szybko okazało się, że nasze
                            różnice uzupełniają się idealnie. Ktoś rzucał pomysłem, a ktoś inny znalazł sposób na jego
                            realizację, a kto inny upewniał się, czy aby na pewno to ma sens. No i tak to się
                            dogadaliśmy i wzięliśmy się do roboty, ze swoimi wzlotami i upadkami, ale razem daliśmy
                            radę.</p>
                    </article>
                </>
            )}

            <figure>
                <figcaption className={styles.caption}>
                    {selectedMember ? selectedMember.name : "Nasz zespół"}
                </figcaption>

                {selectedMember === null ? (
                    <ul className={styles.ul_image}>
                        {teamMembers.map((member) => (
                            <li key={member.id} onClick={() => setSelectedMember(member)}>
                                <a>
                                    <img src={member.img} alt={member.name}/>
                                </a>
                                <p>{member.name}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={styles.member_info}>
                        <img src={selectedMember.img} alt={selectedMember.name}/>
                        <div className={styles.details}>
                            <h2>{selectedMember.role}</h2>
                            <p>{selectedMember.description}</p>
                            <button onClick={() => setSelectedMember(null)}>Powrót</button>
                        </div>
                    </div>
                )}
            </figure>
        </main>
    );
}
