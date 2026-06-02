import { useState } from "react";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import BottomNavbar from "./components/BottomNavbar";

const profiles = [
    { id: 1, name: "Leo", image: "src/assets/avatars/leo.jpeg", color: "#0d6efd" },
    { id: 2, name: "Klara", image: "src/assets/avatars/klara.png", color: "#d63384" },
];

const App = () => {
    const [activeView, setActiveView] = useState("overview");

    return (
        <div className="vh-100 d-flex flex-column">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark flex-md-nowrap p-2 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
                        Triathlon Tracker
                    </a>
                </div>
            </nav>

            <div className="container-fluid flex-grow-1 overflow-hidden">
                <div className="row h-100">
                    <Sidebar activeView={activeView} onViewChange={setActiveView} />

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 overflow-auto h-100">
                        <MainContent activeView={activeView} profiles={profiles} />
                        <BottomNavbar activeView={activeView} onViewChange={setActiveView} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
