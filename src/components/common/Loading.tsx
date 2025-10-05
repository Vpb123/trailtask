'use client';

export const Loading = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-16 w-full bg-gray-800 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
};
