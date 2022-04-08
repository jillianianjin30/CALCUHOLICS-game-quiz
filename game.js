const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: "What is the limit as x approaches 0 of the function 5x divided by x^2 + 2x?",
        choice1: '2/5',
        choice2: '7/3',
        choice3: '5/2',
        choice4: '3/7',
        answer: 3,
    },
    {
        question: "What is the limit as x approaches 2 of the function x^2 + 3x - 10 divided by x - 2?",
        choice1: "7",
        choice2: "8",
        choice3: "6",
        choice4: "3",
        answer: 1,
    },
    {
        question: "What is the limit as x approaches 3 of the function x^2 - 9 divided by x - 3?",
        choice1: "10",
        choice2: "7",
        choice3: "11",
        choice4: "6",
        answer: 4,
    },
    {
        question: "What is the limit as x approaches 2 of the function x^3 - 8 divided by x - 2?",
        choice1: "12",
        choice2: "16",
        choice3: "20",
        choice4: "24",
        answer: 1,
    },
    {
        question: "What is the limit as x approaches 4 of the function 4 - x divided by x^2 - 16?",
        choice1: "2/9",
        choice2: "-1/8",
        choice3: "8/3",
        choice4: "-3/7",
        answer: 2,
    },
    {
        question: "What is the limit as x approaches 4 of the function x^2 - x - 12 divided by x^2 + x - 20?",
        choice1: "9/7",
        choice2: "7/9",
        choice3: "8/3",
        choice4: "3/8",
        answer: 2,
    },
    {
        question: "What is the limit as x approaches -1 of the function 2x^2 - x -3 divided by x + 1?",
        choice1: "8",
        choice2: "-7",
        choice3: "9",
        choice4: "-5",
        answer: 4,
    },
    {
        question: "Find the derivatives of: y = 9x^7 - 5x^5 + 3x^3 - 5x + 3",
        choice1: "63x^6 - 25x^4 + 9x^2 - 5",
        choice2: "66x^6 - 23x^4 + 6x^2 - 9",
        choice3: "62x^6 - 26x^4 + 7x^2 - 6",
        choice4: "64x^6 - 22x^4 + 8x^2 - 7",
        answer: 1,
    },
    {
        question: "Find the derivatives of: y = 4x^5 - 2x^6 + 9x^2",
        choice1: "-13x^5 + 10x^4 + 28x",
        choice2: "12x^5 - 16x^4 + 14x",
        choice3: "-12x^5 + 20x^4 + 18x",
        choice4: "16x^5 + 22x^4 - 18x",
        answer: 3,
    },
    {
        question: "Find the derivatives of: y = 3x^5 + 6x^2 + 9x",
        choice1: "12x^4 - 14x + 8",
        choice2: "15x^4 + 12x + 9",
        choice3: "14x^4 + 16x - 6",
        choice4: "11x^4 - 13x - 7",
        answer: 2,
    },
    {
        question: "Find the derivatives of: y = (6x - 4) (3x + 5)",
        choice1: "38x - 12",
        choice2: "33x + 14",
        choice3: "34x - 16",
        choice4: "36x + 18",
        answer: 4,
    },
    {
        question: "Find the derivatives of: y = (6x^2 - 11x + 2) (3x^2 - 6)",
        choice1: "72x^3 - 27x^2 - 60x + 18",
        choice2: "77x^3 + 29x^2 - 21x + 8",
        choice3: "73x^3 - 17x^2 - 10x + 38",
        choice4: "75x^3 - 37x^2 - 80x + 98",
        answer: 1,
    },
    {
        question: "Find the derivatives of: y = -6x + 4",
        choice1: "-9",
        choice2: "4",
        choice3: "-6",
        choice4: "8",
        answer: 3,
    },
    {
        question: "Find the derivatives of: y = (6x - 3)^2",
        choice1: "56x + 19",
        choice2: "72x - 36",
        choice3: "53x + 27",
        choice4: "77x - 42",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 14

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()