# PC Game Deals

## What to build
- Replace the template home screen with a polished PC game-deals page using the supplied eight games and Rand prices.
- Implement reusable pure functions for sale filtering, discount percentage, cheapest game, and case-insensitive title search; add live search and an on-sale filter.
- Show sale prices and display the “ON SALE” tag only when the sale price is below the normal price.
- Add a concise project write-up with setup instructions, implementation choices, obstacles/resources, assumptions, and a clearly marked personal time-taken entry.

## Technical details
- Keep the app within the existing TanStack Start structure; place pure deal logic in a focused module and add tests beside the existing Vitest suite.
- Define the page's visual tokens in `src/styles.css`, give the home route its own metadata, and document setup and reflection in `README.md`.
- Do not add live external pricing or API calls; the supplied dataset is the required source of truth.