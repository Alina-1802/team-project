import axios from "@helpers/axios.ts";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {ApiException} from "@type/ApiException.ts";
import {AxiosResponse} from "axios";
import {ApiResponse} from "@type/ApiResponse.ts";

export type SaveScorePayload = {
    quiz_id: string,
    scored_points: string,
    date: string,
}

export type SaveScoreException = ApiException<SaveScorePayload, ApiResponse<SaveScoreResponse>>

export type SaveScoreResponse = {}

type Options = Omit<UseMutationOptions<SaveScoreResponse, SaveScoreException, SaveScorePayload>, 'mutationFn'>

export default function useSaveScoreMutation(options: Options) {``
    return useMutation<SaveScoreResponse, SaveScoreException, SaveScorePayload>({
        mutationFn: async (payload) => {
            const {data}: AxiosResponse<ApiResponse<SaveScoreResponse>> = await axios.post('/store-quiz-result', payload)

            if (data.success)
                return data.data

            throw new ApiException(payload, data)
        },
        ...options
    })
}
