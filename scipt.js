
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

let win = document.querySelector(".win");
let timerElement = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");
let resetBtn = document.querySelector(".reset")
let totalCrt = document.querySelector(".totalCrt");
let quizLength = document.querySelector(".quizTotal");
let intailsGrade = document.querySelector(".intials-grade");
let saveButton = document.querySelector(".submit");

let answerResult = document.getElementById("result");
let displayQuiz = document.getElementById("displayQuiz");
let displayHeader = document.getElementById("quizHeader");
let quizComplete = document.getElementById("completed");
let highscore = document.getElementById("highscore");

let btn1 = document.getElementById("answer1");
let btn2 = document.getElementById("answer2");
let btn3 = document.getElementById("answer3");
let btn4 = document.getElementById("answer4");

// Theses will be the timer
let timer;
let quickTimer;

let quickTimerCtr = 12;
let timerCount = 120;

let correctCtr = 0;
let quesCtr = 0;
let correct;

// An Array of objects: quizQuestions will contain the questions 
// Follow the format of the objects to load more queztions 
let quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    questionNum: 1,
    answer1: "A.) <javascript>",
    answer2: "B.) <js>",
    answer3: "C.) <src>",
    answer4: "D.) <script>",
    correctAnswer: "D"
  },
  {
    question: "What is the type of variable data declare below const data=[ ]" ,
    questionNum: 2,
    answer1: "A.) Array",
    answer2: "B.) Object",
    answer3: "C.) String",
    answer4: "D.) none of these",
    correctAnswer: "A"
  },
  {
    question: "Which of the following will write the message “Hello DataFlair!” in an alert box? ",
    questionNum: 3,
    answer1: "A.) alertBox(“Hello DataFlair!”);",
    answer2: "B.) alert(Hello DataFlair!);",
    answer3: "C.) msgAlert(“Hello DataFlair!”);",
    answer4: "D.) alert(“Hello DataFlair!”);",
    correctAnswer: "D"
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    questionNum: 4,
    answer1: "A.) getElementById()",
    answer2: "B.) getElementsByClassName()",
    answer3: "C.) A & D",
    answer4: "D.) None",
    correctAnswer: "C"
  },
  {
    question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    questionNum: 5,
    answer1: "A.) last()",
    answer2: "B.) put()",
    answer3: "C.) push()",
    answer4: "D.) None",
    correctAnswer: "C"
  },
  {
    question: "Which of the following function of String object returns the calling string value converted to lower case?",
    questionNum: 6,
    answer1: "A.) toLocaleLowerCase()",
    answer2: "B.) toLowerCase()",
    answer3: "C.) toString()",
    answer4: "D.) substring()",
    correctAnswer: "B"
  }
]

// The setTimer function starts and stops the timer 
// This timer is displayed to the user when start button is pressed
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;

    // displaying how much time the user has left in the test
    timerElement.textContent = timerCount;

    // Tests if time has run out we want to terminate the quiz 
    //  and stop the timer
    if (timerCount <= 0) {
      // Clears interval
      quizOver();
      clearInterval(timer);
    } 
    // set in Nanoseconds
  }, 1000);
}

// This timer will be used to adjust how long 
// I want the result message to be displayed
function fastTimer() {
  quickTimer = setInterval(function () {
    quickTimerCtr--;

    // if quickTimerCtr is greater than 0 then show result
    showResult();

    //  if quickTimer is less than or equal to 0 then hide the result 
    if (quickTimerCtr <= 0) {
      // Clears interval
      hideResult();
      clearInterval(quickTimer);
    }
    // set in Nanoseconds
  }, 100);
}


function quizOver() {

  // we want only show that user has finished the quiz so we need to hide the body and 
  // header and display the section which has been hiden till this point where quizOver is called
  hideQuizBody();
  hideHeader();
  showQuizComplete();
  totalCrt.textContent = correctCtr;
  quizLength.textContent = quizQuestions.length;
  saveLastGrade();
}

// Many of these functions contain the same logic of either hidding or reveal
// their associated HTML elements 

function hideHighscore() {
  highscore.style.display = "none";
}

function showHighscore() {
  highscore.style.display = "block";
}

function hideQuizComplete() {
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

// More for demo: you can just agument the display through setting it 
// Don't always have to declare a element
function showQuiz() {
  document.getElementById("visibleQuiz").style.display = "block";
}

function hideQuiz() {
  document.getElementById("visibleQuiz").style.display = "none";
}

function showResult() {
  answerResult.style.display = "inherit";
}

function hideResult() {
  answerResult.style.display = "none";
}

// The init function is called when the page loads 
// Hide sections which aren't needed but are visible on start 
function init() {
  hideQuiz();
  hideQuizComplete();
  hideHighscore();
}

// The startGame function is called when the start button is clicked
function startGame() {
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;

  // once start button is pressed, startgame is called and game begins, 
  // questions are rendered on screen
  showQuiz();
  renderMessage();
  startTimer()
}

function setCorrectCtr() {
  // Incriments the counter when called and updates the win's
  // textContent to equal correctCtr
  correctCtr++;
  win.textContent = correctCtr;
}

function setCounter() {
  // incriments the questions answered, incorrect or correct 
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

function nextQuestion() {

  // This script determines the quiz to terminate when the code reaches the last element within the 
  // quizQuestions array of objects 
  setCounter();

  if (quesCtr == quizQuestions.length) 
    quizOver();

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

function resetGame() {
  location.reload();
}

// Calls init() so that it fires when page opened
init();

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

