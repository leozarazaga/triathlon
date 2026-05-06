import { createContext, useContext } from "react";
import type { Session } from "../types/Session";

export interface ScheduleContextType {
    sessions: Session[];
    isLoading: boolean;
    error: string | false;
    handleToggle: (person: "leo" | "klara", id: number) => Promise<void>;
}

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const useSchedule = () => {
    const context = useContext(ScheduleContext);

    if (!context) {
        throw new Error("Trying to use ScheduleContext outside of ScheduleContextProvider");
    }

    return context;
};
