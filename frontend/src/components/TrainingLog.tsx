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

    return (
        <div className="row g-4 mt-1">
            {profiles.map((profile, index) => {
                const personKey = profile.name.toLowerCase() as Person;

                // Progress calculations
                const totalWorkouts = filteredSessions.length;
                const completedCount = filteredSessions.filter((s) => s.completed[personKey]).length;

                // Group the sessions for this specific user
                const groupedSessions = groupSessionsByWeek(filteredSessions);

                // Determine the "Current Week" to auto-expand it
                const weekKeys = Object.keys(groupedSessions).sort();

                return (
                    <div key={profile.id} className={`col-12 col-md-6 ${index === 1 ? "border-md-start ps-md-4" : ""}`}>
                        {/* Member Profile Avatar */}
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="rounded-circle border border-2 shadow-sm"
                                style={{ width: 48, height: 48, objectFit: "cover", borderColor: profile.color }}
                            />
                            <h3 className="h5 mb-0 fw-bold">{profile.name}</h3>
                        </div>

                        {/* Dynamic Header: Countdown vs Sport Stats */}
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
                            <div className="sport-stats-header mb-4">
                                <h2 
                                    style={{ 
                                        fontSize: "3.5rem", 
                                        fontWeight: 900, 
                                        fontStyle: "italic", 
                                        lineHeight: 0.85, 
                                        letterSpacing: "-1.5px",
                                        textTransform: "uppercase",
                                        color: sportColors[type] || "#111"
                                    }}
                                >
                                    {filteredSessions.filter((s) => s.completed[personKey]).reduce((sum, s) => sum + s.distance, 0)} 
                                    <span style={{ fontSize: "2rem", marginLeft: "4px" }}>
                                        {type === "swim" ? "M" : "KM"}
                                    </span>
                                    <br />
                                    CLEARED
                                </h2>
                                <div className="text-muted fw-bold text-uppercase mt-3" style={{ fontSize: 13, letterSpacing: "0.05em" }}>
                                    {completedCount} {type}s Completed
                                </div>
                            </div>
                        )}

                        {/* Dynamic List Rendering: Accordions vs Flat Lists */}
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
                            <div className="workout-list-container mt-4">
                                {/* Up Next Section */}
                                {filteredSessions.filter(s => !s.completed[personKey]).length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="h6 fw-bold mb-3 text-uppercase" style={{ letterSpacing: "0.05em" }}>
                                            Up Next
                                        </h3>
                                        <div className="d-flex flex-column">
                                            {filteredSessions
                                                .filter(s => !s.completed[personKey])
                                                .map((s) => (
                                                    <TrackerItem
                                                        key={s.id}
                                                        session={s}
                                                        person={personKey}
                                                        profileId={profile.id}
                                                        onToggle={handleToggle}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Completed History Section */}
                                {filteredSessions.filter(s => s.completed[personKey]).length > 0 && (
                                    <div>
                                        <h4 className="h6 fw-bold mb-3 text-uppercase text-muted" style={{ letterSpacing: "0.05em" }}>
                                            Completed History
                                        </h4>
                                        {/* Lower opacity to visually separate history from actionable items */}
                                        <div className="d-flex flex-column" style={{ opacity: 0.65 }}>
                                            {filteredSessions
                                                .filter(s => s.completed[personKey])
                                                .map((s) => (
                                                    <TrackerItem
                                                        key={s.id}
                                                        session={s}
                                                        person={personKey}
                                                        profileId={profile.id}
                                                        onToggle={handleToggle}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TrainingLog;