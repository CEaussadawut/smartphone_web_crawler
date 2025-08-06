import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index
});

function Index() {
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
        <video className="w-full h-full -z-10" autoPlay loop muted playsInline>
          <source className="h-24" src="/medium_2x.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </main>
  );
}
