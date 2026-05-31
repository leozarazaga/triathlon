import Debug from "debug";
import { Request, Response } from "express";
import { getSessions, updateSessionCompletion } from "../service/session_service";
import { handlePrismaError } from "../lib/handlePrismaError";

const debug = Debug("prisma-triathlon:session_controller");

/**
 * GET /sessions
 */
export const index = async (req: Request, res: Response) => {
    try {
        const sessions = await getSessions();

        return res.send({
            status: "success",
            data: sessions,
        });
    } catch (err) {
        return handlePrismaError(res, err);
    }
};

/**
 * PATCH /sessions/:sessionId
 *
 * Update a session by toggling completion
 */
export const update = async (req: Request, res: Response) => {
    const sessionId = Number(req.params.sessionId);

    if (!sessionId) {
        return res.status(400).send({
            status: "fail",
            message: "That is not a valid ID",
        });
    }

    try {
        const { userId, isCompleted } = req.body;

        await updateSessionCompletion(sessionId, { userId, isCompleted });

        return res.send({
            status: "success",
            message: "Session completion updated successfully",
        });
    } catch (err) {
        debug("Error when trying to update a Session: %O", sessionId, err);
        return handlePrismaError(res, err);
    }
};
