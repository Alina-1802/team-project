import styles from "./style.module.css";
import clsx from "clsx";
import {useState} from "react";
import useLoginMutation, {LoginException, LoginPayload, LoginResponse} from "./hooks/useLoginMutation.ts";
import useRegisterMutation, {RegisterException, RegisterPayload, RegisterResponse} from "./hooks/useRegisterMutation.ts";
import useAppContext from "@hooks/useAppContext.ts";
import useIsLogged from "@hooks/useIsLogged.ts";
import {navigate} from "vike/client/router";
import Routes from "@type/Routes.ts";
import {useIsClient} from "@hooks/useIsClient.ts";

export default function Page() {
    const isLogged = useIsLogged()
    const isClient = useIsClient()
    const {setValue} = useAppContext()
    const [isRight, setIsRight] = useState(false)
    const [loginActive, setLoginActive] = useState(true)
    const [registerActive, setRegisterActive] = useState(false)
    const [forgotActive, setForgotActive] = useState(false)

    const [message, setMessage] = useState<MessageType | null>(null)

    const onSuccessLogin = (result: LoginResponse, payload: LoginPayload) => {
        console.log('login success', result)
        if (!result?.token) {
            setMessage({type: 'error', message: 'Nieprawidłowe dane'})
            return
        }
        setValue('email', payload.email)
        setValue('token', result.token)
        navigate(Routes.LEKCJA)
    }
    const onErrorLogin = (data: LoginException) => {
        console.log('login error', data)
        setMessage({type: 'error', message: 'Nieprawidłowe dane'})
    }
    const onSuccessRegister = (result: RegisterResponse, payload: RegisterPayload) => {
        console.log('register success', result, payload)
        setMessage({type: 'success', message: 'Zarejestrowano pomyślnie'})
    }
    const onErrorRegister = (data: RegisterException) => {
        console.log('register error', data.response.message)
        setMessage({type: 'error', message: 'Wystąpił błąd, spróbuj ponownie później'})
    }

    const loginMutation = useLoginMutation({onSuccess: onSuccessLogin, onError: onErrorLogin});
    const registerMutation = useRegisterMutation({onSuccess: onSuccessRegister, onError: onErrorRegister});

    const onClickLogin = (e: any) => {
        e.preventDefault();
        setMessage(null)
        const form = e.target;
        const login = form.login.value;
        const pass = form.pass.value;
        loginMutation.mutate({email: login, password: pass});
    }
    const onClickRegister = (e: any) => {
        e.preventDefault();
        setMessage(null)
        const form = e.target;
        // const nick = form.nick.value;
        const email = form.email.value;
        const pass = form.pass_reg.value;
        if (pass !== form.pass_repeat.value) {
            setMessage({type: 'error', message: 'Hasła muszą być takie same'})
            return
        }
        registerMutation.mutate({email: email, password: pass});
    }

    const onClickChangePanelRegister = () => {
        setIsRight(true);
        setLoginActive(prev => !prev);
        setRegisterActive(prev => !prev);
        setMessage(null)
    }
    const onClickForgotPassword = () => {
        setIsRight(true);
        setLoginActive(prev => !prev);
        setForgotActive(prev => !prev);
        setMessage(null)
    }
    const onClickChangePanelRegisterBack = () => {
        setIsRight(false);
        setLoginActive(prev => !prev);
        setRegisterActive(false);
        setForgotActive(false);
        setMessage(null)
    }

    const emailRegex = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$"

    const loginDisabled = loginMutation.isSuccess
    const registerDisabled = registerMutation.isSuccess

    if (isLogged && isClient) {
        return (
            <main style={{textAlign: 'center'}}>
                a co tu jeszcze robisz, zalogowany jesteś<br/>
                <a href={Routes.LEKCJA}>przejdź do lekcji</a>
            </main>
        )
    }

    return (
        <main className={styles.main_login_box}>
            <section className={styles.background_box_login}>
                <article className={clsx(styles.panel_login_register, isRight && styles.isRight)}>
                    <div className={clsx(styles.login, loginActive && styles.active)}>
                        <h1>Zaloguj się</h1>
                        <form className={styles.login_form} onSubmit={onClickLogin}>
                            <label htmlFor="login">Login</label>
                            <input type="text" placeholder="login" name="login" id="login" required/>
                            <label htmlFor="pass">Hasło</label>
                            <input type="password" placeholder="hasło" name="pass" id="pass" minLength={8}
                                   required/>
                            <div className={styles.button_block}>
                                <input type="submit" value="Zaloguj" className={styles.login_button}/>
                                <input type="button" value="Zarestruj sie" onClick={onClickChangePanelRegister}
                                       className={styles.register_button}/>
                            </div>
                            <Message message={message}/>
                        </form>
                    </div>
                    <div className={clsx(styles.register, registerActive && styles.active)}>
                        <h1>Zarejestruj się</h1>
                        <form className={styles.register_form} onSubmit={onClickRegister}>
                            {/*<label htmlFor="nick">Nick</label>*/}
                            {/*<input type="text" placeholder="nick" name="nick" id="nick" required/>*/}
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="email" name="email" id="email"
                                   pattern={emailRegex} required
                                   disabled={registerDisabled}/>
                            <div className={styles.register_password_block}>
                                <div>
                                    <label htmlFor="pass_reg">Hasło</label>
                                    <input type="password" placeholder="hasło" name="pass_reg" id="pass_reg"
                                           minLength={8} required disabled={registerDisabled}/>
                                </div>
                                <div>
                                    <label htmlFor="pass_repeat">Powtórz hasło</label>
                                    <input type="password" placeholder="powtórz hasło" name="pass_repeat"
                                           id="pass_repeat"
                                           minLength={8} required disabled={registerDisabled}/>
                                </div>
                            </div>
                            {/*<label htmlFor="voivodeship">Wybierz województwo:</label>*/}
                            {/*<select id="voivodeship" name="voivodeship" required defaultValue={''}>*/}
                            {/*    <option value="" disabled>Wybierz...</option>*/}
                            {/*    <option value="dolnoslaskie">Dolnośląskie</option>*/}
                            {/*    <option value="kujawsko-pomorskie">Kujawsko-Pomorskie</option>*/}
                            {/*    <option value="lubelskie">Lubelskie</option>*/}
                            {/*    <option value="lubuskie">Lubuskie</option>*/}
                            {/*    <option value="lodzkie">Łódzkie</option>*/}
                            {/*    <option value="malopolskie">Małopolskie</option>*/}
                            {/*    <option value="mazowieckie">Mazowieckie</option>*/}
                            {/*    <option value="opolskie">Opolskie</option>*/}
                            {/*    <option value="podkarpackie">Podkarpackie</option>*/}
                            {/*    <option value="podlaskie">Podlaskie</option>*/}
                            {/*    <option value="pomorskie">Pomorskie</option>*/}
                            {/*    <option value="slaskie">Śląskie</option>*/}
                            {/*    <option value="swietokrzyskie">Świętokrzyskie</option>*/}
                            {/*    <option value="warminsko-mazurskie">Warmińsko-Mazurskie</option>*/}
                            {/*    <option value="wielkopolskie">Wielkopolskie</option>*/}
                            {/*    <option value="zachodniopomorskie">Zachodniopomorskie</option>*/}
                            {/*</select>*/}
                            <div className={styles.checxbox_box}>
                                <label>
                                    <input type="checkbox" name="politic" value="politic" required
                                           disabled={registerDisabled}/>
                                    Oświadczam, że zapoznałem się z polityką prywatności niniejszego serwisu.
                                </label>
                                <label>
                                    <input type="checkbox" name="agreement" value="agreement" required
                                           disabled={registerDisabled}/>
                                    Akceptuje regulamin platformy.
                                </label>
                            </div>

                            <div className={styles.button_block}>
                                <input type="submit" value="Zarestruj sie" className={styles.login_button}
                                       disabled={registerDisabled}/>
                            </div>
                            <Message message={message}/>
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
                                   pattern={emailRegex} required/>
                            <div className={styles.button_block}>
                                <input type="submit" value="Odzyskaj Konto" className={styles.login_button}/>
                            </div>
                            <Message message={message}/>
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
            </section>
        </main>
    );
}

type MessageType = {
    type: 'success' | 'error',
    message: string
}

function Message({message}: { message: MessageType | null }) {

    if (!message) return null

    return (
        <div
            className={clsx(styles.button_block, message.type === 'error' && styles.error, message.type === 'success' && styles.success)}>
            {message.type === 'success' ? (
                <>
                    <p>Udało się!</p>
                    <p>{message.message}</p>
                </>
            ) : (
                <>
                    <p>Ups! Coś poszło nie tak</p>
                    <p>{message.message}</p>
                </>
            )}
        </div>
    )
}