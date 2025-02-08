import React from "react";
import {usePageContext} from "vike-react/usePageContext";

export default function Page() {
    const {is404} = usePageContext();
    if (is404) {
        return (
            <main style={{textAlign: 'center'}}>
                <h1>404</h1>
                <p>ta strona nie istnieje</p>
            </main>
        );
    }
    return (
        <main style={{textAlign: 'center'}}>
            <h1>500</h1>
            <p>oj nie dobrze, wystąpił błąd serwera, spróbuj ponownie później</p>
        </main>
    );
}
