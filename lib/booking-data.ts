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

export const LOCATIONS: Location[] = [
  { id: "aerodrom-podgorica", name: "Aerodrom Podgorica" },
  { id: "podgorica", name: "Podgorica" },
  { id: "ada-bojana", name: "Ada Bojana" },
  { id: "andrijevica", name: "Andrijevica" },
  { id: "banja-luka", name: "Banja Luka" },
  { id: "bar", name: "Bar" },
  { id: "belgrade", name: "Beograd" },
  { id: "berane", name: "Berane" },
  { id: "bijelo-polje", name: "Bijelo Polje" },
  { id: "bileca", name: "Bileća" },
  { id: "budva", name: "Budva" },
  { id: "cetinje", name: "Cetinje" },
  { id: "cacak", name: "Čačak" },
  { id: "drac", name: "Drač" },
  { id: "dubrovnik-airport", name: "Aerodrom Dubrovnik" },
  { id: "dubrovnik-city", name: "Dubrovnik (centar)" },
  { id: "durres", name: "Durrës" },
  { id: "foca", name: "Foča" },
  { id: "gusinje", name: "Gusinje" },
  { id: "herceg-novi", name: "Herceg Novi" },
  { id: "himara", name: "Himara" },
  { id: "igalo", name: "Igalo" },
  { id: "jaz", name: "Jaz" },
  { id: "kolasin", name: "Kolašin" },
  { id: "kopaonik", name: "Kopaonik" },
  { id: "kotor", name: "Kotor" },
  { id: "ksamil", name: "Ksamil" },
  { id: "mojkovac", name: "Mojkovac" },
  { id: "mostar", name: "Mostar" },
  { id: "niksic", name: "Nikšić" },
  { id: "nis", name: "Niš" },
  { id: "novi-sad", name: "Novi Sad" },
  { id: "ohrid", name: "Ohrid" },
  { id: "ostrog", name: "Ostrog" },
  { id: "pec", name: "Peć" },
  { id: "perast", name: "Perast" },
  { id: "petrovac-tunnel", name: "Petrovac (tunel)" },
  { id: "petrovac-mountain", name: "Petrovac (planinski put)" },
  { id: "plav", name: "Plav" },
  { id: "pljevlja", name: "Pljevlja" },
  { id: "prijepolje", name: "Prijepolje" },
  { id: "pristina", name: "Priština" },
  { id: "prizren", name: "Prizren" },
  { id: "risan", name: "Risan" },
  { id: "rozaje", name: "Rožaje" },
  { id: "sarajevo", name: "Sarajevo" },
  { id: "saranda", name: "Saranda" },
  { id: "savnik", name: "Šavnik" },
  { id: "shkoder", name: "Shkodër" },
  { id: "skadar", name: "Skadarsko jezero" },
  { id: "skopje", name: "Skopje" },
  { id: "split", name: "Split" },
  { id: "sutomore", name: "Sutomore" },
  { id: "sveti-stefan", name: "Sveti Stefan" },
  { id: "tirana-airport", name: "Aerodrom Tirana" },
  { id: "tirana-city", name: "Tirana (centar)" },
  { id: "tivat", name: "Tivat" },
  { id: "trebinje", name: "Trebinje" },
  { id: "ulcinj", name: "Ulcinj" },
  { id: "uzice", name: "Užice" },
  { id: "valjevo", name: "Valjevo" },
  { id: "zabljak", name: "Žabljak" },
  { id: "zlatibor", name: "Zlatibor" },
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

// Base prices from Podgorica (city or airport — same prices)
const PODGORICA_PRICES: Record<string, number> = {
  // Airport Podgorica ↔ Podgorica city
  "aerodrom-podgorica": 25,
  podgorica: 25,
  // All destinations
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
  pristina: 300,
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

// Both Podgorica city and airport count as "Podgorica origin"
const PODGORICA_IDS = new Set(["podgorica", "aerodrom-podgorica"]);

export function getRouteInfo(
  fromId: string,
  toId: string
): {
  available: boolean;
  basePrice: number | null;
  quoteOnly: boolean;
} {
  if (fromId === toId)
    return { available: false, basePrice: null, quoteOnly: false };

  // From Podgorica (city or airport) to destination
  if (PODGORICA_IDS.has(fromId)) {
    // Between airport and city
    if (PODGORICA_IDS.has(toId)) {
      return { available: true, basePrice: 25, quoteOnly: false };
    }
    const price = PODGORICA_PRICES[toId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // To Podgorica (city or airport) from destination
  if (PODGORICA_IDS.has(toId)) {
    // Between airport and city
    if (PODGORICA_IDS.has(fromId)) {
      return { available: true, basePrice: 25, quoteOnly: false };
    }
    const price = PODGORICA_PRICES[fromId];
    if (price !== undefined)
      return { available: true, basePrice: price, quoteOnly: false };
    return { available: true, basePrice: null, quoteOnly: true };
  }

  // Neither end is Podgorica — quote only
  return { available: true, basePrice: null, quoteOnly: true };
}

export function calculatePrice(
  basePrice: number,
  vehicleId: string,
  roundTrip: boolean
): number {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  if (!vehicle) return basePrice;

  let price = basePrice;
  if (vehicle.priceModifier === "plus20") price = basePrice + 20;
  if (vehicle.priceModifier === "times2") price = basePrice * 2;
  if (roundTrip) price = price * 2;

  return price;
}

export function getFromLocations(): Location[] {
  return LOCATIONS;
}

export function getToLocations(fromId: string): Location[] {
  return LOCATIONS.filter((l) => l.id !== fromId);
}
