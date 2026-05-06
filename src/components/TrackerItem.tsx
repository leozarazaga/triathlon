import type { Session, Person, SportType } from "../types/Session";

const badgeStyle: Record<SportType, { background: string; color: string }> = {
    swim: { background: "#cfe2ff", color: "#084298" },
    bike: { background: "#ffe5d0", color: "#7d3800" },
    run: { background: "#d1e7dd", color: "#0a3622" },
};

const badgeLabel: Record<SportType, string> = {
    swim: "Swim",
    bike: "Bike",
    run: "Run",
};

interface TrackerItemProps {
    session: Session;
    person: Person;
    onToggle: (person: Person, id: number) => void;
}

const TrackerItem = ({ session, person, onToggle }: TrackerItemProps) => {
    const isCompleted = session.completed[person];

    return (
        <div className="tracker-item d-flex align-items-center gap-2 py-2 cursor-pointer" onClick={() => onToggle(person, session.id)}>
            <input
                type="checkbox"
                className="form-check-input mt-0"
                checked={isCompleted}
                onChange={() => onToggle(person, session.id)}
                onClick={(e) => e.stopPropagation()}
            />

            <span className={`tracker-text ${isCompleted ? "is-completed" : "is-pending"}`}>{session.desc}</span>

            <span className="badge rounded-pill" style={{ ...badgeStyle[session.type], fontSize: 11 }}>
                {badgeLabel[session.type]}
            </span>
        </div>
    );
};

export default TrackerItem;
