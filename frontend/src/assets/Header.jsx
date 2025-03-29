import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsMenuOpen(false); // auto close on resize
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="neocare-header">
            <div className="header-content">
                <div className="neocare-title">
                    <Link to="/" onClick={closeMenu}>NeoCare</Link>
                </div>

                <nav className={`nav-links ${isMobile ? 'mobile' : 'desktop'} ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={closeMenu}>Landing Page</Link>
                    <Link to="/home" onClick={closeMenu}>Home</Link>
                    <Link to="/leftbranch" onClick={closeMenu}>≤ 33 Weeks</Link>
                    <Link to="/midbranch" onClick={closeMenu}>34–35 Weeks</Link>
                    <Link to="/rightbranch" onClick={closeMenu}>≥ 35 Weeks</Link>
                </nav>

                {isMobile && (
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                    </div>
                )}
            </div>
        </header>
    );
}
