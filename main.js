const maxNum = 100;

const startGameBtn = document.querySelector("#start-game");
const gameSection = document.querySelector("#game");
const gameForm = document.querySelector("#game-form");
const evaluation = document.querySelector("#evaluation");
let rndNumber;

document.addEventListener("click", (e) => {
  if (e.target.id == "start-game") {
    startGame();
    e.preventDefault();
  }
});

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputField = document.querySelector("#guess");
  handleGuess(inputField.value);
});

function startGame() {
  rndNumber = getRandom(maxNum);
  console.log(rndNumber);

  startGameBtn.classList.toggle("hidden");
  gameSection.classList.toggle("hidden");
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function handleGuess(guess) {
  console.log(guess);
  rndNumber == guess ? handleCorrect() : handleIncorrect();
}

function handleCorrect() {
  evaluation.classList.add("correct");
  evaluation.classList.remove("incorrect");

  evaluation.innerHTML = "Gratuluji! Uhodl jsi.";
}

function handleIncorrect(guess) {
  evaluation.classList.remove("correct");
  evaluation.classList.add("incorrect");

  let message = guess < rndNumber ? "Moc nízko!" : "Moc vysoko!";
  evaluation.innerHTML = message;
}
