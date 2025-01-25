import Axios from "axios";

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        common: {

        } as any,
    },
})

export default axios
