
const STORAGE_KEY = "projectData";
const JSON_BIN_URL = "https://api.jsonbin.io/v3/b/67d7b9118561e97a50ed7c7a";


// Function to load data from LocalStorage
export function loadLocalData() {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
        alert("No saved projects in local storage. Click 'Load Remote' first.");
        return;
    }

    const data = JSON.parse(storedData);
    populateProjectCards(data);
}

// Function to load data from Remote Server and store in LocalStorage
export async function loadRemoteData() {
    try {
        const response = await fetch(JSON_BIN_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch remote data.");
        }

        const result = await response.json();
        const data = result.record.projects; // Extract projects array

        // Store fetched data in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log("Remote data saved to LocalStorage.");

        // Populate project cards dynamically
        populateProjectCards(data);
    } catch (error) {
        console.error("Error fetching remote data:", error);
        alert("Failed to fetch projects from remote server.");
    }
}

// Function to populate project cards dynamically
function populateProjectCards(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = ""; // Clear existing content

    projects.forEach(proj => {
        const card = document.createElement("project-card");
        card.projectData = proj;
        projectList.appendChild(card);
    });
}

// Ensure the project list starts empty (cards disappear on refresh)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("project-list").innerHTML = "";
});