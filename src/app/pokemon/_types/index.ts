export interface Pokemon {
  id: string;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  order: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export interface PokemonSpecies {
  id: string;
  evolution_chain: {
    url: string;
  };
}

interface EvolveTo {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolveTo[];
}

export interface EvolutionChain {
  id: string;
  chain: EvolveTo;
}
