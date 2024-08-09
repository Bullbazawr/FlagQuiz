import axios from "axios"
import { IQuestion } from "../interfaces/app.interface"

class QuestionService {
    private URL = 'http://localhost:3000'

    async getAllQuestions() {
        return axios.get<IQuestion[]>(`${this.URL}/questions`)
    }

    async getQuestionById(id: string) {
        return axios.get<IQuestion>(`${this.URL}/${id}`)
    }
    async getAllHardQuestions() {
        return axios.get<IQuestion[]>(`${this.URL}/hardQuestions`)
    }

    async getHardQuestionById(id: string) {
        return axios.get<IQuestion>(`${this.URL}/hardQuestions/${id}`)
    }
}


export default new QuestionService()