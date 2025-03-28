import React, { useState, useEffect } from "react"; // Add useEffect to imports
import "./RightBranch.css";

export default function RightBranch() {
    const [result, setResult] = useState("");
    const [summary, setSummary] = useState("");
    const [Ph, setPh] = useState("");
    const [BaseDeficit, setBaseDeficit] = useState("");
    const [criteria, setCriteria] = useState({
        gestational_age: "",
        birth_weight: "",
        time_since_insult: "",
        acute_perinatal_event: "",
        apgar_assisted_ventilation: "",
        has_seizures: "",
        signs_of_encephalopathy: 0,
        encephalopathy_details: {}
    });

    // Add useEffect to scroll to bottom when summary updates
    useEffect(() => {
        if (summary) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [summary]); // Runs whenever summary changes

    const calculateScore = () => {
        const predictorA = parseFloat(Ph) <= 7.0 && parseFloat(BaseDeficit) >= 16;
        const predictorB = parseFloat(Ph) >= 7.01 && parseFloat(Ph) <= 7.15 && parseFloat(BaseDeficit) >= 10 && parseFloat(BaseDeficit) <= 15.9;
        const predictorC = criteria.acute_perinatal_event === "0" && criteria.apgar_assisted_ventilation === "0";
        const predictorMet = predictorA || predictorB || predictorC;
    
        const hasSeizuresOrThreeSigns = criteria.has_seizures === "0" || criteria.signs_of_encephalopathy >= 3;
    
        const qualifies =
            criteria.gestational_age === "0" &&
            criteria.birth_weight === "0" &&
            criteria.time_since_insult === "0" &&
            predictorMet &&
            hasSeizuresOrThreeSigns;

            let summaryText = `The Sarnat exam results indicate that the neonate <b>${qualifies ? "qualifies" : "does not qualify"}</b> for Systemic Hypothermia.<br /><br />`;
        
        if (predictorMet && qualifies ) {
            summaryText += `The predictors that justify this are:<br />`;
            
            if (predictorA) {
                summaryText += `• Predictor A - pH is ≤ 7.0 with base deficit ≥ 16<br />`;
            } else if (predictorB) {
                summaryText += `• Predictor B - pH is 7.01–7.15 with base deficit 10–15.9<br />`;
            }
        
            if (predictorC) {
                if (predictorA || predictorB) {
                    summaryText += `<b>AND</b><br />`;
                }
                summaryText += `• Predictor C - APGAR ≤ 5 at 10 minutes or assisted ventilation at birth required ≥ 10 minutes<br />`;
            } else if (!predictorA && !predictorB) {
                summaryText += `None<br />`;
            }
        }

        summaryText += `<h4>Signs of Encephalopathy:</h4>`;
        summaryText += `${criteria.has_seizures === "0" ? "The neonate has seizures<br />" : ""}`;
        const encephalopathySigns = Object.entries(criteria.encephalopathy_details)
            .filter(([_, value]) => value === "Moderate" || value === "Severe")
            .map(([key, value]) => {
                const signName = key.replace(/_/g, " ");
                const signValue = criteria[key] === "1" ? optionsMap[key][1] : optionsMap[key][2]; // Moderate is 1, Severe is 2
                return `Neonate's ${signName} is ${signValue} (${value} sign of Encephalopathy)`;
            });

        if (encephalopathySigns.length > 0) {
            summaryText += encephalopathySigns.join("<br />");
        } else {
            summaryText += "";
        }

        setSummary(summaryText); // Scroll will happen in useEffect
    };

    // Add optionsMap
    const optionsMap = {
        level_of_consciousness: ["Normal", "Lethargic", "Stupor / Coma"],
        spontaneous_activity: ["Normal", "Decreased", "No Activity"],
        posture: ["Normal", "Distal Flexion / Extension", "Decerebrate"],
        tone: ["Normal", "Hypotonia / Hypertonia", "Flaccid"],
        suck: ["Normal", "Weak/Bite", "Absent"],
        moro: ["Normal", "Incomplete", "Absent"],
        pupils: ["Normal", "Constricted", "Skew / Non-reactive"],
        heart_rate: ["Normal", "Bradycardia", "Variable"],
        respirations: ["Normal", "Periodic", "Apnea/Intubated"]
    };

    const handleRadioChange = (name, value) => {
        setCriteria((prev) => {
            const newCriteria = { ...prev, [name]: value };
            
            if ([
                "level_of_consciousness",
                "spontaneous_activity",
                "posture",
                "tone",
                "suck",
                "moro",
                "pupils",
                "heart_rate",
                "respirations"
            ].includes(name)) {
                // Store the value and update encephalopathy_details
                if (value === "0") {
                    delete newCriteria.encephalopathy_details[name]; // Remove if Normal
                } else if (value === "1") {
                    newCriteria.encephalopathy_details[name] = "Moderate"; // Moderate is 1
                } else if (value === "2") {
                    newCriteria.encephalopathy_details[name] = "Severe"; // Severe is 2
                }
                
                const numSigns = Object.values(newCriteria.encephalopathy_details).filter((v) => v === "Moderate" || v === "Severe").length;
                newCriteria.signs_of_encephalopathy = numSigns;
            }
            
            return newCriteria;
        });
    };

    const renderRadioGroup = (name, label, options) => (
        <div className="radio-group">
            <p>{label}</p>
            <div className="radio-buttons">
                {options.map((option, index) => (
                    <label key={index}>
                        <input 
                            type="radio" 
                            name={name} 
                            value={index} 
                            onChange={(e) => handleRadioChange(name, e.target.value)} 
                        /> {option}
                    </label>
                ))}
            </div>
        </div>
    );

    const renderHighlightGroup = (name, label, yesSelected, noSelected) => (
        <div className="highlight-group">
            <p>{label}</p>
            <div className="highlight-buttons">
                <div className={`highlight-option ${yesSelected ? "selected" : ""}`}>Yes</div>
                <div className={`highlight-option ${noSelected ? "selected" : ""}`}>No</div>
            </div>
        </div>
    );

    return (
        <div className="right-branch-container">
            <div className="right-branch-top-container">
                <p>Since the neonate is ≥ 35 weeks, it is now necessary to perform the Sarnat exam.</p>
            </div>
            <div className="right-branch-images">
                <img className="protocol-image" src="/HIE Hypothermia Protocol.png" alt="HIE Hypothermia Protocol" />
                <img className="exclusion-criteria" src="/Exclusion Criteria.png" alt="HIE Hypothermia Exclusion Criteria" />
            </div>
            <div className="right-branch-sarnat-exam">
                <h1>Simple Sarnat Exam</h1>
                <h2>A neonate must meet all 5 criteria to qualify for Systemic Hypothermia</h2>
                <br></br>
                <h2>1. Gestational Age</h2>
                {renderRadioGroup("gestational_age", "Is the gestational age of the neonate ≥ 35 weeks?", ["Yes", "No"])}
                
                <h2>2. Birth Weight</h2>
                {renderRadioGroup("birth_weight", "Is the birth weight ≥ 1.8 kg?", ["Yes", "No"])}
                
                <h2>3. Time Since Insult</h2>
                {renderRadioGroup("time_since_insult", "Has it been ≤ 6 hours since the last insult occurred?", ["Yes", "No"])}
                
                <h2>4. ONE OR MORE Predictors of Severe HIE</h2>
                <div className="input-group">
                    <label className="phLabel">Enter pH:</label>
                    <input
                        type="number"
                        value={Ph}
                        onChange={(e) => setPh(e.target.value)}
                        placeholder="pH"
                        step="0.01"
                    />
                </div>
                <div className="input-group">
                    <label className="baseDeficitLabel">Enter Base Deficit:</label>
                    <input
                        type="number"
                        value={BaseDeficit}
                        onChange={(e) => setBaseDeficit(e.target.value)}
                        placeholder="Base Deficit"
                        step="0.01"
                    />
                </div>

                <h3>Predictor A</h3>
                {renderHighlightGroup(
                    "predictor_a",
                    "pH ≤ 7.0 with base deficit ≥ 16",
                    parseFloat(Ph) <= 7.0 && parseFloat(BaseDeficit) >= 16,
                    !(parseFloat(Ph) <= 7.0 && parseFloat(BaseDeficit) >= 16)
                )}
                <h3>Predictor B</h3>
                {renderHighlightGroup(
                    "predictor_b",
                    "pH 7.01 - 7.15 with base deficit 10-15.9",
                    parseFloat(Ph) >= 7.01 && parseFloat(Ph) <= 7.15 && parseFloat(BaseDeficit) >= 10 && parseFloat(BaseDeficit) <= 15.9,
                    !(parseFloat(Ph) >= 7.01 && parseFloat(Ph) <= 7.15 && parseFloat(BaseDeficit) >= 10 && parseFloat(BaseDeficit) <= 15.9)
                )}
                <h3>Predictor C (if no blood gas available)</h3>
                {renderRadioGroup("acute_perinatal_event", "Acute perinatal event (cord prolapse, heart rate decelerations, uterine rupture)", ["Yes", "No"])}
                <h4>AND</h4>
                {renderRadioGroup("apgar_assisted_ventilation", "APGAR ≤ 5 at 10 minutes or assisted ventilation at birth required ≥ 10 minutes", ["Yes", "No"])}

                <h2>5. Has seizures or 3 of 6 of the following signs of Encephalopathy:</h2>

                {renderRadioGroup("has_seizures", "Does the neonate have seizures?", ["Yes", "No"])}

                <div className="part-5-container">
                    <div className="part-5-description-container">
                        <div className="part-5-description-left">
                            <p>Clinical Criteria</p>
                        </div>
                        <div className="part-5-description-right">
                            <p>Normal | Moderate | Severe</p> {/* Updated to reflect new order */}
                        </div>
                    </div>
                    <h3>General</h3>
                    {renderRadioGroup("level_of_consciousness", "Level of Consciousness", ["Normal", "Lethargic", "Stupor/Coma"])}
                    {renderRadioGroup("spontaneous_activity", "Spontaneous Activity", ["Normal", "Decreased", "No Activity"])}
                    {renderRadioGroup("posture", "Posture", ["Normal", "Distal Flexion/Extension", "Decerebrate"])}
                    {renderRadioGroup("tone", "Tone", ["Normal", "Hypotonia/Hypertonia", "Flaccid"])}
                    <h3>Primitive Reflexes</h3>
                    {renderRadioGroup("suck", "Suck", ["Normal", "Weak/Bite", "Absent"])}
                    {renderRadioGroup("moro", "Moro", ["Normal", "Incomplete", "Absent"])}
                    <h3>Autonomic System</h3>
                    {renderRadioGroup("pupils", "Pupils", ["Normal", "Constricted", "Skew/Non-reactive"])}
                    {renderRadioGroup("heart_rate", "Heart Rate", ["Normal", "Bradycardia", "Variable"])}
                    {renderRadioGroup("respirations", "Respirations", ["Normal", "Periodic", "Apnea/Intubated"])}
                </div>
                <button onClick={calculateScore}>Summarize Results</button>
                {summary && (
                    <div className="summary-section">
                        <h1>Summary</h1>
                        <p dangerouslySetInnerHTML={{ __html: summary }} />
                    </div>
                )}
            </div>
        </div>
    );
}