import type { Profile } from "../types/Session";
import Overview from "./Overview";
import TrainingLog from "./TrainingLog";

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

    return (
        <>
            <TrainingLog profiles={profiles} type={sportType} />
        </>
    );
};

export default MainContent;
