import type { Session, Person, SportType } from "../types/Session";
import React from "react";

const sportColors: Record<SportType, string> = {
    run: "#f93822",
    bike: "#bbed21",
    swim: "#0055ff",
};

const sportIcons: Record<SportType, React.ReactNode> = {
    run: <i className="fa-solid fa-person-running text-white"></i>,
    bike: <i className="fa-solid fa-person-biking text-white"></i>,
    swim: <i className="fa-solid fa-person-swimming fa-flip-horizontal text-white"></i>,
};

interface TrackerItemProps {
    session: Session;
    person: Person;
    profileId: number;
    onToggle: (person: Person, userId: number, sessionId: number) => void;
}

const TrackerItem = ({ session, person, profileId, onToggle }: TrackerItemProps) => {
    const isCompleted = session.completed[person];

    const cleanDescription = session.description.replace(/\[W\d+\]\s*/i, "").trim();

    return (
        <div className="workout-card" style={{ cursor: "default" }}>
            <div className="workout-icon-block" style={{ backgroundColor: sportColors[session.type] }}>
                {sportIcons[session.type]}
            </div>

            <div className="workout-details">
                <span className="workout-subtitle">{session.type.toUpperCase()}</span>
                <h4 className="workout-description">{cleanDescription}</h4>
                <span className="workout-meta">
                    {session.distance} {session.unit}
                </span>
            </div>

            <div
                className={`completion-circle ${isCompleted ? "is-completed" : ""}`}
                onClick={() => onToggle(person, profileId, session.id)}
                style={{ cursor: "pointer" }}
            >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
            </div>
        </div>
    );
};

export default TrackerItem;
