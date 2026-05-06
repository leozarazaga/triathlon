import { createContext, useContext } from "react";
import type { Session } from "../types/Session";

export interface ScheduleContextType {
    sessions: Session[];
    handleToggle: (person: "leo" | "klara", id: number) => Promise<void>;
    isLoading: boolean;
    error: string | false;
}

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const useSchedule = () => {
    const context = useContext(ScheduleContext);

    if (!context) {
        throw new Error("Trying to use ScheduleContext outside of ScheduleContextProvider");
    }

    return context;
};
