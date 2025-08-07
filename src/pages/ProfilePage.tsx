import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    email: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const userData = localStorage.getItem("user");
        console.log(userData);
        if (userData) {
            try {
                const userObj = JSON.parse(userData);
                setUser({ name: userObj.name || "User", email: userObj.email || "Tidak tersedia" });
            } catch {
                setError("Gagal memuat data pengguna dari localStorage.");
                setUser(null);
            }
        } else {
            setError("Data pengguna tidak ditemukan di localStorage.");
            setUser(null);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center px-5 justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profil Pengguna</h2>
                {error && (
                    <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                {user ? (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full ring-4 ring-blue-500 overflow-hidden">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.name || "User"}&size=128&background=2563EB&color=fff`}
                                    alt="profil"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                            <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800">
                                {user.name || "Tidak tersedia"}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800">
                                {user.email || "Tidak tersedia"}
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                        >
                            Keluar
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Tidak ada data pengguna.</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Kembali ke Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;