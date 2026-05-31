import { createContext, useContext } from "react";
import type { Person, Session } from "../types/Session";

export interface ScheduleContextType {
    sessions: Session[];
    isLoading: boolean;
    error: string | false;
    handleToggle: (person: Person, userId: number, sessionId: number) => Promise<void>;
}

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const useSchedule = () => {
    const context = useContext(ScheduleContext);

    if (!context) {
        throw new Error("Trying to use ScheduleContext outside of ScheduleContextProvider");
    }

    return context;
};
