import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./assets/Header";
import Home from "./pages/Home/Home";
import WordPressLandingPage from "./pages/LandingPage/LandingPage";
import LandingLeftBranch from "./pages/LandingLeftBranch/LandingLeftBranch";
import LandingRightBranch from "./pages/LandingRightBranch/LandingRightBranch";
import LeftBranch from "./pages/LeftBranch/LeftBranch";
import MidBranch from "./pages/MidBranch/MidBranch";
import RightBranch from "./pages/RightBranch/RightBranch";

export default function App() {
    const location = useLocation(); // Get the current route

    return (
        <>
            {/* Show Header only if not on WordPressLandingPage */}
            {location.pathname !== "/" && <Header />}

            <Routes>
                <Route path="/" element={<WordPressLandingPage />} />
                <Route path="/landingleftbranch" element={<LandingLeftBranch />} />
                <Route path="/landingrightbranch" element={<LandingRightBranch />} />
                <Route path="/home" element={<Home />} />
                <Route path="/leftbranch" element={<LeftBranch />} />
                <Route path="/midbranch" element={<MidBranch />} />
                <Route path="/rightbranch" element={<RightBranch />} />
            </Routes>
        </>
    );
}
