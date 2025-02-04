import useAppContext from "@hooks/useAppContext.ts";

export default function useIsLogged() {
    const {getValue} = useAppContext()
    return !!getValue('token')
}