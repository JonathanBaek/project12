$(document).ready(function () {
    const questions = [
        {
            question: "How long is an Olympic swimming pool?",
            answers: [
                { text: "25 meters", correct: false },
                { text: "50 meters", correct: true },
                { text: "10 cm", correct: false },
                { text: "60 feet", correct: false },
            ],
        },
        {
            question: "What is the name of the largest ocean in the world?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true },
                { text: "Southern Ocean", correct: false },
            ],
        },
        {
            question: "What is the rarest M&M color?",
            answers: [
                { text: "Yellow", correct: false },
                { text: "Brown", correct: true },
                { text: "Red", correct: false },
                { text: "Green", correct: false },
            ],
        },
        {
            question: "Which country invented ice cream?",
            answers: [
                { text: "China", correct: true },
                { text: "America", correct: false },
                { text: "Australia", correct: false },
                { text: "Iceland", correct: false },
            ],
        },
        {
            question: "What country has the most natural lakes?",
            answers: [
                { text: "South Korea", correct: false },
                { text: "Ireland", correct: false },
                { text: "Egypt", correct: false },
                { text: "Canada", correct: true },
            ],
        },
    ];

   
    const questionElement = $("#question");
    const answerButtons = $("#answer-buttons");
    const nextButton = $("#next-button");
    const feedbackElement = $(".feedback");
    const testResultElement = $(".test-result");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.text("Next");
        showQuestion();
        testResultElement.hide();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        const questionNo = currentQuestionIndex + 1;
        questionElement.html(questionNo + ". " + currentQuestion.question);

        $.each(currentQuestion.answers, function (index, answer) {
            const button = $("<button>")
                .text(answer.text)
                .addClass("button")
                .data("correct", answer.correct)
                .on("click", function () { selectAnswer($(this)); });

            answerButtons.append(button);
        });
    }

    function resetState() {
        feedbackElement.text("");
        answerButtons.empty();
        nextButton.hide();
    }

    function selectAnswer(selectedBtn) {
        const isCorrect = selectedBtn.data("correct") === true;

        if (isCorrect) {
            selectedBtn.addClass("correct");
            score++;
            showMessage("Correct!");
        } else {
            selectedBtn.addClass("incorrect");
            showMessage("Incorrect!");
        }

        answerButtons.find("button").prop("disabled", true);
        nextButton.show();
    }

    function showMessage(message) {
        feedbackElement.text(message);
    }

    function showScore() {
        resetState();
        questionElement.hide();
        testResultElement.html(`<p>You scored ${score} out of ${questions.length}!</p><button id="play-again-button" class="button">Play Again</button>`);
        
        $("#play-again-button").on("click", function () {
            questionElement.show();
            testResultElement.hide();
            startQuiz();
        });

        testResultElement.show();
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    nextButton.on("click", function () {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

    startQuiz();
});