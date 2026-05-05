import { useState, type ReactNode } from "react";

interface Session {
    id: number;
    type: "swim" | "bike" | "run";
    desc: string;
    dist: number;
    unit: "m" | "km";
    date: string;
    completed: {
        leo: boolean;
        klara: boolean;
    };
}

interface ScheduleContextType {
    sessions: Session[];
    toggle: (person: "leo" | "klara", id: number) => void;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

const startSessions: Session[] = [
    {
        id: 1,
        type: "swim",
        desc: "2 km intervaller",
        dist: 2000,
        unit: "m",
        date: "Mån 28 apr",
        completed: { leo: false, klara: false },
    },
];

export function ScheduleProvider({ children }: { children: ReactNode }) {
    const [sessions, setSessions] = useState<Session[]>(startSessions);

    const handleToggle = (person: "leo" | "klara", id: number) => {
        const updateSession = (session: Session) =>
            session.id !== id
                ? session
                : {
                      ...session,
                      completed: {
                          ...session.completed,
                          [person]: !session.completed[person], // vänd på true/false
                      },
                  };

        setSessions((prev) => prev.map(updateSession));
    };
}
