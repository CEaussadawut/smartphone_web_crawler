import LoadingComponent from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index
});

type Brand = {
  name: string;
  link: string;
};

function Index() {
  const { isPending, error, data } = useQuery<Brand[]>({
    queryKey: [],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/phone/get_brands");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Unknown error");
      }

      return await response.json();
    }
  });

  if (isPending) return <LoadingComponent />;

  if (error) return "An error has occurred: " + error.message;

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
          {data.map((brand, index) => (
            <li key={index} className="hover:text-red-300">
              <a href={brand.link} target="_blank">
                {brand.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
