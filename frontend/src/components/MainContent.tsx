import type { Profile } from "../types/Session";
import Overview from "./Overview";
import TrainingLog from "./TrainingLog";
import TrainingProgress from "./TrainingProgress";

interface MainContentProps {
    activeView: string;
    profiles: Profile[];
}

const MainContent = ({ activeView, profiles }: MainContentProps) => {
    if (activeView === "overview") {
        return (
            <>
                <Overview profiles={profiles} />
                <TrainingLog profiles={profiles} type="all" />
            </>
        );
    }

    const sportType = activeView === "swimming" ? "swim" : activeView === "cycling" ? "bike" : "run";

    const title = activeView.charAt(0).toUpperCase() + activeView.slice(1);

    return (
        <>
            <h1 className="h2 pb-2 mb-3 border-bottom">{title}</h1>
            <TrainingProgress profiles={profiles} type={sportType} />
            <TrainingLog profiles={profiles} type={sportType} />
        </>
    );
};

export default MainContent;
