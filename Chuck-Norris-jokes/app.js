// UI VARIABLES
document.getElementById("getJokesButton").addEventListener("click", getJokes);

// FUNCTIONS
function getJokes(eventObject) {
    // get input
    const numberOfJokes = document.getElementById("numberOfJokesInput").value;
    // instantiate XHR object
    const xhr = new XMLHttpRequest();
    // create request
    xhr.open("GET", `http://api.icndb.com/jokes/random/${numberOfJokes}`);
    // send request
    xhr.send();
    // use requested data
    xhr.onload = function () {
        // check if OK
        if (this.status === 200) {
            // put response into constant
            const response = JSON.parse(this.responseText);
            // initialize empty variable
            let output = "";
            // process response into list
            if (response.type === "success") {
                // loop through response
                response.value.forEach(function (item) {
                    // append each joke to output variable
                    output += `<li>${item.joke}</li>`;
                });
                // put output into list
                document.getElementById("jokesListOutput").innerHTML = output;
            } else {
                // append error to list 
                jokesListOutput += "<li>There's been an error.</li>";
            }
        }
    };
    // prevent default behaviour of form button
    eventObject.preventDefault();
}