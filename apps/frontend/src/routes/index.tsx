import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { brandsApiBrandsGetOptions } from "@/client/@tanstack/react-query.gen";
import LoadingComponent from "@/components/loading";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(brandsApiBrandsGetOptions());
  },
  pendingComponent: () => <LoadingComponent />,
  errorComponent: ({ error }) => `An error has occurred: ${error.message}`,
  component: RouteComponent
});

function RouteComponent() {
  const phoneBrandsQuery = useSuspenseQuery(brandsApiBrandsGetOptions());
  const brands = phoneBrandsQuery.data;

  return (
    <main className="bg-[#151515] uppercase">
      <section className="min-h-screen">
        <div className="absolute top-0 w-full">
          <div className="absolute bg-black opacity-50 h-full w-full pointer-events-none"></div>
          <div className="absolute left-8 bottom-16 text-white z-10 flex flex-col gap-4 text-9xl font-semibold">
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

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white">
        <h1 className="text-5xl font-semibold">Samsung</h1>
      </section>

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white">
        <h1 className="text-5xl font-semibold">Iphone</h1>
      </section>

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white">
        <h1 className="text-5xl font-semibold">Oppo</h1>
      </section>

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white">
        <h1 className="text-5xl font-semibold">Xiaomi</h1>
      </section>

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white">
        <h1 className="text-5xl font-semibold">Vivo</h1>
      </section>

      <section className="container flex flex-col gap-8 mx-auto p-8 text-white">
        <h1 className="text-5xl font-semibold">ALL Brand Phone</h1>
        <ul className="grid grid-cols-5  gap-2">
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
