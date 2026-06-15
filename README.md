# Affordable Eats Web App

Affordable Eats is now a React and Next.js web app prototype. It helps users discover nearby restaurants by budget, view price-labelled restaurant pins in a map-style interface, and add restaurants by uploading menu PDFs/images and pasting menu text from an OCR flow.

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
5. Select a price pin and confirm the restaurant details, uploaded menus, and menu prices update.
6. Add a restaurant with one PDF or multiple menu images attached.
7. Add menu text such as `Burger - ₹800` and confirm the parsed menu items appear when the restaurant is within budget.

## Notes

- The current map is a responsive, map-style visual built with CSS rather than a live provider map.
- Restaurant data is stored in browser memory for the current session.
- Menu files can be attached as PDFs or images, and image previews are shown in the browser. Automated OCR extraction can be added later with an OCR API or browser file parsing pipeline.
