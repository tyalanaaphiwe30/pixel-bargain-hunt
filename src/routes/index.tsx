import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, Gamepad2, Search, SlidersHorizontal, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dealArtwork from "@/assets/game-deals-banner.jpg";
import {
  calculateDiscountPercentage,
  filterGamesOnSale,
  findCheapestGame,
  games,
  searchGames,
} from "@/lib/game-deals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PC Game Deals — Indie favorites, lower prices" },
      {
        name: "description",
        content:
          "Browse eight PC game prices in rand, find current discounts, and search indie favorites.",
      },
      { property: "og:title", content: "PC Game Deals — Indie favorites, lower prices" },
      {
        property: "og:description",
        content:
          "Browse eight PC game prices in rand, find current discounts, and search indie favorites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const onSaleGames = useMemo(() => filterGamesOnSale(games), []);
  const cheapestGame = useMemo(() => findCheapestGame(games), []);
  const filteredGames = useMemo(() => {
    const titleMatches = searchGames(games, query);
    return onSaleOnly ? filterGamesOnSale(titleMatches) : titleMatches;
  }, [query, onSaleOnly]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <a href="#top" className="brand-mark" aria-label="PC Game Deals home">
          <span className="brand-icon">
            <Gamepad2 aria-hidden="true" />
          </span>
          <span>
            PC <strong>GAME DEALS</strong>
          </span>
        </a>
        <a href="#deals" className="header-link">
          Browse deals <ArrowDownRight aria-hidden="true" />
        </a>
      </header>

      <section className="deal-hero" id="top" aria-labelledby="page-title">
        <img
          className="hero-art"
          src={dealArtwork}
          alt="Controllers and handheld games on a dark tabletop"
          width={1440}
          height={720}
          fetchPriority="high"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles aria-hidden="true" /> GOOD GAMES. BETTER PRICES.
          </p>
          <h1 id="page-title">
            The next great
            <br />
            game is <span>on sale.</span>
          </h1>
          <p className="hero-caption">A hand-picked little list of PC favorites, priced in rand.</p>
          <a className="hero-link" href="#deals">
            Find your next game <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
        <p className="hero-index" aria-hidden="true">
          01 <span>/ 08</span>
        </p>
      </section>

      <section className="deal-content" id="deals" aria-label="Game deals">
        <div className="section-heading">
          <div>
            <p className="section-kicker">THE SHORTLIST</p>
            <h2>
              Worth a look<span className="heading-period">.</span>
            </h2>
          </div>
          <p className="section-note">
            Eight games. Three stores.
            <br />
            All prices in South African rand.
          </p>
        </div>

        <div className="market-strip" aria-label="Deal highlights">
          <div className="market-stat">
            <span className="stat-label">ON SALE NOW</span>
            <span className="stat-value">
              {onSaleGames.length}
              <span className="stat-unit"> / {games.length}</span>
            </span>
          </div>
          <div className="market-stat">
            <span className="stat-label">LOWEST PRICE</span>
            <span className="stat-value">
              {cheapestGame ? `R${cheapestGame.salePrice.toFixed(2)}` : "—"}
              <span className="stat-unit"> {cheapestGame?.title}</span>
            </span>
          </div>
          <div className="market-stat market-aside">
            <span className="stat-spark" aria-hidden="true">
              ✳
            </span>
            <span>Updated from the supplied game list</span>
          </div>
        </div>

        <div className="list-toolbar">
          <label className="search-box">
            <Search aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search game titles…"
              aria-label="Search game titles"
              className="search-input"
            />
          </label>
          <Button
            type="button"
            variant="outline"
            aria-pressed={onSaleOnly}
            onClick={() => setOnSaleOnly((current) => !current)}
            className={`sale-filter${onSaleOnly ? " is-active" : ""}`}
          >
            <SlidersHorizontal aria-hidden="true" />
            On sale only
            <span className="filter-count">{onSaleGames.length}</span>
          </Button>
        </div>

        <div className="deal-list" role="list" aria-label="Games and prices">
          {filteredGames.map((game, index) => {
            const isOnSale = game.salePrice < game.normalPrice;
            return (
              <article className="deal-row" role="listitem" key={game.id}>
                <span className="game-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="game-details">
                  <div className="game-name-line">
                    <h3>{game.title}</h3>
                    {isOnSale && <span className="sale-tag">ON SALE</span>}
                  </div>
                  <p className="game-store">{game.store}</p>
                </div>
                <div className="game-prices">
                  <span className="current-price">R{game.salePrice.toFixed(2)}</span>
                  {isOnSale ? (
                    <span className="old-price">
                      R{game.normalPrice.toFixed(2)}
                      <span className="discount-note">−{calculateDiscountPercentage(game)}%</span>
                    </span>
                  ) : (
                    <span className="regular-note">Regular price</span>
                  )}
                </div>
                <span className="row-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            );
          })}
          {filteredGames.length === 0 && (
            <div className="empty-state">
              <Search aria-hidden="true" />
              <p>No games match that search.</p>
              <span>Try another title or turn off the sale filter.</span>
            </div>
          )}
        </div>
        <p className="results-note" aria-live="polite">
          Showing {filteredGames.length} of {games.length} games
        </p>
      </section>

      <footer className="site-footer">
        <span>
          PC GAME DEALS <span className="footer-dot">✳</span>
        </span>
        <span>Made for finding your next favorite.</span>
      </footer>
    </main>
  );
}
