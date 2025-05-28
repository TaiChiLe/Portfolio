'use strict';

// document.querySelector('.message').textContent = 'Correct correctNumber!';
// document.querySelector('.correctNumber').textContent = 13;
// document.querySelector('.score').textContent = 8;
// document.querySelector('.guess').value = 2;
let correctNumber = Math.trunc(Math.random() * 20) + 1;
let guessNumber = 0;
let score = 20;
let highScore = 0;

console.log('Correct Number: ' + correctNumber);
document.querySelector('.check').addEventListener('click', function () {
  guessNumber = Number(document.querySelector('.guess').value);
  console.log('Guessed Number ' + guessNumber);
  if (!guessNumber) {
    document.querySelector('.message').textContent = 'No number!';
  } else if (guessNumber > correctNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You Lost!';
      document.body.style.backgroundColor = 'red';
      document.querySelector('.score').textContent = 0;
    }
  } else if (guessNumber < correctNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You Lost!';
      document.body.style.backgroundColor = 'red';
      document.querySelector('.score').textContent = 0;
    }
  } else {
    document.querySelector('.message').textContent = 'Correct!';
    document.querySelector('.number').textContent = correctNumber;
    if (score > highScore) {
      document.querySelector('.highscore').textContent = score;
      highScore = score;
    }
    document.body.style.backgroundColor = 'green';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  console.log('Test');
  correctNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.body.style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
});



///////////////////////////////////////
// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/
