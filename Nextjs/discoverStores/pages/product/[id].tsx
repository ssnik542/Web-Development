import React from "react";
import { useRouter } from "next/router";
import ProductExp from "@/components/ProductExp";
export default function ProductPage() {
  const router = useRouter();

  return (
    <div>
      <ProductExp id={router.query.id} />
    </div>
  );
}
