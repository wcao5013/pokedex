import React, { useState, useEffect } from 'react';
import { usePokemonContext } from '../../Context/PokemonContext'; // Update the path accordingly
import { Pokemon } from '../../Pokemons/pokemon';



interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons: initialPokemons }) => {
  const { pokemonData, setPokemonData } = usePokemonContext();
  const { fetchPokemonData } = usePokemonContext() // Access context values
  const [pokemons, setPokemons] = useState<PokemonListProps['pokemons']>(initialPokemons)

  useEffect(() => {
    const fetchInitialData = async () => {
      const updatedPokemons = await Promise.all(
        initialPokemons.map(async (pokemon) => {
          const updatedData = await fetchAdditionalData(pokemon.name);
          return { ...pokemon, ...updatedData };
        })
      );

      setPokemons(updatedPokemons);
    };

    fetchInitialData();
  }, [initialPokemons]);

  const fetchAdditionalData = async (pokemonName: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const data = await response.json();

      return {
        id: data.id,
        types: data.types,
        weight: data.weight,
        height: data.height,
        sprites: {
          other: {
            "official-artwork": {
              front_default: data.sprites.other['official-artwork'].front_default,
            },
          },
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {};
    }
  }

 

  const handlePokemonClick = (selectedPokemon: Pokemon) => {
    // When a Pokemon is clicked, update the context data
    try {
      // When a Pokemon is clicked, update the context data
      const searchTerm = selectedPokemon.name; // Set the search term dynamically or based on user input
      // Assume fetchPokemonData is an asynchronous function that may throw errors
      fetchPokemonData(searchTerm);
      // If the fetchPokemonData function completes without errors, you can add any additional logic here
    } catch (error) {
      // Handle errors here
      console.error("Error fetching Pokemon data:", error);
      // You can add further error handling logic or display an error message to the user
    }
  };

  const handleResetClick = () => {
    // Reset the selected Pokemon and set pokemonData to null
    setPokemonData(null);
    console.log('This is just handleResekClick', pokemonData)
  };

  console.log("Updated Pokemon Data", pokemonData)

  const getBackgroundColor = (types: { type: { name: string } }[]): string => {
    if (types.length === 1) {
      // Single type, use a solid color
      return getColor(types[0].type.name.toLowerCase());
    } else if (types.length === 2) {
      // Two types, use a linear gradient between the two colors
      const color1 = getColor(types[0].type.name.toLowerCase());
      const color2 = getColor(types[1].type.name.toLowerCase());
      return `linear-gradient(45deg, ${color1}, ${color2})`;
    } else {
      // Handle cases with more than two types if needed
      return '#F5F5F5'; // Default color
    }
  };

  const getColor = (type: string): string => {
    // Define your type-color mappings here
    switch (type) {
      case 'bug':
        return '#136614'; // Example color for type1
      case 'dark':
        return '#0a0000'; // Example color for type2
      case 'dragon':
        return '#209AA5';
      case 'fire':
        return '#D42020';
      case 'electric':
        return '#E1ED2A';
      case 'fairy':
        return '#C12A65';
      case 'fighting':
        return '#C1562A';
      case 'ghost':
        return '#39398C';
      case 'grass':
        return '#428C39';
      case 'ground':
        return '#8E7120';
      case 'ice':
        return '#1BB9C8';
      case 'normal':
        return '#855E1E';
      case 'poison':
        return '#A15654';
      case 'psychic':
        return '#EB5DED';
      case 'rock':
        return '#773017';
      case 'steel':
        return '#12756B';
      case 'water':
        return '#2584CA';
      case 'unknown':
        return '#25CA98';
      case 'shadow':
        return '#718A83';
      default:
        return '#F5F5F5'; // Default color
    }
  };

  {pokemons.map((pokemon, index, url) => {
    console.log(pokemon.name)
    console.log(index)
    console.log(pokemon.types)
  })}

  return (
    <div className="PokemonList" style={{ background: getBackgroundColor(pokemonData?.types || []) }}>
      {pokemonData ? (
        // Display selected Pokemon details if a Pokemon is selected
        <div >
          <h2>Selected Pokemon</h2>
          <p>ID: {pokemonData.id}</p>
          <p>Name: {pokemonData.name}</p>
          <img
            loading='lazy'
            src={`https://img.pokemondb.net/artwork/large/${pokemonData.name}.jpg`}
            alt={pokemonData.name}
          />
          {pokemonData.types && (
            <div>
              <p >Types: </p>
              {pokemonData.types.map((type, index) => (
                <div key={index}>{type.type.name}</div>
              ))}
            </div>
          )}
          <p>Weight: {pokemonData.weight} kg</p>
          <button onClick={handleResetClick}>Reset</button>
        </div>
      ) : (
        // Display list of Pokemon if no Pokemon is selected
        <div>
          {/* <h2>Pokémon List</h2> */}
          <ul>
            {pokemons.map((pokemon, index,) => (
              <li key={pokemon.id || index} onClick={() => handlePokemonClick(pokemon)} style={{ background: getBackgroundColor(pokemon?.types || []) }}>
                
                <img
                  loading='lazy'
                  src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                  alt={pokemon.name}
                  width={200}
                  height={200}
                />
                <p>{pokemon.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};


export default PokemonList;

