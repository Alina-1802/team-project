import styles from "./style.module.css";
import clsx from "clsx";
import {useRef, useState} from "react";
import Nav from "@components/nav/Nav";

export default function Page() {
    const [isRight, setIsRight] = useState(false)
    const [loginActive, setLoginActive] = useState(true)
    const [registerActive, setRegisterActive] = useState(false)
    const [forgotActive, setForgotActive] = useState(false)

    const onClickChangePanelRegister = () => {
        setIsRight(true);
        setLoginActive(prev => !prev);
        setRegisterActive(prev => !prev);
    }
    const onClickForgotPassword = () => {
        setIsRight(true);
        setLoginActive(prev => !prev);
        setForgotActive(prev => !prev);
    }
    const onClickChangePanelRegisterBack = () => {
        setIsRight(false);
        setLoginActive(prev => !prev);
        setRegisterActive(false);
        setForgotActive(false);
    }

    return (
        <>
            <main className={styles.main_login_box}>
                <article className={styles.background_box_login}>
                    <article className={clsx(styles.panel_login_register, isRight && styles.isRight)}>
                        <div className={clsx(styles.login, loginActive && styles.active)}>
                            <h1>Zaloguj się</h1>
                            <form action="#" className={styles.login_form}>
                                <label htmlFor="login">Login</label>
                                <input type="text" placeholder="login" name="login" id="login" required/>
                                <label htmlFor="pass">Hasło</label>
                                <input type="password" placeholder="hasło" name="pass" id="pass" minLength={8}
                                       required/>
                                <div className={styles.button_block}>
                                    <input type="submit" value="Zaloguj" className={styles.login_button}/>
                                    <input type="submit" value="Zarestruj sie" className={styles.register_button}/>
                                </div>
                            </form>

                        </div>
                        <div className={clsx(styles.register, registerActive && styles.active)}>
                            <h1>Zarejestruj się</h1>
                            <form action="#" className={styles.register_form}>
                                <label htmlFor="nick">Nick</label>
                                <input type="text" placeholder="nick" name="nick" id="nick" required/>
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="email" name="email" id="email"
                                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                                <div className={styles.register_password_block}>
                                    <div>
                                        <label htmlFor="pass_reg">Hasło</label>
                                        <input type="password" placeholder="hasło" name="pass" id="pass_reg"
                                               minLength={8} required/>
                                    </div>
                                    <div>
                                        <label htmlFor="pass_repeat">Powtórz hasło</label>
                                        <input type="password" placeholder="powtórz hasło" name="pass" id="pass_repeat"
                                               minLength={8} required/>
                                    </div>
                                </div>
                                <label htmlFor="voivodeship">Wybierz województwo:</label>
                                <select id="voivodeship" name="voivodeship" required defaultValue={''}>
                                    <option value="" disabled>Wybierz...</option>
                                    <option value="dolnoslaskie">Dolnośląskie</option>
                                    <option value="kujawsko-pomorskie">Kujawsko-Pomorskie</option>
                                    <option value="lubelskie">Lubelskie</option>
                                    <option value="lubuskie">Lubuskie</option>
                                    <option value="lodzkie">Łódzkie</option>
                                    <option value="malopolskie">Małopolskie</option>
                                    <option value="mazowieckie">Mazowieckie</option>
                                    <option value="opolskie">Opolskie</option>
                                    <option value="podkarpackie">Podkarpackie</option>
                                    <option value="podlaskie">Podlaskie</option>
                                    <option value="pomorskie">Pomorskie</option>
                                    <option value="slaskie">Śląskie</option>
                                    <option value="swietokrzyskie">Świętokrzyskie</option>
                                    <option value="warminsko-mazurskie">Warmińsko-Mazurskie</option>
                                    <option value="wielkopolskie">Wielkopolskie</option>
                                    <option value="zachodniopomorskie">Zachodniopomorskie</option>
                                </select>
                                <div className={styles.checxbox_box}>
                                    <label>
                                        <input type="checkbox" name="politic" value="politic" required/>
                                        Oświadczam, że zapoznałem się z polityką prywatności niniejszego serwisu.
                                    </label>
                                    <label>
                                        <input type="checkbox" name="agreement" value="agreement" required/>
                                        Akceptuje regulamin platformy.
                                    </label>
                                </div>

                                <div className={styles.button_block}>
                                    <input type="submit" value="Zarestruj sie" className={styles.login_button}/>
                                </div>
                            </form>
                        </div>
                        <div className={clsx(styles.forgot_password, forgotActive && styles.active)}>
                            <h1>Nie pamietasz hasła ?</h1>
                            <label className={styles.small_text_forgot}>nic nie szkodzi podaj swojego emaila a my
                                wyślemy ci
                                wiadomość która pozwoli ci odzyskać konto :D</label>
                            <form action="#" className={styles.forgot_password_form}>
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="email" name="email"
                                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                                <div className={styles.button_block}>
                                    <input type="submit" value="Odzyskaj Konto" className={styles.login_button}/>
                                </div>
                            </form>

                        </div>
                    </article>
                    <article className={styles.button_on_left}>
                        <label>Gotowe ?</label>
                        <button onClick={onClickChangePanelRegisterBack}>Zaloguj się</button>

                    </article>
                    <article className={styles.button_on_right}>
                        <button onClick={onClickChangePanelRegister}>Zarejestruj się</button>
                        <button onClick={onClickForgotPassword}>Odzyskaj hasło</button>
                    </article>
                </article>

            </main>
        </>
    );
}