import React, { useEffect } from 'react';
import { usePokemonContext } from '../../Context/PokemonContext'; // Update the path accordingly
import { Pokemon } from '../../Pokemons/pokemon';



interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  const { pokemonData, setPokemonData } = usePokemonContext();
  const { fetchPokemonData } = usePokemonContext() // Access context values

 
  
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


 

  return (
    <div className="PokemonList">
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
            {pokemons.map((pokemon, index) => (
              <li key={pokemon.id || index} onClick={() => handlePokemonClick(pokemon)}>
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

