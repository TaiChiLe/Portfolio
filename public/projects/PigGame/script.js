'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let diceRoll = 1;
let player0Score = 0;
let player1Score = 0;
let playing = false;

const init = () => {
    player0Score = 0;
    player1Score = 0;
    diceRoll = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

init();

newBtn.addEventListener('click', function () {
    init();
})

const getActivePlayer = () => {
    const player = document.querySelector('.player--active');
    if (player.classList[1] === 'player--1') {
        return player1;
    } else {
        return player0;
    }
}

getActivePlayer();

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayers = () => {
    const activePlayer = getActivePlayer();
    if (activePlayer.classList[1] === 'player--0') {
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
    } else {
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
    }
}

//When rolls dice
rollBtn.addEventListener('click', function () {
    if (playing) {
        diceRoll = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${diceRoll}.png`;
        diceEl.classList.remove('hidden');
        if (diceRoll === 1) {
            const currentPlayer = getActivePlayer();
            currentPlayer.children[2].children[1].textContent = 0;
            switchPlayers();
        } else {
            const currentPlayer = getActivePlayer();
            currentPlayer.children[2].children[1].textContent = +currentPlayer.children[2].children[1].textContent + diceRoll;
        }
    }
})

holdBtn.addEventListener('click', function () {
    if (diceRoll === 1 || diceRoll === 0) {
        switchPlayers();
    } else {
        const activePlayer = getActivePlayer();
        if (activePlayer.classList[1] === 'player--0') {

            player0Score = +activePlayer.children[2].children[1].textContent + player0Score;
            activePlayer.children[1].textContent = player0Score;
            activePlayer.children[2].children[1].textContent = 0;
            diceRoll = 0;
            switchPlayers();
        } else {
            player1Score = +activePlayer.children[2].children[1].textContent + player1Score;
            activePlayer.children[1].textContent = player1Score;
            activePlayer.children[2].children[1].textContent = 0;
            diceRoll = 0;
            switchPlayers();
        }

        //check if player wins
        if (player0Score >= 100 || player1Score >= 100) {
            activePlayer.classList.add('player--winner');
            playing = false;
        }
    }
})




