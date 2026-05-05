

type Person = "leo" | "klara";
type SessionType = "swim" | "bike" | "run";

interface Session {
  id: number;
  desc: string;
  type: SessionType;
  completed: {
    leo: boolean;
    klara: boolean;
  };
}

interface TrackerItemProps {
  session: Session;
  person: Person;
  onToggle: (person: Person, id: number) => void;
}

const badgeStyle: Record<SessionType, { background: string; color: string }> = {
  swim: { background: "#cfe2ff", color: "#084298" },
  bike: { background: "#ffe5d0", color: "#7d3800" },
  run: { background: "#d1e7dd", color: "#0a3622" },
};

const badgeLabel: Record<SessionType, string> = {
  swim: "Sim",
  bike: "Cykel",
  run: "Löp",
};

const TrackerItem = ({ session, person, onToggle }: TrackerItemProps) => {
  return (
    <div
      className="d-flex align-items-center gap-2 py-2"
      style={{ borderBottom: "1px solid #f1f3f5", cursor: "pointer" }}
      onClick={() => onToggle(person, session.id)}
    >
      <input
        type="checkbox"
        checked={session.completed[person]}
        onChange={() => onToggle(person, session.id)}
        onClick={(e) => e.stopPropagation()}
      />

      <span
        style={{
          flex: 1,
          fontSize: 14,
          textDecoration: session.completed[person] ? "line-through" : "none",
          color: session.completed[person] ? "#adb5bd" : "#212529",
        }}
      >
        {session.desc}
      </span>

      <span
        className="badge rounded-pill"
        style={{ ...badgeStyle[session.type], fontSize: 11 }}
      >
        {badgeLabel[session.type]}
      </span>
    </div>
  );
};

export default TrackerItem;