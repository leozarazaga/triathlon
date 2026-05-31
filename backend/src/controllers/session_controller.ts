/**
	session controller
*/

/**
	get all sessions 
*/

import { Request, Response } from "express";
import { getSessions } from "../service/session_service";
import { handlePrismaError } from "../lib/handlePrismaError";

export const index = async (req: Request, res: Response) => {
  
    try {
        const sessions = await getSessions();
        return res.send({ status: "success", data: sessions });
    } catch (err) {
        return handlePrismaError(res, err);
    }
};

