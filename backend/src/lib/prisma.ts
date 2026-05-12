// Gå upp två steg från src/lib för att hitta generated
import { PrismaClient } from "../../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export { prisma };