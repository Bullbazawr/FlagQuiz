import { useState } from "react"
import { useQuestions } from "../../hooks/useQuestions"
import { useQueryClient } from "@tanstack/react-query"
import './QuestionStyles.css'
import { IQuestion } from "../../interfaces/app.interface"
import { DifficultyType } from '../../interfaces/app.interface'
import { removingButtonStyles, endingQuiz } from "../../utils/utils"


function Question() {
    const [difficulty, setDifficulty] = useState<DifficultyType>('Easy')
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [currentFlagId, setCurrentFlagId] = useState(0)
    const queryClient = useQueryClient()
    const { data } = useQuestions(difficulty)
    const countryButtonEls = document.querySelectorAll('.coutryButton')
    let question = data?.[currentFlagId]

    const nextQuestion = (e: React.FormEvent) => {
        const lenght: number = (data as IQuestion[]).length
        if (currentFlagId === lenght - 1) {
            endingQuiz(correctAnswers)
        }
        e.preventDefault()
        setCurrentFlagId(currentFlagId + 1)
        queryClient.invalidateQueries()
        removingButtonStyles(countryButtonEls)
    }

    const responseHandler = (e: React.MouseEvent) => {
        const response = e.currentTarget.getAttribute('value')?.toString()
        const correctAnswer = data?.[currentFlagId].country
        if (response === question?.country) {
            setCorrectAnswers(correctAnswers + 1)
            e.currentTarget.classList.add('correctBtn')
        } else if (response !== question?.country) {
            e.currentTarget.classList.add('wrongBtn')
            countryButtonEls.forEach(button =>{
                if(button.getAttribute('value')?.toString() === correctAnswer){
                    button.classList.add('correctBtn')
                }
            })
        }
        countryButtonEls.forEach(button => {
            button.setAttribute('disabled', 'disabled')
        })
    }

    const changeDifficultyHandler = () => {
        setDifficulty(difficulty === 'Easy' ? 'Hard' : 'Easy')
        setTimeout(() => {
            queryClient.invalidateQueries()
        }, 10)
    }
    return (
        <>
            <h2>{difficulty}</h2>
            <img className="question__img" src={question?.src} alt="flag" />
            <div className="coutryButtons__box">
                <button className="coutryButton" onClick={responseHandler} value={question?.optionOne}>{question?.optionOne}</button>
                <button className="coutryButton" onClick={responseHandler} value={question?.optionTwo}>{question?.optionTwo}</button>
                <button className="coutryButton" onClick={responseHandler} value={question?.optionThree}>{question?.optionThree}</button>
                <button className="coutryButton" onClick={responseHandler} value={question?.optionFour}>{question?.optionFour}</button>
            </div>
            <form onSubmit={nextQuestion}>
                <button className="nextBtn">
                    Next Flag
                </button>
            </form>
            <button className="ChangingDifficulty" onClick={changeDifficultyHandler}>Change the difficulty  </button>
        </>
    )
}

export default Question