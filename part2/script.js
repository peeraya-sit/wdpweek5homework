let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  clearOptions();
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.question;
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  const correct = questions[currentQuestionIndex].answer;
  if (selectedIndex === correct) {
    score++;
  }
  nextBtn.disabled = false;
  Array.from(optionsContainer.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.backgroundColor = "#a4edba";
    if (i === selectedIndex && i !== correct) btn.style.backgroundColor = "#f5a3a3";
  });
}

function clearOptions() {
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-box").innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
}
