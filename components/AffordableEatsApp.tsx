"use client";

import { FormEvent, useMemo, useState } from "react";
import { formatPrice, parseMenuText, Restaurant, sampleRestaurants } from "@/lib/restaurants";

type DraftRestaurant = {
  name: string;
  address: string;
  cuisine: string;
  averageMealPrice: string;
  latitude: string;
  longitude: string;
  menuText: string;
  notes: string;
};

const defaultDraft: DraftRestaurant = {
  name: "",
  address: "",
  cuisine: "",
  averageMealPrice: "1000",
  latitude: "37.7875",
  longitude: "-122.4040",
  menuText: "Paneer Roll - ₹650\nVeg Thali - ₹950",
  notes: ""
};

export function AffordableEatsApp() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(sampleRestaurants);
  const [budget, setBudget] = useState(1000);
  const [searchText, setSearchText] = useState("");
  const [draft, setDraft] = useState(defaultDraft);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(sampleRestaurants[0]?.id ?? "");

  const filteredRestaurants = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const isWithinBudget = restaurant.averageMealPrice <= budget;
      const matchesSearch =
        query.length === 0 ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query) ||
        restaurant.address.toLowerCase().includes(query);

      return isWithinBudget && matchesSearch;
    });
  }, [budget, restaurants, searchText]);

  const selectedRestaurant =
    filteredRestaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ?? filteredRestaurants[0];

  function updateDraft(field: keyof DraftRestaurant, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleAddRestaurant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const averageMealPrice = Number(draft.averageMealPrice);
    const latitude = Number(draft.latitude);
    const longitude = Number(draft.longitude);

    if (!draft.name.trim() || Number.isNaN(averageMealPrice) || Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return;
    }

    const restaurant: Restaurant = {
      id: `${draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: draft.name.trim(),
      address: draft.address.trim(),
      cuisine: draft.cuisine.trim() || "Restaurant",
      averageMealPrice,
      latitude,
      longitude,
      menuItems: parseMenuText(draft.menuText),
      notes: draft.notes.trim()
    };

    setRestaurants((current) => [restaurant, ...current]);
    setSelectedRestaurantId(restaurant.id);
    setDraft(defaultDraft);
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Affordable Eats</p>
          <h1>Find nearby restaurants by real menu prices.</h1>
          <p className="hero-copy">
            Filter restaurants around a map-style view by budget, compare average meal prices, and add new places by
            pasting menu text from an upload or OCR scan.
          </p>
        </div>
        <div className="hero-stats" aria-label="App summary">
          <span>{restaurants.length} restaurants</span>
          <span>{formatPrice(budget)} budget</span>
          <span>{filteredRestaurants.length} matches</span>
        </div>
      </section>

      <section className="workspace" aria-label="Restaurant discovery workspace">
        <div className="map-card">
          <div className="map-toolbar">
            <label>
              Search
              <input
                type="search"
                placeholder="Name, cuisine, or address"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </label>
            <label>
              Budget: <strong>{formatPrice(budget)}</strong>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="map-surface" role="img" aria-label="Map-style restaurant price view">
            {filteredRestaurants.map((restaurant, index) => (
              <button
                className={`price-pin pin-${index % 5}`}
                key={restaurant.id}
                onClick={() => setSelectedRestaurantId(restaurant.id)}
                type="button"
              >
                <span>{formatPrice(restaurant.averageMealPrice)}</span>
                <small>{restaurant.name}</small>
              </button>
            ))}
            {filteredRestaurants.length === 0 ? (
              <div className="empty-state">No restaurants match this budget yet. Try increasing the range.</div>
            ) : null}
          </div>
        </div>

        <aside className="details-card" aria-label="Selected restaurant details">
          {selectedRestaurant ? (
            <>
              <p className="eyebrow">Selected restaurant</p>
              <h2>{selectedRestaurant.name}</h2>
              <p>{selectedRestaurant.cuisine} · {selectedRestaurant.address}</p>
              <p className="price-line">Average meal: {formatPrice(selectedRestaurant.averageMealPrice)}</p>
              <p className="coordinate-line">
                {selectedRestaurant.latitude.toFixed(4)}, {selectedRestaurant.longitude.toFixed(4)}
              </p>
              <h3>Menu prices</h3>
              <ul className="menu-list">
                {selectedRestaurant.menuItems.map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <strong>{formatPrice(item.price)}</strong>
                  </li>
                ))}
              </ul>
              {selectedRestaurant.notes ? <p className="notes">{selectedRestaurant.notes}</p> : null}
            </>
          ) : (
            <p>No restaurant selected.</p>
          )}
        </aside>
      </section>

      <section className="form-card" aria-label="Add restaurant form">
        <div>
          <p className="eyebrow">Add a restaurant</p>
          <h2>Upload or paste menu details</h2>
          <p>
            For now, paste OCR text from a menu image or PDF. Each line should look like <code>Burger - ₹800</code>.
          </p>
        </div>
        <form onSubmit={handleAddRestaurant}>
          <div className="form-grid">
            <label>
              Restaurant name
              <input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} required />
            </label>
            <label>
              Cuisine
              <input value={draft.cuisine} onChange={(event) => updateDraft("cuisine", event.target.value)} />
            </label>
            <label>
              Address
              <input value={draft.address} onChange={(event) => updateDraft("address", event.target.value)} />
            </label>
            <label>
              Average meal price
              <input
                inputMode="decimal"
                value={draft.averageMealPrice}
                onChange={(event) => updateDraft("averageMealPrice", event.target.value)}
                required
              />
            </label>
            <label>
              Latitude
              <input value={draft.latitude} onChange={(event) => updateDraft("latitude", event.target.value)} required />
            </label>
            <label>
              Longitude
              <input value={draft.longitude} onChange={(event) => updateDraft("longitude", event.target.value)} required />
            </label>
          </div>
          <label>
            Menu text
            <textarea value={draft.menuText} onChange={(event) => updateDraft("menuText", event.target.value)} rows={5} />
          </label>
          <label>
            Notes
            <textarea value={draft.notes} onChange={(event) => updateDraft("notes", event.target.value)} rows={3} />
          </label>
          <button className="primary-action" type="submit">Add restaurant</button>
        </form>
      </section>
    </main>
  );
}
