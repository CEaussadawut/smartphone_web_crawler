import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Rocket,
  Ruler,
  Camera,
  Cpu,
  Battery,
  Smartphone,
  Globe,
  Volume,
  AudioLines,
  Cog,
  SquarePen,
} from "lucide-react";

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
      <div className="p-6 rounded-2xl shadow-xl mb-6">
        <h1 className="text-3xl font-bold text-center  mb-6">
          {phoneSpec.name}
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <img
              src={phoneSpec.spec.photo_preview ?? "/images/placeholder.png"}
              alt={phoneSpec.name ?? "No image"}
              className="w-72 md:w-60 rounded-xl shadow-2xl border border-gray-700  p-3"
            />
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2  text-base">
            <li className="flex flex-col items-center text-center gap-2">
              <Ruler className="w-10 h-10" />
              <span>{phoneSpec.spec.body_dimensions}</span>
            </li>
            <li className="flex flex-col items-center text-center gap-2">
              <Camera className="w-10 h-10" />
              <span>{phoneSpec.spec.rear_cam}</span>
            </li>
            <li className="flex flex-col items-center text-center gap-2">
              <Camera className="w-10 h-10" />
              <span>{phoneSpec.spec.front_cam}</span>
            </li>
            <li className="flex flex-col items-center text-center gap-2">
              <Cpu className="w-10 h-10" />
              <span>{phoneSpec.spec.memory}</span>
            </li>
            <li className="flex flex-col items-center text-center gap-2">
              <Battery className="w-10 h-10" />
              <span>{phoneSpec.spec.battery}</span>
            </li>
            <li className="flex flex-col items-center text-center gap-2">
              <Rocket className="w- h-10" />
              <span>{phoneSpec.spec.launch}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
            <Smartphone />
            Display
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Type:</strong> {phoneSpec.spec.display_type}
            </li>
            <li>
              <strong>Size:</strong> {phoneSpec.spec.display_size}
            </li>
            <li>
              <strong>Resolution:</strong> {phoneSpec.spec.display_resolution}
            </li>
            <li>
              <strong>Protection:</strong> {phoneSpec.spec.display_protection}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
            <Smartphone />
            Body
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Dimensions:</strong> {phoneSpec.spec.body_dimensions}
            </li>
            <li>
              <strong>Weight:</strong> {phoneSpec.spec.body_weight}
            </li>
            <li>
              <strong>Build:</strong> {phoneSpec.spec.body_build}
            </li>
            <li>
              <strong>Sim:</strong> {phoneSpec.spec.body_sim}
            </li>
            <li>
              <strong>Other:</strong> {phoneSpec.spec.body_other}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
            <Globe />
            Network
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Network:</strong> {phoneSpec.spec.network}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold  mb-3 border-b border-gray-700 pb-2">
            <Cpu />
            Platform
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>OS:</strong> {phoneSpec.spec.platform_os}
            </li>
            <li>
              <strong>Chipset:</strong> {phoneSpec.spec.platform_chipset}
            </li>
            <li>
              <strong>CPU:</strong> {phoneSpec.spec.platform_cpu}
            </li>
            <li>
              <strong>GPU:</strong> {phoneSpec.spec.platform_gpu}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold  mb-3 border-b border-gray-700 pb-2">
            <Camera />
            Main Camera
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Triple:</strong> {phoneSpec.spec.rear_cam}
            </li>
            <li>
              <strong>Video:</strong> {phoneSpec.spec.rear_video}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold  mb-3 border-b border-gray-700 pb-2">
            <Camera />
            Selfie camera
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Single:</strong> {phoneSpec.spec.front_cam}
            </li>
            <li>
              <strong>Video:</strong> {phoneSpec.spec.front_video}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold  mb-3 border-b border-gray-700 pb-2">
            <Volume />
            Sound
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Loudspeaker:</strong> {phoneSpec.spec.sound}
            </li>
            <li>
              <strong>3.5mm jack:</strong> {phoneSpec.spec.sound_3_5}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold  mb-3 border-b border-gray-700 pb-2">
            <Cpu />
            Memory
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Memory:</strong> {phoneSpec.spec.memory}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold  mb-3 border-b border-gray-700 pb-2">
            <AudioLines />
            Comms
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>WLAN:</strong> {phoneSpec.spec.comms_wlan}
            </li>
            <li>
              <strong>Bluetooth:</strong> {phoneSpec.spec.comms_bluetooth}
            </li>
            <li>
              <strong>Positioning:</strong> {phoneSpec.spec.comms_positioning}
            </li>
            <li>
              <strong>NFC:</strong> {phoneSpec.spec.comms_nfc}
            </li>
            <li>
              <strong>Radio:</strong> {phoneSpec.spec.comms_radio}
            </li>
            <li>
              <strong>USB:</strong> {phoneSpec.spec.comms_usb}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold  mb-3 border-b border-gray-700 pb-2">
            <Cog />
            Features
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Sensors:</strong> {phoneSpec.spec.features}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
            <Battery />
            Battery
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Type:</strong> {phoneSpec.spec.battery}
            </li>
          </ul>
        </div>
        <div className=" p-4 rounded-xl shadow-md">
          <h2 className="flex gap-3 text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
            <SquarePen />
            Misc
          </h2>
          <ul className="space-y-1 text-base list-disc list-inside">
            <li>
              <strong>Colors:</strong> {phoneSpec.spec.misc_color}
            </li>
            <li>
              <strong>Models:</strong> {phoneSpec.spec.misc_models}
            </li>
            <li>
              <strong>Price:</strong> {phoneSpec.spec.misc_price}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
