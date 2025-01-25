import LayoutDefault from "@components/LayoutDefault.tsx";
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <LayoutDefault center={false}>
            {children}
        </LayoutDefault>
    )
}