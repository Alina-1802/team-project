import "/assets/styles/global.css";
import {ReactNode} from "react";
import Nav from "@components/nav/Nav";

export default function LayoutDefault({ children }: { children: ReactNode }) {
    return (
        <div className="main_container">
            <Nav/>
            {children}
            <footer/>
        </div>
    );
}
