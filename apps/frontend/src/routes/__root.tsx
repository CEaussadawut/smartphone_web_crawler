import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { client } from "@/client/client.gen";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  beforeLoad: () => {
    client.setConfig({
      baseURL: import.meta.env.PROD
        ? window.location.origin
        : "http://localhost:8000",
    });
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <div className="pb-12">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
