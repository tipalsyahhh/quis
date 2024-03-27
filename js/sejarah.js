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
        submitQuiz(); // Panggil fungsi submitQuiz jika semua pertanyaan telah dijawab
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
        let correctAnswer = getCorrectAnswer(i); // Panggil fungsi untuk mendapatkan jawaban yang benar
        if (selectedAnswer === correctAnswer) {
            correctAnswers++;
        }
    }

    // Skor dihitung dengan mengalikan jumlah jawaban yang benar dengan nilai per jawaban yang benar
    let score = correctAnswers * 20; // Misalnya, setiap jawaban yang benar bernilai 20 poin

    // Tampilkan skor dalam elemen HTML dengan ID "scoreDisplay"
    let scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerHTML = "Quiz submitted! Your score: " + score + "/100";

    // Tampilkan modal setelah menampilkan skor
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
    return null; // Kembalikan null jika tidak ada jawaban yang dipilih
}

// Fungsi untuk mendapatkan jawaban yang benar berdasarkan nomor pertanyaan
function getCorrectAnswer(questionNumber) {
    // Isilah dengan logika untuk mengembalikan jawaban yang benar sesuai nomor pertanyaan
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
