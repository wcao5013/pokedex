import React, { useEffect, useState } from 'react';
import { fetchData } from '../../Services/ApiService'; // Update the path accordingly
import { Pokemon } from '../../Pokemons/pokemon';

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    return (
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.name}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png`} alt={pokemon.name} />
            {pokemon.name}
          </li>
        ))}
      </ul>
    );
  };
  
  export default PokemonList;
