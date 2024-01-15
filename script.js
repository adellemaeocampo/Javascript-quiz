// grabs all classes from HTML file
var timer = document.querySelector(".time");
var questionEl = document.querySelector(".quiz-questions");
var answerEl = document.querySelector(".options");
var finScoreEl = document.querySelector(".final-score");
var resultCon = document.querySelector(".result-container");
var initialsInput = document.querySelector(".initials-input");
var submitScoreBtn = document.querySelector(".submit-score-btn");
var highScoresBtn = document.querySelector(".high-scores-btn"); 

//list the questions, possible answers and the correct answer index
var questions = [
    {
        question: "What holds the conditions in if-statements?",
        choices: ["[]", "{}", "()", "<>"],
        correct: 2
    },
    {
        question: "What makes an array?",
        choices: ["wraping the elements in double quotes", "wrapping elements in single quotes", "wrapping elements in round brackets", "wrapping elements in square brackets"],
        correct: 3
    },
    {
        question: "When writing javascript in a HTML file what tag is used?",
        choices: ["<js>", "<script>", "<java>", "<scripting>"],
        correct: 1
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function myFunction()", "function = myFunction()", "function(myFuncation())", "function:myFuncation()"],
        correct: 0
    },
    {
        question: "What are the correct conditionals of a FOR loop",
        choices: ["for (i=0; i<5; i++)", "for(i=0; i<5)", "for (i<5; i++)", "(i++)"],
        correct: 0
    }

]

//initialses needed varibles 
var questionsIndex = 0;
var score = 0;
var timeLeft = 100;
var quizFinished = false;
var timeInterval;

//functions that starts quiz
function startQuiz() {
    makingTimer();
    startQuestions();
}

//function that creates the timer 
function makingTimer() {
    var timeInt = setInterval(function () {
        if (!quizFinished) {
            if (timeLeft > 0) {
                timeLeft--;
                timer.textContent = ("Time: " + timeLeft);
            } else {
                clearInterval(timeInterval);
                ranOutofTime();
            }
        }
    }, 1000);
}

//function that alerts the user if timers run out
function ranOutofTime() {
    alert("ran out of time, refresh page to start again!");
    endQuiz();
}

// functions that starts the round of questions 
function startQuestions() {
    var currentQuestion = questions[questionsIndex];
    questionEl.textContent = currentQuestion.question;

    answerEl.innerHTML ="";
    for (var index = 0; index < currentQuestion.choices.length; index++) {
        var chosen = currentQuestion.choices[index];
        var button = document.createElement("button");
        button.textContent = chosen;
        button.addEventListener("click", createClickHandler(index));
            answerEl.appendChild(button);
    }
        
}

//creates a click event handler for the options
function createClickHandler(index) {
    return function() {
        checkAnswer(index);
    };
}

// Function that checks the selected answer
function checkAnswer(index) {
    var currentQuestion = questions[questionsIndex];

    if(index === currentQuestion.correct) {
        score += 25;
    } else {
        timeLeft -= 10;
    }

    questionsIndex++
    if (questionsIndex < questions.length) {
        startQuestions();
    } else {
        quizFinished = true;
        endQuiz();
    }

}

// Function that ends the quiz
function endQuiz() {
    timeLeft = 0;
    clearInterval(timeInterval);
    timer.textContent = "Time: 0 ";
    resultCon.style.display = "block";
    questionEl.textContent ="";
    answerEl.textContent ="";
    finScoreEl.textContent = "Your Final Score: " + score;
    submitScoreBtn.disabled = false;
}

// Event listener for submitting scores
submitScoreBtn.addEventListener("click", function () {
    if (!quizFinished) {
        alert("Please finish the quiz before submitting your score.");
    } else {
        const initials = initialsInput.value.toUpperCase();
        const scoreData = {
            initials: initials,
            score: score
        };

        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        highScores.push(scoreData);

        highScores.sort((a, b) => b.score - a.score);

        localStorage.setItem("highScores", JSON.stringify(highScores));

        initialsInput.value = "";

        alert("Score saved! High Scores:\n" + JSON.stringify(highScores, null, 2));
    }
});

// Event listener for displaying high scores
highScoresBtn.addEventListener("click", function () {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (highScores.length > 0) {
        alert("High Scores:\n" + JSON.stringify(highScores, null, 2));
    } else {
        alert("No high scores available.");
    }
});

// Event listener for clearing scores
document.querySelector(".clear-scores-btn").addEventListener("click", function () {
    clearScores();
});

// Function to clear high scores
function clearScores() {
    localStorage.removeItem("highScores");
    alert("High scores cleared!");
}

// Starts the quiz
startQuiz();

