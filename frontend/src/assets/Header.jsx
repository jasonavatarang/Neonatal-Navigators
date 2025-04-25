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
                <div className="neocare-title">Interactive Sarnat Exam</div>
                <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </div>
                
                
                {isMenuOpen && (
                    <nav className="dropdown-menu">
                        <a 
                            href="https://ufneocare.wordpress.com/" 
                            target="_self" 
                            rel="noopener noreferrer" 
                            onClick={toggleMenu}
                        >
                            Back to site
                        </a>
                        {/*<a href="https://ufneocare.wordpress.com/evaluation" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>Restart Evaluation</a>*/}
                        {/*<Link to="/" onClick={toggleMenu}>Restart Evaluation</Link>*/}
                        {/*<Link to="/leftbranch" onClick={toggleMenu}>Bundle Guide</Link>*/}
                        {/*<Link to="/" onClick={toggleMenu}>Sarnat Exam</Link>*/}
                    </nav>
                )}

            </div>
        </header>
    );
}
