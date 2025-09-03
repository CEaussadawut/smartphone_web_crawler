import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBrandName(
  brandSlug: string,
  options = { isCapitalize: false }
) {
  const brandName = brandSlug.split("-")[0];
  if (options.isCapitalize) {
    return (
      String(brandName).charAt(0).toUpperCase() + String(brandName).slice(1)
    );
  }

  return brandName;
}
