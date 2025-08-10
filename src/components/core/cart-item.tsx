import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  quantity,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-xs font-medium text-muted-foreground">
            {productVariantName}
          </p>
          <div className="flex items-center w-[100px] p-1 border justify-between rounded-lg">
            <Button className="w-4 h-4" variant={"ghost"} onClick={() => {}}>
              <MinusIcon className="size-3" />
            </Button>

            <p className="text-xs">{quantity}</p>

            <Button className="w-4 h-4" variant={"ghost"} onClick={() => {}}>
              <PlusIcon className="size-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-end gap-2">
        <Button variant={"outline"} size={"icon"}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
