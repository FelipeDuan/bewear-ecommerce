import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/core/footer";
import { Header } from "@/components/core/header";
import { ProductList } from "@/components/core/product-list";
import { QuantitySelector } from "@/components/core/quantity-selector";
import { VariantSelector } from "@/components/core/variants-selector";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductVariantPage({
  params,
}: ProductVariantPageProps) {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: { variants: true },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <div className="px-5">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            width={0}
            height={0}
            className="h-auto w-full object-cover rounded-3xl"
          />
        </div>

        <div className="px-5">
          <VariantSelector
            selectVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="space-y-4 px-5">
          <div>
            <h2 className="text-lg font-semibold">
              {productVariant.product.name}
            </h2>
            <h3 className="text-muted-foreground">{productVariant.name}</h3>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {formatCentsToBRL(productVariant.priceInCents)}
            </h3>
          </div>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col gap-4 px-5">
          <Button className="rounded-full" size={"lg"} variant={"outline"}>
            Adicionar à sacola
          </Button>
          <Button className="rounded-full" size={"lg"}>
            Comprar agora
          </Button>
        </div>

        <div className="text-sm text-muted-foreground px-5">
          {productVariant.product.description}
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
}
