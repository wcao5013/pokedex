import React, { useState } from 'react';
import { Pokemon } from '../../Pokemons/pokemon';
import { usePokemonContext } from '../../Context/PokemonContext'
import styles from '../../SCSS/searchBar.module.scss'



const SearchBar: React.FC = () => {
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { setPokemonData } = usePokemonContext()
  

  const fetchPokemonData = async () => {
    try {
      if (!searchTerm) {
        // Display a message or perform an action to indicate that a Pokemon needs to be entered
        alert('Please enter a Pokemon to find');
        return;
      }

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchPokemonData();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Enter Pokemon ID or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Call handleKeyDown function on Enter key press
      />
      <button onClick={fetchPokemonData} >Search</button>

      {/* {pokemonData ? (
        <div>
          <h2>Pokemon Info</h2>
          <p>ID: {pokemonData.id}</p>
          <p>Name: {pokemonData.name}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`} alt={pokemonData.name} />
        </div>
      ) : (
        <p>No Pokemon found with the given ID or Name.</p>
      )} */}
    </div>
  );
};

export default SearchBar;
