import Image from "next/image";
import Link from "next/link";
import type { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

export function VariantSelector({
  variants,
  selectVariantSlug,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
          className={
            selectVariantSlug === variant.slug
              ? "border-2 rounded-xl border-primary"
              : ""
          }
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
}
