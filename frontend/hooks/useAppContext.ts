import {createContext, useContext} from "react";
import {ContextType} from "@type/Context.ts";

export const AppContext = createContext<ContextType | undefined>(undefined);

export default (): ContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
