import React from "react";
import {usePageContext} from "vike-react/usePageContext";

export default function Page() {
    const {is404} = usePageContext();
    if (is404) {
        return (
            <main style={{textAlign: 'center'}}>
                <h1>404</h1>
                <p>sorcia, ta strona nie istnieje</p>
            </main>
        );
    }
    return (
        <main style={{textAlign: 'center'}}>
            <h1>500</h1>
            <p>ło kurwix, ale poszło źle</p>
        </main>
    );
}
