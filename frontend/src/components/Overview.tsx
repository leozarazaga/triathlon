import type { Profile } from "../types/Session";
import TrainingProgress from "./TrainingProgress";

interface OverviewProps {
    profiles: Profile[];
}

const Overview = ({ profiles }: OverviewProps) => {
    return (
        <>
            <div className="d-flex align-items-center pb-2 mb-3 border-bottom gap-3">
                <h1 className="h2 me-auto">Overview</h1>

                {profiles.map((profile) => (
                    <span key={profile.id} className="d-flex align-items-center gap-1" style={{ fontSize: 14 }}>
                        <span 
                            style={{ 
                                width: 10, height: 10, borderRadius: "50%", 
                                background: profile.color, display: "inline-block" 
                            }} 
                        />
                        {profile.name}
                    </span>
                ))}
            </div>
            <TrainingProgress profiles={profiles} type="all" />
        </>
    );
};

export default Overview;