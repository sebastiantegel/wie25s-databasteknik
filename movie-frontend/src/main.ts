import type { Movie } from "./models/Movie";
import "./style.css";

const showMovies = async () => {
  const response = await fetch("http://localhost:3000/movies");
  const data: Movie[] = await response.json();

  const moviesContainer = document.getElementById("movies");

  if (moviesContainer) {
    moviesContainer.innerHTML = "";
  }

  data.forEach((movie) => {
    const container = document.createElement("div");
    const title = document.createElement("h2");

    title.innerHTML = movie.title;

    container.appendChild(title);

    moviesContainer?.appendChild(container);
  });
};

document
  .getElementById("addMovieForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement).value;
    // Length, description

    const bodyData = {
      title: title,
    };

    await fetch("http://localhost:3000/movies/create", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "content-type": "application/json",
      },
    });

    await showMovies();
  });

showMovies();
