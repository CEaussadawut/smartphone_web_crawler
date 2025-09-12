import { Link } from "@tanstack/react-router";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

export type PhonePreview = {
  name: string;
  img: string;
};

export default function Category({
  brandName,
  previewPhones,
  href
}: {
  brandName: string;
  previewPhones: PhonePreview[];
  href: string;
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{brandName}</h1>
        <Link
          to="/device/$brandSlug"
          params={{ brandSlug: href }}
          className="text-white text-sm cursor-pointer hover:text-orange-500"
        >
          View More →
        </Link>
      </div>
      <Carousel opts={{ skipSnaps: true }}>
        <CarouselContent>
          {previewPhones.map((phone, i) => (
            <CarouselItem key={i} className="basis-auto select-none">
              <div className="pb-4 cursor-pointer hover:bg-white hover:text-[#151515] rounded-sm shadow-lg overflow-hidden w-48 flex-shrink-0 transition duration-300">
                <img
                  src={phone.img}
                  alt={phone.name}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-center text-sm font-bold">{phone.name}</h2>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
