# Kunshan Cultural Interactive Map

A bilingual course prototype for exploring cultural records in Kunshan. This version integrates the [Kunshan-Map dataset](https://github.com/JuniceLin/Kunshan-Map) by JuniceLin.

#Demo Video
https://youtu.be/hiJvn93Gk6s

## Run

Open with a local HTTP server (or deploy the repository to Vercel):

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit `http://127.0.0.1:4173/`.

`index.html` is the bilingual cultural landing page and three-step tutorial. `map.html` contains the full interactive map, two visualization idioms, detail view, and route planner.

## Enhanced version in this working folder

- **82 curated cultural records** across Places, Artifacts, Food, Traditions, and Stories. Every record now has its own locally cached, non-duplicated photograph, image source, credit, and bilingual introduction.
- **Basic idiom:** Bar chart compares the five category counts (40, 8, 12, 14, 8). Click a bar to filter the map and list.
- **Network idiom:** Uses the dataset's **67 source-linked relationships**. To keep labels and connections readable, the initial view displays the 20 records with most links. Select any record in the map or list to display its direct neighborhood. The detail panel provides relation names and source links. A missing edge is not evidence of no cultural connection.
- **Map idiom:** Photo markers show the dataset's geographic anchors. Chinese and English modes use the original detailed AMap layers with the corresponding map-label language. Separate local cached maps remain underneath as loading fallbacks without covering the live detailed map. Every detail lists coordinate precision.
- **Route:** Every record with a geographic anchor can be saved. The interface compares three transparent heuristics: fastest, best for scenery, and most convenient. Each leg suggests walking, cycling, public transport, or taxi/car based on distance and route mode. These are prototype estimates, not live navigation.

The records are curated examples, not a complete census. The interface and all 82 record introductions are available in English and Chinese.

## Files and attribution

`data/kunshan-cultural-dataset.json` is a snapshot of the source repository, including records, relationships, sources and metadata. `data.js` contains the same data as a static script so the app can run without a build step. See the source repository's `DATA_NOTES.md` for the editorial and spatial limits. The source repository's MIT license is included as `SOURCE_LICENSE.txt`; third-party facts, images and map tiles remain governed by their own terms. Locally cached images retain per-record source and credit fields. Map data © AMap and OpenStreetMap contributors.

To update the snapshot, copy the latest source JSON into `data/kunshan-cultural-dataset.json` and regenerate `data.js`:

```bash
python3 -c 'import json,pathlib; p=pathlib.Path("data/kunshan-cultural-dataset.json"); pathlib.Path("data.js").write_text("window.KUNSHAN_DATA = "+json.dumps(json.loads(p.read_text()),ensure_ascii=False,separators=(",",":"))+";\\n")'
```
