import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Partner = {
  id: number;
  name: string;
  img: string;
};

interface PartnerItemProps {
  partner: Partner;
}

export function PartnerItem({ partner }: PartnerItemProps) {
  return (
    <Link
      href={"/"}
      className="flex flex-col items-center gap-3 min-w-[120px] flex-shrink-0"
    >
      <Button
        variant="outline"
        className="w-20 h-20 p-0 rounded-3xl bg-white hover:bg-gray-50 border-gray-200 cursor-pointer"
      >
        <Image
          src={partner.img}
          alt={partner.name}
          height={32}
          width={32}
          className="w-8 h-8 object-contain"
        />
      </Button>
      <p className="text-sm font-medium">{partner.name}</p>
    </Link>
  );
}
