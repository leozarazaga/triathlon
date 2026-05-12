interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
    const menuItems = [
        { id: "overview", label: "Overview" },
        { id: "swimming", label: "Swimming" },
        { id: "cycling", label: "Cycling" },
        { id: "running", label: "Running" },
    ];

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse h-100 border-end">
            <div className="position-sticky pt-4">
                <ul className="nav flex-column gap-2 px-2">
                    {menuItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <button
                                onClick={() => onViewChange(item.id)}
                                className={`nav-link rounded text-dark w-100 text-start ${activeView === item.id ? "bg-secondary bg-opacity-10 fw-semibold" : ""}`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
