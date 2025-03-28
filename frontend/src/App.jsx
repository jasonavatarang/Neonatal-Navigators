import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./assets/Header"; // Import the new Header component
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import LandingLeftBranch from "./pages/LandingLeftBranch/LandingLeftBranch";
import LandingRightBranch from "./pages/LandingRightBranch/LandingRightBranch";
import LeftBranch from "./pages/LeftBranch/LeftBranch";
import MidBranch from "./pages/MidBranch/MidBranch";
import RightBranch from "./pages/RightBranch/RightBranch";

export default function App() {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<LandingPage />} />
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

