import { useQuery } from "@tanstack/react-query"
import questionService from "../services/question.service"
import { DifficultyType } from '../interfaces/app.interface'

export const useQuestions = (difficulty: DifficultyType) => {
    return useQuery({
        queryKey: ['questions'],
        queryFn: () => {
            if (difficulty === 'Easy') {
                return questionService.getAllQuestions()
            } else {
                return questionService.getAllHardQuestions()
            }
        },
        select: ({ data }) => data
    })
}