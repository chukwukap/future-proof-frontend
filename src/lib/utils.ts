import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ObjectId } from "mongodb";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateObjectId(): string {
  return new ObjectId().toHexString();
}
