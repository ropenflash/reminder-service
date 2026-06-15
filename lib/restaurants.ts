export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  averageMealPrice: number;
  latitude: number;
  longitude: number;
  menuItems: MenuItem[];
  notes: string;
};

export const sampleRestaurants: Restaurant[] = [
  {
    id: "tandoori-corner",
    name: "Tandoori Corner",
    address: "12 Market Street",
    cuisine: "Indian",
    averageMealPrice: 950,
    latitude: 37.7858,
    longitude: -122.4064,
    menuItems: [
      { id: "paneer-wrap", name: "Paneer Wrap", price: 650, category: "Mains" },
      { id: "chicken-thali", name: "Chicken Thali", price: 1100, category: "Combos" }
    ],
    notes: "Good lunch combos under ₹1,200."
  },
  {
    id: "sushi-quick",
    name: "Sushi Quick",
    address: "88 Mission Avenue",
    cuisine: "Japanese",
    averageMealPrice: 1850,
    latitude: 37.7891,
    longitude: -122.4017,
    menuItems: [
      { id: "salmon-roll", name: "Salmon Roll", price: 1200, category: "Rolls" },
      { id: "bento-box", name: "Bento Box", price: 2200, category: "Combos" }
    ],
    notes: "Affordable if ordering rolls instead of platters."
  },
  {
    id: "bella-pizza",
    name: "Bella Pizza",
    address: "42 King Road",
    cuisine: "Italian",
    averageMealPrice: 1350,
    latitude: 37.7839,
    longitude: -122.3994,
    menuItems: [
      { id: "margherita", name: "Margherita Pizza", price: 1000, category: "Pizza" },
      { id: "pasta", name: "Pesto Pasta", price: 1450, category: "Pasta" }
    ],
    notes: "Shareable pizzas make this a solid value for groups."
  }
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

export function parseMenuText(text: string): MenuItem[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [rawName, ...priceParts] = line.split("-");
      const priceText = priceParts.join("-").replace(/[^0-9.]/g, "");
      const price = Number(priceText);

      if (!rawName?.trim() || Number.isNaN(price) || price <= 0) {
        return null;
      }

      return {
        id: `imported-${Date.now()}-${index}`,
        name: rawName.trim(),
        price,
        category: "Imported"
      } satisfies MenuItem;
    })
    .filter((item): item is MenuItem => item !== null);
}
