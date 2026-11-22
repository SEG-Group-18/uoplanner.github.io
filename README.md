# UOPlanner

UOPlanner helps uOttawa students compare course schedules and find a week that works.

## Run locally

Python is already included on many computers. From this folder, run:

```text
python -m http.server 8000
```

Then open <http://localhost:8000/Web%20Pages/html%20pages/index.html>.

## Pages

- Home: schedule preview and product overview
- Product: feature details
- Pricing: plans and questions
- Team: expandable team profiles

All page files are kept in three folders inside `Web Pages`:

- `html pages`: `index.html`, `product.html`, `pricing.html`, and `team.html`
- `js pages`: `app.js` handles interactions, and `messages.js` contains English and French text
- `css pages`: `styles.css` is the shared stylesheet

The `public` folder contains images and video. `mockups` is kept for design references.
