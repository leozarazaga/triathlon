import { useSchedule } from "../context/ScheduleContext";
import TrackerItem from "./TrackerItem";

///////// Interfaces //////////
interface Profile {
    id: number;
    name: string;
    image: string;
    color: string;
}

export interface RaceTrackerProps {
    profiles: Profile[];
    type: "all" | "swim" | "bike" | "run";
}

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

                        {/* Lista */}
                        {filtered.map((s) => (
                            <TrackerItem key={s.id} session={s} person={key} onToggle={handleToggle} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default RaceTracker;
