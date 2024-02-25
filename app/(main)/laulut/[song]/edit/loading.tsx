import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import Space from "@/components/ui/space";

const LoadingPage = () => {
  return (
    <div>
      <BackButton />

      <Space className="mt-4" />

      <Skeleton className="h-8 w-32" />

      <Space className="mt-5" />

      <Skeleton className="w-16 h-4" />

      <Space className="mt-3" />

      <Skeleton className="w-full h-8" />

      <Space className="mt-12" />

      <Skeleton className="w-16 h-4" />

      <Space className="mt-3" />

      <Skeleton className="w-full h-8" />
    </div>
  );
};

export default LoadingPage;
