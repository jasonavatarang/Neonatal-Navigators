
import React from "react";  // Add this line
import "./LeftBranch.css";
import { useNavigate } from "react-router-dom";

import { useEffect, useRef } from 'react';

function PdfViewerComponent(props) {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		let PSPDFKit, instance;

		(async function () {
			PSPDFKit = await import('pspdfkit');

			PSPDFKit.unload(container);

			instance = await PSPDFKit.load({
				container,
				document: props.document,
				baseUrl: `${window.location.protocol}//${
					window.location.host
				}/${import.meta.env.BASE_URL}`,
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, [props.document]);

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100vh' }}
		/>
	);
}

export default function LeftBranch() {
    const navigate = useNavigate();
    return (
        <div className="leftbranch-container">
            <div className="title">
                <h1>GMH-IVH Bundle Guide (≤ 33 weeks)</h1>
            </div>
{/* {            <div className="info-box">
                <h1>Pathophysioasdsdlogy of GMH-IVH:</h1>
                <div className="PDF-viewer">
                    <PdfViewerComponent document={`${window.location.origin}/c.pdf`} />
                </div>
            </div>} */}
            <div className="info-box">
                <h1>Delay Cord Clamp (DCC)</h1>
                {/* <p style="text-align: left;"> */}
                <div> {/*Trying to make p-element align left, will fix later*/}
                    <p>
                    This is some important information about the Delay Cord Clamp:
                    </p>
                </div>
                <ul>
                    <li>Delay clamping the umbilical cord for at least 30-60 seconds is a common practice
                        in preterm infants who are not depressed at birth and don't require resuscitation.
                        
                    </li>
                    <li>
                        Can be safely implemented in singleton and monochorionic, dichorionic, 
                        and trichorionic multiple preterm gestations
                    </li>
                    <li>
                        Results in: 
                        <ul>
                            <li>
                                higher hematocrit, superior vena cava blood flow, 
                                right ventricle output, and right ventricular stroke volume, 
                                higher blood pressure and admission temperature, 
                                less delivery room resuscitation, and reduced early red 
                                blood cell transfusion
                            </li>
                            <li>reduced risk of PIVH compared to immediate clamping group</li>
                            <li>Perinatal factors such as hypoxic-ischemic encephalopathy</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="info-box">
                <h1>Minimize Stimulation</h1>
                <div> {/*Trying to make p-element align left, will fix later*/}
                    <p>
                    This is some important information about minimizing stiumlation:
                    </p>
                </div>
                <ul>
                    <li>
                        Minimizing stimulation means reducing sensory and physical stressors such as:
                        <ul>
                            <li>noise</li>
                            <li>light</li>
                            <li>touch</li>
                            <li>movement</li>
                        </ul>
                        
                    </li>
                    <li>
                        Vital intervention as immature neurological systems are highly susceptible to 
                        stress-induced fluctuations in cerebral blood flow (a primary trigger for GMH-IVH)
                    </li>
                    <li>
                        Shown to be essential to lowering IVH incidence in the first 72 hours and reduce
                        GMH-IVH rates in tertiary care settings
                    </li>
                    <li>
                        <u>Steps:</u>
                        <ol>
                            <li>Begin immediately after birth, during stabilization in the first hour of life
                                 </li>
                            <li>Continue through transport and the first 72 hours postnatally
                                (peak risk period for GMH-IVH)
                            </li>
                            <li>Keep ambient noise below 45 decibels (dB), as recommended by the AAP. 
                                <ol type='a'>
                                    <li> Use sound-absorbing materials (e.g., blankets around the incubator)</li>
                                    <li> mute alarms when safe</li>
                                    <li> avoid loud conversations near the neonate</li>
                                </ol>
                            </li>
                            <li>Dim lights or use incubator covers to reduce exposure to bright light. 
                                Avoid sudden light changes (e.g., turning on overhead lights abruptly) 
                            </li>
                            <li>Cluster care activities (e.g., vital sign checks, diaper changes, feeding) into brief,
                                 scheduled periods rather than frequent disruptions. 
                                 Avoid unnecessary procedures like routine suctioning unless clinically indicated 
                                 (e.g., airway obstruction)
                            </li>
                            <li>
                            Use slow, deliberate movements when touching the neonate. 
                            Support limbs during repositioning to prevent sudden jerks.
                            </li>
                        </ol>
                    </li>
                    
                </ul>
            </div>
            <div className="info-box">
                <h1>Avoid Fluid Bolus</h1>
                <div> {/*Trying to make p-element align left, will fix later*/}
                    <p>
                    This is some important information about avoiding fluid bolus:
                    </p>
                </div>
                <ul>
                    <li>
                    Avoid administering rapid fluid boluses unless absolutely necessary 
                    (e.g., severe hypotension unresponsive to other measures). 
                    Use cautious fluid management per clinical guidelines.
                        <ul>
                            <li>
                                Rapid volume shifts can disrupt cerebral blood flow (a risk factor for GMH-IVH)
                            </li>
                        </ul>
                        
                    </li>
                    <li>
                        <u>Steps:</u>
                        <ol>
                            <li>
                            Evaluate the neonate’s clinical status using vital signs (blood pressure, heart rate, 
                            oxygen saturation), perfusion indicators (capillary refill, urine output), and acid-base 
                            balance (e.g., arterial blood gas if available) before considering fluids.
                            </li>
                            <li>
                            Apply this restriction from birth through stabilization (first hour of life) and 
                            during transport to a tertiary facility, extending into the first 72 hours—the peak 
                            GMH-IVH risk period
                            </li>
                        </ol>
                    </li>
                    
                </ul>
            </div>
            
            <div className="info-box">
                {/* Youtube Video */}
                <div className="video-container">
                    <div className="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/bztzID_JxGY?si=fIJ44fAXbMDQl1o1"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="info-box">
                <h1>Summary of the implementation of the bundle</h1>
            </div>
            <div className="button-group">
                <button onClick={() => navigate("/")}>
                    Return to Landing Page
                </button>
            </div>
        </div>
    );
}