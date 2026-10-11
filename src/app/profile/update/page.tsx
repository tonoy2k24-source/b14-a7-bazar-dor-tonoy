"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

function UpdateForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
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
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
        return;
      }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          নতুন নাম
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম লিখুন"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Link
          href="/profile"
          className="flex-1 rounded-lg border border-gray-300 bg-white py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          বাতিল
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "সেভ হচ্ছে..." : "আপডেট করুন"}
        </button>
      </div>
    </form>
  );
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রথমে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="skeleton h-48 w-full max-w-md rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>
        <UpdateForm initialName={session.user.name || ""} />
      </div>
    </div>
  );
}