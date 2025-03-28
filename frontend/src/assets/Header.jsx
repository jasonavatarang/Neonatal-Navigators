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
                <div className="neocare-title">NeoCare</div>
                <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </div>
                {isMenuOpen && (
                    <nav className="dropdown-menu">
                        <Link to="/" onClick={toggleMenu}>Landing Page</Link>
                        <Link to="/home" onClick={toggleMenu}>Home</Link>
                        <Link to="/leftbranch" onClick={toggleMenu}>Left Branch</Link>
                        <Link to="/midbranch" onClick={toggleMenu}>Mid Branch</Link>
                        <Link to="/rightbranch" onClick={toggleMenu}>Right Branch</Link>
                    </nav>
                )}
            </div>
        </header>
    );
}