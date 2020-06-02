////// CONFIGURATION
let minimum = 1;
let maximum = 10;
let target = getRandomNumber(minimum, maximum);
let tries = 3;

////// UI VARIABLES
const guesser = document.getElementById('#guesser');
const minimumNumber = document.getElementById('#minimumNumber');
const maximumNumber = document.getElementById('#maximumNumber');
const guessInput = document.getElementById('#guessInput');
const guessButton = document.getElementById('#guessButton');
const output = document.getElementById('#output');

////// EVENTS

// Evaluate guess
guessButton.addEventListener('click', evaluateGuess);

////// TOOLS

// Display output
function displayOutput(message, type) {
  // display message
  output.textContent = message;
  // color input field and message
  switch (type) {
    case 'win':
      guessInput.style.color = 'white';
      guessInput.style.borderColor = 'green';
      guessInput.style.backgroundColor = 'green';
      output.style.color = 'green';
      break;
    case 'wrong':
      guessInput.style.color = 'orange';
      guessInput.style.borderColor = 'orange';
      guessInput.style.backgroundColor = 'white';
      output.style.color = 'orange';
      break;
    case 'lose':
      guessInput.style.color = 'white';
      guessInput.style.borderColor = 'red';
      guessInput.style.backgroundColor = 'red';
      output.style.color = 'red';
      break;
  }
}

// Clear input
function clearInput() {
  guessInput.value = '';
}

// Disable input
function disableInput() {
  guessInput.disabled = true;
}

// Play again
function playAgain() {
  // change button label
  guessButton.value = 'play again';
  // change button action to reload page
  guessButton.addEventListener('click', function () {
    // reload page
    window.location.reload();
  });
}

////// FUNCTIONS

// Get random number
function getRandomNumber(minimumValue, maximumValue) {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

// Evaluate guess
function evaluateGuess() {
  // variables
  let guess = parseInt(guessInput.value);
  // validate
  if (isNaN(guess) || guess < minimum || guess > maximum) {
    // display error
    displayOutput(
      `Please enter a number between ${minimum} and ${maximum}.`,
      'wrong'
    );
    // clear input
    clearInput();
  } else {
    // evaluate
    if (guess === target) {
      // win
      // display win
      displayOutput(`You have won! The correct number was ${target}!`, 'win');
      // disable input
      disableInput();
      // play again
      playAgain();
    } else {
      // take away one try
      tries -= 1;
      // evaluate again
      if (tries > 0) {
        // wrong
        // display continue
        displayOutput(
          `Incorrect guess, you have ${tries} more tries.`,
          'wrong'
        );
        // clear input
        clearInput();
      } else {
        // lose
        // display lose
        displayOutput(`You died! The correct number was ${target}!`, 'lose');
        // disable input
        disableInput();
        // play again
        playAgain();
      }
    }
  }
}

// Display minimum and maximum values in UI
minimumNumber.textContent = minimum;
maximumNumber.textContent = maximum;
