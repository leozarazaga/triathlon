import "bootstrap";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/scss/App.scss";
import { ScheduleProvider } from "./context/ScheduleProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ScheduleProvider>
            <App />
        </ScheduleProvider>
    </StrictMode>,
);
