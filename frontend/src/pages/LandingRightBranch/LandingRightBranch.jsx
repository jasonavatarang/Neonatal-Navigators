
import React from "react";  // Add this line
import "./LandingRightBranch.css";

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

export default function LandingRightBranch() {
    return (
        <div className="leftbranch-container">
            <div className="title">
                <h1>Information on HIE</h1>
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
        </div>
    );
}
