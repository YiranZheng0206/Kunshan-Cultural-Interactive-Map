# Kunshan Cultural Interactive Map

A bilingual course prototype for exploring cultural records in Kunshan. This version integrates the [Kunshan-Map dataset](https://github.com/JuniceLin/Kunshan-Map) by JuniceLin.

## Run

Open with a local HTTP server (or deploy the repository to Vercel):

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit `http://127.0.0.1:4173/`.

## What changed

- **82 curated cultural records** across Places, Artifacts, Food, Traditions, and Stories. Search names, descriptions and towns; filter by category.
- **Basic idiom:** Bar chart compares the five category counts (40, 8, 12, 14, 8). Click a bar to filter the map and list.
- **Network idiom:** Uses the dataset's **67 source-linked relationships**. To keep labels and connections readable, the initial view displays the 20 records with most links. Select any record in the map or list to display its direct neighborhood. The detail panel provides relation names and source links. A missing edge is not evidence of no cultural connection.
- **Map idiom:** Markers show the dataset's geographic anchors. Every detail lists coordinate precision; most anchors indicate an area or associated place, not an exact entrance.
- **Route:** Only the 12 records labelled `specific-site` can be saved. The nearest-neighbor route connects their coordinates with straight lines. It does not use a street network, travel-time data, public transport, opening hours or live navigation.

The records are curated examples, not a complete census. Some English descriptions remain in the dataset's original English even when the interface is switched to Chinese.

## Files and attribution

`data/kunshan-cultural-dataset.json` is a snapshot of the source repository, including records, relationships, sources and metadata. `data.js` contains the same data as a static script so the app can run without a build step. See the source repository's `DATA_NOTES.md` for the editorial and spatial limits. The source repository's MIT license is included as `SOURCE_LICENSE.txt`; third-party facts, images and map tiles remain governed by their own terms. This version does not copy its photos. Map tiles © OpenStreetMap contributors.

To update the snapshot, copy the latest source JSON into `data/kunshan-cultural-dataset.json` and regenerate `data.js`:

```bash
python3 -c 'import json,pathlib; p=pathlib.Path("data/kunshan-cultural-dataset.json"); pathlib.Path("data.js").write_text("window.KUNSHAN_DATA = "+json.dumps(json.loads(p.read_text()),ensure_ascii=False,separators=(",",":"))+";\\n")'
```
