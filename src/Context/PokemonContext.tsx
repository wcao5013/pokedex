import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pokemon } from '../Pokemons/pokemon';

interface PokemonContextProps {
  children: ReactNode;
}

interface PokemonContextType {
  pokemonData: Pokemon | null;
  setPokemonData: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<PokemonContextProps> = ({ children }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  return (
    <PokemonContext.Provider value={{ pokemonData, setPokemonData }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
