let quizData = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High Text Markup Language', correct: false },
            { text: 'Hyper Tabular Markup Language', correct: false },
            { text: 'None of these', correct: false },
        ],
    },
    {
        question: 'Which language runs in a web browser?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'C', correct: false },
            { text: 'Python', correct: false },
            { text: 'JavaScript', correct: true },
        ],
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Central Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Cascading Simple Sheets', correct: false },
            { text: 'Cars SUVs Sailboats', correct: false },
        ],
    },
    {
        question: 'What year was JavaScript launched?',
        answers: [
            { text: '1996', correct: false },
            { text: '1995', correct: true },
            { text: '1994', correct: false },
            { text: 'none of the above', correct: false },
        ],
    },
    {
        question: 'Which tool can you use to ensure code quality?',
        answers: [
            { text: 'Angular', correct: false },
            { text: 'jQuery', correct: false },
            { text: 'RequireJS', correct: false },
            { text: 'ESLint', correct: true },
        ],
    },
];

let score = 0;
let currentQuestionIndex = 0;
let container = document.querySelector('[data-component="container"]');
let questionElement = document.querySelector('[data-component="question"]');
let answerElement = document.querySelector('[data-component="answers"]');
let nav = document.querySelector('[data-component="navigation"]');
let submitBtn = document.querySelector('[data-component="submit"]');
let nextBtn = document.querySelector('[data-component="next"]')
let timer = document.querySelector('[data-component="timer"]');
let selectedAnswers = [];
let time = 0;

let checkAnswer = function (button, answer) {
    //once answer is clicked disable all buttons
    let allBtn = answerElement.querySelectorAll('.btn');

    for (let i = 0; i < allBtn.length; i++) {
        allBtn[i].disabled = true;
    }

    if (answer.correct) {
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-success');
        button.innerHTML += '<i class="bi bi-check-circle-fill ms-2"></i>';
        score++;
    } else {
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-danger');
        button.innerHTML += '<i class="bi bi-exclamation-circle-fill ms-2"></i>';
    }

    //add to array to corresponding question
    selectedAnswers[currentQuestionIndex] = answer;
}

let onNavClick = function (pageIndex) {
    currentQuestionIndex = pageIndex;
    //set all links to inactive
    let allBtns = nav.querySelectorAll('.page-item');
    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove('active');
    }
    renderPage();
}

let renderPage = function () {
    let currentQuestion = quizData[currentQuestionIndex];
    let question = currentQuestion.question;
    let answers = currentQuestion.answers;

    //Display first question
    questionElement.innerHTML = `<span class="fw-bold">Question ${currentQuestionIndex + 1}.</span> ${question}`;

    //clear buttons
    answerElement.innerHTML = '';

    //loop through answers and add button
    for (let i = 0; i < answers.length; i++) {
        let button = document.createElement('button');
        button.textContent = answers[i].text;
        button.classList.add('btn', 'btn-outline-secondary', 'd-block');
        //add event listener to button
        button.addEventListener('click', function () {
            checkAnswer(button, answers[i]);
        })
        answerElement.appendChild(button);
    }

    //sets nav element to blank and render the navigation
    nav.innerHTML = '';
    for (let i = 0; i < quizData.length; i++) {
        let newPageNum = document.createElement('li');
        newPageNum.classList.add('page-item');
        let newPageLink = document.createElement('a');
        newPageLink.innerHTML = i + 1;
        newPageLink.classList.add('page-link');
        newPageLink.addEventListener('click', function () {
            onNavClick(i);
        });
        newPageNum.appendChild(newPageLink);
        nav.appendChild(newPageNum);
    }

    //sets the active page number
    let allBtns = nav.querySelectorAll('.page-item');
    allBtns[currentQuestionIndex].classList.add('active');

    //checks to see if question has been answered
    if (selectedAnswers[currentQuestionIndex]) {
        //select all btns
        let allBtns = answerElement.querySelectorAll('.btn');
        let currentBtn;
        //check to see if its the current btn
        for (let i = 0; i < allBtns.length; i++) {
            if (allBtns[i].innerHTML == selectedAnswers[currentQuestionIndex].text) {
                currentBtn = allBtns[i];
            }
        }
        checkAnswer(currentBtn, selectedAnswers[currentQuestionIndex]);
    }

    //checks whether or not to display submit btn
    if (currentQuestionIndex == quizData.length - 1) {
        submitBtn.classList.remove('d-none');
        nextBtn.classList.add('d-none');
    } else {
        nextBtn.classList.remove('d-none');
        submitBtn.classList.add('d-none');
    }

}

let calcTimer = function (time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    const formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(remainingSeconds);
    return formattedTime;
}

//When next btn is pressed get next question
let nextQuestion = function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        renderPage();
    } else {
        container.innerHTML = '';
        let completionTime = calcTimer(time);
        container.innerHTML = `<h2>Quiz Completed!</h2><div class="alert alert-primary mt-2">Your score is<span class="fw-bold"> ${score} / ${quizData.length}</span></div><div class="alert alert-secondary">Your test time is <strong>${completionTime}</strong></div>`;
    }
}

//When prev btn is pressed get previous page
let prevQuestion = function () {
    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = 0;
    } else {
        renderPage();
    }
}
renderPage();

//initiate timer variable
let timerInterval;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

//function to update timer and display timer
function updateTimer() {
    time++;
    timer.innerHTML = calcTimer(time);
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

startTimer();