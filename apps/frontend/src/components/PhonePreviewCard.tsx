import type { PhonePreview } from "@/client/types.gen";

const PhonePreviewCard = ({ phone }: { phone: PhonePreview }) => {
  return (
    <a href={phone.href} target="_blank">
      <div className="text-[#151515] bg-white flex flex-col justify-center gap-4 p-4 rounded-sm">
        <img src={phone.img} alt={phone.name} className="h-52 object-contain" />
        <h1 className="h-12 text-xl">{phone.name}</h1>
      </div>
    </a>
  );
};

export default PhonePreviewCard;
