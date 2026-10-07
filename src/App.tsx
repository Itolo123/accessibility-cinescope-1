import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", time: "18 h 10", seats: 12, poster: posterAube },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", time: "19 h 30", seats: 0, poster: posterMemoire },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", time: "21 h 00", seats: 34, poster: posterOrbite },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredFilms = useMemo(
    () => films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <>
      <div className="topbar">
        <button type="button" className="brand" onClick={() => setQuery("")}>CinéScope</button>
        <div className="menu">
          <a href="#programme">Programme</a>
          <a href="#infos">Informations pratiques</a>
        </div>
      </div>

      <div className="page">
        <h1>Films à l’affiche</h1>
        <p className="intro">Découvrez la programmation de cette semaine.</p>
        <input
          className="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div id="programme" className="film-grid">
          {filteredFilms.map((film) => (
            <div className="film-card" key={film.id}>
              <img src={film.poster} />
              <div className="film-content">
                <h4>
                  <button type="button" className="film-select" onClick={() => setSelected(film.title)}>
                    {film.title}
                  </button>
                </h4>
                <p>{film.genre} · {film.time}</p>
                <p className={film.seats > 0 ? "availability available" : "availability unavailable"}>
                  {film.seats > 0
                    ? `Il reste ${film.seats} place${film.seats > 1 ? "s" : ""}`
                    : "Il ne reste pas de places"}
                </p>
                <button
                  type="button"
                  className="favorite"
                  aria-pressed={favorites.includes(film.id)}
                  onClick={() => toggleFavorite(film.id)}
                >
                  <span className="favorite-label">Favoris</span>
                  <span aria-hidden="true">{favorites.includes(film.id) ? "★" : "☆"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {selected && <p className="selection">Film sélectionné : {selected}</p>}
      </div>
    </>
  );
}

