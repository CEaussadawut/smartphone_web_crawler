import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { brandsApiBrandsGetOptions } from "@/client/@tanstack/react-query.gen";
import LoadingComponent from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: Index
});

function Index() {
  const phoneBrandsQuery = useSuspenseQuery(brandsApiBrandsGetOptions());

  if (phoneBrandsQuery.isLoading) return <LoadingComponent />;

  if (phoneBrandsQuery.error) {
    return `An error has occurred: ${phoneBrandsQuery.error.message}`;
  }

  const brands = phoneBrandsQuery.data;

  return (
    <main className="bg-black">
      <section className="relative w-full max-h-screen ">
        <div className="absolute bg-black opacity-50 h-full w-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 text-white z-10 flex flex-col gap-4">
          <h1 className="text-5xl">Find your phone at CEDT Phone</h1>
          <div className="flex gap-4">
            <Input type="text" placeholder="Email" />
            <Link to="/about">
              <Button>search</Button>
            </Link>
          </div>
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
      </section>

      <section className="container mx-auto p-8 text-white">
        <h1 className="text-xl">ALL Brand Phone</h1>
        <ul className="grid grid-cols-5">
          {brands.map((brand, index) => (
            <li key={index} className="hover:text-red-300">
              <Link to="/device/$brand" params={{ brand: brand.href }}>
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
