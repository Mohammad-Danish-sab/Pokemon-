import "./App.css";

export const PokemonCards = ({ pokemonData }) => {
  if (!pokemonData) return null;

  const image =
    pokemonData?.sprites?.other?.dream_world?.front_default ||
    pokemonData?.sprites?.front_default;

  const speedStat = pokemonData.stats.find(
    (stat) => stat.stat.name === "speed",
  )?.base_stat;

  const attackStat = pokemonData.stats.find(
    (stat) => stat.stat.name === "attack",
  )?.base_stat;

  return (
    <li className="pokemon-card">
      <figure>
        <img src={image} alt={pokemonData.name} className="pokemon-image" />
      </figure>

      <h1 className="pokemon-name">{pokemonData.name}</h1>

      <div className="pokemon-info pokemon-highlight">
        <p>
          {pokemonData.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>

      <div className="grid-three-cols">
        <p className="pokemon-info">
          <span>Height:</span> {pokemonData.height}
        </p>
        <p className="pokemon-info">
          <span>Weight:</span> {pokemonData.weight}
        </p>
        <p className="pokemon-info">
          <span>Speed:</span> {speedStat}
        </p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p>{pokemonData.base_experience}</p>
          <span>Experience:</span>
        </div>

        <div className="pokemon-info">
          <p>{attackStat}</p>
          <span>Attack:</span>
        </div>

        <div className="pokemon-info">
          <p>
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
          <span>Abilities:</span>
        </div>
      </div>
    </li>
  );
};
