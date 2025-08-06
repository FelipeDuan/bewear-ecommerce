"use client";

import { ProductItem } from "@/components/core/product-item";
import type { productTable, productVariantTable } from "@/db/schema";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export function ProductList({ title, products }: ProductListProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold px-5">{title}</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {products.map((prod) => (
          <ProductItem key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
