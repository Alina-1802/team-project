import "/assets/styles/global.css";
import {ReactNode} from "react";
import Nav from "@components/nav/Nav";
import {AppProvider} from "@components/app-provider/AppProvider.tsx";

export default function LayoutDefault({children}: { children: ReactNode }) {

    return (
        <AppProvider>
            <div className="main_container">
                <Nav/>
                {children}
                <footer/>
            </div>
        </AppProvider>
    );
}
