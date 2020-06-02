class UI {
    constructor() {
        this.post = document.getElementById("posts-list");
        this.titleInput = document.getElementById("title-input");
        this.bodyInput = document.getElementById("body-input");
        this.idInput = document.getElementById("id");
        this.postSubmit = document.getElementById("post-submit");
        this.forState = "add";
    }

    // Show posts
    showPosts(posts) {
        let output = "";
        // loop
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil text-primary"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;
        });
        this.post.innerHTML = output;
    }

    // Show alert
    showAlert(message, classes) {
        this.clearAlert();
        // create alert
        const div = document.createElement("div");
        // add classes
        div.className = classes;
        // add message
        div.innerText = message;
        // get parent
        const container = document.getElementById("posts-container");
        // get post list
        const postsList = document.getElementById("posts-list");
        // insert
        container.insertBefore(div, postsList);
        // clear after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    // Fill input
    fillInput(post) {
        this.titleInput.value = post.title;
        this.bodyInput.value = post.body;
        this.idInput.value = post.id;
        // change state to edit
        this.changeState("edit");
    }

    // Change state
    changeState(state) {
        if (state === "edit") {
            // change submit button
            this.postSubmit.innerText = "Update post";
            this.postSubmit.className = "btn btn-warning btn-block";
            // create cancel button
            const button = document.createElement("button");
            // add classes
            button.className = "cancel btn btn-secondary btn-block";
            // add text
            button.innerText = "Cancel";
            // get container
            const container = document.getElementById("card-form");
            // get point
            const point = document.getElementById("form-end");
            // insert
            container.insertBefore(button, point);
        } else {
            // change submit button
            this.postSubmit.innerText = "Post it";
            this.postSubmit.className = "btn btn-primary btn-block";
            // remove cancel button
            if (document.querySelector(".cancel")) {
                document.querySelector(".cancel").remove();
            }
            // clear inputs
            this.clearInput();
        }
    }

    // Clear alert
    clearAlert() {
        // get alert
        const currentAlert = document.querySelector(".alert");
        // check for alert
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    // Clear input
    clearInput() {
        this.titleInput.value = "";
        this.bodyInput.value = "";
        this.idInput.value = "";
    }
}

export const ui = new UI();
