import { useSchedule } from "../context/ScheduleContext";
import type { Profile } from "../types/Session";

export interface RaceTrackerProps {
    profiles: Profile[];
    type: "all" | "swim" | "bike" | "run";
}

const TrainingProgress = ({ profiles, type }: RaceTrackerProps) => {
    const { sessions } = useSchedule();

    const filtered = type === "all" ? sessions : sessions.filter((session) => session.type === type) || [];
    const typeLabel = type === "all" ? "Total — All Sports" : type === "swim" ? "Swimming" : type === "bike" ? "Cycling" : "Running";

    const getPercentage = (name: string) => {
        const key = name.toLowerCase() as "leo" | "klara";
        const done = filtered.filter((session) => session.completed[key]).length;
        return filtered.length ? Math.round((done / filtered.length) * 100) : 0;
    };

    return (
        <div className="mb-5 pb-3">
            {/* =============== PROGRESS TITLE =============== */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="text-uppercase fw-bold text-secondary" style={{ fontSize: 12, letterSpacing: ".1em" }}>
                    {typeLabel}
                </div>
            </div>

            {/* =============== SKEWED TRACKS CONTAINER =============== */}
            <div className="pe-4 position-relative">
                {profiles.map((profile) => {
                    const percentage = getPercentage(profile.name);

                    return (
                        <div key={profile.id} className="race-tracker-lane position-relative d-flex align-items-center mb-5">
                            <div className="track-bg w-100 position-relative">
                                <div className="track-progress" style={{ width: `${percentage}%`, backgroundColor: profile.color }} />

                                {/* =============== FINISH LINE STRIP =============== */}
                                <div className="finish-line-strip" />
                            </div>

                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="racer-avatar rounded-circle"
                                style={{
                                    left: `calc(${percentage}% - 24px)`,
                                    border: `3px solid ${profile.color}`,
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* =============== STAT LABELS =============== */}
            <div className="d-flex gap-5 mt-2">
                {profiles.map((profile) => (
                    <div key={profile.id} className="d-flex flex-column">
                        <span className="text-uppercase fw-bold text-secondary mb-1" style={{ fontSize: 11, letterSpacing: "0.05em" }}>
                            {profile.name}
                        </span>
                        <span
                            style={{
                                fontSize: "2rem",
                                fontWeight: 900,
                                fontStyle: "italic",
                                lineHeight: 1,
                                letterSpacing: "-1px",
                                color: profile.color,
                            }}
                        >
                            {getPercentage(profile.name)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingProgress;
