"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddToCartButton } from "@/components/core/add-to-cart-button";
import { Button } from "@/components/ui/button";

interface ProductActionsProps {
  productVariantId: string;
}

export function ProductActions({ productVariantId }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  function handleIncrementQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrementQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return (
    <>
      <div className="px-5 space-y-4">
        <h3 className="font-medium">Quantidade</h3>
        <div className="flex items-center w-[100px] border justify-between rounded-lg">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={handleDecrementQuantity}
          >
            <MinusIcon />
          </Button>

          <p>{quantity}</p>

          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={handleIncrementQuantity}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />

        <Button className="rounded-full" size={"lg"}>
          Comprar agora
        </Button>
      </div>
    </>
  );
}
