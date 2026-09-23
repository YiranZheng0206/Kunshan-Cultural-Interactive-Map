# Kunshan Cultural Interactive Map

A bilingual interactive map for exploring Kunshan’s places, stories, traditions, cultural food, and people.

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
