import LayoutDefault from "@components/LayoutDefault.tsx";
import {ReactNode} from "react";
import Routes from "@type/Routes.ts";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <LayoutDefault activeRoute={Routes.INDEX}>
            {children}
        </LayoutDefault>
    )
}