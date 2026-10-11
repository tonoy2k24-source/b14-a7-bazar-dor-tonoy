import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type Props = {
  title: string;
  arrow: "up" | "down";
  products: Product[];
};

export default function RiseFallSection({ title, arrow, products }: Props) {
  if (products.length === 0) return null;
  const color = arrow === "up" ? "text-red-600" : "text-green-600";

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <span className={`text-base ${color}`}>
          {arrow === "up" ? "▲" : "▼"}
        </span>
        {title}
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}