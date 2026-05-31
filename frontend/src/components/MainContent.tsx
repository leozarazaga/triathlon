import type { Profile } from "../types/Session";
import Overview from "./Overview";
import TrainingLog from "./TrainingLog";
import TrainingProgress from "./TrainingProgress";

interface MainContentProps {
    activeView: string;
    profiles: Profile[];
}

const MainContent = ({ activeView, profiles }: MainContentProps) => {
    switch (activeView) {
        case "overview":
            return (
                <>
                    <Overview profiles={profiles} />
                    <TrainingLog profiles={profiles} type="all" />
                </>
            );
        case "swimming":
            return (
                <>
                    <h1 className="h2 pb-2 mb-3 border-bottom">Swimming</h1>
                    <TrainingProgress profiles={profiles} type="swim" />
                    <TrainingLog profiles={profiles} type="swim" />
                </>
            );
        case "cycling":
            return (
                <>
                    <h1 className="h2 pb-2 mb-3 border-bottom">Cycling</h1>
                    <TrainingProgress profiles={profiles} type="bike" />
                    <TrainingLog profiles={profiles} type="bike" />
                </>
            );
        case "running":
            return (
                <>
                    <h1 className="h2 pb-2 mb-3 border-bottom">Running</h1>
                    <TrainingProgress profiles={profiles} type="run" />
                    <TrainingLog profiles={profiles} type="run" />
                </>
            );
        default:
            return <Overview profiles={profiles} />;
    }
};

export default MainContent;
