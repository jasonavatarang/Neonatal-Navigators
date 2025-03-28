
import React from "react";  // Add this line
import "./LandingLeftBranch.css";

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

export default function LandingLeftBranch() {
    return (
        <div className="leftbranch-container">
            <div className="title">
                <h1>Basic Information on GMH-IVH Bundle</h1>
            </div>
            <div className="info-box">
                <h1>Pathophysiology of GMH-IVH:</h1>
            
                {/* Google Docs Viewer (Alternative: Use Microsoft Office) */}
                {/* <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${window.location.origin}/HIE pathophysiology microlecture.pptx`}
                    width="80%" 
                    height="600px"
                    frameBorder="0"
                    title="PowerPoint Slides"
                ></iframe> */}
                {/* Replace iframe with PdfViewerComponent */}
                <div className="PDF-viewer">
				    <PdfViewerComponent document={`${window.location.origin}/c.pdf`} />
			    </div>
                {/* <PdfViewerComponent document={`c.pptx`} /> */}
                
                
            </div>
            <div className="info-box">
                <h1>Which neonates require a GMH-IVH bundle?</h1>
                <ul>
                    <li>Neonates with the following conditions:
                        <ul>
                            <li>Gestational age ≤ 32 weeks</li>
                            <li>Intraventricular hemorrhage (IVH)</li>
                            <li>Perinatal factors such as hypoxic-ischemic encephalopathy</li>
                        </ul>
                    </li>
                    <li>Indicators for treatment:
                        <ul>
                            <li>Risk of brain injury due to GMH-IVH</li>
                            <li>Signs of neurological impairment</li>
                        </ul>
                    </li>
                    <li>Management strategies:
                        <ul>
                            <li>Use of cranial ultrasound for early diagnosis</li>
                            <li>Close monitoring of vital signs</li>
                            <li>Consideration of surgical intervention in severe cases</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="info-box">
                <h1>Why the GMH-IVH Bundle?</h1>
                <ul>
                    <li>
                        GMH-IVH is associated with long-term morbidity in preterm neonates.
                    </li>
                    <li>
                        Outborn premature neonates have a higher risk of GMH-IVH compared to inborns at tertiary referral centers.
                    </li>
                    <li>
                        The implementation of simple and low-cost neuroprotection bundles at smaller Level
                         1 and 2 NICUs may reduce the rates of GMH-IVH in outborn premature neonates.
                    </li>
                    <li>
                        The use of the bundles in the smaller facilities in rural and underserved referral areas
                        may reduce health disparities.
                    </li>
                </ul>
            </div>
            <div className="info-box">
                <h1>Components of the GMH-IVH bundle:</h1>
                <ol>
                    <li>
                        Delayed cord clamping
                    </li>
                    <li>
                        Placement of the neonates in the Transportle head positioner
                    </li>
                    <li>
                        Head in a midline position
                    </li>
                    <li>
                        Minimal stimulation
                    </li>
                    <li>
                        Avoidance of fluid boluses
                    </li>
                </ol>
            </div>
            <div className="info-box">
                <h1>NeoCare Guide (Info Unavailable currently)</h1>
                
            </div>

        </div>
    );
}
