import { banglaDate } from "@/lib/bangla";
import HeroImage from "@/components/HeroImage";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white/70 px-6 py-8 md:flex-row md:justify-between md:px-8">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {banglaDate()}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-sm sm:btn-md mt-6 border-green-700 bg-green-700 font-medium text-white shadow-md hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex w-full justify-center md:w-auto md:justify-end">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}