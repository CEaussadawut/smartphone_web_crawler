import type { PhonePreview } from "@/client/types.gen";

const Phone = ({ index, phone }: { index: number; phone: PhonePreview }) => {
  return (
    <a key={index} href={phone.href} target="_blank">
      <div className="text-[#151515] bg-white flex flex-col justify-center gap-4 p-4 rounded-lg">
        <img src={phone.img} alt={phone.name} className="h-52 object-contain" />
        <h1 className="text-xl">{phone.name}</h1>
      </div>
    </a>
  );
};

export default Phone;
