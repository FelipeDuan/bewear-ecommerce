import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/core/header";
import { Addresses } from "@/components/core/user/addresses";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export default async function IdentificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      items: true,
    },
  });

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <div className="px-5">
        <Addresses />
      </div>
    </>
  );
}
