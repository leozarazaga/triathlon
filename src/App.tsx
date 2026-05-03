const App = () => {
    return (
        <div className="vh-100 d-flex flex-column">
            {/* Top Navbar */}
            <nav className="navbar navbar-expand-md navbar-dark bg-dark flex-md-nowrap p-2 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
                        My Dashboard
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
                                <li className="nav-item">
                                    <a className="nav-link active rounded text-dark bg-secondary bg-opacity-10" aria-current="page" href="#overview">
                                        Overview
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link rounded text-dark" href="#swimming">
                                        Swimming
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link rounded text-dark" href="#cycling">
                                        Cycling
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link rounded text-dark" href="#running">
                                        Running
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4 overflow-auto h-100">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 className="h2">Overview</h1>
                        </div>
                        <p>Your main content goes here...</p>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
