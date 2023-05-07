import { PrismaClient } from "@prisma/client";

declare global {
  let client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.clinet = client;

export default client;
