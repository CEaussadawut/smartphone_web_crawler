import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { lazy, Suspense } from "react";

import { getPhoneBrandApiDeviceBrandGetOptions } from "@/client/@tanstack/react-query.gen";
import LoadingComponent from "@/components/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { getBrandName } from "@/lib/utils";

const PhonePreviewCard = lazy(() => import("@/components/PhonePreviewCard"));

export const Route = createFileRoute("/device/$brandSlug")({
  loader: async ({ context: { queryClient }, params: { brandSlug } }) => {
    await queryClient.ensureQueryData(
      getPhoneBrandApiDeviceBrandGetOptions({
        path: { brand: brandSlug }
      })
    );
  },
  pendingComponent: () => <LoadingComponent />,
  errorComponent: ({ error }) => `An error has occurred: ${error.message}`,
  component: RouteComponent
});

function RouteComponent() {
  const { brandSlug } = Route.useParams();
  const phonesQueried = useSuspenseQuery(
    getPhoneBrandApiDeviceBrandGetOptions({ path: { brand: brandSlug } })
  );

  const allPhone = phonesQueried.data;

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <motion.h1
        initial={{
          x: -100
        }}
        animate={{
          x: 0
        }}
        className="text-3xl"
      >
        Brand: {getBrandName(brandSlug, { isCapitalize: true })}
      </motion.h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-fr">
        {allPhone.phones.map((phone, i) => (
          <Suspense
            key={i}
            fallback={<Skeleton className="h-76 p-4 w-auto rounded-sm" />}
          >
            <PhonePreviewCard phone={phone} />
          </Suspense>
        ))}
      </div>

      <div className="flex gap-2 justify-center">
        {allPhone.pagination.map((value, i) => {
          if (value.href == null) {
            return (
              <a key={i}>
                <span className="text-orange-500">{value.page}</span>
              </a>
            );
          }

          return (
            <a href={value.href} key={i}>
              <span>{value.page}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
