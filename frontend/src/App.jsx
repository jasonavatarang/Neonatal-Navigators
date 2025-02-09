import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import LeftBranch from "./pages/LeftBranch/LeftBranch";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />|
            <Route path="/leftbranch" element={<LeftBranch />} />
        </Routes>
    );
}
