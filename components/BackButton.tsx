"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={"link"}
      className="p-0 flex items-center space-x-2 group"
    >
      <ArrowLeft className="w-5 group-hover:-translate-x-[2px] duration-100" />

      <p>Takaisin</p>
    </Button>
  );
};

export default BackButton;
