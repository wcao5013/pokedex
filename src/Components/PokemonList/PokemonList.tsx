import React from 'react';
import { usePokemonContext } from '../../Context/PokemonContext'; // Update the path accordingly
import { Pokemon } from '../../Pokemons/pokemon';

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  const { pokemonData, setPokemonData } = usePokemonContext(); // Access context values

  const handlePokemonClick = (selectedPokemon: Pokemon) => {
    // When a Pokemon is clicked, update the context data
    setPokemonData(selectedPokemon);
  };

  return (
    <div className="PokemonList">
      <h2>Pokémon List</h2>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      {pokemonData && (
        <div>
          <h2>Selected Pokemon</h2>
          <p>ID: {pokemonData.id}</p>
          <p>Name: {pokemonData.name}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`} alt={pokemonData.name} />

        </div>
      )}
    </div>
  );
};

export default PokemonList;
