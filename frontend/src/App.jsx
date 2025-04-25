import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./assets/Header";
import RightBranch from "./pages/RightBranch/RightBranch";

export default function App() {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<RightBranch />} />
        </Routes>
        </>
    );
}

