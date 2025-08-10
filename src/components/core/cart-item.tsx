import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { removeProductToCart } from "@/actions/remove-cart-product";
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
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductToCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  function handleDeleteClick() {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido com sucesso.");
      },
      onError: () => {
        toast.error("Error ao remover produto.");
      },
    });
  }

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
        <Button
          variant={"outline"}
          size={"icon"}
          className="text-muted-foreground hover:text-red-500 hover:bg-red-100 hover:border-red-100 hover:shadow-red-50"
          onClick={handleDeleteClick}
        >
          <TrashIcon />
        </Button>

        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
