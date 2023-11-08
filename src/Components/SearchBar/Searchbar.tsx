import React, { useState } from 'react';
import { Pokemon } from '../../Pokemons/pokemon';



const SearchBar: React.FC = () => {
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const data = await response.json();
      setPokemonData({
        id: data.id,
        name: data.name,
        types: data.types,
        weight: data.weight,
        height: data.height,
        sprites: {
            other: {
                "official-artwork": {
                    front_default: data.images,
                }
            }
        }    
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setPokemonData(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pokemon ID or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchPokemonData}>Search</button>

      {pokemonData ? (
        <div>
          <h2>Pokemon Info</h2>
          <p>ID: {pokemonData.id}</p>
          <p>Name: {pokemonData.name}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`} alt={pokemonData.name} />
        </div>
      ) : (
        <p>No Pokemon found with the given ID or Name.</p>
      )}
    </div>
  );
};

export default SearchBar;
