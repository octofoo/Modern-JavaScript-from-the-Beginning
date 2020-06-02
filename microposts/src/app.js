////// IMPORTS

import { http } from "./http";
import { ui } from "./ui";



////// EVENT LISTENERS

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// Submit post
document.getElementById("post-submit").addEventListener("click", submitPost);
// Delete post
document.getElementById("posts-list").addEventListener("click", deletePost);
// Enable edit state
document.getElementById("posts-list").addEventListener("click", enableEditState);
// Cancel edit state
document.getElementById("card-form").addEventListener("click", cancelEditState);



////// FUNCTIONS

// Get posts
function getPosts() {
    http.get("http://localhost:3000/posts")
        .then(data => ui.showPosts(data))
        .catch(error => console.log(error));
}

// Submit post
function submitPost() {
    // UI variables
    const title = document.getElementById("title-input").value;
    const body = document.getElementById("body-input").value;
    const id = document.getElementById("id").value;
    // create data object
    const data = {
        title,
        body,
    }
    // check if input not empty
    if (data.title === "" || data.body === "") {
        ui.showAlert("Please fill both title and body.", "alert alert-warning");
    } else {
        if (id === "") {
            // add post
            // make POST request
            http.post("http://localhost:3000/posts", data)
                .then(data => {
                    ui.showAlert("Post added.", "alert alert-success");
                    ui.clearInput();
                    getPosts();
                })
                .catch(error => console.log(error));
        } else {
            // update post
            // make PUT request
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert("Post updated.", "alert alert-success");
                    ui.changeState("add");
                    getPosts();
                })
                .catch(error => console.log(error));
        }
    }
}

// Delete post
function deletePost(eventObject) {
    // check if the delete button was pressed
    if (eventObject.target.parentElement.classList.contains("delete")) {
        // get post ID
        const id = eventObject.target.parentElement.dataset.id;
        if (confirm("Are you sure you want to delete this post?")) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert("Post deleted.", "alert alert-danger");
                    getPosts();
                })
                .catch(error => console.log(error));
        }
    }
    // prevent default behaviour
    eventObject.preventDefault();
}

// Enable edit state
function enableEditState(eventObject) {
    // check if the edit button was pressed
    if (eventObject.target.parentElement.classList.contains("edit")) {
        // get post ID
        const id = eventObject.target.parentElement.dataset.id;
        // get post title
        const title = eventObject.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        // get post body
        const body = eventObject.target.parentElement.previousElementSibling.textContent;
        // put all into data object
        const data = {
            id,
            title,
            body,
        }
        // fill input fields
        ui.fillInput(data);
    }
    // prevent default behaviour
    eventObject.preventDefault();
}

// Cancel edit state
function cancelEditState(eventObject) {
    // check if the cancel button was pressed
    if (eventObject.target.classList.contains("cancel")) {
        ui.changeState("add");
    }
    // prevent default behaviour
    eventObject.preventDefault();
}
