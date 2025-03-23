import React, { useState } from "react";
import "./RightBranch.css";

export default function RightBranch() {
    const [result, setResult] = useState("");
    const [Ph, setPh] = useState("");
    const [BaseDeficit, setBaseDeficit] = useState("");

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
            <button onClick={calculateScore}>Calculate Score</button>
            <h3>{result}</h3>
            </div>
        </div>
    );
}
