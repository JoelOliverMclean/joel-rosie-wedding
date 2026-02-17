// // import "dotenv/config";
// // import { PrismaClient } from "@prisma/client";
// // import { PrismaNeon } from "@prisma/adapter-neon";
// // import { neonConfig } from "@neondatabase/serverless";

// // import ws from "ws";
// // neonConfig.webSocketConstructor = ws;

// // // Optional: Enable fetch-based querying for edge environments
// // // neonConfig.poolQueryViaFetch = true;

// // // Extend NodeJS global type to include `prisma`
// // declare global {
// //   // Allow globalThis.prisma in development without type errors
// //   // eslint-disable-next-line no-var
// //   let prisma: PrismaClient | undefined;
// // }

// // const connectionString: string = process.env.DATABASE_URL ?? "";

// // const adapter = new PrismaNeon({ connectionString });
// // const prisma = global.prisma || new PrismaClient({ adapter });

// // if (process.env.NODE_ENV === "development") {
// //   global.prisma = prisma;
// // }

// // export default prisma;

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "../../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
