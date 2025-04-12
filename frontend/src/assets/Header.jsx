import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="neocare-header">
            <div className="header-content">
                <div className="neocare-title">Neuroprotective Intervention Evaluation</div>
                <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </div>
                {isMenuOpen && (
                    <nav className="dropdown-menu">
                        <a href="https://ufneocare.wordpress.com/" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>Home</a>
                        <Link to="/" onClick={toggleMenu}>Begin Evaluation</Link>
                        <Link to="/leftbranch" onClick={toggleMenu}>Bundle Guide</Link>
                        <Link to="/rightbranch" onClick={toggleMenu}>Sarnat Exam</Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
