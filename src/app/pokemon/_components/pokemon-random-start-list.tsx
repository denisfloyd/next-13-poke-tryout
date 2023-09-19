import { Pokemon } from "../_types";
import { PokemonGroupList } from "./pokemon-group-list";

interface Props {
  pokemonRandomIds: number[];
}

export async function PokemonRandomStartList({ pokemonRandomIds }: Props) {
  const randomPokemonList: Pokemon[] = await Promise.all(
    pokemonRandomIds.map(async (id) => {
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
        {
          cache: "no-cache",
        }
      );
      return new Promise((resolve) =>
        setTimeout(() => resolve(pokemonData.json()), 2000)
      );
    })
  );

  return <PokemonGroupList pokemons={randomPokemonList} />;
}
