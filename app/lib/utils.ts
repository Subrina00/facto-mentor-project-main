import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseQueryString = (query: string) => {
  const params = new URLSearchParams(query);
  const queryObject: { [key: string]: string | number | boolean } = {};

  params.forEach((value, key) => {
    queryObject[key] = isNaN(Number(value)) ? value : Number(value);
  });

  return queryObject;
};

export function objectToQueryString(obj: {
  [key: string]: number | string | boolean | null | undefined;
}) {
  return Object.entries(obj)
    .filter(
      ([_key, value]) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== "null"
    )
    .map(([key, value]) => {
      if (typeof value === "string" && value.includes(",")) {
        return `${encodeURIComponent(key)}=${value.replace(/,/g, ",")}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        value as string
      )}`;
    })
    .join("&");
}

