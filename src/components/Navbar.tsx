import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
        // Ambil nama user dari localStorage jika ada
        const user = localStorage.getItem("user");
        if (user) {
            try {
                const userObj = JSON.parse(user);
                setUserName(userObj.name || "User");
            } catch {
                setUserName("User");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="navbar bg-primary-600 shadow-sm flex justify-between">
            <a className="btn btn-ghost text-white text-xl">Lampung Go!</a>
            {isLoggedIn ? (
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={`https://img.daisyui.com/images/profile/demo/yellingcat@192.webp`} alt="profile" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-5 z-[1] p-4 shadow menu menu-sm dropdown-content bg-blue-200 rounded-box w-56">
                        <li className="mb-2 flex flex-col items-center">
                            <span className="font-semibold text-blue-900 text-base">{userName}</span>
                            <span className="text-base text-blue-900">Profil Pengguna</span>
                        </li>
                        <div className="divider my-0" />
                        <li>
                            <Link to="/profile" className="flex items-center gap-2">
                                <span className="material-icons text-base text-blue-900">Profil</span>
                                
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="btn bg-red-700 btn-sm w-full mt-2"
                            >
                                <span className="material-icons text-white mr-1">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <Link to="/login" className="btn btn-sm">
                    Login
                </Link>
            )}
        </div>
    );
};

export default Navbar;
