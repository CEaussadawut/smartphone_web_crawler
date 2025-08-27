import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getPhoneBrandApiBrandGetOptions } from "@/client/@tanstack/react-query.gen";
import LoadingComponent from "@/components/loading";
import Phone from "@/components/phone";

export const Route = createFileRoute("/device/$brand")({
  component: RouteComponent
});

function RouteComponent() {
  const param = Route.useParams();

  const allPhonesQueried = useSuspenseQuery(
    getPhoneBrandApiBrandGetOptions({ path: { brand: param.brand } })
  );

  if (allPhonesQueried.isLoading) return <LoadingComponent />;

  if (allPhonesQueried.isError) {
    return `An error has occurred: ${allPhonesQueried.error.message}`;
  }

  const allPhones = allPhonesQueried.data;

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <h1 className="text-3xl">Brand: {param.brand.split("-")[0]}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-fr">
        {allPhones.map((phone, index) => (
          <div key={index}>
            <Phone phone={phone} />
          </div>
        ))}
      </div>
    </div>
  );
}
