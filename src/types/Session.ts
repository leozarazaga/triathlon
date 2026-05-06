export type Person = "leo" | "klara";
export type SportType = "swim" | "bike" | "run";

export interface Session {
    id: number;
    type: SportType;
    desc: string;
    dist: number;
    unit: "m" | "km";
    date: string;
    completed: Record<Person, boolean>;
    completedAt?: Partial<Record<Person, string>>;
}

export type UpdateSession = Omit<Session, "id">;