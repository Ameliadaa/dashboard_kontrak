
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ListUser from "@/components/ListUser";

export const dynamic = "force-dynamic";

function SuccessMessageHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setSuccessMessage("User successfully created.");

      const timer = setTimeout(() => {
        setSuccessMessage(null);
        router.replace("/");
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (searchParams.get("update") === "true") {
      setSuccessMessage("User successfully updated.");

      const timer = setTimeout(() => {
        setSuccessMessage(null);
        router.replace("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  return successMessage ? (
    <div className="alert-success my-4">{successMessage}</div>
  ) : null;
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessMessageHandler />
      </Suspense>
      <ListUser />
    </div>
  );
}
