import { useSchedule } from "../context/ScheduleContext";
import type { Profile } from "../types/Session";
import TrackerItem from "./TrackerItem";

export interface RaceTrackerProps {
    profiles: Profile[];
    type: "all" | "swim" | "bike" | "run";
}

const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
};

const RaceTracker = ({ profiles, type }: RaceTrackerProps) => {
    const { sessions, handleToggle } = useSchedule();

    const filtered = type === "all" ? sessions : sessions.filter((s) => s.type === type);

    const people = [
        { key: "leo" as const, profile: profiles.find((p) => p.name === "Leo") },
        { key: "klara" as const, profile: profiles.find((p) => p.name === "Klara") },
    ];

    return (
        <div className="row">
            {people.map(({ key, profile }, index) => {
                if (!profile) return null;

                const personSessions = filtered.filter((s) => s.completed[key]);
                const totalSessions = personSessions.length;
                const totalDistance = personSessions.reduce((sum, s) => sum + s.dist, 0);

                return (
                    <div key={key} className={`col-6 ${index === 1 ? "border-start ps-4" : ""}`}>
                        {/* Header */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="rounded-circle"
                                style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "cover",
                                    border: `2px solid ${profile.color}`,
                                }}
                            />
                            <span className="fw-semibold">{profile.name}</span>
                        </div>

                        {/* ===================== */}
                        {/* 🟡 OVERVIEW (ALL) */}
                        {/* ===================== */}
                        {type === "all" && filtered.map((s) => <TrackerItem key={s.id} session={s} person={key} onToggle={handleToggle} />)}

                        {/* ===================== */}
                        {/* 🟢 SPORT VIEW */}
                        {/* ===================== */}
                        {type !== "all" && (
                            <>
                                {/* TOTALS */}
                                <div className="mb-3" style={{ fontSize: 13, color: "#6c757d" }}>
                                    Total: {totalSessions} pass • {totalDistance}m
                                </div>

                                {/* LIST */}
                                {personSessions.map((s) => (
                                    <div key={s.id} className="py-2 border-bottom">
                                        <div className="fw-semibold">{s.desc}</div>

                                        <div style={{ fontSize: 12, color: "#6c757d" }}>{formatDate(s.completedAt?.[key])}</div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RaceTracker;
