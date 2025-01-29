import axios from "@helpers/axios.ts";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {ApiException} from "@type/ApiException.ts";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@type/ApiResponse.ts";

export type RegisterPayload = {
    username: string,
    password: string,
}

export type RegisterResponse = {}
export type RegisterApiResponse = ApiResponse<RegisterResponse>

export type RegisterException = ApiException<RegisterPayload, ApiResponse<RegisterResponse>>

type Options = Omit<UseMutationOptions<RegisterResponse, RegisterException, RegisterPayload>, 'mutationFn'>

export default function useRegisterMutation(options?: Options) {
    return useMutation<RegisterResponse, RegisterException, RegisterPayload>({
        mutationFn: async (payload) => {
            const {data}: AxiosResponse<ApiResponse<RegisterResponse>> = await axios.post('/register', payload)

            if(data.success) {
                return data.data
            }

            throw new ApiException(payload, data)
        },
        ...options
    })
}