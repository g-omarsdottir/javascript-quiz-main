// Game variables array, possible choices for playing game
const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
// Variables for user feedback to game status to improve UX.
// Apply method (document.getElementByID) to retrieve references for elements from the DOM 
//  for functions to update the displayed variables in the DOM.
// Using let because the choices and results are dynamic.
let userChoiceElement = document.getElementById("user-choice");
let computerChoiceElement = document.getElementById("computer-choice");
let resultElement = document.getElementById("result");
// Detailled result feedback referencing game rules. Constant variable because game rules are unchangeable.
const winConditions = {
  Rock: { Scissors: "crushes", Lizard: "crushes" },
  Paper: { Rock: "covers", Spock: "disproves" },
  Scissors: { Paper: "cuts", Lizard: "decapitates" },
  Lizard: { Spock: "poisons", Paper: "eats" },
  Spock: { Scissors: "smashes", Rock: "vaporizes" }
};

// Scoreboard variables for functions to increment scores and display updated scores in the DOM
// Default scores at game start are 0
let userScore = 0;
let userScoreElement = document.getElementById("user-score");
let computerScore = 0;
let computerScoreElement = document.getElementById("computer-score");
 
// Flow of the game: variables for displaying or hiding sections according to logical flow of the game.
let landingSection = document.getElementById("landing-section");
let gameSection = document.getElementById("game-section");
let completedSection = document.getElementById("completed-section");

// Display landing page, hide game section and game completed section as default. Use JavaScript to handle both hiding and displaying for better overview. 
//gameSection.style.display = "none";
//completedSection.style.display = "none";

// Event listeners for choice-buttons - a method to retrieve references for button elements from the DOM (document.getElementByID) and 
//  add button references to event listener method (addEventListeners). 
// When buttons are clicked, the function compareChoices, the game logic, is called.
// The string for each choice button from the array choices is passed as an argument to the function compareChoices.
document.getElementById("rock").addEventListener("click", function () {
    compareChoices("Rock");
  });
  
  document.getElementById("paper").addEventListener("click", function () {
    compareChoices("Paper");
  });
  
  document.getElementById("scissors").addEventListener("click", function () {
    compareChoices("Scissors");
  });
  
  document.getElementById("lizard").addEventListener("click", function () {
    compareChoices("Lizard");
  });
  
  document.getElementById("spock").addEventListener("click", function () {
    compareChoices("Spock");
  });

  // Section for collecting username. To-do: place variables with other variables when code successfully completed.
  //Cache element references for performance
  let usernameInput = document.getElementById("username-input"); // Represents the raw input (temporary) value of input element (subject to change as user types). For initial validation of allowed character limit. Is passed as argument to function displayUsername to store and display in DOM.
  let username = document.getElementById("username"); // Stores the validated username for function displayUsername.
  username.textContent = localStorage.getItem(username); // To display the most recent stored value of username in DOM. To-do: move in function to display message at game completion.

  // Event listener when user clicks button "submit username". To validate username and to trigger the DOM display and storage of the validated username.
  document.getElementById("submit").addEventListener("click", function () {
    if (usernameInput.value.length > 10 || usernameInput.value.length < 1) {
      alert("Please choose a username between 1 and 10 characters.");
      return false; // to prevent submission if username is invalid (more than 10 characters)
      // less than 1 character is handled with the required attribute in the html input field for username.
    } else {
    collectUsername();
    setTimeout(() => {
      playGame();
    }, 500);
  }
  });

// Function for DOM display and manage local storage of collected username in DOM.
function collectUsername() {
  localStorage.setItem(username, usernameInput.value); // To store the username in local storage
}
 
function playGame() {
  //userScorecore: 0;
  //computerScore: 0;
  landingSection.style.display = "none";
  gameCompletion.style.display = "none";
  gameSection.style.display = "block";
  //if (userScore < 11 || computerScore < 11) {
    //completedGame();
}

// Generate random computer choice
function generateComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Functions to increment scores
function incrementUserScore() {
  userScore++;
  updateScoreElement(userScoreElement, userScore);
}

function incrementComputerScore() {
  computerScore++;
  updateScoreElement(computerScoreElement, computerScore);
}

// Function to update the displayed score in the DOM. Using "element" provides flexibility and concise code, updating both user and computer score at once.
function updateScoreElement(element, score) {
  element.innerHTML = score;
  console.log("Score element: " + element);
  console.log("Score value " + score);
}

// Function to update the displayed user and computer choices in the DOM.
function updateChoiceElements(
  userChoiceElement,
  computerChoiceElement,
  userChoice,
  computerChoice
) {
  userChoiceElement.innerHTML = "Your choice:" + "<br>" + userChoice;
  computerChoiceElement.innerHTML =
    "Computer choice:" + "<br>" + computerChoice;
}

// Function to update the displayed game result (win, lose, tie) in the DOM.
function updateResultElement(resultElement, result) {
  resultElement.innerHTML = result;
}

// Functions for actions depending on results of compareChoices, referencing the game rules and displaying the detailled game results  in the DOM.
function userWins(userChoice, computerChoice) {
  incrementUserScore();
  const reason = winConditions[userChoice][computerChoice]; 
  const resultMessageWin = userChoice + " " + reason + " " + computerChoice + "!" + "<br>" + " You win!" ;
  updateResultElement(result, resultMessageWin); 
}

function userTies(userChoice, computerChoice) {
  const resultMessageTie = userChoice + " " + "equals" + " " + computerChoice + "!" + "<br>" + "It's a tie! Everybody wins!"
  updateResultElement(result, resultMessageTie);
}

function userLoses(userChoice, computerChoice) {
  incrementComputerScore();
  const reason = winConditions[computerChoice][userChoice]; // Same as userWins but in switched order.
  const resultMessageLose = computerChoice + " " + reason + " " + userChoice + "!" + "<br>" + " You lose!";
  updateResultElement(result, resultMessageLose); 
}

// Function to compare choices based on game rules
function compareChoices(userChoice) {
  let computerChoice = generateComputerChoice();
  console.log(computerChoice);
  updateChoiceElements(
    userChoiceElement,
    computerChoiceElement,
    userChoice,
    computerChoice
  );
  if (userChoice === computerChoice) {
    userTies(userChoice, computerChoice);
  } else if (
    (userChoice === "Rock" &&
      (computerChoice === "Scissors" || computerChoice === "Lizard")) ||
    (userChoice === "Paper" &&
      (computerChoice === "Rock" || computerChoice === "Spock")) ||
    (userChoice === "Scissors" &&
      (computerChoice === "Paper" || computerChoice === "Lizard")) ||
    (userChoice === "Lizard" &&
      (computerChoice === "Paper" || computerChoice === "Spock")) ||
    (userChoice === "Spock" &&
      (computerChoice === "Scissors" || computerChoice === "Rock"))
  ) {
    userWins(userChoice, computerChoice);
  } else {
    userLoses(userChoice, computerChoice);
  }
}

// To-do
let finalResultMessage = document.getElementById("final-result");
let finalScore = document.getElementById("final-score");

function completedGame() {
  if (userScoreElement === 10) {
    landingSection.style.display = "none";
    gameSection.style.display = "none";
  gameCompletion.style.display = "block";
    finalScore = "Your score: " + score;
    finalResultMessage = "Congratulations, " + [username] + ", you win!"
  } else {
    finalScore = "Your score: " + score;
    finalResultMessage = "Too bad, " + [username] + ", you lost this time around." + "<br>" + "Better luck next time!"
  }
  console.log("playGame");
}

// const resultMessageWin = userChoice + " " + reason + " " + computerChoice + "!" + "<br>" + " You win!" ;
/*

function updateFinalResultElement 

function updateResultElement(resultElement, result) {
  resultElement.innerHTML = result;
}
let resultElement = document.getElementById("result");
 // Event listener for play again button
  document.getElementById("play-again").addEventListener("click", function () {
    playGame();
  });
*/
/*
function congratulations() {
  userLost.style.display = "none";
  updateScoreElement(userScoreElement);
}

function consolation() {
  userWon.style.display = "none";
}
*/
