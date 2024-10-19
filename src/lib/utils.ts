import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ObjectId } from "mongodb";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateObjectId(): string {
  return new ObjectId().toHexString();
}

export function abbreviateAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) {
    return "";
  }

  // Check if the address is shorter than the combined start and end lengths
  if (address.length <= startLength + endLength) {
    return address;
  }

  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);

  return `${start}...${end}`;
}
