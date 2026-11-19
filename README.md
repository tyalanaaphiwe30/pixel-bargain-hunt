# PC Game Deals

A compact game-deals page featuring the eight Rand-priced games provided in the assignment. Search titles as you type, show sale-only results, and compare each current price with its normal price.

## Setup

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Open the local address printed by the development server. Run the checks with `npm test`.

## Choices and assumptions

- The supplied eight-game list is the source of truth; no live API or changing prices are used.
- A game is on sale only when its sale price is strictly lower than its normal price. Equal prices do not receive an “ON SALE” tag.
- Discount percentages use the supplied prices and are rounded to the nearest whole percent. The lowest-price highlight compares sale prices.
- Prices are shown in South African rand (ZAR); the brief's amounts are treated as rand.
- Search matches game titles, ignores letter case, and updates as you type.

## Project notes

- **Implementation:** React and TypeScript with TanStack Start; deal calculations are small reusable functions, with Vitest checks for the requested behaviors.
- **Resources used:** the supplied assignment brief, the existing project setup, and the included Vitest tooling.
- **Obstacles:** no external service or account was needed. The provided game data is used directly so prices stay predictable.
- **What I would do differently:** if the scope allowed real-time listings, I would add an API-backed source and show when each price was last checked.
- **Time taken:** 2 hours and 40 minutes.
