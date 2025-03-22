import React, { useState } from "react";
import "./RightBranch.css";

export default function RightBranch() {
    const [result, setResult] = useState("");

    const calculateScore = () => {
        const getValue = (name) => {
            const radios = document.getElementsByName(name);
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    return parseInt(radios[i].value);
                }
            }
            return 0;
        };

        const levelScore = getValue("level_of_consciousness");
        const activityScore = getValue("spontaneous_activity");
        const postureScore = getValue("posture");
        const toneScore = getValue("tone");
        const suckScore = getValue("suck");
        const moroScore = getValue("moro");
        const reflexScore = Math.max(suckScore, moroScore);
        const pupilScore = getValue("pupils");
        const heartScore = getValue("heart_rate");
        const respScore = getValue("respirations");
        const autoScore = Math.max(pupilScore, heartScore, respScore);

        let normEnceph = 0;
        let modEnceph = 0;
        let sevEnceph = 0;

        const categorize = (score) => {
            if (score === 0) normEnceph++;
            else if (score === 1) modEnceph++;
            else sevEnceph++;
        };

        categorize(levelScore);
        categorize(activityScore);
        categorize(postureScore);
        categorize(toneScore);
        categorize(reflexScore);
        categorize(autoScore);

        if (sevEnceph >= Math.max(normEnceph, modEnceph)) {
            setResult("Severe Encephalopathy");
        } else if (modEnceph >= Math.max(normEnceph, sevEnceph)) {
            setResult("Moderate Encephalopathy");
        } else {
            setResult("Mild or No Encephalopathy");
        }
    };

    const renderRadioGroup = (name, label, options) => (
        <div className="radio-group">
            <p>{label}</p>
            <div className="radio-buttons">
                {options.map((option, index) => (
                    <label key={index}>
                        <input type="radio" name={name} value={index} /> {option}
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="right-branch-container">
            <div className="title">
                <h1>≥ 36 Weeks Procedure</h1>
            </div>
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
                {renderRadioGroup("gestational_age", "Gestational Age ≥ 35 weeks", ["Yes", "No"])}
                <h2>2. Birth Weight</h2>
                {renderRadioGroup("birth_weight", "Birth Weight ≥ 1.8 kg", ["Yes", "No"])}
                <h2>3. Time Since Insult</h2>
                {renderRadioGroup("time_since_insult", "Time Since Insult ≤ 6 hours", ["Yes", "No"])}
                
                <h2>4. ONE OR MORE Predictors of Severe HIE</h2>
                <h3>Predictor A</h3>
                {renderRadioGroup("pH ≤ 7.0 with base deficit ≥ 16", "pH ≤ 7.0 with base deficit ≥ 16", ["Yes", "No"])}
                <h3>Predictor B</h3>
                {renderRadioGroup("pH 7.01 - 7.15 with base deficit 10-15.9", "pH 7.01 - 7.15 with base deficit 10-15.9", ["Yes", "No"])}
                {renderRadioGroup("No blood gas and acute perinatal event", "No blood gas and acute perinatal event", ["Yes", "No"])}
                
                <h2>5. Has seizures or 3 of 6 of the following:</h2>
                {renderRadioGroup("level_of_consciousness", "Level of Consciousness", ["Normal", "Lethargic", "Stupor/Coma"])}
                {renderRadioGroup("spontaneous_activity", "Spontaneous Activity", ["Normal", "Decreased", "No Activity"])}
                {renderRadioGroup("posture", "Posture", ["Normal", "Distal Flexion/Extension", "Decerebrate"])}
                {renderRadioGroup("tone", "Tone", ["Normal", "Hypotonia/Hypertonia", "Flaccid"])}
                {renderRadioGroup("suck", "Primitive Reflexes (Suck)", ["Normal", "Weak/Bite", "Absent"])}
                {renderRadioGroup("moro", "Primitive Reflexes (Moro)", ["Normal", "Incomplete", "Absent"])}
                {renderRadioGroup("pupils", "Autonomic System (Pupils)", ["Normal", "Constricted", "Skew/Non-reactive"])}
                {renderRadioGroup("heart_rate", "Heart Rate", ["Normal", "Bradycardia", "Variable"])}
                {renderRadioGroup("respirations", "Respirations", ["Normal", "Periodic", "Apnea/Intubated"])}
                <button onClick={calculateScore}>Calculate Score</button>
                <h3>{result}</h3>
            </div>
        </div>
    );
}
