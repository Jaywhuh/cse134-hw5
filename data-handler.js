
const STORAGE_KEY = "projectData";
const JSON_BIN_URL = "https://api.jsonbin.io/v3/b/67d7b9118561e97a50ed7c7a";

// Default dataset for localStorage
const defaultLocalData = [
    {
        "title": "Expense Tracker",
        "imageWebp": "https://pub-93b0c6164cea4561aaa1f28882b4b32e.r2.dev/frugal.webp",
        "imageMwebp": "https://pub-93b0c6164cea4561aaa1f28882b4b32e.r2.dev/frugal-m.webp",
        "image": "https://pub-93b0c6164cea4561aaa1f28882b4b32e.r2.dev/frugal.webp",
        "alt": "Screenshot of Expense Tracker",
        "description": "A full-stack expense tracking web app.",
        "link": "https://github.com/cse110-fa22-group8/cse110-fa22-group8"
    },
    {
        "title": "Leetcode Difficulty Predictor",
        "imageWebp": "https://pub-93b0c6164cea4561aaa1f28882b4b32e.r2.dev/decisiontree.webp",
        "imageMwebp": "https://pub-93b0c6164cea4561aaa1f28882b4b32e.r2.dev/decisiontree-m.webp",
        "image": "https://pub-93b0c6164cea4561aaa1f28882b4b32e.r2.dev/decisiontree.webp",
        "alt": "Screenshot of Leetcode Difficulty Predictor",
        "description": "Machine learning model for predicting problem difficulty.",
        "link": "https://github.com/Jaywhuh/CSE151A_WIN24_GROUP"
    }
];

// prepopulate localStorage if it's empty
function initializeLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLocalData));
        console.log("LocalStorage initialized with default dataset.");
    }
}

// load data from LocalStorage
export function loadLocalData() {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
        alert("No saved projects in local storage.");
        return;
    }

    const data = JSON.parse(storedData);
    populateProjectCards(data);
}

// load data from Remote Server and store in LocalStorage
export async function loadRemoteData() {
    try {
        const response = await fetch(JSON_BIN_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch remote data.");
        }

        const result = await response.json();
        const data = result.record.projects;

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

// populate project cards dynamically
function populateProjectCards(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = ""; // Clear existing content

    projects.forEach(proj => {
        const card = document.createElement("project-card");
        card.projectData = proj;
        projectList.appendChild(card);
    });
}

// Initialize localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    initializeLocalStorage();
    document.getElementById("project-list").innerHTML = "";
});
