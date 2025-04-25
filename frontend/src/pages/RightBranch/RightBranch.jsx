import React, { useState, useEffect } from "react"; // Add useEffect to imports
import "./RightBranch.css";
import { useNavigate } from "react-router-dom";

export default function RightBranch() {
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
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 900);
        };
        
        window.addEventListener("resize", handleResize);

        if (summary) {
            window.scrollTo(0, document.body.scrollHeight);
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [summary]); // Runs whenever summary changes

    const calculateSummary = () => {
        const predictorA = parseFloat(Ph) <= 7.0 && parseFloat(BaseDeficit) >= 16;
        const predictorB = parseFloat(Ph) >= 7.01 && parseFloat(Ph) <= 7.15 && parseFloat(BaseDeficit) >= 10 && parseFloat(BaseDeficit) <= 15.9;
        const predictorC = criteria.acute_perinatal_event === "0" && criteria.apgar_assisted_ventilation === "0";
        const predictorMet = predictorA || predictorB || predictorC;
    
        const groups = {
            primitive_reflexes: ["suck", "moro"],
            autonomic_system: ["pupils", "heart_rate", "respirations"]
        };
    
        let maxPrimitive = "Normal";
        let maxAutonomic = "Normal";
        let otherSigns = [];
    
        for (const [key, value] of Object.entries(criteria.encephalopathy_details)) {
            if (groups.primitive_reflexes.includes(key)) {
                if (["Moderate", "Severe"].indexOf(value) > ["Moderate", "Severe"].indexOf(maxPrimitive)) {
                    maxPrimitive = value;
                }
            } else if (groups.autonomic_system.includes(key)) {
                if (["Moderate", "Severe"].indexOf(value) > ["Moderate", "Severe"].indexOf(maxAutonomic)) {
                    maxAutonomic = value;
                }
            } else {
                otherSigns.push(value);
            }
        }
    
        // Now count moderate/severe signs
        const countModerateSevere = (val) => val === "Moderate" || val === "Severe";
        let modSevCount = 0;
        if (countModerateSevere(maxPrimitive)) modSevCount++;
        if (countModerateSevere(maxAutonomic)) modSevCount++;
        modSevCount += otherSigns.filter(countModerateSevere).length;
    
        const hasSeizuresOrThreeSigns = criteria.has_seizures === "0" || modSevCount >= 3;
    
        const qualifies =
            criteria.gestational_age === "0" &&
            criteria.birth_weight === "0" &&
            criteria.neonate_age === "0" &&
            predictorMet &&
            hasSeizuresOrThreeSigns;
    
        let summaryText = `The Sarnat exam results indicate that the neonate <b>${qualifies ? "qualifies" : "does not qualify"}</b> for Systemic Hypothermia.<br /><br />`;
    
        if (predictorMet && qualifies) {
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
    
            summaryText += `${criteria.has_seizures === "0" ? "• The neonate has seizures<br />" : ""}`;
        }
    
        summaryText += `${criteria.signs_of_encephalopathy > 0 ? '<h4>Signs of Encephalopathy:</h4>' : ""}`;
        summaryText += `${criteria.has_seizures === "0" ? "The neonate has seizures<br />" : ""}`;
    
        const encephalopathySigns = Object.entries(criteria.encephalopathy_details)
            .filter(([_, value]) => value === "Mild" || value === "Moderate" || value === "Severe")
            .map(([key, value]) => {
                const signName = key.replace(/_/g, " ");
                const severityIndex = ["Normal", "Mild", "Moderate", "Severe"].indexOf(value);
                const signValue = optionsMap[key]?.[severityIndex] || value;
                return `Neonate's ${signName} - ${signValue} (${value} sign of encephalopathy)`;
            });
    
        if (encephalopathySigns.length > 0) {
            summaryText += encephalopathySigns.join("<br />") + "<br />";
        }
    
        // HIE Interpretation logic
        if (modSevCount >= 3) {
            let moderateCount = 0;
            let severeCount = 0;
            let loc = ""; // level of consciousness
    
            const countSeverity = (val) => {
                if (val === "Severe") severeCount++;
                else if (val === "Moderate") moderateCount++;
            };
    
            countSeverity(maxPrimitive);
            countSeverity(maxAutonomic);
    
            for (const [key, value] of Object.entries(criteria.encephalopathy_details)) {
                if (!groups.primitive_reflexes.includes(key) && !groups.autonomic_system.includes(key)) {
                    if (key === "level_of_consciousness") loc = value;
                    countSeverity(value);
                }
            }
    
            if (severeCount > moderateCount) {
                summaryText += `<br /><b>Interpretation:</b> The neonate shows signs of <b>Severe</b> encephalopathy.`;
            } else if (moderateCount > severeCount) {
                summaryText += `<br /><b>Interpretation:</b> The neonate shows signs of <b>Moderate</b> encephalopathy.`;
            } else {
                if (loc === "Severe") {
                    summaryText += `<br /><b>Interpretation:</b> The neonate shows signs of <b>Severe</b> encephalopathy.`;
                } else {
                    summaryText += `<br /><b>Interpretation:</b> The neonate shows signs of <b>Moderate</b> encephalopathy.`;
                }
            }
        } else {
            const allMildOrNormal = Object.values(criteria.encephalopathy_details).every(
                value => value === "Mild" || value === "Normal"
            );
    
            if (criteria.has_seizures === "0") {
                if (allMildOrNormal) {
                    summaryText += `<br /><b>Interpretation:</b> The neonate shows signs of <b>Moderate</b> encephalopathy.`;
                }
            } else if (criteria.signs_of_encephalopathy > 0) {
                summaryText += `<br /><b>Interpretation:</b> The neonate shows signs of <b>Mild</b> encephalopathy.`;
            } else {
                summaryText += `<br /><b>Interpretation:</b> The neonate shows <b>no signs of</b> encephalopathy.`;
            }
        }
    
        setSummary(summaryText);
    };
    
    
    
    
    // Add optionsMap
    const optionsMap = {
        level_of_consciousness: ["Normal", "Hyper-alert, jitteriness, high-pitched cry, inconsolable", "Lethargic", "Stupor / Coma"],
        spontaneous_activity: ["Normal", "Mildly Decreased", "Decreased Activity", "No Activity"],
        posture: ["Normal", "Mild flexion of distal joints", "Distal flexion, complete extension, frog leg posture", "Decerebrate"],
        tone: ["Normal", "Normal or slightly increased peripheral tone", "Hypotonia (focal/general), hypertonia (focal/truncal)", "Flaccid"],
        suck: ["Normal", "Poor/Decreased", "Weak/Bite", "Absent"],
        moro: ["Normal", "Partial response, low threshold to elicit", "Incomplete", "Absent"],
        pupils: ["Normal", "Mydriasis", "Constricted", "Skew deviation / dilated / non-reactive"],
        heart_rate: ["Normal", "Tachycardia (>160)", "Bradycardia", "Variable"],
        respirations: ["Normal", "Hyperventilation (RR > 60)", "Periodic or CPAP", "Apnea/Intubated"]
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
                    delete newCriteria.encephalopathy_details[name];
                } else if (value === "1") {
                    newCriteria.encephalopathy_details[name] = "Mild";
                } else if (value === "2") {
                    newCriteria.encephalopathy_details[name] = "Moderate";
                } else if (value === "3") {
                    newCriteria.encephalopathy_details[name] = "Severe";
                }
                
                
               // Group logic for Primitive Reflexes and Autonomic System
const groups = {
    primitive_reflexes: ["suck", "moro"],
    autonomic_system: ["pupils", "heart_rate", "respirations"]
};

const groupFlags = {
    primitive_reflexes: false,
    autonomic_system: false
};

const individualSigns = [];

for (const [key, value] of Object.entries(newCriteria.encephalopathy_details)) {
    if (groups.primitive_reflexes.includes(key)) {
        groupFlags.primitive_reflexes = true;
    } else if (groups.autonomic_system.includes(key)) {
        groupFlags.autonomic_system = true;
    } else {
        individualSigns.push(key);
    }
}

let numSigns = individualSigns.length;
if (groupFlags.primitive_reflexes) numSigns += 1;
if (groupFlags.autonomic_system) numSigns += 1;

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
                            checked={criteria[name] === String(index)} 
                            onChange={() => handleRadioChange(name, String(index))} 
                        />
                        <span className="radio-label-text">{option}</span>
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
             <div className="right-branch-images">
                <div className="image-header">
                    <h1>Before starting the Sarnat exam, please ensure that the neonate does not meet any of the exclusion criteria.</h1>
                </div>
                <img className="exclusion-criteria" src="/Exclusion Criteria.png" alt="HIE Hypothermia Exclusion Criteria" />
            </div>
            <div className="right-branch-sarnat-exam">
                <div className="sarnat-exam-header">
                    <h1> To qualify for Systemic Hypothermia, a neonate must meet all 5 criteria of the Sarnat exam.</h1>
                </div>
                <br></br>
                <h2>1. Gestational Age</h2>
                {renderRadioGroup("gestational_age", "Is the gestational age of the neonate ≥ 35 weeks?", ["Yes", "No"])}
                
                <h2>2. Birth Weight</h2>
                {renderRadioGroup("birth_weight", "Is the birth weight ≥ 1.8 kg?", ["Yes", "No"])}
                
                <h2>3. Time Since Insult</h2>
                {renderRadioGroup("time_since_insult", "Has it been ≤ 6 hours since the last insult occurred?", ["Yes", "No"])}
                
                <h2>4. ONE OR MORE Predictors of Severe HIE (Enter pH and base deficit)</h2>
                <div className="input-group">
                    <label className="phLabel"><strong>pH:</strong></label>
                    <input
                        className="phInput"
                        type="number"
                        value={Ph}
                        onChange={(e) => setPh(e.target.value)}
                        placeholder="pH (e.g. 7.2)"
                        step="0.01"
                    />
                </div>
                <div className="input-group">
                    <label className="baseDeficitLabel"><strong>Base Deficit:</strong></label>
                    <p className="minusSign"> - </p>
                    <input
                        type="number"
                        value={BaseDeficit}
                        onChange={(e) => setBaseDeficit(e.target.value)}
                        placeholder="Base Deficit (e.g. 15.2)"
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

                <h2>5. Has seizures or 3 of 6 of the following signs of encephalopathy are moderate or severe:</h2>

                {renderRadioGroup("has_seizures", "Does the neonate have seizures?", ["Yes", "No"])}

                <div className="part-5-container">
                    <div className="part-5-description-container">
                        <p>Clinical Criteria</p>
                    </div>
                    <h3>General</h3>
                    {renderRadioGroup("level_of_consciousness", "Level of Consciousness", [
                        "Normal - Alert, responsive to external stimuli", 
                        "Mild - Hyper-alert, jitteriness, high-pitched cry, inconsolable", 
                        "Moderate - Lethargic", 
                        "Severe - Stupor/Coma"
                    ])}

                    {renderRadioGroup("spontaneous_activity", "Spontaneous Activity", [
                        "Normal - Changes position when awake", 
                        "Mild - Normal", 
                        "Moderate - Decreased activity", 
                        "Severe - No activity"
                    ])}

                    {renderRadioGroup("posture", "Posture", [
                        "Normal - Predominantly flexed when quiet", 
                        "Mild - Mild flexion of distal joints", 
                        "Moderate - Distal flexion, complete extension, frog leg posture", 
                        "Severe - Decerebrate"
                    ])}

                    {renderRadioGroup("tone", "Tone", [
                        "Normal - Strong flexor tone in all extremities + hips", 
                        "Mild - Normal or slightly increased peripheral tone", 
                        "Moderate - Hypotonia (focal/general), hypertonia (focal/truncal)", 
                        "Severe - Flaccid"
                    ])}

                    <h3>Primitive Reflexes (Only uses most severe criteria)</h3>
                    {renderRadioGroup("suck", "Suck", [
                        "Normal - Strong, easily elicited", 
                        "Mild - Decreased", 
                        "Moderate - Weak or bite", 
                        "Severe - Absent"
                    ])}

                    {renderRadioGroup("moro", "Moro", [
                        "Normal - Complete", 
                        "Mild - Partial response, low threshold to elicit", 
                        "Moderate - Incomplete", 
                        "Severe - Absent"
                    ])}

                    <h3>Autonomic System (Only uses most severe criteria)</h3>
                    {renderRadioGroup("pupils", "Pupils", [
                        "Normal", 
                        "Mild - Mydriasis", 
                        "Moderate - Constricted", 
                        "Severe - Skew deviation / dilated / non-reactive"
                    ])}

                    {renderRadioGroup("heart_rate", "Heart Rate", [
                        "Normal - 100–160 bpm", 
                        "Mild - Tachycardia (>160)", 
                        "Moderate - Bradycardia", 
                        "Severe - Variable"
                    ])}

                    {renderRadioGroup("respirations", "Respirations", [
                        "Normal - Regular respirations", 
                        "Mild - Hyperventilation (RR > 60)", 
                        "Moderate - Periodic or CPAP", 
                        "Severe - Apnea/Intubated"
                    ])}

                </div>
                <button className='summary-button' onClick={calculateSummary}>Summarize Results</button>
                {summary && (
                    <div className="summary-section">
                        <h1>Summary</h1>
                        <p dangerouslySetInnerHTML={{ __html: summary }} />
                    </div>
                )}
                {summary && (
                <div className="referral-center-container">
                        <h1><strong>Call referral center for further guidence</strong></h1>
                </div>
            )}
            </div>
            <div className="button-group">
                <button 
                    onClick={() => window.location.href = "https://ufneocare.wordpress.com/"}
                >
                    Back to the site
                </button>
            </div>

            </div>
    );
}
