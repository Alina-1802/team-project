import "/assets/styles/global.css";
import {ReactNode} from "react";

export default function LayoutDefault({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}
