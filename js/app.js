import Hangman, { name } from "./Hangman";

window.onload = () => {
  var hangman = new Hangman();
  console.log("hangman => ", hangman);
  hangman.start();
};
