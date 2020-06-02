// INSTANTIATE OBJECTS
// GitHub
const github = new GitHub;
// UI
const ui = new UI;

// UI VARIABLES
// search input
const searchInput = document.getElementById("searchInput");

// EVENTS
// Search input
searchInput.addEventListener("keyup", (eventObject) => {
    // get input value
    const inputValue = eventObject.target.value;
    // check if input not empty
    if (inputValue !== "") {
        // make call
        github.getUser(inputValue)
            // process answer
            .then(data => {
                // check if found
                if (data.profile.message !== "Not Found") {
                    // show profile
                    ui.showProfile(data.profile);
                    // show repos
                    ui.showRepos(data.repos);
                } else {
                    // clear profile
                    ui.clearProfile();
                    // show error
                    ui.showAlert("User not found", "alert alert-danger");
                }
            })
    } else {
        // clear profile
        ui.clearProfile();
    }
});