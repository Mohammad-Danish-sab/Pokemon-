import { useEffect, useState } from "react";

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);

    const API = " https://pokeapi.co/api/v2/pokemon/ditto";

    const fetchPokemon = async() => {
        try {
            const res = fetch(API); 
            const data = await res.json();
            // console.log(data);

            const detailedPokemonData = data.results.map(async(curPokemon) => {
                // console.log(curPokemon.url);
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;   
            });
          const detailedResponses = await Promise.all(detailedPokemonData);
          console.log(detailedResponses);
          setPokemon(detailedResponses);
          
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, []);

    return (
    <>
      <h1>Hello Pokemon Once Again</h1>
    </>
  );
};
