
import React from "react";
import "./RightBranch.css";

export default function RightBranch() {
    return (
        <div className="right-branch-container">
            <div className="title">
                <h1>≥ 36 Weeks Procedure</h1>
            </div>
            <div className="right-branch-top-container">
                <p>Since the neonate is ≥ 36 weeks, it is now nessecary to perform the sarnat exam. </p>
            </div>
            <img className="protocol-image"
                src="/HIE Hypothermia Protocol.png" 
                alt="HIE Hypothermia Protocol"
            />
            <img className="exclusion-criteria"
                src="/Exclusion Criteria.png" 
                alt="HIE Hypothermia Exclusion Criteria"
            />
        </div>
    );
}
