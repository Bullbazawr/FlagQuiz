import { useQuery } from "@tanstack/react-query"
import questionService from "../services/question.service"

export const useQuestion = (id: string) => {
    return useQuery({
        queryKey: ['question'],
        queryFn: () => questionService.getQuestionById(id),
        select: ({ data }) => data,
    })
}