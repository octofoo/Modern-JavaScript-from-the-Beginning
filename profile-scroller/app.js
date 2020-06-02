////// MOCK DATA
const data = [
    {
        name: "Brigitte Spencer-Ray",
        age: 34,
        gender: "female",
        lookingFor: "male",
        location: "Portsmouth, England",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
        name: "Gunther Schneider",
        age: 28,
        gender: "male",
        lookingFor: "female",
        location: "Aachen, Germany",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
        name: "Jyllean Reese",
        age: 22,
        gender: "attack helicopter",
        lookingFor: "unicornkin",
        location: "Scarsdale, NY",
        image: "https://randomuser.me/api/portraits/women/9.jpg",
    },
];



////// FUNCTIONS

// Profile iterator
const profiles = profileIterator(data);

// Load initial profile
nextProfile();

function profileIterator(profiles) {
    // counter
    let nextIndex = 0;
    // return object with "next" function
    return {
        next: function () {
            return nextIndex < profiles.length ?
                { value: profiles[nextIndex++], done: false } :
                { done: true }
        }
    };
}

// Next profile
function nextProfile() {
    // create profile variable
    const currentProfile = profiles.next().value;
    // display profile
    if (currentProfile !== undefined) {
        document.getElementById("profileDisplay").innerHTML = `
            <ul class="list-group">
                <li class="list-group-item">Name: ${currentProfile.name}</li>
                <li class="list-group-item">Age: ${currentProfile.age}</li>
                <li class="list-group-item">Location: ${currentProfile.location}</li>
                <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingFor}</li>
            </ul>
        `;
        // display image
        document.getElementById("imageDisplay").innerHTML = `
            <img src="${currentProfile.image}" class="rounded mx-auto d-block">
        `;
    } else {
        window.location.reload();
    }
}



// EVENTS

// Next
document.getElementById("next").addEventListener("click", nextProfile);
