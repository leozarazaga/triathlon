import type { Profile } from "../types/Session";
import TrainingProgress from "./TrainingProgress";

interface OverviewProps {
    profiles: Profile[];
}

const Overview = ({ profiles }: OverviewProps) => {
    return (
        <div className="mt-2">
            <div className="mb-4">
                <h1 className="nike-hero-stat">
                    MALMÖ
                    <br />
                    TRIATHLON
                </h1>
                <div className="race-date">Your Race Date: August 2, 2026</div>
            </div>

            <div className="d-flex align-items-center pb-2 mb-3 border-bottom gap-3 mt-5">
                <h2 className="h5 fw-bold text-uppercase me-auto mb-0" style={{ letterSpacing: "0.05em" }}>
                    Team Progress
                </h2>

                {profiles.map((profile) => (
                    <span key={profile.id} className="d-flex align-items-center gap-1 text-muted fw-medium" style={{ fontSize: 13 }}>
                        <span
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: profile.color,
                                display: "inline-block",
                            }}
                        />
                        {profile.name}
                    </span>
                ))}
            </div>

            <TrainingProgress profiles={profiles} type="all" />
        </div>
    );
};

export default Overview;
