const startGameBtn = document.querySelector('#start-game')
const gameSection = document.querySelector('#game')
const gameForm = document.querySelector('#game-form')
let rndNumber;

document.addEventListener('click', () => {
    if (event.target.id == 'start-game'){
        startGame();
    }
})

function startGame(){
    rndNumber = Math.random(1, 100);

    startGameBtn.classList.toggle('hidden');
    gameSection.classList.toggle('hidden');
}