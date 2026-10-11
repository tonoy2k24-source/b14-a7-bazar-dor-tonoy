import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold text-green-700">৪০৪</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        আপনি যে লিংকটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}