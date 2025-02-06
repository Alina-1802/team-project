import axios from "@helpers/axios.ts";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {ApiException} from "@type/ApiException.ts";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@type/ApiResponse.ts";

export type UserPayload = {}

export type UserException = ApiException<UserPayload, ApiResponse<UserResponse>>

export type UserResponse = {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
}
type Options = Omit<UseQueryOptions<UserResponse, UserException>, 'queryFn' | 'queryKey'> & UserPayload

export default function useUserQuery(options: Options) {
    return useQuery<UserResponse, UserException>({
        queryKey: ['get-user'],
        queryFn: async () => {
            const {data}: AxiosResponse<ApiResponse<UserResponse>> = await axios.get('/get-user')

            if (data.success)
                return data.data

            throw new ApiException(null, data)
        },
        refetchOnWindowFocus: false,
        ...options
    })
}
