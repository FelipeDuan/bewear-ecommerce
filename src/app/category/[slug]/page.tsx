import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Header } from "@/components/core/header";
import { ProductItem } from "@/components/core/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 space-y-6">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((prod) => (
            <ProductItem
              key={prod.id}
              product={prod}
              textContainerClassName="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
