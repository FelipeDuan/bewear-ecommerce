import Image from "next/image";
import { Header } from "@/components/core/header";
import { ProductList } from "@/components/core/product-list";
import { db } from "@/db";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });
  console.log(products);

  return (
    <>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.svg"
            alt="Leve uma vida com estilo."
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <Image
            src="/banner-02.svg"
            alt="Leve uma vida com estilo."
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}
