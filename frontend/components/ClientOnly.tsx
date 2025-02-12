import {ReactNode} from "react";
import {useIsClient} from "@hooks/useIsClient.ts";

export default function ClientOnly(props: { children: ReactNode }) {
    const isClient = useIsClient()
    return isClient ? props.children : null
}