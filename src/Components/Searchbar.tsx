import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export interface Pokemon {
    name: string,
    types: {
        type: {
            name: string,
        }
    }[],
    weight: number,
    height: number,
    sprites: {
        other: {
            "official-artwork": {
                front_default: string,
            }
        }
    }
}

function SearchBar() {
  const [wordEntered, setWordEntered] = useState('');
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWordEntered(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!isNaN(parseInt(wordEntered))) {
          // If the input is a number (ID), fetch by ID
          response = await axios.get(`${API_BASE_URL}${parseInt(wordEntered)}`);
        } else {
          // If the input is a string (name), fetch by name
          response = await axios.get(`${API_BASE_URL}${wordEntered.toLowerCase()}`);
        }
        // Set the response data
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPokemonData(null);
      }
    };

    // Fetch data when searchInput changes
    if (wordEntered !== '') {
      fetchData();
    } else {
      // Clear the data if searchInput is empty
      setPokemonData(null);
    }
  }, [wordEntered]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  console.log(pokemonData)


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Pokemon Name or ID"
          value={wordEntered}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <p>Types: {pokemonData.types[0].type.name}</p>
          
          <img 
            src={pokemonData.sprites.other['official-artwork'].front_default}
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
