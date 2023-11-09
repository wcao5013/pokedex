import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pokemon } from '../Pokemons/pokemon';


interface PokemonContextProps {
  children: ReactNode;
}

interface PokemonContextValue {
  pokemonData: Pokemon | null;
  setPokemonData: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  fetchPokemonData: (searchTerm: string) => Promise<void>;
}

const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

export const PokemonProvider: React.FC<PokemonContextProps> = ({ children }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  const fetchPokemonData = async (searchTerm: string) => {
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
              front_default: data.sprites.other['official-artwork'].front_default,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setPokemonData(null);
    }
  };

  return (
    <PokemonContext.Provider value={{ pokemonData, setPokemonData, fetchPokemonData }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = (): PokemonContextValue => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};