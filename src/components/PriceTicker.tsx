import { toBn, toBnNumber } from "@/lib/bangla";
import { unitBn, type Product } from "@/lib/products";

function TickerItem({ product }: { product: Product }) {
  const pct = product.change.pct;
  const up = pct > 0;
  const down = pct < 0;
  const color = up ? "text-red-600" : down ? "text-green-600" : "text-gray-500";
  const arrow = up ? "▲" : down ? "▼" : "—";

  return (
    <span className="flex shrink-0 items-center gap-2 px-6 text-sm">
      <span>{product.image}</span>
      <span className="font-medium text-gray-800">{product.nameBn}</span>
      <span className="text-gray-600">
        {toBnNumber(product.today)} টাকা/{unitBn(product.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {arrow} {toBn(Math.abs(pct).toFixed(1))}%
      </span>
    </span>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-white">
      <div className="ticker-track flex w-max items-center py-2.5">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {products.map((product) => (
              <TickerItem key={`${copy}-${product.id}`} product={product} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}