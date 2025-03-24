import React, { useState } from "react";
import "./RightBranch.css";

export default function RightBranch() {
    const [result, setResult] = useState("");
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
        encephalopathy_details: {} // New state to store part 5 answers
    });
    

    const calculateScore = () => {
        const predictorA = parseFloat(Ph) <= 7.0 && parseFloat(BaseDeficit) >= 16;
        const predictorB = parseFloat(Ph) >= 7.01 && parseFloat(Ph) <= 7.15 && parseFloat(BaseDeficit) >= 10 && parseFloat(BaseDeficit) <= 15.9;
        const predictorC = criteria.acute_perinatal_event == "0" && criteria.apgar_assisted_ventilation == "0";
        const predictorMet = predictorA || predictorB || predictorC;

        const hasSeizuresOrThreeSigns = criteria.has_seizures == "0" || criteria.signs_of_encephalopathy >= 3;

        const qualifies =
            criteria.gestational_age == "0" &&
            criteria.birth_weight == "0" &&
            criteria.time_since_insult == "0" &&
            predictorMet &&
            hasSeizuresOrThreeSigns;

            let part5Criteria = "";
            for (const [key, value] of Object.entries(criteria.encephalopathy_details)) {
                part5Criteria += `${key.replace(/_/g, " ")}: ${value}\n`;
            }
            
            /*
           let criteriaSummary = `
            Gestational Age: ${criteria.gestational_age == "0"}\n
            Birth Weight: ${criteria.birth_weight == "0"}\n
            Time Since Insult: ${criteria.time_since_insult == "0"}\n
            Acute Perinatal Event: ${criteria.acute_perinatal_event}\n
            APGAR Assisted Ventilation: ${criteria.apgar_assisted_ventilation}\n
            Acute Perinatal Event: ${criteria.acute_perinatal_event}\n
            APGAR Assisted Ventilation: ${criteria.apgar_assisted_ventilation}\n
            pH: ${Ph}\n
            Base Deficit: ${BaseDeficit}\n
            predictorMet: ${predictorMet}\n
            Number of Encephalopathy Signs: ${criteria.signs_of_encephalopathy}\n
            hasSeizuresOrThreeSigns: ${hasSeizuresOrThreeSigns}\n
           `;
                */
            setResult(`${qualifies ? "Neonate qualifies for Systemic Hypothermia" : "Neonate does not qualify for Systemic Hypothermia"}`);
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
                    const isSignPresent = value === 0;
                    newCriteria.encephalopathy_details[name] = isSignPresent ? "Moderate" : "Severe";
        
                    // Count the number of signs present (value === 0)
                    const numSigns = Object.values(newCriteria.encephalopathy_details).filter((v) => v === "Moderate" || v == "Severe").length;
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
                        <input type="radio" name={name} value={index} onChange={(e) => handleRadioChange(name, parseInt(e.target.value))} /> {option}
                    </label>
                ))}
            </div>
        </div>
    );

    const renderHighlightGroup = (name, label, yesSelected, noSelected) => (
        <div className="highlight-group">
            <p>{label}</p>
            <div className="highlight-buttons">
                <div
                    className={`highlight-option ${yesSelected ? "selected" : ""}`}
                >
                    Yes
                </div>
                <div
                    className={`highlight-option ${noSelected ? "selected" : ""}`}
                >
                    No
                </div>
            </div>
        </div>
    );
    

    return (
        <div className="right-branch-container">
            <div className="right-branch-top-container">
                <p>Since the neonate is ≥ 36 weeks, it is now necessary to perform the Sarnat exam.</p>
            </div>
            <div className="right-branch-images">
                <img className="protocol-image" src="/HIE Hypothermia Protocol.png" alt="HIE Hypothermia Protocol" />
                <img className="exclusion-criteria" src="/Exclusion Criteria.png" alt="HIE Hypothermia Exclusion Criteria" />
            </div>
            <div className="right-branch-sarnat-exam">
                <h1>Simple Sarnat Exam</h1>
                <h2>1. Gestational Age</h2>
                {renderRadioGroup("gestational_age", "Is the gestational age of the neonate ≥ 35 weeks?", ["Yes", "No"])}
                
                <h2>2. Birth Weight</h2>
                {renderRadioGroup("birth_weight", "Is the birth weight ≥ 1.8 kg?", ["Yes", "No"])}
                
                <h2>3. Time Since Insult</h2>
                {renderRadioGroup("time_since_insult", "Has it been ≤ 6 hours since the last insult occured?", ["Yes", "No"])}
                
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
                <h4>and</h4>
                {renderRadioGroup("apgar_assisted_ventilation", "APGAR ≤ 5 at 10 minutes or assisted ventilation at birth required ≥ 10 minutes", ["Yes", "No"])}

                <h2>5. Has seizures or 3 of 6 of the following signs of Encephalopathy:</h2>
                <div className="part-5-container">
                    <div className="part-5-description-container">
                        <div className="part-5-description-left">
                            <p>Clinical Criteria</p>
                        </div>
                        <div className="part-5-description-right">
                            <p>Left Indicates Moderate | Right Indicates Severe.</p>
                        </div>
                    </div>
                    {renderRadioGroup("has_seizures", "Does the neonate have seizures?", ["Yes", "No"]) }
                    {renderRadioGroup("level_of_consciousness", "Level of Consciousness", ["Lethargic", "Stupor / Coma"])}
                    {renderRadioGroup("spontaneous_activity", "Spontaneous Activity", ["Decreased", "No Activity"])}
                    {renderRadioGroup("posture", "Posture", ["Distal Flexion / Extension", "Decerebrate"])}
                    {renderRadioGroup("tone", "Tone", ["Hypotonia / Hypertonia", "Flaccid"])}
                    {renderRadioGroup("suck", "Primitive Reflexes (Suck)", ["Weak/Bite", "Absent"])}
                    {renderRadioGroup("moro", "Primitive Reflexes (Moro)", ["Incomplete", "Absent"])}
                    {renderRadioGroup("pupils", "Autonomic System (Pupils)", ["Constricted", "Skew / Non-reactive"])}
                    {renderRadioGroup("heart_rate", "Heart Rate", ["Bradycardia", "Variable"])}
                    {renderRadioGroup("respirations", "Respirations", ["Periodic", "Apnea/Intubated"])}
                </div>
            <button onClick={calculateScore}>Summarize Results</button>
            <h3>{result}</h3>
            </div>
        </div>
    );
}
