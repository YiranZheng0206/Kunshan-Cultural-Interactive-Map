# Kunshan Cultural Interactive Map

A bilingual, source-linked visualization for exploring cultural records in Kunshan. Team 6: **Yihong Lin, Yiran Zheng, and Sitong Chang**.

- Working artifact: https://kunshan-cultural-interactive-map.vercel.app/
- Demo video: https://youtu.be/hiJvn93Gk6s
- Dataset repository: https://github.com/JuniceLin/Kunshan-Map
- Course: Duke Kunshan University, INFOSCI 301, Autumn 2026
- SDG connection: **Goal 11 — Sustainable Cities and Communities, Target 11.4**

## Demo Video

https://private-user-images.githubusercontent.com/204238628/672125602-122dccc6-a199-48ff-9a42-087e75469aa8.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3OTE4ODM3OTAsIm5iZiI6MTc5MTg4MzQ5MCwicGF0aCI6Ii8yMDQyMzg2MjgvNjcyMTI1NjAyLTEyMmRjY2M2LWExOTktNDhmZi05YTQyLTA4N2U3NTQ2OWFhOC5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYxMDEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MTAxM1QwOTI0NTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wNjk1NDhkMzYzZmU2OWY2ZTE4YzY4NjNlMjQ1ODlmMjY2ZjA0ZmNjYzA2MjMyYTZmNDNjOGQ0MDJlNjZhNTczJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9dmlkZW8lMkZtcDQifQ.MPc2st6psk5yF6moKAkMcWL79o1Gv51E848FH_pZMro

The English transcript is included in Appendix E of the project report.

## Run

Open with a local HTTP server (or deploy the repository to Vercel):

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit `http://127.0.0.1:4173/`.

`index.html` is the bilingual cultural landing page, tutorial, evidence guide, and Kunshan-inspired animated entrance. `map.html` uses a simple **Map / Patterns** switch while retaining five linked visualization idioms that support one task: build an evidence-linked cultural exploration route.

## Enhanced version in this working folder

- **82 curated cultural records** across Places, Artifacts, Food, Traditions, and Stories. Every record has a locally cached, non-duplicated image, source URL, credit, subject-match status and bilingual introduction. Many images remain contextual and are visibly labeled as such.
- **01 Basic overview:** Category bars compare the five category counts (40, 8, 12, 14, 8). Coverage cards keep the 82-record, 67-relationship, 13-source scope visible.
- **02 Network:** The focused graph uses the dataset's **67 documented relationships**. Selecting a record reveals its direct neighborhood and a readable relationship-evidence list. Edge length and screen position do not encode strength, geography, or causality. A missing edge only means that the current dataset does not represent a relationship.
- **03 Spatial:** Photo markers show approximate geographic anchors. Chinese and English modes use detailed AMap layers with local cached map fallbacks. Every record states its coordinate precision; anchors are not surveyed entrances.
- **04 Interactive inspection:** Search, category filters, linked selection, bilingual details, source links, image credits, keyboard-focus states, saving, removing, and resetting support record-level inspection.
- **05 Advanced comparison:** The interface compares three transparent heuristics—shorter straight-line distance, scenic-category weighting, and fewer town changes—against the simple saved-stop list. The outputs are comparison aids, not live navigation.

The records are curated course-project examples, not a complete census. The interface and all 82 record introductions are available in English and Chinese. The project does not yet establish improved visitor learning, cultural representativeness, heritage safeguarding impact, or community endorsement.

## Feedback and revision

Course feedback identified unclear onboarding, insufficient explanation of cultural connections, and route-saving limitations. The current interface responds with a bilingual landing-page tutorial, a focused relationship network with adjacent evidence boundaries, repaired save/remove behavior, and a side-by-side route-heuristic comparison. The simplified Map / Patterns navigation contains five actual idioms without requiring five competing top-level buttons. Claims about usability or cultural benefit remain bounded until the team's participant records and final analysis are published.

## Reproducibility and fallback

The application is static HTML, CSS, and JavaScript; it has no build step, backend, or environment-variable dependency. `data.js`, locally cached images, Leaflet resources, and cached map images provide a degraded-network fallback. Detailed AMap tiles and external source pages require network access.

Smoke-test URL: `map.html?lang=en&smoke=1`. A passing build creates a hidden `#smoke-test-result` with `data-status="pass"` after checking the 82 records, five linked views, bilingual rendering, and three route heuristics.

Known limits:

- Third-party image permissions and map-service licensing conditions require record-by-record verification.
- Coordinates vary from specific sites to town, district, landscape, or associated-site anchors.
- Route order remains a transparent heuristic, while road geometry, road distance and driving duration are requested from OSRM's public routing service. Walking, cycling and public-transport durations are estimates from road distance; every transit leg adds a visible 10-minute waiting/transfer allowance. Public-transport legs open in AMap for current routes and times; the prototype does not store live traffic, fares, opening hours or accessibility data.
- Keyboard, screen-reader, mobile and cross-browser testing should be reported with the final immutable commit.
- Corrections can be submitted through the repository's Issues page.

The complete system and source preflight is recorded in [`FINAL_SYSTEM_AUDIT.md`](FINAL_SYSTEM_AUDIT.md). The image-by-image review queue is recorded in [`IMAGE_AUDIT.md`](IMAGE_AUDIT.md).

## Acknowledgements

We thank Prof. Luyao Zhang for instruction and guidance, and Michelle Clark, Andi Wan, Jiaxin Wang, Tingyi Xiao, Zhixin Liu, and Yixuan Chen for feedback on the map, relationship network, onboarding, and route-planning interactions. The four course fieldwork sites were Tencent's Shanghai Office, Shanghai Science and Technology Museum, Jinxi Intangible Cultural Heritage Museum, and China Ancient Brick and Tile Museum. These visits informed the project but do not imply community endorsement or co-design.

OpenAI Codex assisted with application development and documentation. The team remains responsible for the claims, source checks, design decisions, code, testing, and final release.

## Files and attribution

`data/kunshan-cultural-dataset.json` is a snapshot of the source repository, including records, relationships, sources and metadata. `data.js` contains the same data as a static script so the app can run without a build step. See the source repository's `DATA_NOTES.md` for the editorial and spatial limits. The source repository's MIT license is included as `SOURCE_LICENSE.txt`; third-party facts, images and map tiles remain governed by their own terms. Locally cached images retain per-record source and credit fields. Map data © AMap and OpenStreetMap contributors.

To update the snapshot, copy the latest source JSON into `data/kunshan-cultural-dataset.json` and regenerate `data.js`:

```bash
python3 -c 'import json,pathlib; p=pathlib.Path("data/kunshan-cultural-dataset.json"); pathlib.Path("data.js").write_text("window.KUNSHAN_DATA = "+json.dumps(json.loads(p.read_text()),ensure_ascii=False,separators=(",",":"))+";\\n")'
```
