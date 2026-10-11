"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import PriceTicker from "@/components/PriceTicker";
import { categories } from "@/lib/categories";
import { getProducts, type Product } from "@/lib/products";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const todayBn = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 p-2 shadow-sm">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={28}
                height={28}
                priority
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-gray-900">
                বাজার দর
              </h1>
              <p className="text-[11px] font-medium text-gray-500">{todayBn}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
            ) : session?.user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800">
                      {session.user.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  )}
                  <span className="hidden text-xs font-semibold sm:inline">
                    {session.user.name}
                  </span>
                  <span className="text-xs text-gray-400">▾</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl transition-all">
                    <div className="px-2 py-1.5">
                      <p className="truncate text-xs font-bold text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="truncate text-[11px] text-gray-500">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="my-2 h-px bg-gray-100" />

                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                      >
                        <span>👤</span>
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <span>↩️</span>
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-green-700 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto border-t border-gray-100 py-2">
          {categories.map((cat) => {
            const active = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {products.length > 0 && <PriceTicker products={products} />}
    </header>
  );
}