const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Quem ficou conhecido na História de Portugal como “Santo Condestável”?",
    choice1: "Dom Pedro I",
    choice2: "Dom Manuel I",
    choice3: "Dom Afonso V",
    choice4: "Dom Nuno Álvares Pereira",
    answer: 4
  },
  {
    question:
      "O Cardeal-Rei Dom Henrique e o Rei D. João III eram filhos de...",
    choice1: "Dom João II",
    choice2: "Dom Pedro IV",
    choice3: "Dom Manuel I",
    choice4: "Dom Sebastião",
    answer: 3
  },
  {
    question: "Dom João I foi o primeiro rei da Casa de Avis. Foi casado com:",
    choice1: "D. Filipa de Lencastre",
    choice2: "D. Leonor Teles",
    choice3: "D. MariA de Castela",
    choice4: "D. Isabel de Coimbra",
    answer: 1
  },
    {
    question: "Dom Afonso Henriques foi proclamado Rei de Portugal após que batalha?",
    choice1: "Batallha de Diu",
    choice2: "Batallha de Aljubarrota",
    choice3: "Batallha de Ourique",
    choice4: "Cerco de Lisboa",
    answer: 3
  },
    {
    question: " Quem foi o primeiro rei de Portugal??",
    choice1: "Dom Manuel I",
    choice2: "Dom João VI",
    choice3: "Dom Afonso Henriques",
    choice4: "Dom Afonso V",
    answer: 3
  },
      {
    question: "Em que século foi apresentado o “Auto da Barca do Inferno”, de Gil Vicente?",
    choice1: "Século XIII",
    choice2: "Século XVI",
    choice3: "Século XV",
    choice4: "Século XIII",
    answer: 2
  },
  {
    question: "Quem realizou o filme português “O Pai Tirano”?",
    choice1: "António Lopes Ribeiro",
    choice2: "António Pedro Vasconceles",
    choice3: "Leitão de Barros",
    choice4: "Manoel de Oliveira",
    answer: 1
  },
         {
    question:"Em que nau viajou Vasco da Gama até à Índia?",
    choice1: "Nau Santa Maria",
    choice2: "Navio Escola Sagres",
    choice3: "Nau São Bento",
    choice4: "Nau São Gabriel",
    answer: 4
  }, 
     
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Pergunta ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
