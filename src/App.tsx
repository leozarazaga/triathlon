import { useState } from "react";
import RaceTracker from "./components/RaceTracker";
import Overview from "./components/Overview";

//////// Profiles /////////
const profiles = [
    { id: 1, name: "Leo", image: "src/assets/avatars/leo.jpeg", color: "#0d6efd" },
    { id: 2, name: "Klara", image: "src/assets/avatars/klara.png", color: "#d63384" },
];

const App = () => {
    const [activeView, setActiveView] = useState("overview");

    return (
        <div className="vh-100 d-flex flex-column">
            {/* Top Navbar */}
            <nav className="navbar navbar-expand-md navbar-dark bg-dark flex-md-nowrap p-2 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
                        Our Dashbord
                    </a>

                    {/* Mobile Toggle Button */}
                    <button
                        className="navbar-toggler d-md-none collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            {/* Main Layout Area */}
            <div className="container-fluid flex-grow-1 overflow-hidden">
                <div className="row h-100">
                    {/* Sidebar */}
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse h-100 border-end">
                        <div className="position-sticky pt-4">
                            <ul className="nav flex-column gap-2 px-2">
                                {["overview", "swimming", "cycling", "running"].map((view) => (
                                    <li key={view} className="nav-item">
                                        <button
                                            onClick={() => setActiveView(view)}
                                            className={`nav-link rounded text-dark w-100 text-start ${activeView === view ? "bg-secondary bg-opacity-10 fw-semibold" : ""}`}
                                        >
                                            {view === "overview" && "Översikt"}
                                            {view === "swimming" && "Simning"}
                                            {view === "cycling" && "Cykling"}
                                            {view === "running" && "Löpning"}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 overflow-auto h-100">
                        {activeView === "overview" && (
                            <>
                                <Overview profiles={profiles} />
                                <RaceTracker profiles={profiles} type="all" />
                            </>
                        )}

                        {activeView === "swimming" && (
                            <>
                                <h1 className="h2 pb-2 mb-3 border-bottom">Simning</h1>
                                <RaceTracker profiles={profiles} type="swim" />
                            </>
                        )}

                        {activeView === "cycling" && (
                            <>
                                <h1 className="h2 pb-2 mb-3 border-bottom">Cykling</h1>
                                <RaceTracker profiles={profiles} type="bike" />
                            </>
                        )}

                        {activeView === "running" && (
                            <>
                                <h1 className="h2 pb-2 mb-3 border-bottom">Löpning</h1>
                                <RaceTracker profiles={profiles} type="run" />
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
