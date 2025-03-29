import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div>
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} NeoCare. All rights reserved.</p>
                <div className="footer-links">
                    <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a href="https://example.com/contact" target="_blank" rel="noopener noreferrer">Contact</a>
                </div>
            </div>
        </footer>
        </div>
    );
}
