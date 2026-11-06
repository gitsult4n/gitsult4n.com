# Whose Side — gitsult4n.com

**Whose side is your AI on? Real people will check.**

Whose Side is an independent audit of AI assistants and shopping agents by real, paid humans. It measures how often assistants steer people toward sponsored or pricier options.

**Status: pilot not started. No ratings are published.** This site is the launch surface only: the pre-registered method, panel sign-up, buyer-interest capture, and live real counts. No leaderboard, no scores. See `docs/SPEC.md`.

## Stack

Static HTML/CSS/vanilla JS served by Cloudflare Workers static assets (`public/`), plus one Worker (`src/worker.js`) for `/api/*` backed by D1. No build step, no runtime dependencies. English and Arabic (RTL).

- `POST /api/panel`, `POST /api/buyer`, `GET /api/stats`
- `FORM_LIMIT` rate limit (5 per 60 s per IP), honeypot, strict CSP in `public/_headers`

## Dev

```sh
node --test                                        # unit tests
npx wrangler d1 migrations apply whose-side --local # create local tables
npx wrangler dev --local                            # http://localhost:8787
npx wrangler d1 migrations apply whose-side --remote # production schema
```

Deploys are manual (`npx wrangler deploy`).
