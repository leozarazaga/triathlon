import { ToggleSessionStatus } from "src/types/Sesssion.types";
import { prisma } from "../prisma";

/**
 * GET all sessions
 */
export const getSessions = async () => {
    // 1. Fetch sessions and include the completions relation
    const sessions = await prisma.session.findMany({
        include: {
            completions: true,
        },
        orderBy: {
            id: "asc",
        },
    });

    // 2. Map the relational data to match the old JSON Server frontend structure
    return sessions.map((session) => {
        // Find if user 1 (Leo) or user 2 (Klara) has a completion record
        const leoCompletion = session.completions.find((c) => c.userId === 1);
        const klaraCompletion = session.completions.find((c) => c.userId === 2);

        return {
            id: session.id,
            type: session.type,
            description: session.description,
            distance: session.distance,
            unit: session.unit,
            date: session.date,
            completed: {
                leo: !!leoCompletion, // converts object/undefined to true/false
                klara: !!klaraCompletion,
            },
            completedAt: {
                leo: leoCompletion?.completedAt || null,
                klara: klaraCompletion?.completedAt || null,
            },
        };
    });
};

/**
 * PATCH a session
 */

export const updateSessionCompletion = async (sessionId: number, data: ToggleSessionStatus) => {
    const { userId, isCompleted } = data;

    if (isCompleted) {
        return prisma.sessionCompletion.upsert({
            where: {
                userId_sessionId: {
                    userId,
                    sessionId,
                },
            },
            update: {},
            create: {
                userId,
                sessionId,
            },
        });
    } else {
        return prisma.sessionCompletion.deleteMany({
            where: {
                userId,
                sessionId,
            },
        });
    }
};
