import axios from "axios";
import type { ApiResponse, Session, ToggleCompletionPayload } from "../types/Session";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * GET all training sessions from the database
 */
export const getSessions = async () => {
    const res = await instance.get<ApiResponse<Session[]>>(`/sessions`);
    return res.data.data;
};

/**
 * PATCH specific fields of an existing session
 */
/**
 * PATCH specific fields of an existing session
 */
export const updateSession = async (session_id: number, payload: ToggleCompletionPayload) => {
    const res = await instance.patch<ApiResponse<Session>>(`/sessions/${session_id}`, payload);
    return res.data.data;
};
