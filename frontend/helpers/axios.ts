import Axios from "axios";

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

axios.interceptors.request.use((config) => {
    if (config.headers.Authorization) return config
    const state = localStorage.getItem('appState')
    const token = state ? JSON.parse(state).token : null
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

export default axios
