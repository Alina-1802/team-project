export type ContextState = {
    token?: string;
    email?: string;
};

export const defaultState: ContextState = {
    token: undefined,
    email: undefined,
};

export type StateUpdater = (prevState: ContextState) => ContextState;

export type ContextType = {
    state: ContextState
    setState: (update: ContextState | StateUpdater) => void
    setValue: <K extends keyof ContextState>(key: K, value: ContextState[K]) => void
    getValue: <K extends keyof ContextState>(key: K) => ContextState[K]
    reset: () => void
};