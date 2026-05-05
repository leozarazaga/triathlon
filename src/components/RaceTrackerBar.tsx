import { useSchedule } from "../context/ScheduleContext";
import type { RaceTrackerProps } from "./RaceTracker";

const RaceTrackerInfo = ({ profiles, type }: RaceTrackerProps) => {
    const { sessions } = useSchedule();

    const filtered = type === "all" ? sessions : sessions.filter((session) => session.type === type);

    const calcPct = (person: "leo" | "klara") => {
        const done = filtered.filter((s) => s.completed[person]).length;
        return filtered.length ? Math.round((done / filtered.length) * 100) : 0;
    };
    const leoPct = calcPct("leo");
    const klaraPct = calcPct("klara");

    const leo = profiles.find((profile) => profile.name === "Leo");
    const klara = profiles.find((profile) => profile.name === "Klara");

    const dotLeft = (pct: number) => `calc(48px + ${pct}% * (100% - 96px) / 100)`;

    return (
        <div className="card border rounded-3 p-3 mb-4">
            <div className="text-uppercase fw-semibold mb-3" style={{ fontSize: 11, color: "#6c757d", letterSpacing: ".05em" }}>
                {type === "all" ? "Totalt — alla sporter" : type === "swim" ? "Simning" : type === "bike" ? "Cykling" : "Löpning"}
            </div>

            <div className="position-relative" style={{ height: 80 }}>
                {/* Leo bana */}
                <div className="position-absolute bg-secondary bg-opacity-25 rounded-pill" style={{ left: 48, right: 48, height: 8, top: 16 }}>
                    <div className="rounded-pill h-100" style={{ background: leo.color, width: leoPct + "%", transition: "width .5s ease" }} />
                </div>

                {/* Klara bana */}
                <div className="position-absolute bg-secondary bg-opacity-25 rounded-pill" style={{ left: 48, right: 48, height: 8, top: 52 }}>
                    <div className="rounded-pill h-100" style={{ background: klara.color, width: klaraPct + "%", transition: "width .5s ease" }} />
                </div>

                {/* Leo avatar */}
                <img
                    src={leo.image}
                    alt={leo.name}
                    className="rounded-circle position-absolute"
                    style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        top: 0,
                        left: dotLeft(leoPct),
                        transform: "translateX(-50%)",
                        transition: "left .5s ease",
                        border: `2px solid ${leo.color}`,
                    }}
                />

                {/* Klara avatar */}
                <img
                    src={klara.image}
                    alt={klara.name}
                    className="rounded-circle position-absolute"
                    style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        top: 36,
                        left: dotLeft(leoPct),
                        transform: "translateX(-50%)",
                        transition: "left .5s ease",
                        border: `2px solid ${klara.color}`,
                    }}
                />

                {/* Målgång */}
                <span className="position-absolute" style={{ right: -10, top: 1, fontSize: 50 }}>
                    🏁
                </span>
            </div>

            <div className="d-flex justify-content-between mt-1" style={{ padding: "0 50px", fontSize: 15, color: "#6c757d" }}>
                <span>Leo {leoPct}%</span>
                <span>Klara {klaraPct}%</span>
            </div>
        </div>
    );
};

export default RaceTrackerInfo;
