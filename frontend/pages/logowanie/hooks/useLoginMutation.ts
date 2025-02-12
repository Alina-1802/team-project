import axios from "@helpers/axios.ts";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {ApiException} from "@type/ApiException.ts";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@type/ApiResponse.ts";

export type LoginPayload = {
    email: string,
    password: string,
}

export type LoginException = ApiException<LoginPayload, ApiResponse<LoginResponse>>

export type LoginResponse = {
    token: string,
}
type Options = Omit<UseMutationOptions<LoginResponse, LoginException, LoginPayload>, 'mutationFn'>

export default function useLoginMutation(options: Options) {
    return useMutation<LoginResponse, LoginException, LoginPayload>({
        mutationFn: async (payload) => {
            const {data}: AxiosResponse<ApiResponse<LoginResponse>> = await axios.post('/login', payload)

            if (data.success)
                return data.data

            throw new ApiException(payload, data)
        },
        ...options
    })
}
