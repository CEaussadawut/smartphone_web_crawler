import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <div className="pb-12">
        <Outlet />
      </div>
      <Footer />

      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
