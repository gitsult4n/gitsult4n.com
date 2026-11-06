# Strategy: replacing gitsult4n.com with Whose Side

Date: 2026-11-06. Status: decision document, not a plan of record until the pilot gates are funded.

Labels used throughout. **VERIFIED** means the senior reviewer checked it (source in section 12). **INFERRED** means it comes from agent research and was not re-checked. All money and revenue figures are projections, never guarantees.

## Executive summary

1. **Decision:** build C21 "Whose Side", an independent, permanent panel of real people that audits AI assistants for sponsored or self-serving steering. It is kept with conditions.
2. **Honest verdict:** it is a modest winner. Weighted score 5.18/10 (ranking) or 4.90 (after red team). The red team would not fund an MVP yet. No concept of the 12 cleared a strong venture bar. A nonprofit or hybrid outcome is plausible.
3. **Ships now (phase 0):** the new gitsult4n.com launch site. It shows the published pre-registered method, panel signup, a buyer-interest/LOI form, and live real counts. It shows no ratings and no leaderboard, because none exist yet.
4. **Next real-world step:** a 300-person, 3-assistant, shopping-only pilot, plus 25 buyer conversations, with written go/kill gates.
5. **Money:** $25-40k for the pilot (INFERRED, agent estimate; the reviewer set it as the next step). Spend is capped at $50k until both gates pass. A realistic MVP is $400-700k (INFERRED), not the $250-450k the workflow claimed.
6. **Abandon if** the pilot finds no steering gap that synthetic prompts miss, or if 25 buyer conversations produce zero commitments.

## 0. How the decision was made

A 46-agent workflow produced 64 concepts, researched and attacked 12 of them, and had three blind judges (investor, product, operator) score them. The top 3 were developed into full plans and red-teamed, and a selector picked a winner. A senior reviewer then checked key claims and made the final call. Where the reviewer's notes and the workflow disagree, this document follows the reviewer.

Reviewer rulings that override the workflow:

| Topic | Workflow said | Ruling |
|---|---|---|
| Base-case revenue | $2-5M ARR from 3-5 buyers at $50-150k | Wrong. 3-5 x $50-150k = $150-750k. See section 6. |
| MVP budget | $250-450k | Likely too low. Use $400-700k (INFERRED). |
| "79% of ChatGPT replies" | Used as demand evidence | UNVERIFIED. Not used here. |
| Arena revenue | $30M vs $100M looked inconsistent | Both right at different dates (Jan 2026 vs mid-2026). |
| "Models cannot spot real humans" | Stated as fact | UNVERIFIED hypothesis. The pilot tests it. |
| Leaderboard on the launch site | Shown in first 5 seconds | Not built until a real human pilot exists. It would be fake functionality. |
| UK AI assurance market ~GBP 1B | Used as TAM proxy | Mostly services and governance. Context only. |

## 1. Concepts (64)

Early verdicts: **shortlist** (12) went to research and attack. **weak** means thin market, unsafe to run, or no clear payer. **reject-exists** means a close product already exists. **reject-no-business** and **reject-unsafe** are self-explanatory. These verdicts are agent judgements (INFERRED).

| ID | Name | One-liner | Early verdict |
|---|---|---|---|
| C01 | The Unbroken | 24/7 relay where verified strangers take turns speaking the names of the dead aloud. | shortlist |
| C02 | Your Minute | One live, unreplayable minute per verified human before a global audience, by lottery. | shortlist |
| C03 | Lost Homes | Rebuild vanished family homes as walkable 3D from photos and memories, evidence labeled. | shortlist |
| C04 | Keyholders | Vaults needing thousands of strangers' threshold keys present together to open. | weak |
| C05 | Secret Majority | Reveal a group's hidden majority or sealed truths only if threshold agrees. | weak |
| C06 | Hakam | Three named elders hear a dispute and sign a reasoned ruling in 48 hours. | weak |
| C07 | Ghost Tournament | Play asynchronously against reconstructed styles of famous or deceased players. | weak |
| C08 | Planet Heist | Annual global real-world puzzle heist with sponsored vaults and city clues. | reject-exists |
| C09 | Apology Auction | Crowd pledges unlock only if a company gives an on-camera apology. | weak |
| C10 | Collective Silence | Daily or sponsored synchronized silence where thousands of phones go quiet. | weak |
| C11 | Rent a Rumor | Brands seed sealed fictional urban legends; players verify or debunk. | weak |
| C12 | Crash Lab | Euro NCAP for home robots: buy, destroy-test publicly, rate for insurers. | shortlist |
| C13 | Frozen Wealth | Settlement rail dissolving multi-heir inherited property with consent tracking and buy-outs. | shortlist |
| C14 | Ten-Year Ledger | Seal big decisions, report outcomes at years 1-10, see cohort outcomes. | weak |
| C15 | Unrecorded | Certified no-recording rooms and dinners: sealed devices, sweeps, signed attestation, bond. | shortlist |
| C16 | Object Obituaries | Public survival curves for consumer products from owner-reported deaths. | shortlist |
| C17 | Heat Dose Ledger | Worker-held tamper-evident heat-exposure record triggering rest, pay and claims. | weak |
| C18 | Envoy | Vetted local person stands in for you at grave, wedding or bedside, live. | weak |
| C19 | Quorum Letters | Letters and vaults opening only when N chosen people are physically together. | weak |
| C20 | Meanwhile | Strangers awaiting the same verdict reveal it simultaneously and regroup by outcome. | weak |
| C21 | Whose Side | Permanent real-human panel audits AI assistants for sponsored or self-serving steering. | shortlist |
| C22 | Perpetual Care | Trustee holding dead people's AI personas in escrow with endowment and verified deletion. | weak |
| C23 | Summons | Lottery-drawn verified human juries resolving agent-era micro-disputes. | weak |
| C24 | Scriptorium | Attested no-AI rooms producing certified unassisted human work for labs and schools. | weak |
| C25 | Quorum Bloc | Verified-human blocs pre-commit to switch; agents auction the crowd to suppliers. | shortlist |
| C26 | Ovation | Gift anyone a live, synchronized planetary standing ovation from strangers. | weak |
| C27 | Holiday Lab | Studio that invents and tests new global rituals sold to sponsors. | weak |
| C28 | The Committee | Virtual pop star authored by 50,000 voters with royalty ledger. | weak |
| C29 | The Rewind | Synchronized spoiler-free replay of internet history day by day. | weak |
| C30 | Dream Weather | Live planetary forecast of what people dreamed, from voice notes. | weak |
| C31 | ClaimBond | Brands escrow bonds behind falsifiable claims; challengers can win by proving false. | weak |
| C32 | Bayt | Remittances released against verified construction milestones for family homes. | weak |
| C33 | Forever Lock | Waqf-style trust making a domain, repo or company permanently unsellable. | weak |
| C34 | Quorum Company | Company incorporates only when customers, engineers and capital all pledge. | weak |
| C35 | Sawt | Speaker-owned co-op of consented village-level Arabic dialect speech licensed to AI. | shortlist |
| C36 | Canary | Planted AI errors test human overseers; catch rate becomes certified credential. | weak |
| C37 | Handover | Vendor payment vests only when successor passes independent unaided exam. | weak |
| C38 | Sanad | Skill credentials as graded chains of who taught whom. | weak |
| C39 | Match Day | Global stable-matching day pairing apprentices with masters of endangered trades. | weak |
| C40 | Heir | Human masters reverse-engineer a late relative's craft and coach you to continue it. | weak |
| C41 | Teaching League | Public ranking of teachers by randomized beginners' 30-day improvement. | weak |
| C42 | Shajara | Scroll-reading, witness-verified Arab family lineage graph. | weak |
| C43 | Sawm Lab | Opt-in population-scale fasting physiology instrument during Ramadan. | weak |
| C44 | CrushZero | Browser game redesigning gates to prevent crowd crushes, feeding safety ratings. | weak |
| C45 | Hilal | Global crowd crescent-sighting network verified by computer vision. | weak |
| C46 | Arud League | Live poetry duels with real-time meter and rhyme analysis. | weak |
| C47 | The Last Seen | One public posthumous message per verified human, released after death. | reject-exists |
| C48 | Quorum Weather | Verified-human mood index rendered as live weather. | weak |
| C49 | Dead Domain Pen Pals | Adopt an abandoned website and answer its mail yearly. | reject-no-business |
| C50 | Mirror of Strangers | 100 strangers give first impressions of you. | reject-exists |
| C51 | Sealed Predictions | Timestamped sealed predictions and calibration credential. | reject-exists |
| C52 | Promise Escrow | Public commitments backed by stakes. | reject-exists |
| C53 | Unsaid | Unsent letters routed to strangers or drifting on simulated ocean currents. | reject-exists |
| C54 | Proof of Reality | AI agents buy attested photo or video ground-truth checks from nearby humans. | reject-exists |
| C55 | Honest Price | Crowdsourced receipts of what everyone actually paid. | reject-exists |
| C56 | The Unfinished | Marketplace for abandoned projects to be finished by others. | reject-no-business |
| C57 | One Human a Day | Daily 3-minute live-translated call with a random foreigner. | reject-exists |
| C58 | Same Moment | Find strangers who shared a place and time with you. | reject-no-business |
| C59 | Opponent | Matched with smartest ideological opponent for structured talk. | reject-exists |
| C60 | AI Selves | Aged-self simulation, AI twin interviewer, life-decision simulator. | reject-exists |
| C61 | Human IPO | Sell shares of your future income. | reject-unsafe |
| C62 | HOLDOUT | Public wall of hash-sealed questions AI cannot answer, attacked live by each new model. | shortlist |
| C63 | Human Authorship | Prove human writing by recording the writing process. | reject-exists |
| C64 | Daily Consensus | Daily game guessing what the world majority will pick. | reject-no-business |

Note: the shortlist and ranking list C05 as "Unasked" (a mutual-reveal concept), while the master list names C05 "Secret Majority". The two descriptions are close but not identical. See open questions.

## 2. Market research (12 shortlisted)

All competitor findings below are INFERRED (agent searches, about 9 per concept, mostly US-only) unless marked. "Novelty" was rated "dramatic-improvement" for all 12, which is a weak signal because the agents had no stricter category. Absence of a competitor in a search is not proof of absence.

| ID | Concept | Closest competitors and analogs | Why they won or lost | Gap found | What would be different |
|---|---|---|---|---|---|
| C21 | Whose Side | Arena (LMArena), Consumer Reports, academic steering audits (arXiv), The Markup Citizen Browser, Mozilla Rally, Nielsen panels, Armilla / ISO 42001 | Arena monetizes a public leaderboard via labs. Citizen Browser and Rally proved real-human panels work but did not scale (Rally under 1,000 users). Nielsen shows buyers pay for metered panels, at high cost. | No standing real-human steering audit with receipts. Existing audits use synthetic prompts and are one-off. | Real people in real accounts, pre-registered tasks, funding firewall. |
| C12 | Crash Lab | IIHS (analog), UL Solutions, TUV SUD, Consumer Reports labs, humanoid insurers | IIHS works because insurers fund it from huge auto premiums. UL and TUV are maker-paid and publish no star ratings. | No public comparative physical-harm rating of home humanoids. | Open protocol, insurer co-funding. |
| C62 | HOLDOUT | Humanity's Last Exam, Scale SEAL, Epoch FrontierMath, K Prize, LMArena | Public sets saturate fast. | No hash-committed public question wall with survival clocks. | Commit-reveal, escrow, author royalties. |
| C15 | Unrecorded | Yondr, club no-filming rules, court smart-glasses bans, bug-sweep firms | Yondr is cheap and visible but seals phones only. | No audited "verified unrecorded" standard with a liability bond. | Neutral certifier with insurer-backed bond. |
| C02 | Your Minute | Jumbotron, BeReal (acquired), Periscope, Meerkat, Houseparty (dead) | Live-video apps without a reason to return died. | No equal, lottery-allocated live slot. | Ritual and occasion product. |
| C01 | The Unbroken | Name-reading vigils, perpetual adoration, 24/7 prayer | Works when finite and tied to a date. Perpetual chains broke when volunteers dwindled. | No unbroken relay with family-recorded pronunciation. | Staffed institution, not an app. |
| C03 | Lost Homes | VRJ Palestine, Forensic Architecture, Rekrei, Al Jazeera Bayt Nabala | Artist-led, one-off, not self-serve. | No self-serve home-scale reconstruction from photos and memory. | Testimony chain as the product. |
| C05 | Unasked / Secret Majority | Facebook Secret Crush, Down, Mutual | Distribution came from Facebook's graph. | Mutual reveal not generalized beyond dating. | Start in closed communities (co-founders, M&A). |
| C13 | Frozen Wealth | Saudi MoJ Estates platform (Najiz), US UPHPA, heirs' property relending | Najiz is free and official. A process tool, not a funded buy-out layer. | No private funded buy-out layer in Saudi/GCC. | License onto Najiz, own the capital stack. |
| C25 | Quorum Bloc | Which? Big Switch (dead), Switch Together, Bought By Many, Rocket Money | Group switches got sign-ups but few switched and big suppliers declined. | No binding, verified, no-personalized-pricing bloc. | Binding commitment, terms-based auction. |
| C16 | Object Obituaries | Consumer Reports and J.D. Power surveys, SquareTrade, Backblaze Drive Stats | Brand-level, survivor-biased surveys. | No public per-model failure curves with denominators. | Register at purchase to get a true denominator. |
| C35 | Sawt | Mozilla Data Collective, Te Hiku Media, Defined.ai, SDAIA SADA corpus | Mozilla is a marketplace; revenue goes to organisations, not speakers. | No speaker-owned Arabic dialect cooperative. | Binding speaker ownership, royalties, waqf fund. |

Notes:

- C21 is the only one where the competitor field shows a funded buyer class (AI labs pay Arena) and a hot, dated trigger (ads in AI answers).
- VERIFIED: ChatGPT ads have been live since 2026-02-09 for US Free/Go logged-in adults, labeled "sponsored" and shown below answers. Self-serve Ads Manager opened 2026-05-05. OpenAI says ads do not shape answers. So hidden steering in production assistants is **unproven**, and that is the question the pilot tests.
- VERIFIED competitors in the human-audit space: RealHumanTests (vendor-paid real-human audits, no steering focus), Writesonic AI Ads Index (synthetic sampling, about 3% of answers showed ads on 2026-06-19), HiBot (human-run brand-visibility audits). None found combining an independent real-human panel with sponsored-steering ratings. This is absence of evidence from a US-only search.
- Weakest ideas were killed by the same pattern: no payer is obliged to buy (C12, C15, C03, C01) or the product is episodic (C13, C16).

## 3. Top three finalists and ranking

Rubric and weights (VERIFIED, from the reviewer): originality 20, market 20, viral 15, revenue 15, retention 10, feasibility 10, moat 10. Scores are 0-10 means of three blind judges (investor, product, operator). Weighted score = sum of score x weight / 100.

| Rank | ID | Concept | Orig | Market | Viral | Revenue | Retention | Feasib | Moat | Weighted |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | C21 | Whose Side | 6.5 | 5.2 | 6.5 | 4.0 | 4.0 | 3.7 | 5.0 | 5.18 |
| 2 | C12 | Crash Lab | 7.0 | 4.2 | 7.5 | 3.2 | 3.0 | 3.8 | 4.0 | 4.92 |
| 3 | C13 | Frozen Wealth | 5.3 | 5.5 | 3.0 | 5.8 | 2.2 | 4.0 | 5.3 | 4.64 |
| 4 | C35 | Sawt | 5.2 | 4.5 | 4.0 | 4.8 | 3.0 | 5.7 | 4.3 | 4.56 |
| 5 | C62 | HOLDOUT | 6.0 | 3.8 | 5.5 | 3.2 | 3.2 | 6.5 | 2.7 | 4.50 |
| 6 | C15 | Unrecorded | 6.0 | 3.0 | 5.3 | 3.2 | 4.0 | 5.5 | 3.0 | 4.33 |
| 7 | C25 | Quorum Bloc | 3.8 | 5.8 | 4.3 | 5.5 | 3.0 | 3.5 | 3.0 | 4.31 |
| 8 | C16 | Object Obituaries | 4.5 | 4.0 | 5.0 | 4.0 | 2.8 | 5.7 | 2.5 | 4.15 |
| 9 | C02 | Your Minute | 6.5 | 3.3 | 6.5 | 3.0 | 2.2 | 3.0 | 2.2 | 4.13 |
| 10 | C01 | The Unbroken | 6.7 | 2.2 | 5.5 | 2.8 | 4.0 | 4.5 | 2.7 | 4.13 |
| 11 | C03 | Lost Homes | 6.2 | 3.0 | 5.8 | 2.2 | 2.0 | 4.5 | 3.2 | 4.00 |
| 12 | C05 | Unasked | 3.0 | 3.2 | 5.0 | 3.0 | 2.2 | 7.8 | 1.2 | 3.55 |

The ranking weighted scores are the workflow's figures (INFERRED, not recomputed by the reviewer). After red-teaming, the selector re-scored the finalists: Whose Side 4.90, Crash Lab 4.45, Frozen Wealth 4.40. The gap between the first and second place is small. The judges' common reason for the top slot: the most plausible category-creating idea, but with no clear payer.

The three finalists in one line each:

- **Whose Side:** cheapest decisive test ($25-40k), timely, software-heavy, multiple buyer types, personal share loop. Weak on payer and independence.
- **Crash Lab:** the strongest reaction ("IIHS for home robots"). Tiny payer pool, heavy capex, legal risk, founder lacks robotics or insurance credibility.
- **Frozen Wealth:** a real, documented, paid pain with a regional edge. It is a regulated lender and legal-ops business, not software, and it has almost no virality.

## 4. Critical evaluation

### 4.1 Red-team findings (INFERRED, agent red team)

**Whose Side**

- Fatal flaws: (a) independence versus revenue, since rated vendors are the only obvious payers and their money destroys the trust that is the product; (b) no identified budget line at any insurer, regulator or advertiser; (c) stipends scale linearly with panel size while revenue does not.
- Serious risks: defamation and vendor ToS claims; rare steering events give thin statistical power; vendors patch behavior only for detectable panelists; panel fraud; unclear nonprofit versus venture shape; reliance on unverified eval-awareness claims.
- Unit economics: 2,000 panelists at under $10 a month is about $240k a year in stipends alone, about the whole workflow MVP budget before staff. Base case 3-5 buyers gives $150-750k, below MVP burn of $40-70k a month.
- Missing: a named design-partner buyer, a funding structure, a statistician or academic co-author, a media partner. A founder-only plan on a personal domain carries no brand authority. Saudi base is a neutrality liability.
- Verdict: wouldFundMVP = false.
- Red-team conditions: pre-register and publish regardless of outcome; 3 signed LOIs or paid pilots at $25k+ (or one $100k+ grant) before MVP spend; counsel clears PDPL, GDPR and defamation before named publication; written firewall (vendors pay only for private diagnostics, never rating or seal); pilot shows at least 20% of steering missed by matched synthetic prompts; cap spend at $50k until both gates pass; choose nonprofit or hybrid early; no Saudi launch ahead of SDAIA and legal review.

**Crash Lab**

- Fatal flaws: no committed payer (humanoid insurance about $157M by 2032, with no loss data); its own gate needs insurer money before the first test, which insurers have no reason to give; maker pre-certification is the only reliable income and it corrupts credibility.
- Risks: defamation, EULA and anti-circumvention suits from makers; few retail units until 2027+; ratings go stale each firmware update; cybercrime and defamation exposure for a founder in Riyadh; injury during destructive tests.
- Unit economics weak: base case $2-4M by year 3 against $2-4M annual production cost. One serious maker suit can exceed $500k. Fund only phase 0 ($30-60k).

**Frozen Wealth**

- Fatal flaws: the binding constraint is heir consent, minors and court authority, not software; a funded buy-out spread is lending or investment and likely needs CMA, SAMA or REGA licensing plus Sharia approval; TAM unquantified (one data point: 2,127 court cases, revenue ceiling about SAR 60M); without Najiz it is a free calculator, with Najiz the government can absorb it.
- Risks: elders and hold-outs veto outsiders; predatory-pricing perception for women and minors; lumpy 6-18 month cycles; adverse selection; capital partner dependency.
- Phase 0 only, capped at $80k. wouldFundMVP = false.

### 4.2 The critic's weak claims that remain

The workflow's critic listed weak claims in the winner's plan. Status after review:

| Weak claim | Status |
|---|---|
| "Highest ceiling" contradicts judges' "modest winner, likely nonprofit" | Remains. This document says modest winner outright (section 5). |
| "Models cannot spot real humans" asserted; eval-awareness numbers secondhand | Remains. UNVERIFIED. Treated as a hypothesis the pilot tests. |
| "Test it on me" runs 3 assistants on the user's purchase, which is synthetic non-panel data | Remains. Must be labeled as a demo, not panel evidence. Post-pilot only. |
| Novelty rests on about 9 US-only searches | Remains. Needs a global search, including Prolific and Arena. |
| "Software-light" contradicts a privacy-heavy panel, fraud control, statistics and legal ops | Remains. Founder cannot do this alone. |
| Arena ARR $30M vs $100M | Resolved by reviewer: both right at different dates. |
| UK AI assurance GBP 1B as TAM | Resolved: context only. |
| Seal ban vs vendor-paid private diagnostics is still issuer-pays | Remains. The firewall is asserted, not designed. It needs a written policy and a governance structure. |
| Base case $2-5M from 3-5 buyers at $50-150k | Resolved: arithmetic was wrong (section 6). |
| "25k+ LOIs from 25 conversations", no conversion basis | Remains. No basis for the conversion rate. The gate is 3 commitments from 25 conversations (a 12% rate), which is a hypothesis. |
| Numbers without assumptions (MVP $250-450k, production $1.5-3M, 60% 90-day retention, under-$10 stipend, 20% and 3x gates, bull $8-15M) | Partly resolved. MVP re-ranged. The rest stay INFERRED and are set as gate hypotheses, not facts. |

## 5. The winner: Whose Side

**Why it wins:**

- Highest weighted score both before (5.18) and after (4.90) red-teaming.
- Cheapest decisive test: a $25-40k pilot answers the two things that matter, whether real-human sessions detect steering that synthetic prompts miss, and whether anyone will pay.
- Timely. Ads in ChatGPT are live (VERIFIED), and academic work shows steering is measurable in the lab (section 6).
- Multiple possible buyers (ad agencies, insurers, procurement, regulators, foundations).
- A personal share loop with real viral potential.
- Mostly software and data, which fits the founder.

**Honest line:** this is a modest winner. It scored 5.18/10. The red team would not fund an MVP yet. No concept cleared a strong venture bar. A nonprofit or hybrid outcome is plausible, and this document does not assume venture-scale returns.

**Grafts from the runners-up (INFERRED, selector's choice):**

- From Crash Lab: show raw evidence, pre-register a public protocol, use a foreign-entity structure, and get counsel before any named publication.
- From Frozen Wealth: validate by hand first with hard kill gates, and run an ethics protocol. Take its Arabic-first GCC trust wedge with local panels.

**Switch conditions:**

- Switch to Crash Lab if two insurers or reinsurers sign paid pilots and counsel clears UK/EU testing.
- Switch to Frozen Wealth if a bank or fund gives an LOI, a Sharia and CMA opinion clears the spread, and a concierge phase 0 closes 60% or more of 15 estates.

**Abandon Whose Side if:** the pilot shows no gap that synthetic prompts miss, or there are zero buyer commitments after 25 conversations.

## 6. Why it could become a multimillion-dollar business

This is a hypothesis with a real chance of failure.

**Mechanisms**

1. Annual data and evidence licences ($50-150k each, INFERRED) to ad agencies, insurers, procurement teams and regulators.
2. Fixed-fee private diagnostics for vendors, paid up front, with no influence on what is published.
3. Custom audits for enterprises choosing shopping or procurement agents.
4. Grants for the public layer.
5. Small consumer premium ($3-5 a month). Not expected to carry the business.

**Evidence the problem is real**

- VERIFIED: arXiv 2604.08525 "LLM and Conflicts of Interest" (Apr 2026): most of 23 models recommended the pricier sponsored option over half the time. Write-ups say 18/23 or 15/23, so cite "most".
- VERIFIED counterpoint: arXiv 2605.12772 "Just Ask for a Table" (May 2026): a 30-token user prompt cut sponsored recommendations from 46.9% to 1.0% across 12 open models. Steering is real but user-mitigable in the lab. This also gives a cheap, shareable consumer tip.
- VERIFIED: arXiv 2609.18729 "If I Had to Buy Just ONE" audits ChatGPT, Gemini and AI Overviews. The "79%" figure from the workflow is UNVERIFIED and is not used.
- INFERRED: about half of users in a 179-person study missed disclosed chatbot ads; a sponsor-run poll says 75% of Americans would trust AI shopping less if results are sponsored. Both are weak demand evidence.

**Comparables**

- VERIFIED: Arena passed $100M annualized run rate in mid-2026 (company blog; Sacra estimate June 2026), up from $30M+ in Jan 2026. A $200M Series B at $3.1B (Oct 2026) is secondhand (INFERRED). Arena measures preference, not steering, so it proves labs pay for human-evaluation leaderboards, not that anyone pays for steering ratings.
- Consumer Reports and J.D. Power show independent ratings can be a business. Both are slow, trust-built institutions.
- UK AI assurance sector (about GBP 1B, 524 firms) is context only: mostly services and governance.

**Corrected math (arithmetic, from the reviewer's correction)**

| Case | Buyers | Price per buyer | ARR |
|---|---|---|---|
| Workflow "base" as written | 3-5 | $50-150k | $150k-750k (not $2-5M) |
| Reaching $2-4M | 20-40 | about $100k | $2-4M |
| Reaching $5M | about 50 | about $100k | $5M |
| Reaching $8-15M ("bull") | 80-150 | about $100k | $8-15M |

So a $2-5M ARR year-3 case needs roughly 20-50 licence buyers. Nobody has yet shown that even three buyers exist. Until the 25 conversations are done, treat anything above $750k ARR as unsupported.

## 7. Product experience

The product has two states. Do not blur them.

### 7.1 What the launch site shows now (phase 0, no pilot yet)

Everything on this list is real. Nothing is simulated.

- **First visit:** one plain page. Headline: "Whose side is your AI on?" Under it: "We are finding out, with real people. Nothing is rated yet."
- **First 5 seconds:** the question, one sentence that says no ratings exist yet, and three links: Method, Join the panel, Buyers. No fake leaderboard, no placeholder numbers.
- **Curiosity:** the question accuses a daily-use tool. The honest "not rated yet, here is exactly how we will do it" is the hook for people who read the method.
- **Interaction:**
  - Read the pre-registered method (tasks, how humans are verified, who funds us, what vendors cannot buy).
  - Sign up for the panel. This measures recruitability and cost per signup, which is part of the biggest assumption.
  - Submit buyer interest (willingness-to-pay, LOI capture).
- **Live counts:** real signups and real buyer-interest submissions. If the count is 12, it shows 12.
- **Sharing:** the method page and a post about the pre-registered test. There is nothing to brag about yet, so sharing is small. That is acceptable at this stage.
- **Return tomorrow:** weak and honest. Visitors return for pilot updates, not for daily content. A mailing list is the only retention tool.

### 7.2 What appears after the pilot (only if real data exists)

- **First 5 seconds:** a leaderboard of assistants with a steering rate and sample size, each number clickable to a redacted receipt. Rates are shown with confidence intervals. Named publication waits for counsel.
- **Curiosity:** a named assistant with a percentage and a real receipt.
- **Interaction:** browse receipts by category; "Test it on me" lets a visitor enter one planned purchase and see three assistants answer side by side, with the cheapest verified baseline revealed after. Label it clearly: it is a live demo on the visitor's own query, not panel data. This is the critic's point, and it stays labeled.
- **Sharing:** a share card in local currency, such as "Assistant X steered me 18% above the best price" (illustrative). Journalists get a citable number with receipts after each round. Vendor rebuttals become public changelog stories.
- **Return tomorrow:** weak. The leaderboard moves slowly. Retention comes from events: a "steering watch" when a vendor changes behavior or launches ads, an alert when your assistant's rate moves, and a rolling task calendar for panelists. Expect a monthly habit, not a daily one. The revenue model must not depend on daily use.
- **Consumer tip:** "Just Ask for a Table" suggests a short prompt can cut steering sharply in lab settings (VERIFIED). A "how to protect yourself" tip is a cheap, shareable hook, but it must be tested on real panelists before the site claims it works.

## 8. Business model

**Identity.** An independent, standing audit of AI assistants and shopping agents, run by paid real humans instead of test prompts. Consumer Reports crossed with an Arena-style leaderboard, but the evidence is real-human sessions.

**Brand and tagline.** Working name "Whose Side". Working tagline: "Whose side is your AI on? Real people checked." The name is generic. Trademark status is unchecked (INFERRED: two US-only searches found no conflict; absence is not clearance). Run SAIP, USPTO and EUIPO searches. The red team also says independence needs its own neutral brand and governance, so decide a neutral domain separate from the founder's personal one. gitsult4n.com is the holding page.

**Audience.**

- The attention engine: consumers and journalists.
- The payers (hypothesis): regulators and consumer-protection bodies, advertisers and agencies, insurers and enterprise procurement, AI vendors (private diagnostics only), foundations.

**Market.** Real need, unproven category. Agent-era commerce is starting, ads inside AI answers are live (VERIFIED), and no one has shown a budget line for steering ratings. Realistic niche per the workflow: single-digit to low-double-digit millions ARR (INFERRED).

**Revenue.** As in section 6. The public leaderboard and receipts stay free. Revenue is B2B data licences, private diagnostics at a fixed fee, custom audits and grants.

**Premium.** Consumer premium (alerts, category reports) at about $3-5 a month is a minor add-on. Never gate the leaderboard.

**Independence firewall (must be written before revenue).**

- Vendors may not pay for a rating, badge, seal or placement. Publication results are identical whether or not a vendor pays.
- Vendors may pay only for private diagnostics, up front, with fees disclosed on the site.
- Vendors get a right of reply, not a veto.
- Methodology is pre-registered and published, including negative results.
- Funders are listed publicly. No single funder above an agreed share of revenue.
- Governance by an independent board or academic partner, decided at the hybrid-structure step.

The critic is right that vendor-paid diagnostics are still a conflict. The firewall reduces it. It does not remove it. Arena is already criticized for being funded by the labs it ranks.

**Organic growth.** Quarterly named reports with receipts (after counsel), share cards, vendor response stories, academic co-publication, an open versioned dataset subset, and paid panelist referrals.

**Marketing.** Embargoed pitches to tech and consumer journalists, public pre-registered test lists, conference talks (AI safety, consumer protection, ad-tech), sample datasets to a few regulators and insurers before launch, and build-in-public on GitHub.

**Global expansion.** Arabic-first GCC wedge, taken from the Frozen Wealth graft: shopping and travel in Saudi/GCC with local panels, plus one English market (UK or US) for press reach. Local panels are the regional moat, because sponsored results differ by country. Add countries by recruiting through survey partners. Each market needs a consent model checked by counsel. Keep regional storage options from day one. Caution from the red team: ranking national AI vendors from Saudi is politically sensitive, and a Saudi base is a trust liability for global neutrality. No Saudi launch ahead of SDAIA and legal review. Entity location is an open question.

## 9. Financial strategy

All budget and scenario numbers are INFERRED agent estimates, adjusted where the reviewer said so. They are planning ranges, not quotes. Get real panel quotes from Prolific or a similar provider before trusting the stipend math.

### 9.1 Budgets

| Phase | Budget | Duration | Main assumptions | Status |
|---|---|---|---|---|
| Validation pilot | $25-40k | 8-10 weeks | 150-300 panelists at $15-30 per task batch, 3 assistants, shopping only, founder builds with AI tools, $5-8k privacy counsel, $3k tooling | INFERRED. Red team: plausible if tasks are narrow, but power is thin (about 100 panelists per assistant) |
| Buyer proof | $10-20k | 6-8 weeks, overlaps pilot | 25 qualified buyer conversations using pilot output | INFERRED |
| MVP | $400-700k | 6 months | 2,000 panelists, stipends, 1.5 FTE analyst/statistician, counsel, security review, public site, ingest pipeline | INFERRED (reviewer range; the workflow's $250-450k was too low) |
| Production | $1.5-3M a year | 12-24 months | 5-10k panelists, 3-4 markets, 8-12 staff, legal and defamation insurance | INFERRED. Red team expects up to 2x overrun. Credible only with real revenue |

### 9.2 Monthly opex (INFERRED)

| Phase | Monthly | Notes |
|---|---|---|
| Pilot | $5-8k | |
| MVP | $40-70k | Stipends $15-25k, people $20-35k, legal and infrastructure $5-10k |
| Production | $125-250k | Stipends scale roughly linearly with panel size. Components not itemized by the workflow |

### 9.3 Scenarios

These are the workflow's scenarios with the reviewer's arithmetic correction applied. The base case below is **not** the workflow's.

| Scenario | Assumptions | Year 1 | Year 3 |
|---|---|---|---|
| Bear | No buyer adopts the ratings as a reference. Revenue is grants and a few small custom audits. Vendors withdraw cooperation. One legal threat. | $0-150k, mostly grants | $0.4-1M, likely needs a nonprofit or hybrid shape |
| Base (corrected) | 3-5 buyers pay $50-150k a year for datasets. A few vendors pay fixed fees for private diagnostics. Grants cover the public layer. | $150-500k | $150-750k from licences, plus diagnostics and grants. Reaching $2M ARR needs about 20 buyers at $100k |
| Bull | A regulator or insurer standard references the ratings. Ad disclosure rules drive demand. 10+ enterprise data customers and multi-market panels. | $0.5-1M | $8-15M needs 80-150 buyers at about $100k. Not guaranteed |

The base case does not cover MVP burn of $40-70k a month ($480-840k a year) without grants. Unit economics do not close without grants. This is why the hybrid structure matters.

### 9.4 Risks (summary)

Independence paradox, panel economics, defamation and ToS claims, PDPL/GDPR consent, statistical power, vendor adaptation, panel fraud, copycats, founder dependency, and reliance on unverified eval-awareness evidence. Copycat scenario: Arena (large funding) adds a real-human shopping-steering track in 6-12 months; Consumer Reports, Which? or Prolific could follow, and labs could publish their own steering metrics. The method is public, so a copy takes months. The defense is the track record, the funding firewall, and local panels (INFERRED).

### 9.5 Phased investment with go/kill gates

| Phase | Spend | Go gate | Kill gate |
|---|---|---|---|
| 0. Pilot plus 25 buyer conversations | $25-40k (cap $50k until both gates pass) | 300 panelists complete tasks; significant steering gaps between 3 assistants; at least 20% of detected steering missed by a matched synthetic-prompt run (the 20% is an arbitrary threshold, INFERRED); counsel clears consent; 3 LOIs or paid pilots at $25k+, or one $100k+ grant | No significant difference; recruitment cost per valid session above about 3x plan; counsel says consent is unworkable; zero commitments after 25 conversations |
| 1. Public MVP | $400-700k | 2,000 panelists with 60% 90-day retention at under $10 a month (aspirational; Rally stalled under 1,000 users); 100k+ visits from first release; 2+ paying contracts | 90-day retention below 35%; stipend cost per usable session cannot fall by half; no revenue after 9 months |
| 2. Production | $1.5-3M a year | Revenue covers at least 40% of costs plus a reference-standard signal from one regulator or insurer | Revenue below 25% of cost after 12 months, or independence compromised by vendor dependence |

Statistical power must be computed before the pilot starts. At 300 panelists across 3 assistants, rare steering events give thin per-assistant results. The pilot should pick a high-steering vertical (shopping), use paired baselines, and publish confidence intervals.

## 10. Implementation roadmap

**Phase 0: this launch site (now).** Replace the personal site with the honest validation surface: method page, panel signup, buyer-interest/LOI form, live real counts. No ratings, no leaderboard, no "Test it on me". Technical shape from the plan (INFERRED): a static site on Cloudflare (Workers, R2, D1) is enough for counts and forms. The ingest and redaction backend is separate and comes in the pilot. Do not collect panelist personal data beyond signup until counsel clears the consent model.

**Before the pilot starts (weeks 0-4).**

- Engage counsel (see the legal section).
- Write the pre-registered method and the firewall policy.
- Compute statistical power. Recruit a statistician or academic co-author.
- Get real panel cost quotes.
- Decide on a neutral brand and domain.
- Begin buyer conversations using the method and signup data.

**Pilot (about 8-10 weeks, $25-40k).** 300 panelists, 3 assistants, shopping only, with a matched synthetic-prompt run. Task-based sessions, not always-on metering. Redaction on device. Publish the result regardless of outcome. Run the 25 buyer conversations in parallel. Apply the gates in 9.5. Include the pilot's own test of the premise that models cannot spot real humans, and make that the headline claim only if it holds.

**MVP (about 6 months, $400-700k, only if gates pass).** Public leaderboard and receipts in one vertical and 1-2 markets (GCC plus UK or US). Panel growth to 2,000. First paying contracts. Counsel review before named publication. Choose nonprofit or hybrid structure here at the latest.

**Production (12-24 months, $1.5-3M a year).** More verticals (travel, insurance, financing), more countries, data products and API, 8-12 staff.

**Ten-year view (hypothesis, INFERRED).** By about 2030, agents may buy and book for people, and sponsored placement in answers may be normal. Regulation (EU AI Act transparency, ad-disclosure rules) may create demand for third-party evidence. Eval-aware models make synthetic testing weaker. Three outcomes:

| Years | Likely state |
|---|---|
| 1-2 | Pilot, then either a go (MVP) or a kill. Most likely result is a published study, with or without a business. |
| 3-5 | If it works: a hybrid institute with a nonprofit public layer and a for-profit data arm under a firewall. Revenue in the hundreds of thousands to low millions. |
| 5-10 | Best case: "agent outcome assurance" becomes a category and a regulator or insurer references the ratings. Likely case: a small, respected institute or a research project acquired or absorbed by an incumbent (Consumer Reports, Arena, an insurer). Worst case: labs publish their own steering metrics and the independent rating looks redundant. |

No exit analysis was done by the workflow. That is a gap.

## 11. Legal and regulatory must-dos

Get qualified counsel before naming any vendor or collecting panelist data. Everything below is INFERRED from agent research. None of it is legal advice.

1. **Saudi PDPL (SDAIA):** consent, sensitive-data and cross-border transfer limits. Panel payments and content monitoring may need licensing. Ranking national AI vendors is politically sensitive. No Saudi launch ahead of SDAIA and legal review.
2. **GDPR:** special-category risk for panelists in the EU or UK. Anonymized receipts can be re-identified. Treat redaction as a legal control and test it.
3. **CCPA and US state law** for US panelists. FTC deceptive-claims risk applies to any seal or badge.
4. **Defamation and trade libel:** a published steering rate that names a vendor can hit its revenue. Needs counsel review, pre-registered method, right of reply and media liability insurance before any named publication.
5. **Vendor terms of service and CFAA:** check whether panel-based testing of ChatGPT, Gemini and others, including browser extensions, violates ToS. This was never verified.
6. **Entity and jurisdiction:** the red team advises a foreign or neutral entity and keeping the founder out of the legal chain for named publications. Choose nonprofit, hybrid or venture structure with counsel.
7. **Seal rules:** no vendor-paid seal. If a seal ever exists, it is earned from published results and revocable.
8. **Trademark:** SAIP, USPTO, EUIPO search on "Whose Side" and the domain.
9. **Panelist protections:** informed consent, fair pay, right to withdraw, data-retention limits, and fraud controls.

## 12. Open questions

1. Is C05 "Unasked" (shortlist and ranking) the same concept as master-list C05 "Secret Majority"? The IDs match but the names differ.
2. Which structure fits: nonprofit, hybrid (nonprofit public layer plus for-profit data arm), or venture?
3. Who is the first named design-partner buyer? Does any insurer, regulator or procurement team have a budget line for steering ratings?
4. What does a real panelist cost per valid session? The workflow never quantified it.
5. What sample size per assistant is needed to detect steering at realistic rates?
6. Who is the statistician or academic co-author, and the media partner?
7. Is there a competitor outside the US searches that already runs a real-human steering panel (Prolific, Arena, regional players)?
8. Does the premise "models cannot spot real humans" hold? The headline numbers are unverified.
9. Where should the entity sit, given the neutrality concern around a Saudi base?
10. Is the name "Whose Side" available and defensible, and should the independence brand use a separate domain?
11. Do the workflow's two scoring sets (5.18 ranking and 4.90 after red team) need to be reconciled further? The reviewer accepted both as stage scores.

## 13. Sources

VERIFIED by the reviewer:

- arXiv 2604.08525, "LLM and Conflicts of Interest": https://arxiv.org/abs/2604.08525
- arXiv 2605.12772, "Just Ask for a Table": https://arxiv.org/abs/2605.12772
- arXiv 2609.18729, "If I Had to Buy Just ONE" (existence verified; the 79% figure is not): https://arxiv.org/pdf/2609.18729
- Arena (ex-LMArena) $100M annualized run rate (company blog and Sacra estimate; see also): https://dealroom.co/news/136344-arena-the-ai-leaderboard-everyone-uses-hits-100m-in-annualized-revenue/
- RealHumanTests: https://realhumantests.com (the reviewer also cites Writesonic AI Ads Index and HiBot without URLs)

INFERRED (agent research, not re-checked):

- Arena $150M Series A at $1.7B, about $30M ARR (Jan 2026): https://multiples.vc/private-comps/lmarena
- Sponsored chatbot ads study (179 people): https://singularityhub.com/2026/05/08/you-probably-wouldnt-notice-if-a-chatbot-slipped-ads-into-its-responses/
- Quad/Harris sponsor-run poll: https://letsdatascience.com/news/survey-finds-sponsored-ai-shopping-reduces-consumer-trust-dce6ecee
- Eval-awareness (Apollo, Sonnet 3.7): https://www.apolloresearch.ai/blog/claude-sonnet-37-often-knows-when-its-in-alignment-evaluations/
- Prolific HUMAINE: https://huggingface.co/blog/ProlificAI/humaine-framework
- UK AI assurance market (DRCF): https://drcf.org.uk/publications/blogs/ensuring-trustworthy-ai-the-emerging-ai-assurance-market
- Nielsen panel and MRC concerns: https://www.tvtechnology.com/insights/analysis/mrc-raises-concerns-about-nielsen-national-big-data-panel-television-service
- ChatGPT ads and commercial bias: https://ibrs.com.au/practices/strategy-transformation/vendoriq-we-called-it-cash-strapped-ai-vendors-add-ads-commercial-bias-in-3-2-1/
- Citizen Browser: https://digiday.com/media/the-rundown-the-markup-and-mozilla-will-track-facebook-tracking-its-opted-in-users/
- Consumer Reports AI survey: https://advocacy.consumerreports.org/press_release/consumer-reports-surveys-american-consumers-about-how-they-use-and-think-about-text-based-generative-ai-chatbots
- Crash Lab humanoid market report (vendor report, unchecked): https://www.marketresearch.com/LP-Information-Inc-v4134/Global-Home-Humanoid-Robot-Growth-41018952
- Humanity's Last Exam: https://safe.ai/blog/humanitys-last-exam
