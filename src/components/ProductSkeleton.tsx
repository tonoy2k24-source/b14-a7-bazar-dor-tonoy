export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="skeleton mt-4 h-3 w-16" />
      <div className="mt-2 flex items-center justify-between">
        <div className="skeleton h-5 w-20" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}