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
    question: "Quem mandou semear o Pinhal de Leiria.",
    choice1: "D. Afonso Henriques",
    choice2: "D. Sancho III",
    choice3: "O Guterres",
    choice4: "D. Dinis",
    answer: 4
  },
  {
    question:"Que povo invadiu a Península Ibérica no ano 711?",
    choice1: "Romanos",
    choice2: "Visigodos",
    choice3: "Mouros",
    choice4: "Lusitanos",
    answer: 3
  },
  {
    question: "A que reino pertencia o Condado Portucalense?",
    choice1: "Portugal e Espanha",
    choice2: "Leão e Castela",
    choice3: "Navarra",
    choice4: "Leão e Catalunha",
    answer: 2
  },
    {
    question:"Em que ano o Papa, através da bula, reconheceu D. Afonso Henriques como rei de Portugal",
    choice1: "1158",
    choice2: "1148",
    choice3: "1143",
    choice4: "1179",
    answer: 4
  },
    {
    question: "Em que ano se deu a Batalha de Ourique?",
    choice1: "1143",
    choice2: "1139",
    choice3: "1185",
    choice4: "1254",
    answer: 2
  },
      {
    question: "Qual o nome do guerreiro lusitano que combateu contra os exércitos romanos?",
    choice1: "Vingador",
    choice2: "Vitorino",
    choice3: "Afonso de Albuquerque",
    choice4: "Viriato",
    answer: 4
  },
  {
    question: "Quem foi o primeiro navegador a dobrar o Cabo das Tormentas?",
    choice1: "Bartolomeu Pestana",
    choice2: "Gil Eanes",
    choice3: "Vasco da Gama",
    choice4: "Bartolomeu Dias",
    answer: 4
  },
         {
    question: "Quem descobriu o Brasil?",
    choice1: "Bartolomeu Dias",
    choice2: "Gonçalo Zarco",
    choice3: "Vasco da Gama",
    choice4: "Pedro Álvares Cabral",
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