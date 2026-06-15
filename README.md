# Affordable Eats Web App

Affordable Eats is now a React and Next.js web app prototype. It helps users discover nearby restaurants by budget, view price-labelled restaurant pins in a map-style interface, and add restaurants by pasting menu text from an upload or OCR flow.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Test the MVP manually

1. Confirm the homepage opens with the Affordable Eats hero section.
2. Move the budget slider to ₹1,000 and verify only restaurants at or below that average price remain visible.
3. Move the budget slider toward ₹2,000 and verify additional restaurant price pins appear.
4. Search by name, cuisine, or address.
5. Select a price pin and confirm the restaurant details and menu prices update.
6. Add a restaurant with menu text such as `Burger - ₹800` and confirm it appears when within budget.

## Notes

- The current map is a responsive, map-style visual built with CSS rather than a live provider map.
- Restaurant data is stored in browser memory for the current session.
- Menu upload is represented by pasted OCR text; production upload parsing can be added later with an OCR API or browser file upload pipeline.
