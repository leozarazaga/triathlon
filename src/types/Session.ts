export interface Session {
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
    completedAt?: {
        leo?: string;
        klara?: string;
    };
}

export type UpdateSession = Omit<Session, "id">;