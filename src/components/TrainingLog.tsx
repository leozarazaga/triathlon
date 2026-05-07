import { useSchedule } from "../context/ScheduleContext";
import type { Person, Profile } from "../types/Session";
import TrackerItem from "./TrackerItem";

const formatDate = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
};

export interface TrainingLogProps {
    profiles: Profile[];
    type: "all" | "swim" | "bike" | "run";
}

const TrainingLog = ({ profiles, type }: TrainingLogProps) => {
    const { sessions, handleToggle } = useSchedule();

    const filteredSessions = type === "all" ? sessions : sessions.filter((s) => s.type === type);

    return (
        <div className="row g-4">
            {profiles.map((profile, index) => {
                const personKey = profile.name.toLowerCase() as Person;

                const completedSessions = filteredSessions.filter((s) => s.completed[personKey]);
                const totalDistance = completedSessions.reduce((sum, s) => sum + s.dist, 0);
                const unit = type === "swim" ? "m" : "km";

                return (
                    <div key={profile.id} className={`col-12 col-md-6 ${index === 1 ? "border-md-start ps-md-4" : ""}`}>
                        {/* Member Header */}
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="rounded-circle border border-2 shadow-sm"
                                style={{ width: 64, height: 64, objectFit: "cover", borderColor: profile.color }}
                            />
                            <h3 className="h5 mb-0 fw-bold">{profile.name}</h3>
                        </div>

                        {/* View Switcher */}
                        {type === "all" ? (
                            <div className="list-group list-group-flush">
                                {filteredSessions.map((s) => (
                                    <TrackerItem key={s.id} session={s} person={personKey} onToggle={handleToggle} />
                                ))}
                            </div>
                        ) : (
                            <div className="ps-2">
                                {/* Split Stat Cards */}
                                <div className="row g-2 mb-4">
                                    <div className="col-6">
                                        <div className="p-3 bg-light rounded-4 border-0 h-100">
                                            <div
                                                className="text-secondary text-uppercase fw-bold mb-1"
                                                style={{ fontSize: 10, letterSpacing: "0.05em" }}
                                            >
                                                Workouts
                                            </div>
                                            <div className="d-flex align-items-baseline  gap-1">
                                                <span className="h2 mb-0 fw-bold">{completedSessions.length}</span>
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

                                {/* History List */}
                                <div className="mt-4">
                                    <h4 className="small text-uppercase fw-bold text-secondary mb-3" style={{ letterSpacing: "0.05em" }}>
                                        Completed History
                                    </h4>
                                    {completedSessions.length === 0 ? (
                                        <p className="text-muted small py-3 text-center border rounded-3 bg-light bg-opacity-50">
                                            No sessions completed yet.
                                        </p>
                                    ) : (
                                        <div className="d-flex flex-column gap-2">
                                            {completedSessions.map((s) => (
                                                <div key={s.id} className="p-2 border-bottom d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <div className="fw-medium" style={{ fontSize: 14 }}>
                                                            {s.desc}
                                                        </div>
                                                        <div className="text-muted" style={{ fontSize: 11 }}>
                                                            {formatDate(s.completedAt?.[personKey])}
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="badge bg-success-subtle text-success rounded-pill px-3 py-1"
                                                        style={{ fontSize: 10 }}
                                                    >
                                                        Done
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TrainingLog;
