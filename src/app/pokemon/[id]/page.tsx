import Link from "next/link";
import { PokemonCard } from "../_components/pokemon-card";
import { Pokemon, PokemonSpecies } from "../_types";
import PokemonEvolutionList from "../_components/pokemon-evolution-list";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/skeleton-card";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true;
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 60;

export async function generateStaticParams() {
  // Generate two pages at build time and the rest (3-100) on-demand
  return [{ id: "6" }, { id: "25" }, { id: "150" }];
}

export default async function Pokemon({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`),
  ]);

  const [pokemon, pokemonSpecies] = [
    (await response[0].json()) as Pokemon,
    (await response[1].json()) as PokemonSpecies,
  ];

  return (
    <div className="flex flex-col items-start gap-4 p-5">
      <Link
        href="/pokemon"
        className="border-0 font-bold flex-1 self-start focus:outline-0"
      >
        {"<- Back"}
      </Link>
      <div className="flex gap-10 w-full">
        <PokemonCard pokemon={pokemon} canSelectSprite />
        <section className="flex flex-col flex-1">
          <aside className="flex gap-8">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold"># {pokemon.id}</h1>
              <span>
                <strong>Height: </strong>
                {pokemon.height / 10} m
              </span>
              <span className="mb-5">
                <strong>Weight: </strong>
                {pokemon.weight / 10} kg
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Abilities</h1>
              <ul>
                {pokemon.abilities.map(({ ability }) => (
                  <li key={ability.name} className="capitalize">
                    {ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          {pokemon.stats.map((stat) => (
            <aside className="flex flex-col" key={stat.stat.name}>
              <span className="capitalize">
                <strong>{stat.stat.name}</strong> - {stat.base_stat} points
              </span>
              <div className="mt-1 h-1 w-full bg-neutral-200 dark:bg-neutral-600 max-w-xs">
                <div
                  className="h-1 bg-blue-500"
                  style={{ width: `${stat.base_stat / 2}%` }}
                ></div>
              </div>
            </aside>
          ))}
        </section>
      </div>

      <h2 className="text-xl">Evolution Chain:</h2>
      <Suspense
        fallback={
          <div className="grid grid-cols-[repeat(3,minmax(200px,_1fr))] gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        }
      >
        <PokemonEvolutionList
          seeingPokemon={pokemon}
          evolutionUrl={pokemonSpecies.evolution_chain.url}
        />
      </Suspense>
    </div>
  );
}
