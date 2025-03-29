import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <main className="landing-page">
            <section className="landing-page-content">
                <h1>
                    Welcome to <span className="highlight">NeoCare</span>
                </h1>
                <p className="subtitle">
                    Empowering neonatal care through evidence-based neuroprotection education.
                </p>

                <div className="info-section">
                    <p>
                        Learn how to protect the most vulnerable lives with clinical tools and best practices for neonatal neuroprotection.
                        NeoCare guides you through gestational age-based interventions to help you make informed decisions.
                    </p>
                    <p>
                        Topics include intraventricular hemorrhage prevention in preterm infants and therapeutic hypothermia for neonates at 35 weeks’ gestation or later.
                    </p>
                </div>

                <div className="button-row">
                    <button className="primary-button" onClick={() => navigate("/landingleftbranch")}>
                        GMH-IVH & Bundle
                    </button>
                    <button className="primary-button" onClick={() => navigate("/home")}>
                        Start Evaluation
                    </button>
                    <button className="primary-button" onClick={() => navigate("/landingrightbranch")}>
                        Learn about HIE
                    </button>
                </div>
            </section>
        </main>
    );
}
