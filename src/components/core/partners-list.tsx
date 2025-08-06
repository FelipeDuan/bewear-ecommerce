import { PartnerItem } from "./partners-item";

interface PartnersListProps {
  title: string;
}

export function PartnersList({ title }: PartnersListProps) {
  const partners = [
    { id: 1, name: "Nike", img: "/nike.svg" },
    { id: 2, name: "Adidas", img: "/adidas.svg" },
    { id: 3, name: "Puma", img: "/puma.svg" },
    { id: 4, name: "New Balance", img: "/newbalance.svg" },
    { id: 5, name: "Converse", img: "/converse.svg" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg px-5">{title}</h3>
      <div className="flex gap-2 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden scrollbar-hide">
        {partners.map((partner) => (
          <PartnerItem key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}
