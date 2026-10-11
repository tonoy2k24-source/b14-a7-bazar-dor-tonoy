"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ChangeBadge } from "@/components/ProductCard";
import { toBn, toBnNumber } from "@/lib/bangla";
import { useSession } from "@/lib/auth-client";
import { getProduct, unitBn, type Product } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const redirectedRef = useRef(false);

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  useEffect(() => {
    if (!isPending && !session?.user && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.dismiss();
      toast.error("বিস্তারিত দেখতে প্রথমে সাইন ইন করুন");
      router.push("/signin");
      return;
    }

    if (slug && session?.user) {
      getProduct(slug).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [slug, session, isPending, router]);

  if (isPending || loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="skeleton mb-4 h-4 w-48 rounded" />
        <div className="skeleton h-40 w-full rounded-2xl" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="skeleton h-24 rounded-2xl" />
          <div className="skeleton h-24 rounded-2xl" />
          <div className="skeleton h-24 rounded-2xl" />
        </div>
        <div className="skeleton mt-8 h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">পণ্য পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-gray-600">
          আপনি যে পণ্যটি খুঁজছেন তা বাজারে এই মুহূর্তে বিদ্যমান নেই।
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

  const prices = product.markets.flatMap((m) => [m.min, m.max]);
  const minPrice = prices.length ? Math.min(...prices) : product.today;
  const maxPrice = prices.length ? Math.max(...prices) : product.today;
  const avgPrice = prices.length
    ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    : product.today;

  const pct = product.change.pct;
  const up = pct > 0;
  const down = pct < 0;
  const diffText = up
    ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(Math.abs(product.today - product.yesterday).toFixed(0))} টাকা`
    : down
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(Math.abs(product.today - product.yesterday).toFixed(0))} টাকা`
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="font-medium text-gray-800">{product.nameBn}</span>
      </nav>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="mt-0.5 text-xs text-gray-500">
                প্রতি {unitBn(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-1.5 text-xs text-gray-600">{diffText}</p>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-center sm:min-w-35">
            <p className="text-[11px] font-medium text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-3xl font-extrabold text-gray-900">
              {toBnNumber(product.today)}
            </p>
            <p className="text-xs text-gray-500">
              টাকা / {unitBn(product.unit)}
            </p>
            <div className="mt-2 flex justify-center">
              <ChangeBadge product={product} />
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-base font-bold text-gray-900">
        দামের সারসংক্ষেপ
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500">সর্বনিম্ন দাম</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {toBnNumber(minPrice)} টাকা
          </p>
          <p className="mt-1 text-[11px] text-gray-400">
            সবচেয়ে কম দামের বাজার
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500">সর্বোচ্চ দাম</p>
          <p className="mt-1 text-2xl font-bold text-red-500">
            {toBnNumber(maxPrice)} টাকা
          </p>
          <p className="mt-1 text-[11px] text-gray-400">
            সবচেয়ে বেশি দামের বাজার
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500">গড় দাম</p>
          <p className="mt-1 text-2xl font-bold text-green-700">
            {toBnNumber(avgPrice)} টাকা
          </p>
          <p className="mt-1 text-[11px] text-gray-400">
            প্রতি {unitBn(product.unit)}-এর হিসাব
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-base font-bold text-gray-900">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs text-gray-600">
                <th className="px-5 py-3.5 font-semibold">বাজার</th>
                <th className="px-5 py-3.5 font-semibold">বিভাগ</th>
                <th className="px-5 py-3.5 font-semibold">সর্বনিম্ন</th>
                <th className="px-5 py-3.5 font-semibold">সর্বোচ্চ</th>
                <th className="px-5 py-3.5 font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {product.markets.map((market, idx) => {
                const avg = Math.round((market.min + market.max) / 2);
                return (
                  <tr
                    key={idx}
                    className={idx % 2 === 1 ? "bg-gray-50/60" : "bg-white"}
                  >
                    <td className="px-5 py-3.5 font-medium text-gray-900">
                      {market.market}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      {market.division}
                    </td>
                    <td className="px-5 py-3.5 text-gray-800">
                      {toBnNumber(market.min)} টাকা
                    </td>
                    <td className="px-5 py-3.5 text-gray-800">
                      {toBnNumber(market.max)} টাকা
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-gray-900">
                      {toBnNumber(avg)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}