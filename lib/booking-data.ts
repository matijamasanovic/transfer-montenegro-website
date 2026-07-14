export type Location = {
  id: string;
  name: string;
};

export type Vehicle = {
  id: string;
  name: string;
  description: string;
  maxPassengers: number;
  priceModifier: "base" | "plus20" | "times2";
};

// Priority locations shown first in dropdowns
const PRIORITY_LOCATIONS: Location[] = [
  { id: "aerodrom-podgorica", name: "Aerodrom Podgorica" },
  { id: "podgorica", name: "Podgorica" },
  { id: "ada-bojana", name: "Ada Bojana" },
  { id: "ulcinj", name: "Ulcinj" },
  { id: "bar", name: "Bar" },
  { id: "petrovac-tunnel", name: "Petrovac (tunel)" },
  { id: "petrovac-mountain", name: "Petrovac (planinski put)" },
  { id: "budva", name: "Budva" },
  { id: "kotor", name: "Kotor" },
  { id: "tivat", name: "Tivat" },
  { id: "herceg-novi", name: "Herceg Novi" },
  { id: "dubrovnik-city", name: "Dubrovnik (centar)" },
  { id: "dubrovnik-airport", name: "Aerodrom Dubrovnik" },
  { id: "split", name: "Split" },
  { id: "tirana-city", name: "Tirana (centar)" },
  { id: "tirana-airport", name: "Aerodrom Tirana" },
  { id: "mostar", name: "Mostar" },
  { id: "sarajevo", name: "Sarajevo" },
  { id: "skadar", name: "Skadarsko jezero" },
  { id: "durres", name: "Durrës" },
  { id: "drac", name: "Drač" },
  { id: "himara", name: "Himara" },
  { id: "saranda", name: "Saranda" },
  { id: "ksamil", name: "Ksamil" },
  { id: "prizren", name: "Prizren" },
  { id: "pristina", name: "Priština" },
  { id: "ohrid", name: "Ohrid" },
];

const OTHER_LOCATIONS: Location[] = [
  { id: "andrijevica", name: "Andrijevica" },
  { id: "banja-luka", name: "Banja Luka" },
  { id: "belgrade", name: "Beograd" },
  { id: "berane", name: "Berane" },
  { id: "bijelo-polje", name: "Bijelo Polje" },
  { id: "bileca", name: "Bileća" },
  { id: "cacak", name: "Čačak" },
  { id: "cetinje", name: "Cetinje" },
  { id: "foca", name: "Foča" },
  { id: "gusinje", name: "Gusinje" },
  { id: "igalo", name: "Igalo" },
  { id: "jaz", name: "Jaz" },
  { id: "kolasin", name: "Kolašin" },
  { id: "kopaonik", name: "Kopaonik" },
  { id: "mojkovac", name: "Mojkovac" },
  { id: "niksic", name: "Nikšić" },
  { id: "nis", name: "Niš" },
  { id: "novi-sad", name: "Novi Sad" },
  { id: "ostrog", name: "Ostrog" },
  { id: "pec", name: "Peć" },
  { id: "perast", name: "Perast" },
  { id: "plav", name: "Plav" },
  { id: "pljevlja", name: "Pljevlja" },
  { id: "prijepolje", name: "Prijepolje" },
  { id: "risan", name: "Risan" },
  { id: "rozaje", name: "Rožaje" },
  { id: "savnik", name: "Šavnik" },
  { id: "shkoder", name: "Shkodër" },
  { id: "skopje", name: "Skopje" },
  { id: "sutomore", name: "Sutomore" },
  { id: "sveti-stefan", name: "Sveti Stefan" },
  { id: "trebinje", name: "Trebinje" },
  { id: "uzice", name: "Užice" },
  { id: "valjevo", name: "Valjevo" },
  { id: "zabljak", name: "Žabljak" },
  { id: "zlatibor", name: "Zlatibor" },
];

export const LOCATIONS: Location[] = [
  ...PRIORITY_LOCATIONS,
  ...OTHER_LOCATIONS,
];

export const VEHICLES: Vehicle[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Škoda Superb, Passat B8 or similar",
    maxPassengers: 4,
    priceModifier: "base",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Audi A6, Mercedes E Class or similar",
    maxPassengers: 4,
    priceModifier: "plus20",
  },
  {
    id: "van",
    name: "Van / Kombi",
    description: "Max 8 passengers",
    maxPassengers: 8,
    priceModifier: "times2",
  },
];

// Prices from Podgorica (standard vehicle)
const PODGORICA_PRICES: Record<string, number> = {
  "aerodrom-podgorica": 25,
  podgorica: 25,
  "ada-bojana": 90,
  andrijevica: 105,
  "banja-luka": 310,
  bar: 55,
  belgrade: 340,
  berane: 95,
  "bijelo-polje": 105,
  bileca: 90,
  budva: 60,
  cetinje: 40,
  cacak: 230,
  "dubrovnik-airport": 145,
  "dubrovnik-city": 160,
  durres: 150,
  drac: 150,
  foca: 125,
  gusinje: 90,
  "herceg-novi": 110,
  himara: 280,
  igalo: 110,
  jaz: 70,
  kolasin: 70,
  kopaonik: 180,
  kotor: 90,
  ksamil: 310,
  mojkovac: 85,
  mostar: 160,
  niksic: 50,
  nis: 270,
  "novi-sad": 390,
  ohrid: 265,
  ostrog: 40,
  pec: 155,
  perast: 90,
  "petrovac-tunnel": 60,
  "petrovac-mountain": 55,
  plav: 100,
  pljevlja: 140,
  prijepolje: 130,
  pristina: 240,
  prizren: 200,
  risan: 95,
  rozaje: 110,
  sarajevo: 170,
  saranda: 300,
  savnik: 85,
  shkoder: 65,
  skadar: 65,
  skopje: 360,
  split: 280,
  sutomore: 50,
  "sveti-stefan": 70,
  "tirana-airport": 120,
  "tirana-city": 150,
  tivat: 90,
  trebinje: 90,
  ulcinj: 80,
  uzice: 190,
  valjevo: 240,
  zlatibor: 175,
  zabljak: 100,
};

// Prices from Tivat/Kotor (standard vehicle) — Kotor same as Tivat
const TIVAT_KOTOR_PRICES: Record<string, number> = {
  mostar: 240,
  sarajevo: 260,
  skadar: 170,
  "tirana-city": 220,
  "tirana-airport": 220,
  drac: 230,
  durres: 230,
  himara: 360,
  saranda: 390,
  ksamil: 395,
  prizren: 260,
  pristina: 310,
  ohrid: 320,
  split: 350,
  "dubrovnik-city": 160,
  "dubrovnik-airport": 160,
};

// Premium prices from Tivat/Kotor
const TIVAT_KOTOR_PREMIUM_PRICES: Record<string, number> = {
  mostar: 280,
  sarajevo: 310,
  skadar: 200,
  "tirana-city": 260,
  "tirana-airport": 260,
  drac: 280,
  durres: 280,
  himara: 430,
  saranda: 460,
  ksamil: 465,
  prizren: 310,
  pristina: 360,
  ohrid: 370,
  split: 400,
  "dubrovnik-city": 200,
  "dubrovnik-airport": 200,
};

// Prices from Budva (standard vehicle)
const BUDVA_PRICES: Record<string, number> = {
  "dubrovnik-city": 190,
  "dubrovnik-airport": 190,
  mostar: 240,
  sarajevo: 260,
  skadar: 140,
  "tirana-city": 190,
  "tirana-airport": 190,
  drac: 200,
  durres: 200,
  himara: 340,
  saranda: 370,
  ksamil: 375,
  prizren: 240,
  pristina: 290,
  ohrid: 300,
  split: 350,
};

// Premium prices from Budva
const BUDVA_PREMIUM_PRICES: Record<string, number> = {
  "dubrovnik-city": 240,
  "dubrovnik-airport": 240,
  mostar: 280,
  sarajevo: 310,
  skadar: 180,
  "tirana-city": 240,
  "tirana-airport": 240,
  drac: 250,
  durres: 250,
  himara: 390,
  saranda: 420,
  ksamil: 425,
  prizren: 280,
  pristina: 340,
  ohrid: 350,
  split: 400,
};

const PODGORICA_IDS = new Set(["podgorica", "aerodrom-podgorica"]);
const TIVAT_KOTOR_IDS = new Set(["tivat", "kotor"]);
const BUDVA_IDS = new Set(["budva"]);

export function getRouteInfo(
  fromId: string,
  toId: string,
  vehicleId?: string
): {
  available: boolean;
  basePrice: number | null;
  quoteOnly: boolean;
} {
  if (fromId === toId)
    return { available: false, basePrice: null, quoteOnly: false };

  const isPremium = vehicleId === "premium";

  // Podgorica / Airport → destination
  if (PODGORICA_IDS.has(fromId)) {
    if (PODGORICA_IDS.has(toId))
      return { available: true, basePrice: 25, quoteOnly: false };
    const price = PODGORICA_PRICES[toId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // → Podgorica / Airport
  if (PODGORICA_IDS.has(toId)) {
    if (PODGORICA_IDS.has(fromId))
      return { available: true, basePrice: 25, quoteOnly: false };
    const price = PODGORICA_PRICES[fromId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // Tivat / Kotor → destination
  if (TIVAT_KOTOR_IDS.has(fromId)) {
    const priceMap = isPremium
      ? TIVAT_KOTOR_PREMIUM_PRICES
      : TIVAT_KOTOR_PRICES;
    const price = priceMap[toId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // → Tivat / Kotor
  if (TIVAT_KOTOR_IDS.has(toId)) {
    const priceMap = isPremium
      ? TIVAT_KOTOR_PREMIUM_PRICES
      : TIVAT_KOTOR_PRICES;
    const price = priceMap[fromId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // Budva → destination
  if (BUDVA_IDS.has(fromId)) {
    const priceMap = isPremium ? BUDVA_PREMIUM_PRICES : BUDVA_PRICES;
    const price = priceMap[toId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // → Budva
  if (BUDVA_IDS.has(toId)) {
    const priceMap = isPremium ? BUDVA_PREMIUM_PRICES : BUDVA_PRICES;
    const price = priceMap[fromId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // All other routes — quote only
  return { available: true, basePrice: null, quoteOnly: true };
}

export function calculatePrice(
  basePrice: number,
  vehicleId: string,
  roundTrip: boolean,
  isPodgoricaRoute: boolean = false
): number {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  if (!vehicle) return basePrice;

  let price = basePrice;
  // For Podgorica routes: premium adds 20€, van doubles
  // For other routes: premium price already factored in via getRouteInfo, van doubles standard
  if (isPodgoricaRoute) {
    if (vehicle.priceModifier === "plus20") price = basePrice + 20;
    if (vehicle.priceModifier === "times2") price = basePrice * 2;
  } else {
    // basePrice already reflects standard or premium
    // Van = standard price × 2, but we only have the vehicle-specific price here
    // so just double it for van
    if (vehicle.priceModifier === "times2") price = basePrice * 2;
  }
  if (roundTrip) price = price * 2;

  return price;
}

export function getFromLocations(): Location[] {
  return LOCATIONS;
}

export function getToLocations(fromId: string): Location[] {
  return LOCATIONS.filter((l) => l.id !== fromId);
}
