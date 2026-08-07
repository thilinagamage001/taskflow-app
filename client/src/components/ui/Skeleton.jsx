export function Skeleton({ className }) {
  return <div className={`skeleton ${className || ''}`} />;
}

export function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-dark-200 p-5 dark:bg-dark-800 dark:border-dark-700">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-dark-200 p-5 dark:bg-dark-800 dark:border-dark-700">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-dark-200 dark:bg-dark-800 dark:border-dark-700">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
