export type GameDeal = {
  id: number;
  title: string;
  normalPrice: number;
  salePrice: number;
  store: string;
};

export const games: GameDeal[] = [
  { id: 1, title: "Hollow Knight", normalPrice: 14.99, salePrice: 7.49, store: "Steam" },
  { id: 2, title: "Stardew Valley", normalPrice: 13.99, salePrice: 13.99, store: "GOG" },
  { id: 3, title: "Celeste", normalPrice: 19.99, salePrice: 4.99, store: "Steam" },
  { id: 4, title: "Hades", normalPrice: 24.99, salePrice: 12.49, store: "Epic Games" },
  { id: 5, title: "Portal 2", normalPrice: 9.99, salePrice: 0.99, store: "Steam" },
  { id: 6, title: "Terraria", normalPrice: 9.99, salePrice: 9.99, store: "GOG" },
  { id: 7, title: "Disco Elysium", normalPrice: 39.99, salePrice: 9.99, store: "GOG" },
  { id: 8, title: "Cuphead", normalPrice: 19.99, salePrice: 14.99, store: "Steam" },
];

export function filterGamesOnSale(deals: GameDeal[]): GameDeal[] {
  return deals.filter((game) => game.salePrice < game.normalPrice);
}

export function calculateDiscountPercentage(game: GameDeal): number {
  if (game.normalPrice <= 0 || game.salePrice >= game.normalPrice) return 0;
  return Math.round(((game.normalPrice - game.salePrice) / game.normalPrice) * 100);
}

export function findCheapestGame(deals: GameDeal[]): GameDeal | undefined {
  return deals.reduce<GameDeal | undefined>(
    (cheapest, game) => (!cheapest || game.salePrice < cheapest.salePrice ? game : cheapest),
    undefined,
  );
}

export function searchGames(deals: GameDeal[], query: string): GameDeal[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return deals;
  return deals.filter((game) => game.title.toLocaleLowerCase().includes(normalizedQuery));
}
