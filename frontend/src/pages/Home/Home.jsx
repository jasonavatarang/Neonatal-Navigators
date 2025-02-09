import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import CSS directly

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-title">
                <h1>What is the current gestational age of the neonate?</h1>
            </div>
            <div className="button-group">
                <button onClick={() => navigate("/leftbranch")}>≤ 32 weeks</button>
                <button onClick={() => navigate("/33-35-weeks")}>33-35 weeks</button>
                <button onClick={() => navigate("/36-weeks")}>≥ 36 weeks</button>
            </div>
        </div>
    );
}
