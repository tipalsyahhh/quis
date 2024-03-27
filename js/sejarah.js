let currentSection = 1;
function prevSection() {
    if (currentSection > 1) {
        currentSection--;
        showSection(currentSection);
    }
}

function nextSection() {
    let sections = document.querySelectorAll(".soal section");
    if (currentSection < sections.length && validateSection(currentSection)) {
        currentSection++;
        showSection(currentSection);
    } else if (currentSection === sections.length && validateSection(currentSection)) {
        submitQuiz();
    } else {
        alert("Please answer the question before proceeding.");
    }
}

function showSection(n) {
    let sections = document.querySelectorAll(".soal section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    sections[n - 1].style.display = "block";
    if (n === 1) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === sections.length) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

function validateSection(n) {
    let sectionId = `section${n}`;
    let radioButtons = document.querySelectorAll(`#${sectionId} input[type='radio']`);
    let isChecked = false;
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            isChecked = true;
            break;
        }
    }
    return isChecked;
}
function submitQuiz() {
    let sections = document.querySelectorAll(".soal section");
    let totalQuestions = sections.length;
    let correctAnswers = 0;

    for (let i = 0; i < sections.length; i++) {
        let sectionId = `section${i + 1}`;
        let selectedAnswer = getSelectedAnswer(sectionId);
        let correctAnswer = getCorrectAnswer(i);
        if (selectedAnswer === correctAnswer) {
            correctAnswers++;
        }
    }
    let score = correctAnswers * 20;
    let scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerHTML = "Your score: " + score + "/100";
    let modal = document.getElementById("scoreModal");
    modal.style.display = "block";
}
function getSelectedAnswer(sectionId) {
    let radioButtons = document.querySelectorAll(`#${sectionId} input[type='radio']`);
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
    return null;
}
function getCorrectAnswer(questionNumber) {
    switch (questionNumber) {
        case 0:
            return "a";
        case 1:
            return "c";
        case 2:
            return "d";
        case 3:
            return "a";
        case 4:
            return "a";
    }
}

showSection(currentSection);

let timerInterval;
function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "Time's up!";
            submitQuiz();
        }
    }, 1000);
}
window.onload = function () {
    let fiveMinutes = 60 * 5;
    let display = document.getElementById("timer");
    startTimer(fiveMinutes, display);
};

