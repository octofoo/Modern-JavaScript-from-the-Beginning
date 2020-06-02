////// UI VARIABLES
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
const amountInput = document.querySelector('#amount');
const interestInput = document.querySelector('#interest');
const yearsInput = document.querySelector('#years');
const monthlyPaymentOutput = document.querySelector('#monthly-payment');
const totalPaymentOutput = document.querySelector('#total-payment');
const totalInterestOutput = document.querySelector('#total-interest');


////// TOOLS

// Display
function display(thing, boolean) {
  if(boolean === true) {
    document.querySelector(`#${thing}`).style.display = 'block';
  } else {
    document.querySelector(`#${thing}`).style.display = 'none';
  }
}

// Display error
function displayError(error) {
  // create div
  const div = document.createElement('div');
  // add classes to div
  div.className = 'alert alert-danger';
  // create text node and append to div
  div.appendChild(document.createTextNode(error));
  // insert div before heading
  card.insertBefore(div, heading);
  // remove div after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}


////// FUNCTIONS

// Calculate results
function calculateResults() {
  // variables
  const amount = parseFloat(amountInput.value);
  const interest = parseFloat(interestInput.value) / 100 / 12;
  const payments = parseFloat(yearsInput.value) * 12;
  // compute formula
  const formula = Math.pow(1 + interest, payments);
  // compute monthly payment
  const monthly = (amount * formula * interest) / (formula - 1);
  // check if result is finite
  if(isFinite(monthly)) {
    // display monthly payment
    monthlyPaymentOutput.value = monthly.toFixed(2);
    // display total payment
    totalPaymentOutput.value = (monthly * payments).toFixed(2);
    // display total interest
    totalInterestOutput.value = ((monthly * payments) - amount).toFixed(2);
    // hide spinner
    display('spinner', false);
    // display results
    display('results', true);
  } else {
    // hide spinner and results
    display('spinner', false);
    display('results', false);
    // display error
    displayError('Something went wrong.');
  }
}


////// EVENT LISTENERS

// Define event listeners
function eventListeners() {
  // calculate results
  document.querySelector('#loan-form').addEventListener('submit',
    function(eventObject) {
      // hide results
      display('results', false);
      // show spinner
      display('spinner', true);
      // show delayed results
      setTimeout(calculateResults, 2000);
      // prevent default behaviour of form submit button
      eventObject.preventDefault();
    }
  );
}

// Load event listeners
eventListeners();