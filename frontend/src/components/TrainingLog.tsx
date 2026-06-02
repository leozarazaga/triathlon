import { useState } from "react";
import { useSchedule } from "../context/ScheduleContext";
import type { Person, Profile, Session } from "../types/Session";
import TrackerItem from "./TrackerItem";

const sportColors: Record<string, string> = {
    run: "#f93822",  // Nike Infrared
    bike: "#bbed21", // Nike Volt
    swim: "#0055ff", // Nike Racer Blue
};

// Helper to group sessions by the [W1], [W2] tags in your descriptions
const groupSessionsByWeek = (sessions: Session[]) => {
    const groups: Record<string, Session[]> = {};
    sessions.forEach((s) => {
        const match = s.description.match(/\[W(\d+)\]/i);
        const weekKey = match ? `Week ${match[1]}` : "Upcoming Workouts";
        if (!groups[weekKey]) groups[weekKey] = [];
        groups[weekKey].push(s);
    });
    return groups;
};

// Collapsible Accordion Component
const WeeklyGroup = ({
    title,
    sessions,
    personKey,
    profileId,
    onToggle,
    defaultOpen,
}: {
    title: string;
    sessions: Session[];
    personKey: Person;
    profileId: number;
    onToggle: (person: Person, userId: number, sessionId: number) => void;
    defaultOpen: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-2">
            <div className="week-group-header" onClick={() => setIsOpen(!isOpen)}>
                <h4>{title}</h4>
                <span className={`chevron ${isOpen ? "open" : ""}`}>▼</span>
            </div>

            {isOpen && (
                <div className="d-flex flex-column mt-2">
                    {sessions.map((s) => (
                        <TrackerItem key={s.id} session={s} person={personKey} profileId={profileId} onToggle={onToggle} />
                    ))}
                </div>
            )}
        </div>
    );
};

export interface TrainingLogProps {
    profiles: Profile[];
    type: "all" | "swim" | "bike" | "run";
}

const TrainingLog = ({ profiles, type }: TrainingLogProps) => {
    const { sessions, handleToggle } = useSchedule();
    const filteredSessions = type === "all" ? sessions : sessions.filter((s) => s.type === type);

    // Calculate Weeks until August 2, 2026
    const raceDate = new Date("2026-08-02T00:00:00");
    const today = new Date();
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksToGo = Math.max(0, Math.ceil((raceDate.getTime() - today.getTime()) / msPerWeek));

    // Get display label for sports
    const sportLabel = type === "swim" ? "Swimming" : type === "bike" ? "Cycling" : type === "run" ? "Running" : "";

    return (
        <div className="w-100 mt-1">
            {/* Massive Nike Style Header for Single Sports */}
            {type !== "all" && (
                <div className="mb-5 border-bottom pb-3">
                    <h1 
                        style={{ 
                            fontSize: "4.5rem", 
                            fontWeight: 900, 
                            fontStyle: "italic", 
                            lineHeight: 0.9, 
                            letterSpacing: "-2.5px",
                            textTransform: "uppercase",
                            color: sportColors[type] || "#111"
                        }}
                    >
                        {sportLabel}
                    </h1>
                </div>
            )}

            <div className="row g-4">
                {profiles.map((profile, index) => {
                    const personKey = profile.name.toLowerCase() as Person;

                    // Progress calculations
                    const totalWorkouts = filteredSessions.length;
                    const completedSessions = filteredSessions.filter((s) => s.completed[personKey]);
                    const completedCount = completedSessions.length;

                    const totalDistance = completedSessions.reduce((sum, s) => sum + (s.distance || s.distance || 0), 0);
                    const unit = type === "swim" ? "m" : "km";

                    // Group the sessions for this specific user
                    const groupedSessions = groupSessionsByWeek(filteredSessions);
                    const weekKeys = Object.keys(groupedSessions).sort();

                    return (
                        <div key={profile.id} className={`col-12 col-md-6 ${index === 1 ? "border-md-start ps-md-4" : ""}`}>
                            {/* Member Profile Avatar */}
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="rounded-circle border border-2 shadow-sm"
                                    style={{ width: 48, height: 48, objectFit: "cover", borderColor: profile.color }}/>

                               
                                <h3 className="h5 mb-0 fw-bold">{profile.name}</h3>
                            </div>

                            {/* Dynamic Header vs Card Grid Layout */}
                            {type === "all" ? (
                                <div className="nike-header mb-4">
                                    <h2 className="weeks-to-go">{weeksToGo} Weeks to Go</h2>
                                    <p className="subtitle">Welcome to the Starting Line</p>

                                    <div className="segmented-progress">
                                        {[...Array(5)].map((_, i) => {
                                            const percentComplete = totalWorkouts === 0 ? 0 : completedCount / totalWorkouts;
                                            const segmentThreshold = (i + 1) * 0.2; 
                                            const isCompleted = percentComplete >= segmentThreshold - 0.1; 
                                            return <div key={i} className={`segment ${isCompleted ? "completed" : ""}`} />;
                                        })}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: 13, fontWeight: 500 }}>
                                        Workouts Completed: {completedCount} of {totalWorkouts}
                                    </div>
                                </div>
                            ) : (
                                <div className="ps-2">
                                    {/* Restored Clean Balanced Card Grid layout from old code */}
                                    <div className="row g-2 mb-4">
                                        <div className="col-6">
                                            <div className="p-3 bg-light rounded-4 border-0 h-100">
                                                <div
                                                    className="text-secondary text-uppercase fw-bold mb-1"
                                                    style={{ fontSize: 10, letterSpacing: "0.05em" }}
                                                >
                                                    Workouts
                                                </div>
                                                <div className="d-flex align-items-baseline gap-1">
                                                    <span className="h2 mb-0 fw-bold">{completedCount}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 bg-light rounded-4 border-0 h-100">
                                                <div
                                                    className="text-secondary text-uppercase fw-bold mb-1"
                                                    style={{ fontSize: 10, letterSpacing: "0.05em" }}
                                                >
                                                    Distance
                                                </div>
                                                <div className="d-flex align-items-baseline gap-1">
                                                    <span className="h2 mb-0 fw-bold">{totalDistance}</span>
                                                    <span className="text-muted small">{unit}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Dynamic List Rendering */}
                            {type === "all" ? (
                                <div className="workout-list-container mt-4">
                                    <h3 className="h6 fw-bold mb-3 text-uppercase" style={{ letterSpacing: "0.05em" }}>
                                        To do this week
                                    </h3>

                                    {weekKeys.map((week, idx) => {
                                        const isFirst = idx === 0;
                                        return (
                                            <WeeklyGroup
                                                key={week}
                                                title={week}
                                                sessions={groupedSessions[week]}
                                                personKey={personKey}
                                                profileId={profile.id}
                                                onToggle={handleToggle}
                                                defaultOpen={isFirst}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="workout-list-container mt-4 ps-2">
                                    <h4 className="small text-uppercase fw-bold text-secondary mb-3" style={{ letterSpacing: "0.05em" }}>
                                        Completed History
                                    </h4>
                                    
                                    {completedCount === 0 ? (
                                        <p className="text-muted small py-3 text-center border rounded-3 bg-light bg-opacity-50">
                                            No sessions completed yet.
                                        </p>
                                    ) : (
                                        <div className="d-flex flex-column gap-2">
                                            {completedSessions.map((s) => (
                                                <TrackerItem
                                                    key={s.id}
                                                    session={s}
                                                    person={personKey}
                                                    profileId={profile.id}
                                                    onToggle={handleToggle}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrainingLog;