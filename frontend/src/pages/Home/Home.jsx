import React from "react";  
import { useNavigate } from "react-router-dom";
import "./Home.css"; 

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-title">
                <h1>What is the current gestational age of the neonate?</h1>
            </div>
            <div className="button-group">
                <button onClick={() => navigate("/leftbranch")}>≤ 33 weeks</button>
                <button onClick={() => navigate("/midbranch")}>33-35 weeks</button>
                <button onClick={() => navigate("/rightbranch")}>≥ 35 weeks</button>
            </div>
        </div>
    );
}
