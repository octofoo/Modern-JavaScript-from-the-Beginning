////// UI VARIABLES

// Name
const uiName = document.getElementById("name");
// Zipcode
const uiZipcode = document.getElementById("zipcode");
// Email
const uiEmail = document.getElementById("email");
// Phone Number
const uiPhoneNumber = document.getElementById("phone-number");



////// EVENT LISTENERS

// Name
uiName.addEventListener("blur", validateName);
// Zipcode
uiZipcode.addEventListener("blur", validateZipcode);
// Email
uiEmail.addEventListener("blur", validateEmail);
// Phone Number
uiPhoneNumber.addEventListener("blur", validatePhoneNumber);



////// FUNCTIONS

// Validate Name
function validateName() {
    // regular expression
    const regularExpression = /^[a-zA-Z]{2,10}$/;
    // test input value
    if (regularExpression.test(uiName.value)) {
        // if valid remove alert class
        uiName.classList.remove("is-invalid");
    } else {
        // else add alert class
        uiName.classList.add("is-invalid");
    }
}

// Validate Zipcode
function validateZipcode() {
    // regular expression
    const regularExpression = /^[0-9]{3}\s[0-9]{2}$/;
    // test input value
    if (regularExpression.test(uiZipcode.value)) {
        // if valid remove alert class
        uiZipcode.classList.remove("is-invalid");
    } else {
        // else add alert class
        uiZipcode.classList.add("is-invalid");
    }
}

// Validate Email
function validateEmail() {
    // regular expression
    const regularExpression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.[a-zA-z\.]{2,10}$/;
    // test input value
    if (regularExpression.test(uiEmail.value)) {
        // if valid remove alert class
        uiEmail.classList.remove("is-invalid");
    } else {
        // else add alert class
        uiEmail.classList.add("is-invalid");
    }
}

// Validate Phone Number
function validatePhoneNumber() {
    // regular expression
    const regularExpression = /^(\+420\s?)?([0-9]{3}\s?){2}([0-9]{3})$/;
    // test input value
    if (regularExpression.test(uiPhoneNumber.value)) {
        // if valid remove alert class
        uiPhoneNumber.classList.remove("is-invalid");
    } else {
        // else add alert class
        uiPhoneNumber.classList.add("is-invalid");
    }
}
