import { getProjectCardCSS } from "./project-card-css.js";

class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create style element
        const style = document.createElement('style');
        style.textContent = getProjectCardCSS();
        this.shadowRoot.appendChild(style);

        // Define HTML
        this.shadowRoot.innerHTML += `
            <div class="card">
                <h2 id="title">Project Title</h2>
                <picture>
                    <source id="image-webp" type="image/webp">
                    <source id="image-mwebp" media="(max-width: 768px)" type="image/webp">
                    <img id="thumbnail" src="images/default.webp" alt="Project Image">
                </picture>
                <p id="description">Project description goes here.</p>
                <a id="link" href="#" target="_blank">Learn More</a>
            </div>
            <br>
        `;
    }

    set projectData(data) {
        this.shadowRoot.querySelector("#title").textContent = data.title || "Untitled Project";
        this.shadowRoot.querySelector("#image-webp").srcset = data.imageWebp || "images/default.webp";
        this.shadowRoot.querySelector("#image-mwebp").srcset = data.imageMwebp || "images/default-m.webp";
        this.shadowRoot.querySelector("#thumbnail").src = data.image || "images/default.webp";
        this.shadowRoot.querySelector("#thumbnail").alt = data.alt || "Project Image";
        this.shadowRoot.querySelector("#description").textContent = data.description || "No description available.";
        this.shadowRoot.querySelector("#link").href = data.link || "#";
        this.shadowRoot.querySelector("#link").textContent = "View Project";
    }
}

customElements.define('project-card', ProjectCard);