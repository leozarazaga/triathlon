import { useEffect, useState, type ReactNode } from "react";
import { getSessions, updateSession } from "../services/TriathlonAPI";
import type { Session } from "../types/Session";
import { ScheduleContext } from "./ScheduleContext";

export function ScheduleProvider({ children }: { children: ReactNode }) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | false>(false);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setIsLoading(true);
                const data = await getSessions();
                setSessions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "This should really never happen...");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSessions();
    }, []);

    const handleToggle = async (person: "leo" | "klara", id: number) => {
        const session = sessions.find((s) => s.id === id);
        if (!session) return;

        const isNowCompleted = !session.completed[person];
        const newCompleted = { ...session.completed, [person]: isNowCompleted };
        const newCompletedAt = {
            ...session.completedAt,
            [person]: isNowCompleted ? new Date().toISOString() : undefined,
        };

        const userId = person === "leo" ? 1 : 2;

        try {
            await updateSession(id, { userId, isCompleted: isNowCompleted });
            setSessions((prev) =>
                prev.map((session) => (session.id === id ? { ...session, completed: newCompleted, completedAt: newCompletedAt } : session)),
            );
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return(
        <ScheduleContext.Provider value={{ sessions, isLoading, error, handleToggle }}>
            {children}
        </ScheduleContext.Provider>
    ) 
}
