

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
var timerCount;

let questionCtr = 0;

let quizQuestions = [
    {
        question: "funny monkey is",
        answer1:"A.) poopy",
        answer2:"B.) stinky",
        answer3:"C.) Donkey Kong",
        answer4:"D.) Funky Monkey Friday",
        correctAnswer: "Donkey Kong"
    }, 
    
    {
        question: "aaaaaaaaaaaaaaaaaaa",
        answer1:"sssssssssssss",
        answer2:"ssssssssssssss",
        answer3:"sssssssssssssssss",
        answer4:"ssssssssssssssss",
        correctAnswer: ""
    }
]


// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
  renderMessage();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer()
}

// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;

  }, 1000);
}


// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

function renderMessage() 
{
    // questionIndex will determine which question object to ask the user 
    let questionIndex = Math.floor(Math.random() * 2);

    // Grabs the a random quiz question object made on line 33
    var quiz = quizQuestions[questionIndex];

    // grabs variables from the object from the quizQuestions
    // At this moment a quiz question and corresponding answers are loaded into the variables in lines
    // 155 -159
    var quizQues = quiz.question;
    var quizAnswer1 = quiz.answer1;
    var quizAnswer2 = quiz.answer2;
    var quizAnswer3 = quiz.answer3;
    var quizAnswer4 = quiz.answer4;

    if (quizQues !== null) 
    {
        document.querySelector(".question").textContent = quizQues;
        document.getElementById("answer1").textContent = quizAnswer1;
        document.getElementById("answer2").textContent = quizAnswer2;
        document.getElementById("answer3").textContent = quizAnswer3;
        document.getElementById("answer4").textContent = quizAnswer4;
    }
 }

function nextQuestion()
{
    renderMessage();
}




  
// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// when answering the question user will be brought to the next question in the quiz
btn1.addEventListener("click", nextQuestion);
btn2.addEventListener("click", nextQuestion);
btn3.addEventListener("click", nextQuestion);
btn4.addEventListener("click", nextQuestion);

