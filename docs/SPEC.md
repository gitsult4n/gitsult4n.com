# Whose Side — launch site spec

## What this is
A single-page validation site (EN/AR) for Whose Side, an independent audit of AI assistants and shopping agents by real, paid humans. It publishes the pre-registered method, recruits a panel, captures buyer interest and shows live real counts.

## What this is not
No ratings, no leaderboard, no scores, no invented numbers. The pilot has not run. Counts come only from D1; if the fetch fails the page shows "—".

## Data model (D1 `whose-side`, `migrations/0001_init.sql`)
`panel`: id, email (UNIQUE, ≤254), country (=2), assistants (comma-joined, ≤80), consent_at, created_at.
`buyers`: id, name (≤100), org (≤120), role (≤100), email (UNIQUE, ≤254), segment (≤20), budget (≤20, may be empty), note (≤500), created_at.
Every limit is a `CHECK(length(col) <= N)` and the same N is used by the validator in `src/worker.js`.

Enums: assistants = ChatGPT, Gemini, Claude, Copilot, Perplexity, Meta AI, Other. segment = insurer, ad_agency, procurement, regulator, researcher, ai_vendor. budget = lt_25k, 25k_100k, 100k_250k, gt_250k.

## API
All errors are JSON `{ok:false, error, field?}`. Responses are `no-store` except stats.

POST `/api/panel` (JSON, ≤8 KB): `{email, country (ISO-2), assistants[], consent:true, website:""}`.
POST `/api/buyer` (JSON, ≤8 KB): `{name, org, role, email, segment, budget?, note?, website:""}`.
- 200 `{ok:true}`: stored, honeypot filled (nothing stored), or duplicate email (indistinguishable).
- 400 `{ok:false,error:"invalid",field}` or `error:"bad_json"`.
- 413 `too_large`. 415 `content_type` (must be application/json). 429 `rate_limited`. 405 wrong method on a known route. 500 `server_error`.

GET `/api/stats` -> 200 `{panel, buyers, countries}`, `Cache-Control: public, max-age=30`.
Any other `/api/*` -> 404 `not_found`.

## Security
- CSP in `public/_headers`: everything `'self'`, no inline script or style, `frame-ancestors 'none'`, `object-src 'none'`.
- Rate limit: `FORM_LIMIT` binding, 5 per 60 s per `CF-Connecting-IP`, checked before body parsing.
- Honeypot field `website`, silently accepted.
- Emails trimmed and lowercased; duplicates ignored via `INSERT OR IGNORE`, so existence never leaks.
- No PII in logs: the worker never logs request bodies, emails or IPs.
- Parameterized SQL only.

## Privacy
Stored: what the forms collect, plus consent time and creation time. Used only to run the pilot and contact people. No analytics, no cookies. Deletion on request by email.

## After the pilot
Leaderboard and per-task receipts (human vs synthetic gap, vs verified cheapest baseline), published whatever the results show, behind the independence firewall (vendors never pay for a rating or seal).
