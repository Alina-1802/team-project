import "/assets/styles/global.css";
import {ReactNode} from "react";
import Nav from "@components/nav/Nav.tsx";
import clsx from "clsx";

type Props = {
    children: ReactNode;
    center?: boolean;
}

export default function LayoutDefault({children, center = true}: Props) {
    return (
        <div className={clsx("main_container", center && "center")}>
            <Nav/>
            {children}
            <footer></footer>
        </div>
    );
}
