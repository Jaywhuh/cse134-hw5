export function getProjectCardCSS() {
    return `
        .card {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            text-align: center;
            padding: 1rem;
            max-width: 100%;
            width: clamp(20rem, 50vw, 40rem); 
            border-radius: 0.5rem;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            background: var(--card-dark-bg, #222);
            transition: transform 0.3s ease-in-out;
            margin: auto;
        }

        .card:hover {
            transform: scale(1.03);
        }

        h2 {
            font-size: 1.5rem;
            margin: 0;
            color: var(--text-color, #333);
        }

        picture {
            display: block;
            width: 100%;
            min-height: 15rem;
            height: auto;
            margin-bottom: 1rem;
        }

        picture img {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 0.5rem;
        }

        p {
            font-size: 1rem;
            color: var(--text-color, #666);
        }

        a {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: var(--special-color);
            color: black;
            font-weight: bold;
            text-decoration: none;
            border-radius: 0.5rem;
            transition: background 0.3s ease-in-out;
        }

        a:hover {
            background: var( #0056b3);
        }
    `;
}