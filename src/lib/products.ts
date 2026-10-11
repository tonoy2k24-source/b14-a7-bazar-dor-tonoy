const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_URL = "https://api.abcz.workers.dev/api/bazardor";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function unitBn(unit: string): string {
  return unitLabels[unit] ?? unit;
}

async function request(path: string): Promise<Response | null> {
  for (const base of [BASE_URL, FALLBACK_URL]) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.ok) return res;
    } catch {
      continue;
    }
  }
  return null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await request(`/products${query}`);
  if (!res) return [];
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const res = await request(`/products/${encodeURIComponent(slug)}`);
  if (res) {
    const json = await res.json();
    if (json && !Array.isArray(json) && json.slug) return json;
  }
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export function topRisers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, count);
}

export function topFallers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => p.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, count);
}