import { EvolutionChain, Pokemon } from "../_types";
import { PokemonGroupList } from "./pokemon-group-list";

interface Props {
  evolutionUrl: string;
  seeingPokemon: Pokemon;
}

export const revalidate = 300;

const getPokemonChainIdsList = (
  evolvesTo: EvolutionChain["chain"]["evolves_to"]
) => {
  let ids: string[] = [];
  while (evolvesTo.length > 0) {
    evolvesTo.forEach((evolve) => {
      ids.push(evolve.species.url.split("/")[6]);
      evolvesTo = evolve.evolves_to;
    });
  }

  return ids;
};

export default async function PokemonEvolutionList({
  evolutionUrl,
  seeingPokemon,
}: Props) {
  const pokemonData = await fetch(evolutionUrl);

  const evolutionChain = (await pokemonData.json()) as EvolutionChain;
  const pokemonEvolutionChainIds = getPokemonChainIdsList([
    evolutionChain.chain,
  ]);
  const response = await Promise.all(
    pokemonEvolutionChainIds.map(
      async (pokemonId) =>
        await fetch(`${process.env.POKE_API_URL}/pokemon/${pokemonId}`)
    )
  );
  const pokemons = (await Promise.all(
    response.map((r) => r.json())
  )) as Pokemon[];

  return (
    <PokemonGroupList pokemons={pokemons} disabledIds={[seeingPokemon.id]} />
  );
}
