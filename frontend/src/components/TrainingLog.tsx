import { useState } from "react";
import { useSchedule } from "../context/ScheduleContext";
import type { Person, Profile, Session } from "../types/Session";
import TrackerItem from "./TrackerItem";

// =============== CONFIG & HELPERS ===============
const sportColors: Record<string, string> = {
    run: "#f93822",
    bike: "#bbed21",
    swim: "#0055ff",
};

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

// =============== SUB-COMPONENTS ===============
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

// =============== MAIN COMPONENT ===============
const TrainingLog = ({ profiles, type }: TrainingLogProps) => {
    const { sessions, handleToggle } = useSchedule();
    const [activeProfileFilter, setActiveProfileFilter] = useState<"all" | number>("all");
    const filteredSessions = type === "all" ? sessions : sessions.filter((s) => s.type === type);

    const raceDate = new Date("2026-08-02T00:00:00");
    const today = new Date();
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksToGo = Math.max(0, Math.ceil((raceDate.getTime() - today.getTime()) / msPerWeek));

    const sportLabel = type === "swim" ? "Swimming" : type === "bike" ? "Cycling" : type === "run" ? "Running" : "";

    const displayedProfiles = activeProfileFilter === "all" ? profiles : profiles.filter((p) => p.id === activeProfileFilter);

    return (
        <div className="w-100 mt-1">
            {/* =============== SECTION PAGE TITLE =============== */}
            {type !== "all" && (
                <div className="mb-4 border-bottom">
                    <h1
                        style={{
                            fontSize: "4rem",
                            fontWeight: 900,
                            fontStyle: "italic",
                            lineHeight: 0.9,
                            letterSpacing: "-2.5px",
                            textTransform: "uppercase",
                            color: sportColors[type] || "#111",
                        }}
                    >
                        {sportLabel}
                    </h1>
                </div>
            )}

            {/* =============== FILTER TABS =============== */}
            <div className="d-flex justify-content-start align-items-center mb-5 bg-light rounded-4" style={{ maxWidth: "fit-content" }}>
                <button
                    onClick={() => setActiveProfileFilter("all")}
                    className="btn px-4 py-2 rounded-3 fw-bold text-uppercase transition-all text-nowrap"
                    style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                        backgroundColor: activeProfileFilter === "all" ? "#111" : "transparent",
                        color: activeProfileFilter === "all" ? "#fff" : "#666",
                        border: "none",
                        boxShadow: activeProfileFilter === "all" ? "0px 4px 12px rgba(0,0,0,0.1)" : "none",
                    }}
                >
                    Both Athletes
                </button>
                {profiles.map((profile) => (
                    <button
                        key={profile.id}
                        onClick={() => setActiveProfileFilter(profile.id)}
                        className="btn px-4 py-2 rounded-3 fw-bold text-uppercase transition-all text-nowrap"
                        style={{
                            fontSize: "12px",
                            letterSpacing: "0.5px",
                            backgroundColor: activeProfileFilter === profile.id ? "#111" : "transparent",
                            color: activeProfileFilter === profile.id ? "#fff" : "#666",
                            border: "none",
                            boxShadow: activeProfileFilter === profile.id ? "0px 4px 12px rgba(0,0,0,0.1)" : "none",
                        }}
                    >
                        {profile.name}
                    </button>
                ))}
            </div>

            {/* =============== CARDS GRID =============== */}
            <div className="row g-5">
                {displayedProfiles.map((profile) => {
                    const personKey = profile.name.toLowerCase() as Person;

                    const totalWorkouts = filteredSessions.length;
                    const completedSessions = filteredSessions.filter((s) => s.completed[personKey]);
                    const completedCount = completedSessions.length;

                    const totalDistance = completedSessions.reduce((sum, s) => sum + (s.distance || 0), 0);
                    const unit = type === "swim" ? "m" : "km";

                    const activeTodoSessions = filteredSessions.filter((s) => !s.completed[personKey]);
                    const groupedSessions = groupSessionsByWeek(type === "all" ? activeTodoSessions : completedSessions);
                    const weekKeys = Object.keys(groupedSessions).sort();

                    const columnClass = displayedProfiles.length === 1 ? "col-12 max-width-container" : "col-12 col-md-6";

                    const borderClass = displayedProfiles.length > 1 && profiles.indexOf(profile) === 1 ? "border-md-start ps-md-5" : "";

                    return (
                        <div key={profile.id} className={`${columnClass} ${borderClass}`}>
                            {/* =============== MEMBER =============== */}
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="rounded-circle border border-2 shadow-sm"
                                    style={{ width: 56, height: 56, objectFit: "cover", borderColor: profile.color }}
                                />
                                <h3 className="h4 mb-0 fw-bold" style={{ letterSpacing: "-0.5px" }}>
                                    {profile.name}
                                </h3>
                            </div>

                            {/* =============== COUNTDOWN HEADER vs SPORT STATS =============== */}
                            {type === "all" ? (
                                <div className="traininglog-header">
                                    <h2 className="weeks-to-go">{weeksToGo} Weeks to Go</h2>
                                    <p className="subtitle mb-0" style={{ fontSize: "14px", fontWeight: 600, color: "#666" }}>
                                        Workouts Completed:{" "}
                                        <span style={{ color: "#111", fontWeight: 700 }}>
                                            {completedCount} of {totalWorkouts}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                <div className="ps-1">
                                    <div className="row g-3 mb-4">
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

                            {/* =============== DYNAMIC WORKOUT LIST RENDERING =============== */}
                            {type === "all" ? (
                                <div className="workout-list-container mt-4">
                                    {weekKeys.length === 0 ? (
                                        <p className="text-muted small py-3 text-center border rounded-3 bg-light bg-opacity-50">
                                            All workouts completed!
                                        </p>
                                    ) : (
                                        weekKeys.map((week, idx) => {
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
                                        })
                                    )}
                                </div>
                            ) : (
                                <div className="workout-list-container mt-4 ps-1">
                                    <h4 className="small text-uppercase fw-bold text-secondary mb-3" style={{ letterSpacing: "0.05em" }}>
                                        Completed History
                                    </h4>

                                    {weekKeys.length === 0 ? (
                                        <p className="text-muted small py-3 text-center border rounded-3 bg-light bg-opacity-50">
                                            No sessions completed yet.
                                        </p>
                                    ) : (
                                        <div className="d-flex flex-column gap-4">
                                            {weekKeys.map((week) => (
                                                <div key={week}>
                                                    <div
                                                        className="text-muted small fw-bold text-uppercase mb-2"
                                                        style={{ letterSpacing: "0.05em", fontSize: "11px" }}
                                                    >
                                                        {week}
                                                    </div>
                                                    <div className="d-flex flex-column gap-2">
                                                        {groupedSessions[week].map((session) => (
                                                            <TrackerItem
                                                                key={session.id}
                                                                session={session}
                                                                person={personKey}
                                                                profileId={profile.id}
                                                                onToggle={handleToggle}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
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
