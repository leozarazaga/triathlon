import { useSchedule } from "../context/ScheduleContext";
import type { RaceTrackerProps } from "./TrainingLog";

const TrainingProgress = ({ profiles, type }: RaceTrackerProps) => {
    const { sessions } = useSchedule();

    const filtered = type === "all" ? sessions : sessions.filter((session) => session.type === type);
    const typeLabel = type === "all" ? "Total — All Sports" : type === "swim" ? "Swimming" : type === "bike" ? "Cycling" : "Running";

    const getPercentage = (name: string) => {
        const key = name.toLowerCase() as "leo" | "klara";
        const done = filtered.filter((session) => session.completed[key]).length;
        return filtered.length ? Math.round((done / filtered.length) * 100) : 0;
    };

    return (
        <div className="card border rounded-3 p-3 mb-4 overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="text-uppercase fw-semibold text-secondary" style={{ fontSize: 11, letterSpacing: ".05em" }}>
                    {typeLabel}
                </div>
                <span className="fs-3">🏁</span>
            </div>

            <div className="px-3">
                {profiles.map((profile) => {
                    const percentage = getPercentage(profile.name);

                    return (
                        <div key={profile.id} className="race-tracker-lane position-relative d-flex align-items-center mb-4">
                            <div className="track-bg w-100 bg-secondary bg-opacity-25 rounded-pill">
                                <div className="track-progress" style={{ width: `${percentage}%`, backgroundColor: profile.color }} />
                            </div>

                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="racer-avatar rounded-circle"
                                style={{
                                    left: `calc(${percentage}% - 22px)`,
                                    border: `2px solid ${profile.color}`,
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="d-flex justify-content-between mt-2 px-3 text-secondary fw-medium small">
                {profiles.map((profile) => (
                    <span key={profile.id}>
                        {profile.name} {getPercentage(profile.name)}%
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TrainingProgress;
