export const name = "Rishab";

import words from "./words";

function Hangman() {
  this.words = words;
  this.masterWord = "";
  this.guessWord = "";
}

Hangman.prototype.start = function () {
  this.setup();
};

Hangman.prototype.setup = function () {
  const blank = "_";

  this.masterWord = this.words[Math.floor(Math.random() * this.words.length)];
  this.guessWord = "_".repeat(this.masterWord.length);

  console.log("master word => ", this.masterWord);
  console.log("guess word => ", this.guessWord);
};
export default Hangman;
