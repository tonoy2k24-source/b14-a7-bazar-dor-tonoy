"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient, signOut, useSession } from "@/lib/auth-client";

function ProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });
      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
        return;
      }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          নাম
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
      </button>
    </form>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.dismiss();
      toast.error("প্রোফাইল দেখতে প্রথমে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="skeleton h-64 w-full max-w-lg rounded-2xl" />
      </div>
    );
  }

  const user = session.user;
  const initial = user.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-800">
              {initial}
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          সাইন আউট
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-gray-900">তথ্য</h3>
        <ProfileForm initialName={user.name || ""} />
      </div>
    </div>
  );
}