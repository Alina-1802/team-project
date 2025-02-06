import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {ContextState, defaultState, StateUpdater} from "@type/Context.ts";
import {AppContext} from '@hooks/useAppContext';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import useAppContext from "@hooks/useAppContext.ts";
import axios from "@helpers/axios.ts";

export function AppProvider({children}: { children: ReactNode }) {
    const initial = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('appState') || '{}') : null;
    const [_state, _setState] = useState<ContextState>(initial || defaultState);
    const queryClient = new QueryClient()

    const functions = useMemo(() => ({
        setState: (update: ContextState | StateUpdater) =>
            _setState(prev => typeof update === 'function' ? update(prev) : update),
        setValue: <K extends keyof ContextState>(key: K, value: ContextState[K]) =>
            _setState(prev => ({...prev, [key]: value})),
        // getValue: <K extends keyof ContextState>(key: K): ContextState[K] => _state?.[key],
        reset: () => _setState(defaultState)
    }), [_setState])
    // console.log('state',_state)

    const setAuthorizationHeader = (token?: string) => {
        if(token)
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        else
            delete axios.defaults.headers['Authorization'];
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedState = localStorage.getItem('appState');
            if (!!storedState && storedState !== JSON.stringify(_state)) {
                const parsedState = JSON.parse(storedState)
                setAuthorizationHeader(parsedState.token)
                _setState(parsedState)
            }
        }
    }, [typeof window !== 'undefined'])

    useEffect(() => {
        setAuthorizationHeader(_state.token)
        const stringified = JSON.stringify(_state);
        if (typeof window !== 'undefined' && localStorage.getItem('appState') !== stringified) {
            // console.log('state update', _state)
            localStorage.setItem('appState', stringified);
        }
    }, [_state]);

    return (
        <AppContext.Provider value={{state: _state, ...functions, getValue}}>
            <ClearStorageHandler>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ClearStorageHandler>
        </AppContext.Provider>
    );
}

function ClearStorageHandler({children}: { children: ReactNode }) {
    const {reset} = useAppContext()
    useEffect(() => {
        console.log('hash', window.location.hash)
        if (typeof window !== 'undefined' && window.location.hash === '#clearStorage') {
            reset()
            window.location.hash = '';
        }
    }, [globalThis?.window?.location?.hash]);
    return children
}

function getValue<K extends keyof ContextState>(key: K): ContextState[K] {
    const {state} = useAppContext();
    return useMemo(() => state?.[key], [state?.[key]]);
}