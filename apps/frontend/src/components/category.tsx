import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { getPhoneBrandApiDeviceBrandGetOptions } from "@/client/@tanstack/react-query.gen";
import type { PhonePreview } from "@/client/types.gen";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

export default function Category({
  brandName,
  href
}: {
  brandName: string;
  href: string;
}) {
  const phonesQueried = useSuspenseQuery(
    getPhoneBrandApiDeviceBrandGetOptions({ path: { brand: href } })
  );

  const phones = phonesQueried.data;

  const shuffle = (array: PhonePreview[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 10);
  };

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
          {shuffle(phones).map((phone, i) => (
            <CarouselItem key={i} className="basis-auto select-none">
              <Link
                to="/device/spec"
                search={{ phone_url: phone.href }}
                className="p-4 cursor-pointer hover:bg-white hover:text-[#151515] rounded-lg overflow-hidden w-48 flex flex-col gap-4 transition duration-300"
              >
                <img
                  src={phone.img}
                  alt={phone.name}
                  className="px-1 py-2 w-full h-48 object-contain rounded-sm bg-white"
                />
                <h2 className="text-center text-sm font-bold">{phone.name}</h2>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
