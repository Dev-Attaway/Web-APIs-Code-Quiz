

// Requirements
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score


var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

let answerResult = document.getElementById("result");
let displayQuiz = document.getElementById("displayQuiz");
let displayHeader = document.getElementById("quizHeader");
let quizComplete = document.getElementById("completed");
let highscore = document.getElementById("highscore");

let resetBtn = document.querySelector(".reset")
let totalCrt = document.querySelector(".totalCrt");
let quizLength = document.querySelector(".quizTotal");
let intailsGrade = document.querySelector(".intials-grade");
let saveButton = document.querySelector(".submit")
let btn1 = document.getElementById("answer1");
let btn2 = document.getElementById("answer2");
let btn3 = document.getElementById("answer3");
let btn4 = document.getElementById("answer4");


var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;


let quickTimer;
let quickTimerCtr = 10;

let timerCount = 100;
let correctCtr = 0;
let quesCtr = 0;
let correct;

let quizQuestions = [
  {
    question: "funny monkey is",
    questionNum: 1,
    answer1: "A.) poopy",
    answer2: "B.) stinky",
    answer3: "C.) Donkey Kong",
    answer4: "D.) Funky Monkey Friday",
    correctAnswer: "D"
  },

  {
    question: "funny monkey is",
    questionNum: 2,
    answer1: "A.) poopy",
    answer2: "B.) stinky",
    answer3: "C.) Donkey Kong",
    answer4: "D.) Funky Monkey Friday",
    correctAnswer: "D"
  },

  {
    question: "funny monkey is",
    questionNum: 3,
    answer1: "A.) poopy",
    answer2: "B.) stinky",
    answer3: "C.) Donkey Kong",
    answer4: "D.) Funky Monkey Friday",
    correctAnswer: "D"
  },

  {
    question: "funny monkey is",
    questionNum: 4,
    answer1: "A.) poopy",
    answer2: "B.) stinky",
    answer3: "C.) Donkey Kong",
    answer4: "D.) Funky Monkey Friday",
    correctAnswer: "D"
  },
  {
    question: "funny monkey is",
    questionNum: 5,
    answer1: "A.) poopy",
    answer2: "B.) stinky",
    answer3: "C.) Donkey Kong",
    answer4: "D.) Funky Monkey Friday",
    correctAnswer: "D"
  },


  {
    question: "funny monkey is",
    questionNum: 6,
    answer1: "A.) poopy",
    answer2: "B.) stinky",
    answer3: "C.) Donkey Kong",
    answer4: "D.) Funky Monkey Friday",
    correctAnswer: "D"
  }
]


function quizOver() {

  hideQuizBody();
  hideHeader();
  totalCrt.textContent = correctCtr;
  quizLength.textContent = quizQuestions.length;
   saveLastGrade();

}

function hideHighscore()
{
  highscore.style.display = "none";
}

function showHighscore()
{
  highscore.style.display = "block";
}

function hideQuizComplete()
{
  quizComplete.style.display = "none";
}

function showQuizComplete() {
    quizComplete.style.display = "block";

}

function hideQuizBody() {

  displayQuiz.style.display = "none";

}

function hideHeader() {
  displayHeader.style.display = "none";
}

// The init function is called when the page loads 
function init() {
  // getWins();
  // getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;

  // once start button is pressed, startgame is called and game begins, 
  // questions are rendered on screen
  showQuiz();
  renderMessage();
  startTimer()

}

// The setTimer function starts and stops the timer 
// This timer is displayed to the user when start button is pressed
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
    }

  }, 1000);
}

// This timer will be used to adjust how long 
// I want the result message to be displayed
function fastTimer() {
  quickTimer = setInterval(function () {
    quickTimerCtr--;

    // if quickTimerCtr is greater than 10 then show result
    showResult();


    //  if quickTimer is less than or equal to 0 then hid the result 
    if (quickTimerCtr <= 0) {
      // Clears interval
      hideResult();
      clearInterval(quickTimer);
    }

    // set in Nanoseconds
  }, 100);
}

function setCorrectCtr() {
  correctCtr++;
  win.textContent = correctCtr;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

function setCounter() {
  quesCtr++;
}

function renderMessage() {

  // Grabs the a random quiz question object made on line 33
  var quiz = quizQuestions[quesCtr];

  // grabs variables from the object from the quizQuestions
  // At this moment a quiz question and corresponding answers are loaded into the variables in lines
  // 155 -159
  var quizQues = quiz.question;
  var quizNum = quiz.questionNum;
  var quizAnswer1 = quiz.answer1;
  var quizAnswer2 = quiz.answer2;
  var quizAnswer3 = quiz.answer3;
  var quizAnswer4 = quiz.answer4;

  if (quizQues !== null) {
    document.querySelector(".count").textContent = quizNum;
    document.querySelector(".question").textContent = quizQues;
    document.getElementById("answer1").textContent = quizAnswer1;
    document.getElementById("answer2").textContent = quizAnswer2;
    document.getElementById("answer3").textContent = quizAnswer3;
    document.getElementById("answer4").textContent = quizAnswer4;
  }
}

// visible.style.display will inhereit the display characteristic from it's parent

function showQuiz() {
  document.getElementById("visibleQuiz").style.display = "block";
}

//  visible.style.display will hide everything within
// <div class="card results" id="visible">

function hideQuiz() {
  document.getElementById("visibleQuiz").style.display = "none";
}

function showResult() {
  answerResult.style.display = "inherit";
}


function hideResult() {
  answerResult.style.display = "none";
}


function nextQuestion() {
  setCounter();

  if (quesCtr == quizQuestions.length) 
  {
    quizOver();
    showQuizComplete();
  }

  
  else
    renderMessage();
}


function correctAnswer() {
  let quiz = quizQuestions[quesCtr];
  correct = quiz.correctAnswer;
  return correct;
}


function setRsltFail() {
  answerResult.textContent = "Sorry, that was incorrect";
}

function setRsltSuccess() {
  answerResult.textContent = "That is correct, Nice Job";
}


function checkAnswer(answer) {
  correct = quizQuestions[quesCtr].correctAnswer;
  answer = answer[0];

  console.log(answer);
  if (answer === correct) {
    setCorrectCtr();
    setRsltSuccess();
    fastTimer();
    quickTimerCtr = 10;
    nextQuestion();
  }
  else {
    timerCount = timerCount - 5;
    setRsltFail();
    fastTimer();
    quickTimerCtr = 10;
    nextQuestion();
  }


}

function saveLastGrade() {
  // Save related form data as an object
  var grade = {
    initials: intailsGrade.value,
    grade: correctCtr,

  };
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem('grade', JSON.stringify(grade));
}

function renderLastGrade() {
  // Use JSON.parse() to convert text to JavaScript object
  var lastGrade = JSON.parse(localStorage.getItem('grade'));
  // Check if data is returned, if not exit out of the function
  if (lastGrade !== null) {
    document.getElementById('saved-name').innerHTML = lastGrade.initials;
    document.getElementById('saved-grade').innerHTML = lastGrade.grade;
  }
  showHighscore();
}

function resetGame()
{
  location.reload();
}





// Calls init() so that it fires when page opened
init();
hideQuiz();
hideQuizComplete();
hideHighscore();

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Attaches event listener to button
resetBtn.addEventListener("click", resetGame);


saveButton.addEventListener('click', function (event) {
  event.preventDefault();
  saveLastGrade();
  hideQuizComplete();
  renderLastGrade();
});




// these click events will call a function which grabs the text occupying the button pressed by user
// checkAnswer is called and given the  text grabbed by element = event.target;
btn1.addEventListener("click", function (event) {
  var element = event.target;
  var text = element.textContent;

  checkAnswer(text);
});

btn2.addEventListener("click", function (event) {
  var element = event.target;
  var text = element.textContent;

  checkAnswer(text);

});

btn3.addEventListener("click", function (event) {
  var element = event.target;
  var text = element.textContent;

  checkAnswer(text);
});

btn4.addEventListener("click", function (event) {
  var element = event.target;
  var text = element.textContent;

  checkAnswer(text);
});

