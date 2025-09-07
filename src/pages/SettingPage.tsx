import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Uncomment if using React Router
import { User, Lock, ArrowLeft, Save } from "lucide-react";
import { fetchUser, updateProfile } from "../utils/apiClient"; // Adjust path as needed
import Swal from "sweetalert2"; // Make sure to install: npm install sweetalert2

// Type definitions
interface UserProfile {
    name: string;
    email: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

interface UpdateProfilePayload {
    name?: string;
    email?: string;
    password?: string;
    new_password?: string;
    new_password_confirmation?: string;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
            errors?: Record<string, string[]>;
        };
    };
    message?: string;
}

const SettingPage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({ name: "", email: "" });
    const [originalProfile, setOriginalProfile] = useState<UserProfile>({ name: "", email: "" });
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    // const navigate = useNavigate(); // Uncomment if using React Router

    // Fetch user data on component mount
    useEffect(() => {
        const loadUserData = async (): Promise<void> => {
            try {
                setIsLoadingUser(true);
                const userData: User = await fetchUser();
                const userProfile: UserProfile = {
                    name: userData.name || "",
                    email: userData.email || ""
                };
                setProfile(userProfile);
                setOriginalProfile(userProfile);
            } catch (error) {
                console.log("err :" + error)
                const apiError = error as ApiError;
                await Swal.fire({
                    title: "Gagal memuat data",
                    text: apiError.response?.data?.message || "Terjadi kesalahan saat memuat data profil.",
                    icon: "error"
                });
            } finally {
                setIsLoadingUser(false);
            }
        };

        loadUserData();
    }, []);

    const handleUpdateProfile = async (): Promise<void> => {
        const hasChanges = profile.name !== originalProfile.name || profile.email !== originalProfile.email;

        if (!hasChanges) {
            await Swal.fire({
                title: "Tidak ada perubahan",
                text: "Tidak ada perubahan yang perlu disimpan.",
                icon: "info"
            });
            return;
        }

        if (!profile.name.trim() || !profile.email.trim()) {
            await Swal.fire({
                title: "Data tidak lengkap",
                text: "Nama dan email tidak boleh kosong.",
                icon: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            const payload: UpdateProfilePayload = {};

            if (profile.name.trim() !== originalProfile.name) {
                payload.name = profile.name.trim();
            }
            if (profile.email.trim() !== originalProfile.email) {
                payload.email = profile.email.trim();
            }

            await updateProfile(payload);

            // Update original profile after successful update
            setOriginalProfile({ ...profile });

            await Swal.fire({
                title: "Berhasil!",
                text: "Profil berhasil diperbarui.",
                icon: "success"
            });
        } catch (error) {
            const apiError = error as ApiError;
            await Swal.fire({
                title: "Gagal memperbarui profil",
                text: apiError.response?.data?.message || "Terjadi kesalahan saat memperbarui profil.",
                icon: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async (): Promise<void> => {
        if (!currentPassword.trim()) {
            await Swal.fire({
                title: "Kata sandi saat ini diperlukan",
                text: "Silakan masukkan kata sandi saat ini.",
                icon: "error"
            });
            return;
        }

        if (!newPassword.trim()) {
            await Swal.fire({
                title: "Kata sandi baru diperlukan",
                text: "Silakan masukkan kata sandi baru.",
                icon: "error"
            });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            await Swal.fire({
                title: "Kata sandi tidak cocok",
                text: "Kata sandi baru dan konfirmasi kata sandi tidak cocok.",
                icon: "error"
            });
            return;
        }

        if (newPassword.length < 6) {
            await Swal.fire({
                title: "Kata sandi terlalu pendek",
                text: "Kata sandi baru minimal 6 karakter.",
                icon: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            const payload: UpdateProfilePayload = {
                password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmNewPassword
            };

            await updateProfile(payload);

            await Swal.fire({
                title: "Berhasil!",
                text: "Kata sandi berhasil diperbarui.",
                icon: "success"
            });

            // Reset password fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (error) {
            const apiError = error as ApiError;
            await Swal.fire({
                title: "Gagal memperbarui kata sandi",
                text: apiError.response?.data?.message || "Terjadi kesalahan saat memperbarui kata sandi.",
                icon: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAll = async (): Promise<void> => {
        const hasProfileChanges = profile.name !== originalProfile.name || profile.email !== originalProfile.email;
        const hasPasswordChanges = currentPassword.trim() && newPassword.trim();

        if (!hasProfileChanges && !hasPasswordChanges) {
            await Swal.fire({
                title: "Tidak ada perubahan",
                text: "Tidak ada perubahan yang perlu disimpan.",
                icon: "info"
            });
            return;
        }

        setIsLoading(true);
        try {
            const payload: UpdateProfilePayload = {};

            // Add profile data if changed
            if (hasProfileChanges) {
                if (!profile.name.trim() || !profile.email.trim()) {
                    await Swal.fire({
                        title: "Data tidak lengkap",
                        text: "Nama dan email tidak boleh kosong.",
                        icon: "error"
                    });
                    setIsLoading(false);
                    return;
                }

                if (profile.name.trim() !== originalProfile.name) {
                    payload.name = profile.name.trim();
                }
                if (profile.email.trim() !== originalProfile.email) {
                    payload.email = profile.email.trim();
                }
            }

            // Add password data if exists
            if (hasPasswordChanges) {
                if (newPassword !== confirmNewPassword) {
                    await Swal.fire({
                        title: "Kata sandi tidak cocok",
                        text: "Kata sandi baru dan konfirmasi kata sandi tidak cocok.",
                        icon: "error"
                    });
                    setIsLoading(false);
                    return;
                }

                if (newPassword.length < 6) {
                    await Swal.fire({
                        title: "Kata sandi terlalu pendek",
                        text: "Kata sandi baru minimal 6 karakter.",
                        icon: "error"
                    });
                    setIsLoading(false);
                    return;
                }

                payload.password = currentPassword;
                payload.new_password = newPassword;
                payload.new_password_confirmation = confirmNewPassword;
            }

            await updateProfile(payload);

            // Update original profile after successful update
            if (hasProfileChanges) {
                setOriginalProfile({ ...profile });
            }

            await Swal.fire({
                title: "Berhasil!",
                text: "Semua perubahan berhasil disimpan.",
                icon: "success"
            });

            // Reset password fields only
            if (hasPasswordChanges) {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            }
        } catch (error) {
            const apiError = error as ApiError;
            await Swal.fire({
                title: "Gagal menyimpan perubahan",
                text: apiError.response?.data?.message || "Terjadi kesalahan saat menyimpan perubahan.",
                icon: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Loading Overlay */}
            {isLoadingUser && (
                <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Memuat data profil...</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b border-gray-200">{/* ... rest of header content ... */}
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => console.log("Navigate back")} // Replace with navigate(-1) if using React Router
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Pengaturan</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola profil dan kata sandi akun Anda</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    {/* Profile Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Informasi Profil</h2>
                                <p className="text-sm text-gray-500">Perbarui informasi profil Anda</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    placeholder="Masukkan nama lengkap"
                                    disabled={isLoadingUser}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                    placeholder="Masukkan alamat email"
                                    disabled={isLoadingUser}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleUpdateProfile}
                            disabled={isLoading || isLoadingUser}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? "Memperbarui..." : "Perbarui Profil"}
                        </button>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Password Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Lock className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Ubah Kata Sandi</h2>
                                <p className="text-sm text-gray-500">Pastikan akun Anda tetap aman dengan kata sandi yang kuat</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-1 max-w-md">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Kata Sandi Saat Ini
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan kata sandi saat ini"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Kata Sandi Baru
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan kata sandi baru"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Konfirmasi Kata Sandi Baru
                                </label>
                                <input
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Konfirmasi kata sandi baru"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleUpdatePassword}
                            disabled={isLoading || isLoadingUser}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? "Memperbarui..." : "Ubah Kata Sandi"}
                        </button>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleSaveAll}
                            disabled={isLoading || isLoadingUser}
                            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            {isLoading ? "Menyimpan..." : "Simpan Semua Perubahan"}
                        </button>

                        <button
                            onClick={() => console.log("Navigate to profile")} // Replace with navigate("/profile") if using React Router
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                            Kembali ke Profil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;