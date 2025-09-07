import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import Dock from "./components/Dock";
import Navbar from "./components/Navbar";
import ExplorePage from "./pages/ExplorePage";
import DetailPage from "./pages/DetailPage";
import MapsPage from "./pages/MapsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import InstallPromptPopup from "./components/InstallPromptPopup";
import SettingPage from "./pages/SettingPage";

function AppContent() {
    const location = useLocation();
    const hideNavAndDock =
        location.pathname === "/login" || location.pathname === "/register";

    return (
        <div className="min-h-screen max-w-xl bg-white mx-auto pb-16">
            {!hideNavAndDock && <Navbar />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/explore"
                    element={
                        <ProtectedRoute>
                            <ExplorePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/maps"
                    element={
                        <ProtectedRoute>
                            <MapsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/detail/:id"
                    element={
                        <ProtectedRoute>
                            <DetailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {!hideNavAndDock && <Dock />}
            {!hideNavAndDock && <InstallPromptPopup />}
        </div>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;