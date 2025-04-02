import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; 

export default function WordPressLandingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    // Point to your new WordPress page with the buttons
    const wordpressUrl = "https://ufneocare.wordpress.com/?preview=true&cb=" + Date.now();
    
    useEffect(() => {
        // Force document body to be 100% width
        document.body.style.width = '100%';
        document.documentElement.style.width = '100%';
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        // Listen for navigation messages from WordPress iframe
        const handleMessage = (event) => {
            if (event.data.startsWith('navigate:')) {
                const path = event.data.split('navigate:')[1];
                navigate(path);
            }
        };
        window.addEventListener('message', handleMessage);
        
        return () => {
            clearTimeout(timer);
            document.body.style.width = '';
            document.documentElement.style.width = '';
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);

    const iframeStyle = {
        width: '100vw',
        minHeight: '100vh',
        border: 'none',
        display: 'block'
    };


    return (
        <div style={{ width: '100%', height: '100vh'}}>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Loading NeoCare content...</p>
                </div>
            )}
            
            <iframe 
                src={wordpressUrl}
                title="NeoCare WordPress Site"
                style={iframeStyle}
                onLoad={() => setLoading(false)}
                allow="fullscreen"

            />
        </div>
    );
}