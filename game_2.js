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
    question: "Que batalha foi travada entre D. Afonso Henriques e D. Teresa?",
    choice1: "Batalha da Independência",
    choice2: "Batalha de Mamede",
    choice3: "Batalha de Ourique",
    choice4: "Batalha de Vilafrancada",
    answer: 2
  },
  {
    question:"Que rei teve o cognome O Desejado?",
    choice1: "Dom João II",
    choice2: "Dom Pedro IV",
    choice3: "Dom Manuel I",
    choice4: "Dom Sebastião",
    answer: 4
  },
  {
    question: "Em que ano foi dobrado o Cabo da Boa Esperança por Bartolumeu Dias?",
    choice1: "1481",
    choice2: "1485",
    choice3: "1492",
    choice4: "1488",
    answer: 4
  },
    {
    question:"Em que profissão se destacau Pêro da Covilha ao serviço de Dom João II?",
    choice1: "Navegador",
    choice2: "Soldado",
    choice3: "Espião",
    choice4: "Governador do Reino",
    answer: 3
  },
    {
    question: "Quem comandava a frota portuguesas na Batalha de Diu?",
    choice1: "Dom Manuel I",
    choice2: "Afonso de Albuquerque",
    choice3: "Duarte Pacheco Pereira",
    choice4: "Dom Francisco de Almeida",
    answer: 4
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
    question: "Em que ano nasceu Portugal?",
    choice1: "1118",
    choice2: "1125",
    choice3: "1143",
    choice4: "1198",
    answer: 3
  },
         {
    question:"Qual foi o tratado que reconheceu a independência do Condado Portucalense?",
    choice1: "Tratado de Sevilha",
    choice2: "Tratado de Zamora",
    choice3: "Tratado de Madrid",
    choice4: "Tratado das Cebolas",
    answer: 2
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