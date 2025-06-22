import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import Dock from "./components/Dock";
import Navbar from "./components/Navbar";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // Splash selama 2 detik
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <Router>
            <div className="min-h-screen pb-16">
                {" "}
                {/* padding bottom untuk Dock */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Dock />
            </div>
        </Router>
    );
}

export default App;
