"use server";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { PrismaClient } from "../generated/prisma";
import { convertToPlainObject } from "../utils";

// Get latest product
export const getLatestProducts = async () => {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT,
  });
  return convertToPlainObject(products);
};
