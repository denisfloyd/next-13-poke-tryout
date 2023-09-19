import { PokemonCard } from "./pokemon-card";
import Link from "next/link";
import { Pokemon } from "../_types";
import clsx from "clsx";

interface Props {
  pokemons: Pokemon[];
  disabledIds?: string[];
}

export async function PokemonGroupList({ pokemons, disabledIds = [] }: Props) {
  return (
    <div
      className={clsx(
        { "grid grid-cols-3 gap-4": true },
        { "grid-cols-4": pokemons.length > 3 }
      )}
    >
      {pokemons.map((pokemon) => (
        <Link
          href={`/pokemon/${pokemon.id}`}
          key={pokemon.id}
          className={clsx({
            "cursor-auto": disabledIds.includes(pokemon.id),
          })}
        >
          <PokemonCard pokemon={pokemon} />
        </Link>
      ))}
    </div>
  );
}
