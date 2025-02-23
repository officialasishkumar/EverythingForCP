import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/WorkInProgress.css"; // Adjust if you have a separate stylesheet

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Only include implemented algorithms
        const algorithms = ["Tree", "Array", "Stack", "Linked List", "Matrix"];
        const container = document.getElementById("home-page-card-container");

        // Clear container first (in case of re-render)
        container.innerHTML = "";

        algorithms.forEach((algo) => {
            const el = document.createElement("div");
            el.classList.add("card");
            el.innerText = algo;
            el.addEventListener("click", () => {
                // Navigate to /algoviz/[algo] where spaces are replaced with hyphens
                navigate(`/algoviz/${algo.toLowerCase().replace(/ /g, "-")}`);
            });
            container.appendChild(el);
        });

        // Handle header appearance animation
        window.onload = () => {
            document.querySelector("#home-page-header .title")?.classList.add("appear");
        };

        function appearCards() {
            const currHeight = window.scrollY + window.innerHeight;
            const cards = document.querySelectorAll("#home-page-card-container .card");
            cards.forEach((card) => {
                const height = card.offsetTop + (card.offsetHeight * 2) / 3;
                if (currHeight >= height) {
                    card.classList.add("appear");
                }
            });
        }

        window.addEventListener("scroll", appearCards);
        window.addEventListener("load", appearCards);
    }, [navigate]);

    return (
        <div id="home-page">
            <div id="home-page-header">
                <div className="title">
                    <h1 id="header-main-page">Algorithm Visualizer</h1>
                    <h2 id="header-tagline">Visualize the world</h2>
                </div>
            </div>
            <div id="home-page-card-container"></div>
        </div>
    );
};

export default HomePage;
