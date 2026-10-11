import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section
      id="সব-পণ্য"
      className="mx-auto max-w-6xl scroll-mt-4 px-4 py-10"
    >
      <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
      <p className="mt-1 text-sm text-gray-600">
        সব পণ্যের আজকের দাম ও দামের পরিবর্তন এক জায়গায়।
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}