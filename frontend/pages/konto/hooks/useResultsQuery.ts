import axios from "@helpers/axios.ts";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {ApiException} from "@type/ApiException.ts";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@type/ApiResponse.ts";

export type ResultsPayload = {
    quiz_id: number,
}

export type ResultsException = ApiException<ResultsPayload, ApiResponse<ResultsResponse>>

export type ResultsResponse = {
    scored_points: number,
    created_at: string,
}[]

type Options = Omit<UseQueryOptions<ResultsResponse, ResultsException>, 'queryFn' | 'queryKey'> & ResultsPayload

export default function useResultsQuery(options: Options) {
    return useQuery<ResultsResponse, ResultsException>({
        queryKey: ['get-quiz-results', options.quiz_id],
        queryFn: async () => {
            const payload = {quiz_id: options.quiz_id}

            const {data}: AxiosResponse<ApiResponse<ResultsResponse>> = await axios.get('/get-quiz-results', {params: payload})

            if (data.success)
                return data.data

            throw new ApiException(payload, data)
        },
        refetchOnWindowFocus: false,
        ...options
    })
}
