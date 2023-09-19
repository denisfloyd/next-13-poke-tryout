import { Suspense } from "react";
import { PokemonRandomStartList } from "./_components/pokemon-random-start-list";
import { SkeletonCard } from "@/components/skeleton-card";

export default function Page() {
  const pokemonRandomIds = Array.from({ length: 3 }, () => {
    return Math.floor(Math.random() * 898) + 1;
  });

  return (
    <section className="w-screen h-screen">
      <aside className="flex flex-col h-full items-center justify-center">
        <h2 className="mb-4">Click in a card to see pokemon&apos;s details</h2>

        <Suspense
          fallback={
            <div className="grid grid-cols-[repeat(3,minmax(200px,_1fr))] gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          }
        >
          <PokemonRandomStartList pokemonRandomIds={pokemonRandomIds} />
        </Suspense>
      </aside>
    </section>
  );
}
