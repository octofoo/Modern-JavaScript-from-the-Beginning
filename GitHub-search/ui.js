class UI {
    constructor() {
        this.profile = document.getElementById("profile");
    }

    // METHOD show profile
    // "profile" takes from "data.profile"
    showProfile(profile) {
        // clear current alert
        this.clearAlert();
        // insert into UI
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${profile.avatar_url}">
                        <a href="${profile.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: ${profile.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${profile.public_gists}</span>
                        <span class="badge badge-success">Followers: ${profile.followers}</span>
                        <span class="badge badge-info">Following: ${profile.following}</span>
                        <br>
                        <br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${profile.company}</li>
                            <li class="list-group-item">Website/Blog: <a href="${profile.blog}" target="_blank">${profile.blog}</a></li>
                            <li class="list-group-item">Location: ${profile.location}</li>
                            <li class="list-group-item">Member Since: ${profile.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
    }

    // METHOD clear profile
    clearProfile() {
        this.profile.innerHTML = "";
    }

    // METHOD show repos
    showRepos(repos) {
        // initialize empty output
        let output = "";
        // loop
        repos.forEach(repo => {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-success">Forks: ${repo.forks}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        // display in UI
        document.getElementById("repos").innerHTML = output;
    }

    // METHOD show alert
    showAlert(message, classes) {
        // clear alert
        this.clearAlert();
        // create div
        const div = document.createElement("div");
        // add id
        div.id = "alert";
        // add classes
        div.className = classes;
        // add text
        div.appendChild(document.createTextNode(message));
        // get container
        const container = document.getElementById("container");
        // get search input
        const searchInput = document.getElementById("beforeAlert");
        // insert alert
        container.insertBefore(div, searchInput);
        // clear alert after 3 seconds
        if (this.profile.innerHTML !== "") {
            setTimeout(() => {
                this.clearAlert();
            }, 3000);
        }
    }

    // METHOD clear alert
    clearAlert() {
        const alert = document.getElementById("alert");
        // check for alert
        if (alert) {
            alert.remove();
        }
    }
}