import { Suspense } from "react";
import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import ProductGridSkeleton from "@/components/ProductSkeleton";
import RiseFallSection from "@/components/RiseFallSection";
import { getProducts, topFallers, topRisers } from "@/lib/products";

async function HomeSections() {
  const products = await getProducts();

  return (
    <>
      <RiseFallSection
        title="আজ দাম বেড়েছে"
        arrow="up"
        products={topRisers(products)}
      />
      <RiseFallSection
        title="আজ দাম কমেছে"
        arrow="down"
        products={topFallers(products)}
      />
      <AllProducts products={products} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <div id="সব-পণ্য" className="mx-auto max-w-6xl px-4 py-10">
            <ProductGridSkeleton count={8} />
          </div>
        }
      >
        <HomeSections />
      </Suspense>
    </>
  );
}