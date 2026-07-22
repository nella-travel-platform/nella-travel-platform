export type Vehicle = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  passengers: number;
  bags: number;
  transmission: "Automatic" | "Manual";
  dailyRate: number;
  damageDeposit: number;
  image: string;
  features: string[];
  available: boolean;
};

export const vehicles: Vehicle[] = [
  { id:"toyota-yaris", name:"Toyota Yaris or similar", category:"small", categoryLabel:"Small", passengers:4, bags:2, transmission:"Automatic", dailyRate:750, damageDeposit:4000, image:"🚙", features:["Air conditioning","Insurance included","Airport delivery"], available:true },
  { id:"nissan-versa", name:"Nissan Versa or similar", category:"medium", categoryLabel:"Medium", passengers:5, bags:3, transmission:"Automatic", dailyRate:900, damageDeposit:4000, image:"🚗", features:["Air conditioning","Insurance included","Bluetooth"], available:true },
  { id:"toyota-avanza", name:"Toyota Avanza or similar", category:"large", categoryLabel:"Large", passengers:7, bags:4, transmission:"Automatic", dailyRate:1250, damageDeposit:6000, image:"🚐", features:["7 passengers","Insurance included","Airport delivery"], available:true },
  { id:"dodge-caravan", name:"Dodge Grand Caravan or similar", category:"extra-large", categoryLabel:"Extra Large", passengers:8, bags:5, transmission:"Automatic", dailyRate:1650, damageDeposit:8000, image:"🚐", features:["Family van","Insurance included","Large luggage space"], available:true },
  { id:"toyota-hiace", name:"Toyota Hiace or similar", category:"super-large", categoryLabel:"Super Large", passengers:12, bags:8, transmission:"Manual", dailyRate:2400, damageDeposit:10000, image:"🚌", features:["Group travel","Insurance included","Professional delivery"], available:true },
];

export const categoryOptions = [
  { value:"", label:"All categories" },
  { value:"small", label:"Small · 3–4 passengers" },
  { value:"medium", label:"Medium · 4–5 passengers" },
  { value:"large", label:"Large · 5–7 passengers" },
  { value:"extra-large", label:"Extra Large · 7–9 passengers" },
  { value:"super-large", label:"Super Large · 10+ passengers" },
];

export function calculateRentalDays(pickupDate?: string, returnDate?: string) {
  if (!pickupDate || !returnDate) return 1;
  const pickup = new Date(`${pickupDate}T12:00:00`);
  const returned = new Date(`${returnDate}T12:00:00`);
  const days = Math.ceil((returned.getTime() - pickup.getTime()) / 86400000);
  return Number.isFinite(days) && days > 0 ? days : 1;
}
