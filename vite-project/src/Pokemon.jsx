import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./App.css";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
   const [selectedType, setSelectedType] = useState("all");
   const [favorites, setFavorites] = useState(
     JSON.parse(localStorage.getItem("favorites")) || [],
   );
   const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Correct API endpoint for a list of Pokémon
  const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

  const allTypes = ["all", "fire", "water", "grass", "electric"];

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // data.results is an array of Pokémon with name and url
      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API);
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return await res.json();
        }),
      );

      setPokemon(detailed);
    };

    fetchData();
  }, []);

    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  )
   .filter((p) => {
      if (selectedType === "all") return true;
      return p.types.some((t) => t.type.name === selectedType);
    });

     const toggleFavorite = (id) => {
       if (favorites.includes(id)) {
         setFavorites(favorites.filter((fav) => fav !== id));
       } else {
         setFavorites([...favorites, id]);
       }
     };

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }
  if(error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.slice(0, visibleCount).map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
