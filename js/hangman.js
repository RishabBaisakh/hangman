export const name = "Rishab";

import words from "./words";

function Hangman() {
  this.words = words;
  this.masterWord = "";
  this.guessWord = "";
  this.numberOfChances = 7;
}

Hangman.prototype.start = function () {
  this.setup();
};

Hangman.prototype.setup = function () {
  this.renderNumberOfChances();
  this.setupGameKeyboard();

  this.masterWord = this.words[
    Math.floor(Math.random() * this.words.length)
  ].toUpperCase();
  this.guessWord = "_".repeat(this.masterWord.length);

  this.renderGuessWord();
};

Hangman.prototype.restart = function () {
  this.masterWord = this.words[
    Math.floor(Math.random() * this.words.length)
  ].toUpperCase();
  this.guessWord = "_".repeat(this.masterWord.length);
  this.numberOfChances = 7;

  this.renderNumberOfChances();
  this.renderGuessWord();
};

Hangman.prototype.renderNumberOfChances = function () {
  const hangman = document.getElementById("hangman");

  if (this.numberOfChances > 0) {
    hangman.innerHTML = this.numberOfChances;
  } else {
    alert("Better luck next time!");
    this.restart();
  }
};

Hangman.prototype.setupGameKeyboard = function () {
  let gameBodyBottom = document.getElementById("gameButtons");

  for (let i = 65; i < 91; i++) {
    let buttonElement = document.createElement("div");
    let buttonValue = document.createTextNode(String.fromCharCode(i));

    buttonElement.id = "button";
    buttonElement.appendChild(buttonValue);
    gameBodyBottom.appendChild(buttonElement);
  }

  this.addButtonEventListener();
};

Hangman.prototype.addButtonEventListener = function () {
  let buttonElements = document.querySelectorAll("#button");

  buttonElements.forEach((element) => {
    element.addEventListener("click", () => {
      this.guessCheck(element.innerHTML);
    });
  });
};

Hangman.prototype.renderGuessWord = function () {
  const guessArea = document.getElementById("guessArea");
  guessArea.innerHTML = this.guessWord;

  console.log("masteword => ", this.masterWord);
};

Hangman.prototype.guessCheck = function (guessLetter) {
  if (this.masterWord.includes(guessLetter)) {
    let indexArray = [];
    indexArray = this.getIndexesOfGuessedLetter(guessLetter, indexArray);
  } else {
    this.renderNumberOfChances(this.numberOfChances--);
  }
};

Hangman.prototype.getIndexesOfGuessedLetter = function (
  guessLetter,
  indexArray,
  index = -1
) {
  index = this.masterWord.indexOf(guessLetter);
  console.log("index =>", index);
};

export default Hangman;
