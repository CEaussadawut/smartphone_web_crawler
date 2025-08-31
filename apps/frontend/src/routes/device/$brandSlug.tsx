import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { lazy, Suspense } from "react";

import { getPhoneBrandApiBrandGetOptions } from "@/client/@tanstack/react-query.gen";
import LoadingComponent from "@/components/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { getBrandName } from "@/lib/utils";

const PhonePreviewCard = lazy(() => import("@/components/PhonePreviewCard"));

export const Route = createFileRoute("/device/$brandSlug")({
  loader: async ({ context: { queryClient }, params: { brandSlug } }) => {
    await queryClient.ensureQueryData(
      getPhoneBrandApiBrandGetOptions({
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
    getPhoneBrandApiBrandGetOptions({ path: { brand: brandSlug } })
  );
  const phones = phonesQueried.data;

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
        {phones.map((phone, i) => (
          <Suspense
            key={i}
            fallback={<Skeleton className="h-76 p-4 w-auto rounded-sm" />}
          >
            <PhonePreviewCard phone={phone} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
