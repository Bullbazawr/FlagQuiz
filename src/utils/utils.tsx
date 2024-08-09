
export const removingButtonStyles = (countryButtonEls: NodeListOf<Element>) => {
    countryButtonEls.forEach(button => {
        button.removeAttribute('disabled')
        button.classList.remove('correctBtn', 'wrongBtn')
    })

}

export const endingQuiz = (correctAnswers: number) => {
    alert(`correct answers ${correctAnswers}`)
    return
}