import Link from "next/link";
import { toBn, toBnNumber } from "@/lib/bangla";
import { unitBn, type Product } from "@/lib/products";

export function ChangeBadge({ product }: { product: Product }) {
  const pct = product.change.pct;
  const up = pct > 0;
  const down = pct < 0;
  const style = up
    ? "bg-red-50 text-red-600"
    : down
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";
  const arrow = up ? "▲" : down ? "▼" : "—";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {arrow} {toBn(Math.abs(pct).toFixed(1))}%
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">প্রতি {unitBn(product.unit)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-gray-900">
          {toBnNumber(product.today)}{" "}
          <span className="text-sm font-medium">টাকা</span>
        </p>
        <ChangeBadge product={product} />
      </div>
    </Link>
  );
}