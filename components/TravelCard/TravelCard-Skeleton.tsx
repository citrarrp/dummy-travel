import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TravelCardSkeletonProps {
  className?: string;
}

export default function TravelCardSkeleton({
  className,
}: TravelCardSkeletonProps) {
  return (
    <Card className={cn("w-60 md:w-72", className)}>
      <Skeleton className="h-[200px] w-full rounded-t-sm" />
      <div className="m-3">
        <div className="mb-3 flex justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="ml-3 h-4 w-32" />
        </div>
        <Skeleton className="mt-3 h-12 w-full" />
        <Skeleton className="mt-3 h-[1px] w-full" />
        <div className="flex m-2">
          <div className="flex mr-3 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="ml-1 h-4 w-16" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="ml-1 h-4 w-16" />
          </div>
        </div>
      </div>
    </Card>
  );
}
