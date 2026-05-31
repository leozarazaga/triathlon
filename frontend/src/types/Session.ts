export type Person = "leo" | "klara";
export type SportType = "swim" | "bike" | "run";

export interface Profile {
    id: number;
    name: string;
    image: string;
    color: string;
}

export interface Session {
    id: number;
    type: SportType;
    description: string;
    distance: number;
    unit: "m" | "km";
    date: string;
    completed: Record<Person, boolean>;
    completedAt?: Partial<Record<Person, string>>;
}

export interface ApiResponse<T> {
    status: string;
    data: T;
}

export interface ToggleCompletionPayload {
    userId: number;
    isCompleted: boolean;
}
