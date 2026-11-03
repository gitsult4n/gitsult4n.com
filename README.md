# Beacon — gitsult4n.com

**When you can't speak, your Beacon will.**

Beacon is a free QR lifeline for medical emergencies, lost children, loved ones with dementia or autism, pets, and travelers or pilgrims. A stranger scans it with any phone camera and gets:

- the facts that matter in the first ten minutes (allergies, conditions, medications, blood type, how to help)
- one-tap Call / SMS / WhatsApp to emergency contacts
- **Send my location**, which texts the family a map pin
- the right emergency number for the country the helper is in
- labels in their own language (English, العربية, Español, Français, Türkçe, اردو, Bahasa Indonesia), plus optional AI translation of the owner's own words
- read-aloud, a freshness date, and an optional PIN-locked private section

## Private by design

The whole profile lives **inside the URL fragment** (`https://gitsult4n.com/#…`). Browsers never send the fragment to a server, so the server never sees anyone's data. There is no database, no analytics, no cookies and no accounts.

- Profile → JSON → `deflate-raw` → **base43**. Base43 is the QR alphanumeric alphabet without space and `%`. The fragment is encoded as a QR *alphanumeric segment*, which makes codes about 25% denser than byte mode.
- The PIN-locked section uses AES-256-GCM, with the key derived from the PIN by PBKDF2-SHA256 (250k iterations). It is encrypted in the browser.
- Saved Beacons live in `localStorage` on the owner's device. Backups can be exported and imported as JSON.

## AI, opt-in

`/api/ai` runs a **fixed set of tasks**: make it clear and short, suggest first-aid steps, translate. It never takes a free-form prompt. The user picks the service and the model:

| Service | Models | Note |
|---|---|---|
| Cloudflare Workers AI | Mistral Small 3.1, Llama 3.3 70B, Qwen3 30B, Gemma 4 | Free daily allocation; inputs are not used for training |
| Google Gemini | Gemini 3+ Flash / Flash-Lite, live list from the Gemini API | Free tier: Google may use inputs to improve its products |

Requests are limited per IP, checked for same origin, and capped in size. Nothing is stored or logged. PIN-locked notes are never sent.

## Outputs

Lock-screen wallpaper (5 phone sizes, 3 styles) · wallet card (front and back) · wristbands · round stickers and tags · QR PNG/SVG · `.ics` review reminder. Every printed format also shows the critical facts as plain text.

## Stack

Static HTML/CSS/vanilla JS modules served by **Cloudflare Workers static assets**, plus one small Worker (`src/worker.js`) for `/api/*`. No build step.

```sh
wrangler dev                              # local (the AI binding calls Cloudflare remotely)
wrangler deploy                           # deploys to gitsult4n.com
wrangler secret put GEMINI_API_KEY        # enables the Gemini provider
```

Vendored: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT) and Space Grotesk (OFL).

---

Beacon helps strangers help you. It never replaces emergency services. Call them first.
