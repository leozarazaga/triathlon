import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "../types/Session";
import { getSessions, updateSession } from "../services/TriathlonAPI";
import { ScheduleContext } from "./ScheduleContext"; // Import the context object

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

        try {
            await updateSession(id, { completed: newCompleted, completedAt: newCompletedAt });
            setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, completed: newCompleted, completedAt: newCompletedAt } : s)));
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <ScheduleContext.Provider value={{ sessions, handleToggle, isLoading, error }}>
            {children}
        </ScheduleContext.Provider>
    )    
}
