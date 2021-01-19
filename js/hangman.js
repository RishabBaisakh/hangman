export const name = "Rishab";

import words from "./words";

function Hangman() {
  this.words = words;
  this.masterWord = "";
  this.guessWord = [];
  this.numberOfChances = 7;
  this.wrongSelections = [];
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
  for (let i = 0; i < this.masterWord.length; i++) this.guessWord[i] = "_";

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
    element.addEventListener("click", () => this.guessCheck(element));
  });
};

Hangman.prototype.renderGuessWord = function () {
  let guessTemplate = "";
  const guessArea = document.getElementById("guessArea");

  for (let i = 0; i < this.guessWord.length; i++)
    guessTemplate += this.guessWord[i];

  guessArea.innerHTML = guessTemplate;
};

Hangman.prototype.guessCheck = function (element) {
  const guessLetter = element.innerHTML;

  if (this.masterWord.includes(guessLetter)) {
    this.replaceGuessedLetter(guessLetter);
  } else {
    if (this.wrongSelections.includes(guessLetter)) {
      return;
    }

    this.renderNumberOfChances(this.numberOfChances--);
    element.style.opacity = "0.5";
    this.wrongSelections.push(guessLetter);
  }
};

Hangman.prototype.replaceGuessedLetter = function (guessLetter) {
  let word = this.masterWord;
  let index = -2;
  let startIndex = 0;

  while (index !== -1) {
    index = word.indexOf(guessLetter, startIndex);
    this.guessWord[index] = guessLetter;

    startIndex = index + 1;
  }
  this.renderGuessWord();
  this.completionCheck();
};

Hangman.prototype.completionCheck = function () {
  if (this.guessWord.filter((letter) => letter === "_").length == 0) {
    setTimeout(() => {
      alert("Yaaay! Congo!");
      this.restart();
    }, 500);
  }
};

export default Hangman;
