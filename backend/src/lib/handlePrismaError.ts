import type { Response } from "express";
import { Prisma } from "@prisma/client";

export const handlePrismaError = (res: Response, err: unknown) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Was the value out of range?
        if (err.code === "P2020") {
            console.debug("Value out of range", err);
            return res.status(400).send({ status: "error", message: "Value out of range" });
        }

        // Was it not found?
        if (err.code === "P2025") {
            console.debug("Resource not found", err);
            return res.status(404).send({ status: "error", message: "Resource not found" });
        }
    }

    // Prisma validation error
    if (err instanceof Prisma.PrismaClientValidationError) {
        console.debug("Invalid request data", err);
        return res.status(400).send({ status: "error", message: "Invalid request data" });
    }

    // Fallback
    console.error(err);
    return res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
};
