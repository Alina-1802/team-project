import axios from "@helpers/axios.ts";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {ApiException} from "@type/ApiException.ts";
import {AxiosResponse} from "axios";

export type LoginPayload = {
    email: string,
    password: string,
}


// todo odkomentować kiedy Bartuś zmieni zwrotkę na tą ujednoliconą
// type R = {
//     token: string,
// } | string
// type Options = Omit<UseMutationOptions<R, ApiException<P, ApiResponse<R>>, P>, 'mutationFn'>
//
// export default function useLoginMutation(options: Options) {
//     return useMutation<R, ApiException<P, ApiResponse<R>>, P>({
//         mutationFn: async (payload) => {
//             const {data}: AxiosResponse<ApiResponse<R>> = await axios.post('/login', payload)
//
//             if(data.success)
//                 return data.data
//
//             throw new ApiException(payload, data)
//         },
//         ...options
//     })
// }


export type LoginResponse = {
    token: string,
} | string

export type LoginException = ApiException<LoginPayload, LoginResponse>

type Options = Omit<UseMutationOptions<LoginResponse, LoginException, LoginPayload>, 'mutationFn'>

export default function useLoginMutation(options?: Options) {
    return useMutation<LoginResponse, LoginException, LoginPayload>({
        mutationFn: async (payload) => {
            const response: AxiosResponse<LoginResponse> = await axios.post('/login', payload)

            if (response.status === 200) {
                return typeof response.data === 'string' ? response.data : response.data.token
            }

            throw new ApiException(payload, response.data)
        },
        ...options
    })
}