let rndNumber;
let numTries;
let triedNums = [];
let history = [];

const maxNum = 100;
const startGameBtn = document.querySelector("#start-game");
const gameSection = document.querySelector("#game");
const gameForm = document.querySelector("#game-form");
const evaluation = document.querySelector("#evaluation");
const submitBtn = document.querySelector("#submit");
const tryAgainBtn = document.querySelector("#try-again");
const guessInput = document.querySelector("#guess");
const historyList = document.querySelector("#history");

loadHistory();

document.addEventListener("click", (e) => {
  if (e.target.id == "start-game" || e.target.id == "try-again") {
    startGame();
    e.preventDefault();
  }
});

gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.submitter.id == "submit") {
    const inputField = document.querySelector("#guess");
    handleGuess(inputField.value);
  }
});

function startGame() {
  rndNumber = getRandom(maxNum);
  console.log("Tajné číslo:", rndNumber);
  resetGame();
}

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

function handleGuess(guess) {
  if (!guess || guess.trim() === "") {
    evaluation.innerHTML = "Prosím zadejte číslo!";
    evaluation.classList.remove("hidden", "correct");
    evaluation.classList.add("incorrect");
    guessInput.style.border = "2px solid red";
    return;
  }

  guessInput.style.border = "";
  const guessNum = parseInt(guess);

  console.log("Hádám:", guessNum);
  numTries++;
  triedNums.push(guessNum);

  if (rndNumber == guessNum) {
    handleCorrect();
  } else {
    handleIncorrect(guessNum);
  }

  evaluation.classList.remove("hidden");
  guessInput.value = "";
}

function handleCorrect() {
  evaluation.classList.add("correct");
  evaluation.classList.remove("incorrect");
  evaluation.innerHTML = `Gratuluji! Uhodl jsi číslo ${rndNumber} na ${numTries} pokusů!`;
  submitBtn.classList.add("hidden");
  tryAgainBtn.classList.remove("hidden");
  guessInput.disabled = true;

  history.push({
    tries: numTries,
    answer: rndNumber,
    triedNums: [...triedNums],
  });
  localStorage.setItem("gameHistory", JSON.stringify(history));
  showHistory();
}

function handleIncorrect(guess) {
  evaluation.classList.remove("correct");
  evaluation.classList.add("incorrect");

  const diff = Math.abs(rndNumber - guess);
  let message;

  if (guess < rndNumber) {
    message = "Moc nízko! ";
  } else {
    message = "Moc vysoko! ";
  }

  if (diff <= 10) {
    message += "Přihořívá!";
  } else {
    message += "Samá voda!";
  }

  evaluation.innerHTML = message + ` (Pokus ${numTries})`;
}

function resetGame() {
  numTries = 0;
  triedNums = [];
  startGameBtn.classList.add("hidden");
  gameSection.classList.remove("hidden");
  tryAgainBtn.classList.add("hidden");
  submitBtn.classList.remove("hidden");
  evaluation.classList.add("hidden");
  guessInput.value = "";
  guessInput.disabled = false;
  guessInput.style.border = "";
}

function showHistory() {
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = "<li>Zatím žádné hry</li>";
    return;
  }

  for (let i = history.length - 1; i >= 0; i--) {
    const game = history[i];
    const item = document.createElement("li");
    item.innerHTML = `Hra ${i + 1}: Tajné číslo ${game.answer}, 
                         ${game.tries} pokusů 
                         (Pokusy: ${game.triedNums.join(", ")})`;
    historyList.appendChild(item);
  }
}

function loadHistory() {
  const savedHistory = localStorage.getItem("gameHistory");
  if (savedHistory) {
    history = JSON.parse(savedHistory);
    showHistory();
  } else {
    history = [];
  }
}
