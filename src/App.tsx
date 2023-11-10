import React, { useEffect, useState } from 'react';
import { fetchData } from './Services/ApiService'; // Update the path accordingly
import PokemonList from './Components/PokemonList/PokemonList';
import { Pokemon } from './Pokemons/pokemon';
import SearchBar from './Components/SearchBar/Searchbar';
import { PokemonProvider } from './Context/PokemonContext'

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setPokemons(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <PokemonProvider>
      <div className="App">
        <SearchBar />
        <h1>Pokémon List</h1>
        <PokemonList pokemons={pokemons} />
      </div>
    </PokemonProvider>
  );
};

export default App;
