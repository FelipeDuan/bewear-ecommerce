"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  function handleIncrementQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrementQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return (
    <div className="space-y-4">
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
  );
}
