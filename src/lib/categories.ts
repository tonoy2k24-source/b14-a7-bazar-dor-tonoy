export type Category = {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
};

export const categories: Category[] = [
  { id: 1, slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: 2, slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: 3, slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: 4, slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: 5, slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: 6, slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: 7, slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: 8, slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];