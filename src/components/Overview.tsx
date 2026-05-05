import RaceTrackerInfo from "./RaceTrackerBar";

interface OverviewProps {
    profiles: {
        id: number;
        name: string;
        image: string;
        color: string;
    }[];
}

const Overview = ({ profiles }: OverviewProps) => {
    return (
        <>
            <div className="d-flex align-items-center pb-2 mb-3 border-bottom gap-3">
                <h1 className="h2 me-auto">Overview</h1>

                {/* Legend */}
                <span className="d-flex align-items-center gap-1" style={{ fontSize: 14 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#0d6efd", display: "inline-block" }} />
                    Leo
                </span>
                <span className="d-flex align-items-center gap-1" style={{ fontSize: 14 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#d63384", display: "inline-block" }} />
                    Klara
                </span>
            </div>
            <RaceTrackerInfo profiles={profiles} type="all" />
        </>
    );
};

export default Overview;
