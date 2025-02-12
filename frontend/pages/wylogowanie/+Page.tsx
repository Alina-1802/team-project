import {useEffect, useRef, useState} from "react";
import useAppContext from "@hooks/useAppContext.ts";
import {navigate} from "vike/client/router";

export default function Page() {
    const {setValue} = useAppContext()
    const timeout = useRef<any>()
    const [remainingTime, setRemainingTime] = useState(5)

    useEffect(() => {
        setValue('token', undefined)
        setValue('email', undefined)

        timeout.current = setInterval(() => {
            setRemainingTime(prev => prev - 1)
        }, 1000)

        return () => {
            clearTimeout(timeout.current)
        }
    }, []);

    useEffect(() => {
        if (remainingTime <= 0) {
            navigate('/')
        }
    }, [remainingTime])

    return (
        <main style={{textAlign: 'center'}}>
            dziękujemy, zostałeś wylogowany<br/>
            zostaniesz przekierowany na stronę główną za {remainingTime} sekund
        </main>
    )
}