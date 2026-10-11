"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductGridSkeleton from "@/components/ProductSkeleton";
import { categories } from "@/lib/categories";
import { getProducts, type Product } from "@/lib/products";
import { toBn } from "@/lib/bangla";

export default function CategoryPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      getProducts(slug).then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "asc") return a.today - b.today;
    if (sort === "desc") return b.today - a.today;
    return 0;
  });

  if (!category && !loading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          অনুরোধকৃত ক্যাটাগরিটি বিদ্যমান নেই।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
            {category?.icon || "📦"}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category?.nameBn || "ক্যাটাগরি"}
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end rounded-2xl border border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs font-medium text-gray-600">
            সাজান
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "default" | "asc" | "desc")
            }
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        {loading
          ? "লোড হচ্ছে..."
          : `মোট ${toBn(String(sortedProducts.length))} টি পণ্য দেখানো হচ্ছে`}
      </p>

      <div className="mt-3">
        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-gray-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}