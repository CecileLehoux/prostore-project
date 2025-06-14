import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert a prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  //handle Zod validation errors
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma known request errors
    const field = error.meta?.target ? error.meta?.target?.[0] : "field";
    return ` ${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error);
  }
}
