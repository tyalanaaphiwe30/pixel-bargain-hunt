import { describe, expect, it } from "vitest";

import {
  calculateDiscountPercentage,
  filterGamesOnSale,
  findCheapestGame,
  games,
  searchGames,
} from "@/lib/game-deals";

describe("game deal calculations", () => {
  it("includes only games priced below their normal price", () => {
    expect(filterGamesOnSale(games).map((game) => game.id)).toEqual([1, 3, 4, 5, 7, 8]);
    expect(filterGamesOnSale(games).some((game) => game.title === "Stardew Valley")).toBe(false);
  });

  it("calculates and rounds a discount percentage", () => {
    const portal = games.find((game) => game.title === "Portal 2");
    expect(portal ? calculateDiscountPercentage(portal) : undefined).toBe(90);
  });

  it("finds the game with the lowest current sale price", () => {
    expect(findCheapestGame(games)).toMatchObject({ title: "Portal 2", salePrice: 0.99 });
  });

  it("searches titles without regard to letter case", () => {
    expect(searchGames(games, "hOlLoW").map((game) => game.title)).toEqual(["Hollow Knight"]);
    expect(searchGames(games, "   ")).toHaveLength(8);
  });
});
