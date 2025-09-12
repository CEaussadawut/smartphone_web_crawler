import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Battery, Camera, Cpu, Rocket, Ruler } from "lucide-react";
import { motion } from "motion/react";

import { getPhoneSpecApiDeviceSpecGetOptions } from "@/client/@tanstack/react-query.gen";
import LoadingComponent from "@/components/loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

export const Route = createFileRoute("/device/spec")({
  validateSearch: (search: Record<string, unknown>): { phone_url: string } => {
    // validate and parse search params
    return {
      phone_url: search.phone_url as string
    };
  },
  loaderDeps: ({ search: { phone_url } }) => ({ phone_url }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(
      getPhoneSpecApiDeviceSpecGetOptions({
        query: { phone_url: deps.phone_url }
      })
    );
  },
  pendingComponent: () => <LoadingComponent />,
  errorComponent: ({ error }) => `An error has occurred: ${error.message}`,
  component: RouteComponent
});

function RouteComponent() {
  const { phone_url } = Route.useSearch();
  const phoneSpecQuery = useSuspenseQuery(
    getPhoneSpecApiDeviceSpecGetOptions({ query: { phone_url: phone_url } })
  );

  const phoneSpec = phoneSpecQuery.data;

  const priceFormat = (input: string | null) => {
    if (!input) return "Null";

    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = input;

    let text = tempDiv.textContent || tempDiv.innerText || "";

    text = text.replace(/<sup>(.*?)<\/sup>/gi, "^$1");

    return text;
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        initial={{
          x: -100
        }}
        animate={{
          x: 0
        }}
        className="text-3xl"
      >
        {phoneSpec.name}
      </motion.h1>

      <div className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          <img
            src={phoneSpec.spec.photo_preview ?? "/images/placeholder.png"}
            alt={phoneSpec.name ?? "No image"}
            className="w-72 md:w-60 rounded-xl bg-white p-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base">
            <div className="flex flex-col items-center text-center gap-2">
              <Ruler className="w-10 h-10" />
              {phoneSpec.spec.body_dimensions
                ?.split(/<br\s*\/?>/i)
                .map((value) => (
                  <p>{value}</p>
                ))}
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <Camera className="w-10 h-10" />

              {phoneSpec.spec.rear_cam?.split(/<br\s*\/?>/i).map((value) => (
                <p>{value}</p>
              ))}
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <Camera className="w-10 h-10" />
              <p>{phoneSpec.spec.front_cam}</p>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <Cpu className="w-10 h-10" />
              <p>{phoneSpec.spec.platform_chipset}</p>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <Battery className="w-10 h-10" />
              <p>{phoneSpec.spec.battery}</p>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <Rocket className="w- h-10" />
              <p>{phoneSpec.spec.launch}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mt-4">
        <div>
          <h2 className="pb-2 text-xl font-semibold">Display</h2>
          <p>Type: {phoneSpec.spec.display_type}</p>
          <p>
            Size:{" "}
            {phoneSpec.spec.display_size?.replace(/<sup>(.*?)<\/sup>/gi, "^$1")}
          </p>
          <p>Resolution: {phoneSpec.spec.display_resolution}</p>
          <p>Protection: {phoneSpec.spec.display_protection}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Body</h2>
          {phoneSpec.spec.body_dimensions?.split(/<br\s*\/?>/i).map((value) => (
            <p>{value}</p>
          ))}
          <p>Weight: {phoneSpec.spec.body_weight}</p>
          <p>Build: {phoneSpec.spec.body_build}</p>
          <p>Sim: {phoneSpec.spec.body_sim?.replace(/<[^>]*>/g, "")}</p>
          <p>Other: {phoneSpec.spec.body_other?.replace(/<br\s*\/?>/gi, "")}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Platform</h2>
          <p>OS: {phoneSpec.spec.platform_os}</p>
          <p>Chipset: {phoneSpec.spec.platform_chipset}</p>
          <p>CPU: {phoneSpec.spec.platform_cpu}</p>
          <p>GPU: {phoneSpec.spec.platform_gpu}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Network</h2>
          <p>Technology: {phoneSpec.spec.network}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Main Camera</h2>
          {phoneSpec.spec.rear_cam?.split(/<br\s*\/?>/i).map((value, i) => (
            <p>
              {i === 0 ? "Triple:" : ""} {value}
            </p>
          ))}
          <p>Video: {phoneSpec.spec.rear_video}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Selfie camera</h2>
          <p>Single: {phoneSpec.spec.front_cam}</p>
          <p>Video: {phoneSpec.spec.front_video}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Sound</h2>
          <p>Loudspeaker: {phoneSpec.spec.sound}</p>
          <p>3.5mm jack: {phoneSpec.spec.sound_3_5}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Memory</h2>
          <p>Memory: {phoneSpec.spec.memory}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Communications</h2>
          <p>WLAN: {phoneSpec.spec.comms_wlan}</p>
          <p>Bluetooth: {phoneSpec.spec.comms_bluetooth}</p>
          <p>Positioning: {phoneSpec.spec.comms_positioning}</p>
          <p>NFC: {phoneSpec.spec.comms_nfc}</p>
          <p>Radio: {phoneSpec.spec.comms_radio}</p>
          <p>USB: {phoneSpec.spec.comms_usb}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Features</h2>
          <p>Sensors: {phoneSpec.spec.features}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Battery</h2>
          <p>Type: {phoneSpec.spec.battery}</p>
        </div>

        <div>
          <h2 className="pb-2 text-xl font-semibold">Misc</h2>
          <p>Colors: {phoneSpec.spec.misc_color}</p>
          <p>Models: {phoneSpec.spec.misc_models}</p>
          <p>Price: {priceFormat(phoneSpec.spec.misc_price)}</p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="pb-8 text-3xl font-semibold">Pictures</h2>
        <div className="flex gap-8">
          <Carousel opts={{ skipSnaps: true }} className="w-full">
            <CarouselContent>
              {phoneSpec.spec.photo?.map((img, i) => (
                <CarouselItem key={i} className="basis-auto select-none">
                  <img
                    src={img}
                    alt="preview"
                    className="h-56 lg:h-full p-4 bg-white rounded-xl object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
