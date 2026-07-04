export type Location = {
  id: string;
  name: string;
  basePrice: number; // price in EUR from Podgorica
};

export type Vehicle = {
  id: string;
  name: string;
  description: string;
  image: string;
  passengers: number;
  luggage: number;
  multiplier: number;
  features: string[];
};

export const LOCATIONS: Location[] = [
  { id: "ada-bojana", name: "Ada Bojana", basePrice: 90 },
  { id: "andrijevica", name: "Andrijevica", basePrice: 105 },
  { id: "banja-luka", name: "Banja Luka", basePrice: 310 },
  { id: "bar", name: "Bar", basePrice: 55 },
  { id: "belgrade", name: "Beograd", basePrice: 340 },
  { id: "berane", name: "Berane", basePrice: 95 },
  { id: "bijelo-polje", name: "Bijelo Polje", basePrice: 105 },
  { id: "bileca", name: "Bileća", basePrice: 90 },
  { id: "budva", name: "Budva", basePrice: 60 },
  { id: "cetinje", name: "Cetinje", basePrice: 40 },
  { id: "cacak", name: "Čačak", basePrice: 230 },
  { id: "dubrovnik-airport", name: "Aerodrom Dubrovnik", basePrice: 145 },
  { id: "durres", name: "Durrës", basePrice: 150 },
  { id: "dubrovnik-city", name: "Dubrovnik (centar)", basePrice: 160 },
  { id: "foca", name: "Foča", basePrice: 125 },
  { id: "gusinje", name: "Gusinje", basePrice: 90 },
  { id: "herceg-novi", name: "Herceg Novi", basePrice: 110 },
  { id: "igalo", name: "Igalo", basePrice: 110 },
  { id: "jaz", name: "Jaz", basePrice: 70 },
  { id: "kolasin", name: "Kolašin", basePrice: 70 },
  { id: "kopaonik", name: "Kopaonik", basePrice: 180 },
  { id: "kotor", name: "Kotor", basePrice: 80 },
  { id: "mojkovac", name: "Mojkovac", basePrice: 85 },
  { id: "mostar", name: "Mostar", basePrice: 160 },
  { id: "niksic", name: "Nikšić", basePrice: 50 },
  { id: "nis", name: "Niš", basePrice: 270 },
  { id: "novi-sad", name: "Novi Sad", basePrice: 390 },
  { id: "ohrid", name: "Ohrid", basePrice: 265 },
  { id: "ostrog", name: "Ostrog", basePrice: 40 },
  { id: "pec", name: "Peć", basePrice: 155 },
  { id: "perast", name: "Perast", basePrice: 90 },
  { id: "petrovac-tunnel", name: "Petrovac (tunel)", basePrice: 60 },
  { id: "petrovac-mountain", name: "Petrovac (planinski put)", basePrice: 55 },
  { id: "plav", name: "Plav", basePrice: 100 },
  { id: "pljevlja", name: "Pljevlja", basePrice: 140 },
  { id: "prijepolje", name: "Prijepolje", basePrice: 130 },
  { id: "pristina", name: "Priština", basePrice: 220 },
  { id: "risan", name: "Risan", basePrice: 95 },
  { id: "rozaje", name: "Rožaje", basePrice: 110 },
  { id: "sarajevo", name: "Sarajevo", basePrice: 170 },
  { id: "shkoder", name: "Shkodër", basePrice: 65 },
  { id: "skopje", name: "Skopje", basePrice: 360 },
  { id: "sutomore", name: "Sutomore", basePrice: 50 },
  { id: "sveti-stefan", name: "Sveti Stefan", basePrice: 70 },
  { id: "savnik", name: "Šavnik", basePrice: 85 },
  { id: "tirana-airport", name: "Aerodrom Tirana", basePrice: 120 },
  { id: "tirana-city", name: "Tirana (centar)", basePrice: 150 },
  { id: "tivat", name: "Tivat", basePrice: 80 },
  { id: "trebinje", name: "Trebinje", basePrice: 90 },
  { id: "ulcinj", name: "Ulcinj", basePrice: 80 },
  { id: "uzice", name: "Užice", basePrice: 190 },
  { id: "valjevo", name: "Valjevo", basePrice: 240 },
  { id: "zlatibor", name: "Zlatibor", basePrice: 175 },
  { id: "zabljak", name: "Žabljak", basePrice: 100 },
];

export const VEHICLES: Vehicle[] = [
  {
    id: "skoda-superb",
    name: "Škoda Superb",
    description:
      "Prostrani i komforni sedan idealan za parove i poslovna putovanja.",
    image: "/skoda-superb-2023.png",
    passengers: 4,
    luggage: 4,
    multiplier: 1,
    features: ["Klima uređaj", "Voda", "WiFi"],
  },
  {
    id: "passat",
    name: "Volkswagen Passat",
    description:
      "Pouzdani i udobni sedan za svakodnevne transfere i duža putovanja.",
    image: "/passat8.png",
    passengers: 4,
    luggage: 4,
    multiplier: 1.2,
    features: ["Klima uređaj", "Voda", "WiFi", "Punjač"],
  },
  {
    id: "audi-a6",
    name: "Premium limuzina",
    description:
      "Audi A6 — vrhunski komfor i diskrecija za najzahtjevnije putnike.",
    image: "/Audi-A6.png",
    passengers: 4,
    luggage: 4,
    multiplier: 1.5,
    features: ["Kožni enterijer", "Voda", "WiFi", "Punjač"],
  },
];

/**
 * Returns the one-way base price (standard sedan) from Podgorica to a location.
 * Returns 0 if location not found.
 */
export function getBasePrice(locationId: string): number {
  return LOCATIONS.find((l) => l.id === locationId)?.basePrice ?? 0;
}

/**
 * Estimates transfer price from Podgorica to a destination.
 * Vehicle multiplier is applied on top of the flat base price.
 * Round-trip uses a 1.9× factor (slight discount vs. 2×).
 */
export function estimatePrice(
  toId: string,
  vehicleId: string,
  roundTrip: boolean
): number {
  const base = getBasePrice(toId);
  if (base === 0) return 0;
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  const multiplier = vehicle?.multiplier ?? 1;
  let price = base * multiplier;
  if (roundTrip) price *= 1.9;
  return Math.round(price);
}
