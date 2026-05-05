import { useSchedule } from "../context/ScheduleContext";

/////////Interfaces//////////////
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

const badgeStyle: Record<string, { background: string; color: string }> = {
    swim: { background: "#cfe2ff", color: "#084298" },
    bike: { background: "#ffe5d0", color: "#7d3800" },
    run: { background: "#d1e7dd", color: "#0a3622" },
};

const badgeLabel: Record<string, string> = {
    swim: "Sim",
    bike: "Cykel",
    run: "Löp",
};

const RaceTracker = ({ profiles, type }: RaceTrackerProps) => {
    const { sessions, handleToggle } = useSchedule();

    const leo = profiles.find((profile) => profile.name === "Leo");
    const klara = profiles.find((profile) => profile.name === "Klara");

    const filtered = type === "all" ? sessions : sessions.filter((session) => session.type === type);

    return (
        <div>
            {/* Todo-lista — två kolumner */}
            <div className="row">
                {/* Leo */}
                <div className="col-6">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <img
                            src={leo.image}
                            alt="Leo"
                            className="rounded-circle"
                            style={{ width: 100, height: 100, objectFit: "cover", border: `2px solid ${leo.color}` }}
                        />
                        <span className="fw-semibold">Leo</span>
                    </div>
                    {filtered.map((s) => (
                        <div
                            key={s.id}
                            className="d-flex align-items-center gap-2 py-2"
                            style={{ borderBottom: "1px solid #f1f3f5", cursor: "pointer" }}
                            onClick={() => handleToggle("leo", s.id)}
                        >
                            <input
                                type="checkbox"
                                checked={s.completed.leo}
                                onChange={() => handleToggle("leo", s.id)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span
                                style={{
                                    flex: 1,
                                    fontSize: 14,
                                    textDecoration: s.completed.leo ? "line-through" : "none",
                                    color: s.completed.leo ? "#adb5bd" : "#212529",
                                }}
                            >
                                {s.desc}
                            </span>
                            <span className="badge rounded-pill" style={{ ...badgeStyle[s.type], fontSize: 11 }}>
                                {badgeLabel[s.type]}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Klara */}
                <div className="col-6 border-start ps-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <img
                            src={klara.image}
                            alt="Klara"
                            className="rounded-circle"
                            style={{ width: 100, height: 100, objectFit: "cover", border: `2px solid ${klara.color}` }}
                        />
                        <span className="fw-semibold">Klara</span>
                    </div>
                    {filtered.map((s) => (
                        <div
                            key={s.id}
                            className="d-flex align-items-center gap-2 py-2"
                            style={{ borderBottom: "1px solid #f1f3f5", cursor: "pointer" }}
                            onClick={() => handleToggle("klara", s.id)}
                        >
                            <input
                                type="checkbox"
                                checked={s.completed.klara}
                                onChange={() => handleToggle("klara", s.id)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span
                                style={{
                                    flex: 1,
                                    fontSize: 14,
                                    textDecoration: s.completed.klara ? "line-through" : "none",
                                    color: s.completed.klara ? "#adb5bd" : "#212529",
                                }}
                            >
                                {s.desc}
                            </span>
                            <span className="badge rounded-pill" style={{ ...badgeStyle[s.type], fontSize: 11 }}>
                                {badgeLabel[s.type]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default RaceTracker;
