import "../assets/scss/App.scss";

// 1. Define the props to match how the Sidebar works
interface BottomNavbarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

const BottomNavbar = ({ activeView, onViewChange }: BottomNavbarProps) => {
    const handleNavClick = (e: React.MouseEvent, view: string) => {
        e.preventDefault();
        onViewChange(view);
    };

    return (
        <div className="bottom-nav-container">
            <div className="bottom-nav">
                <div className="bottom-nav-inner">
                    <ul className="menu">
                        <li className="menu-item">
                            <a href="#" onClick={(e) => handleNavClick(e, "overview")} className={activeView === "overview" ? "current" : ""}>
                                {/* <i className="fa-solid fa-table-cells-large"></i> */}
                                {/* <i className="fa-solid fa-chart-bar"></i> */}
                                {/* <i className="fa-solid fa-chart-line"></i> */}
                                <i className="fa-solid fa-chart-column"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="#" onClick={(e) => handleNavClick(e, "swimming")} className={activeView === "swimming" ? "current" : ""}>
                                <i className="fa-solid fa-person-swimming fa-flip-horizontal"></i>
                                <span>Swim</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="#" onClick={(e) => handleNavClick(e, "cycling")} className={activeView === "cycling" ? "current" : ""}>
                                <i className="fa-solid fa-person-biking"></i>
                                <span>Bicycle</span>
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="#" onClick={(e) => handleNavClick(e, "running")} className={activeView === "running" ? "current" : ""}>
                                <i className="fa-solid fa-person-running"></i>
                                <span>Run</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BottomNavbar;
