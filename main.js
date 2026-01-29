const maxNum = 100;

const startGameBtn = document.querySelector("#start-game");

const gameSection = document.querySelector("#game");
const gameForm = document.querySelector("#game-form");
const evaluation = document.querySelector("#evaluation");

const submitBtn = document.querySelector("#submit");
const tryAgainBtn = document.querySelector("#try-again");
let rndNumber;

document.addEventListener("click", (e) => {
  if (e.target.id == "start-game" || e.target.id == "try-again") {
    startGame();
    e.preventDefault();
  }
});

gameForm.addEventListener("submit", (e) => {
  if (e.submitter.id == "submit") {
    e.preventDefault();
    const inputField = document.querySelector("#guess");
    handleGuess(inputField.value);
  }
});

function startGame() {
  rndNumber = getRandom(maxNum);
  console.log(rndNumber);
  resetGame();
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function handleGuess(guess) {
  console.log(guess);
  rndNumber == guess ? handleCorrect() : handleIncorrect();
  evaluation.classList.remove("hidden");
}

function handleCorrect() {
  evaluation.classList.add("correct");
  evaluation.classList.remove("incorrect");

  evaluation.innerHTML = "Gratuluji! Uhodl jsi.";

  submitBtn.classList.toggle("hidden");
  tryAgainBtn.classList.toggle("hidden");
}

function handleIncorrect(guess) {
  evaluation.classList.remove("correct");
  evaluation.classList.add("incorrect");

  let message = guess < rndNumber ? "Moc nízko!" : "Moc vysoko!";
  evaluation.innerHTML = message;
}

function resetGame() {
  startGameBtn.classList.add("hidden");
  gameSection.classList.remove("hidden");

  tryAgainBtn.classList.add("hidden");
  submitBtn.classList.remove("hidden");

  evaluation.classList.add("hidden");
}
