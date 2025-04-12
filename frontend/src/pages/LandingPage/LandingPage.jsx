import React from "react"; 
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; 

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page-container">
            <div className="landing-page-title">
                <h1>Welcome to NeoCare</h1>
            </div>
            <div className="landing-page-info">
                <p>
                    This site provides educational materials on neonatal neuroprotection, guiding you through the evaluation of neonates for appropriate neuroprotection interventions based on their gestational age.
                </p>
                <p>
                Specifically, these educational materials will include best practices for preventing intraventricular hemorrhages in preterm neonates and guidelines for identifying neonates at 35 weeks’ gestation or later who may be candidates for therapeutic hypothermia.
                </p>
            </div>

            <div className="button-row">
                <button className="enter-button" onClick={() => navigate("/landingleftbranch")}>
                    Learn more about GMH-IVH and bundle
                 </button>

                 <button className="enter-button" onClick={() => navigate("/home")}>
                    Begin neuroprotective <br /> intervention evaluation
                </button>


                <button className="enter-button" onClick={() => navigate("/landingrightbranch")}>
                    Learn more about HIE
                </button>
            </div>
     
        </div>
    );
}

