import axios from "axios";
import type { Session, UpdateSession } from "../types/Session";

const BASE_URL = "http://localhost:3000";

/**
 * GET all sessions
 */
export const getSessions = async () => {
    const res = await axios.get<Session[]>(BASE_URL + "/sessions");
    return res.data;
};

/**
 * PATCH a session
 */
export const updateSession = async (id: number, data: Partial<UpdateSession>) => {
    const res = await axios.patch(`${BASE_URL}/sessions/${id}`, data);
    return res.data;
};


