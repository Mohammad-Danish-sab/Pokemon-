import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./App.css";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // Correct API endpoint for a list of Pokémon
  const API = "https://pokeapi.co/api/v2/pokemon?limit=60";

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
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div>
          <ul className="cards">
            {pokemon.map((curPokemon) => {
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
