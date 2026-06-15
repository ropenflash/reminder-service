# Affordable Restaurant iOS App Concept

This repository now includes an iOS SwiftUI prototype for an app that helps diners find nearby restaurants by price range and add new restaurants by uploading or entering menu information.

## MVP user flow

1. Open the map and allow location access.
2. Move the budget slider to a target meal range such as ₹1,000 or ₹2,000.
3. View restaurant pins with average meal prices directly on the map.
4. Search by restaurant name, cuisine, or address.
5. Add a restaurant by entering details and pasting OCR-extracted menu text.
6. The app parses menu lines like `Paneer Roll - ₹650` into menu items and stores them with the restaurant.

## Production roadmap

- Add Core Location permissions and center the map on the user's current location.
- Integrate VisionKit or a backend OCR service for menu image and PDF uploads.
- Use a geocoding API to convert restaurant addresses into coordinates.
- Persist restaurants and menus in CloudKit, Firebase, Supabase, or an existing service API.
- Add trust signals such as last verified date, user-submitted photos, and price confidence score.
- Support currency and budget localization for different countries.
