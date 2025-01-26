import "/assets/styles/global.css";
import {ReactNode} from "react";
import Nav from "@components/nav/Nav.tsx";
import clsx from "clsx";

type Props = {
    children: ReactNode;
    center?: boolean;
    activeRoute?: string;
}

export default function LayoutDefault({children, center = true, activeRoute}: Props) {
    return (
        <div className={clsx("main_container", center && "center")}>
            <Nav activeRoute={activeRoute}/>
            {children}
            <footer></footer>
        </div>
    );
}
