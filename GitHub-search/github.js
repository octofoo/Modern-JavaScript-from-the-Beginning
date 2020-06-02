class GitHub {
    constructor() {
        this.client_id = "2d9b9b9d4054e9b02159";
        this.client_secret = "330995a91ccff6d9a7bb413c621e926811ce8feb";
        this.repos_count = 5;
        this.repos_sort = "created: asc";
    }

    // METHOD getUser
    async getUser(username) {
        // make profile request
        const profileResponse = await fetch(`https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        // make repos request
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        // put profile response into constant
        const profile = await profileResponse.json();
        // put repos response into constant
        const repos = await reposResponse.json();
        // return
        return {
            profile,
            repos
        }
    }
}