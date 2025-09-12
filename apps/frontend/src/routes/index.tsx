import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { brandsApiBrandsGetOptions } from "@/client/@tanstack/react-query.gen";
import Category from "@/components/category";
import LoadingComponent from "@/components/loading";
import { getBrandName } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(brandsApiBrandsGetOptions());
  },
  pendingComponent: () => <LoadingComponent />,
  errorComponent: ({ error }) => `An error has occurred: ${error.message}`,
  component: RouteComponent
});

const highLightBrandSet = new Set<string>([
  "Apple",
  "Samsung",
  "Xiaomi",
  "Sony",
  "Vivo"
]);

function RouteComponent() {
  const phoneBrandsQuery = useSuspenseQuery(brandsApiBrandsGetOptions());
  const brands = phoneBrandsQuery.data;

  const highlightBrands = brands
    .filter((b) => {
      return highLightBrandSet.has(
        getBrandName(b.name, { isCapitalize: true })
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="bg-[#151515] uppercase">
      <section className="min-h-screen">
        <div className="absolute top-0 w-full">
          <div className="absolute bg-black opacity-50 h-full w-full pointer-events-none"></div>
          <div className="absolute left-4 lg:left-8 bottom-8 lg:bottom-16 text-white z-10 flex flex-col gap-4 text-5xl lg:text-9xl font-semibold">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              THE PHONE
            </motion.h1>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
            >
              PORTAL
            </motion.h1>
          </div>
          {/* <div className="absolute left-0 right-0 bottom-2 flex justify-around">
            <p>Find Phone, Find CEDT Phone.</p>
            <p>Find Phone, Find CEDT Phone.</p>
            <p>Make with Love by CEDT Phone Group.</p>
          </div> */}
          <video
            className="w-full h-screen -z-10 object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/medium_2x.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white mb-12">
        {highlightBrands.map((highlighBrand) => (
          <Category brandName={highlighBrand.name} href={highlighBrand.href} />
        ))}
      </section>

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white">
        <h1 className="text-3xl lg:text-5xl font-semibold">
          All Brands Available
        </h1>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2">
          {brands.map((brand, index) => (
            <li key={index} className="hover:text-orange-500">
              <Link to="/device/$brandSlug" params={{ brandSlug: brand.href }}>
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
