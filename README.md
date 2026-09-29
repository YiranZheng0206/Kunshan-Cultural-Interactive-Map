# Kunshan Cultural Interactive Map

A bilingual interactive map for exploring Kunshan’s places, stories, traditions, cultural food, and people.

## Demo
[https://github.com/YiranZheng0206/Kunshan-Cultural-Interactive-Map/issues/1#issue-5626872436](https://github.com/user-attachments/assets/9b304081-f009-47d3-8d3f-7702922eb92e)

## Audience & goal

Designed for first-time visitors to Kunshan who want reliable cultural context and an efficient way to build a visit route.

## Features

- Search and filter cultural discoveries by category
- Explore local cultural items on an interactive Kunshan map
- View bilingual English / 中文 names, stories, tags, and practical information
- Save places with “Want to visit,” remove or reorder saved stops, and generate a suggested cultural route
- Draw the generated route on the map
- Remember the selected interface language during the browser session

## Technologies

- HTML, CSS, and vanilla JavaScript
- Leaflet 1.9.4
- OpenStreetMap raster tiles
- Browser localStorage for language preference

## Run locally

From the project folder, run:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html).

## Live site

[https://kunshan-cultural-interactive-map.vercel.app](https://kunshan-cultural-interactive-map.vercel.app)

_INFOSCI 301 project._

## Visualization idioms and data scope

- **Basic idiom — bar chart:** The Patterns view compares the number of entries in each category. Clicking a bar isolates that category in the map and list; clicking it again restores all categories. Counts describe this 12-entry project sample, not the total cultural sites in Kunshan.
- **Network idiom — node-link diagram:** Each node is a cultural entry, colored by category. The 12 links in `data.js` are hand-curated thematic associations (water-town heritage, local food, literary history, etc.). Clicking a node opens its details. The links do **not** represent roads, measured similarity, or verified travel times. Edge labels are available as SVG tooltips.
- **Map idiom:** Geographic positions and the suggested route remain in the Map view. The generated route connects selected coordinates in sequence with straight lines; it is not turn-by-turn navigation. The time summary uses visit durations and a fixed 18-minute gap per stop, not live traffic.

The examples in `data.js` are editorial demo records. Before public tourist use, verify coordinates, venue names, opening hours, and sources with local authorities or venue operators.
