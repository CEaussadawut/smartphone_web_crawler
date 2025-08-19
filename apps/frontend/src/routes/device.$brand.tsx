import { createFileRoute } from "@tanstack/react-router";

import { getPhoneBrandApiBrandGetOptions } from "@/client/@tanstack/react-query.gen";
import Phone from "@/components/phone";

export const Route = createFileRoute("/device/$brand")({
  loader: async ({ context: { queryClient }, params: { brand } }) =>
    await queryClient.fetchQuery(
      getPhoneBrandApiBrandGetOptions({ path: { brand } })
    ),
  component: RouteComponent
});

function RouteComponent() {
  const param = Route.useParams();
  const all_phones = Route.useLoaderData();

  console.log(all_phones);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <h1 className="text-3xl">Brand: {param.brand.split("-")[0]}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {all_phones.map((phone, index) => (
          <Phone index={index} phone={phone} />
        ))}
      </div>
    </div>
  );
}
