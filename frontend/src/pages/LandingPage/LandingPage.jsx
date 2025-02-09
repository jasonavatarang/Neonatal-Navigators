import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import the CSS directly

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page-container">
            <div className="landing-page-title">
                <h1>Welcome to NeoCare</h1>
            </div>
            <button className="enter-button" onClick={() => navigate("/Home")}>
                Enter
            </button>
        </div>
    );
}

