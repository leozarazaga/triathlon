import { createContext, useContext, useState, type ReactNode } from "react";

interface Session {
    id: number;
    type: "swim" | "bike" | "run";
    desc: string;
    dist: number;
    unit: "m" | "km";
    completed: {
        leo: boolean;
        klara: boolean;
    };
    completedAt?: {
        leo?: string;
        klara?: string;
    };
}

interface ScheduleContextType {
    sessions: Session[];
    handleToggle: (person: "leo" | "klara", id: number) => void;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

const startSessions: Session[] = [
    {
        id: 1,
        type: "swim",
        desc: "2 km intervaller",
        dist: 2000,
        unit: "m",
        completed: { leo: false, klara: false },
        completedAt: {},
    },
     {
        id: 2,
        type: "swim",
        desc: "4 km intervaller",
        dist: 4000,
        unit: "m",
        completed: { leo: false, klara: false },
        completedAt: {},
    },
       {
        id: 3,
        type: "bike",
        desc: "4 km intervaller",
        dist: 4000,
        unit: "m",
        completed: { leo: false, klara: false },
        completedAt: {},
    },
       {
        id: 4,
        type: "bike",
        desc: "4 km intervaller",
        dist: 4000,
        unit: "m",
        completed: { leo: false, klara: false },
        completedAt: {},
    },
       {
        id: 5,
        type: "run",
        desc: "1 km intervaller",
        dist: 1000,
        unit: "m",
        completed: { leo: false, klara: false },
        completedAt: {},
    },
       {
        id: 6,
        type: "run",
        desc: "3 km intervaller",
        dist: 3000,
        unit: "m",
        completed: { leo: false, klara: false },
        completedAt: {},
    },
];

export function ScheduleProvider({ children }: { children: ReactNode }) {
    const [sessions, setSessions] = useState<Session[]>(startSessions);

    const handleToggle = (person: "leo" | "klara", id: number) => {
        setSessions((prev) =>
            prev.map((session) => {
                if (session.id !== id) return session;

                const isNowCompleted = !session.completed[person];

                return {
                    ...session,
                    completed: {
                        ...session.completed,
                        [person]: isNowCompleted,
                    },
                    completedAt: {
                        ...session.completedAt,
                        [person]: isNowCompleted ? new Date().toISOString() : undefined,
                    },
                };
            }),
        );
    };

    return <ScheduleContext.Provider value={{ sessions, handleToggle }}>{children}</ScheduleContext.Provider>;
}

export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (!context) throw new Error("useSchedule måste användas inom ScheduleProvider");
    return context;
};
