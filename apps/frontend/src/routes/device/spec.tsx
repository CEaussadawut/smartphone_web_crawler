import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getPhoneSpecApiDeviceSpecGetOptions } from "@/client/@tanstack/react-query.gen";
import LoadingComponent from "@/components/loading";

export const Route = createFileRoute("/device/spec")({
  validateSearch: (search: Record<string, unknown>): { phone_url: string } => {
    // validate and parse search params
    return {
      phone_url: search.phone_url as string,
    };
  },
  loaderDeps: ({ search: { phone_url } }) => ({ phone_url }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(
      getPhoneSpecApiDeviceSpecGetOptions({
        query: { phone_url: deps.phone_url },
      })
    );
  },
  pendingComponent: () => <LoadingComponent />,
  errorComponent: ({ error }) => `An error has occurred: ${error.message}`,
  component: RouteComponent,
});

function RouteComponent() {
  const { phone_url } = Route.useSearch();
  const phoneSpecQuery = useSuspenseQuery(
    getPhoneSpecApiDeviceSpecGetOptions({ query: { phone_url: phone_url } })
  );
  const phoneSpec = phoneSpecQuery.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{phoneSpec.name}</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-xl font-semibold">Display</h2>
          <p>Type: {phoneSpec.spec.display_type}</p>
          <p>Size: {phoneSpec.spec.display_size}</p>
          <p>Resolution: {phoneSpec.spec.display_resolution}</p>
          <p>Protection: {phoneSpec.spec.display_protection}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Platform</h2>
          <p>OS: {phoneSpec.spec.platform_os}</p>
          <p>Chipset: {phoneSpec.spec.platform_chipset}</p>
          <p>CPU: {phoneSpec.spec.platform_cpu}</p>
          <p>GPU: {phoneSpec.spec.platform_gpu}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Battery</h2>
          <p>{phoneSpec.spec.battery}</p>
        </div>
      </div>
    </div>
  );
}
