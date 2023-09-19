"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { Pokemon } from "../_types";
import { useState } from "react";

interface Props {
  pokemon: Pokemon;
  canSelectSprite?: boolean;
}

export function PokemonCard({ pokemon, canSelectSprite = false }: Props) {
  const [spriteSelected, setSpriteSelected] = useState<"normal" | "shiny">(
    "normal"
  );

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 border border-gray-200 rounded-lg shadow dark:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] dark:from-indigo-300 dark:to-purple-400 dark:border-gray-700 max-w-[250px]">
      <Image
        src={
          spriteSelected === "normal"
            ? pokemon.sprites.front_default
            : pokemon.sprites.front_shiny
        }
        alt={pokemon.name}
        width={200}
        height={200}
      />
      {canSelectSprite && (
        <div className="inline-flex bg-gray-200/[.5] hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-700/[.7] my-2">
          <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
            <button
              type="button"
              className={`${clsx(
                "text-xs text-gray-500 hover:text-gray-700 font-medium rounded-md py-2 px-3 dark:text-gray-400 dark:hover:text-gray-300",
                {
                  "bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-400":
                    spriteSelected === "normal",
                }
              )}`}
              id="normal-tab-select"
              onClick={() => setSpriteSelected("normal")}
              role="tab"
            >
              Normal
            </button>
            <button
              type="button"
              className={`${clsx(
                "text-xs text-gray-500 hover:text-gray-700 font-medium rounded-md py-2 px-3 dark:text-gray-400 dark:hover:text-gray-300",
                {
                  "bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-400":
                    spriteSelected === "shiny",
                }
              )}`}
              id="shiny-tab-select"
              onClick={() => setSpriteSelected("shiny")}
              role="tab"
            >
              Shiny
            </button>
          </nav>
        </div>
      )}
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize text-center">
        {pokemon.name}
      </h5>
    </div>
  );
}
