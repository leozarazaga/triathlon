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
export const updateSession = async (session_id: number, data: Partial<UpdateSession>) => {
    const res = await axios.patch(`${BASE_URL}/sessions/${session_id}`, data);
    return res.data;
};

/**
 * DELETE a session
 */
export const deleteSession = async (session_id: number) => {
    await axios.delete(`${BASE_URL}/sessions/${session_id}`);
};
