// src/utils/apiClient.ts
import axios from "axios";

// Ambil base URL dari environment variable dengan fallback
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "https://admin.lampunggo.my.id";

// Inisialisasi instance axios
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptor untuk menambahkan token ke header
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Fungsi untuk login
export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post("/api/login", {
            email,
            password,
        });
        const { token, user } = response.data;
        localStorage.setItem("token", token); // Simpan token ke localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Simpan user sebagai string JSON
        return { user, token };
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// Fungsi untuk register
export const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    try {
        const response = await apiClient.post("/api/register", {
            name,
            email,
            password,
            password_confirmation,
        });
        const { token, user } = response.data;
        localStorage.setItem("token", token); // Simpan token ke localStorage
        localStorage.setItem('user', user)
        return { user, token };
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
};

// Fungsi untuk logout
export const logout = async () => {
    try {
        await apiClient.post("/api/logout");
        localStorage.removeItem("token"); // Hapus token dari localStorage
        localStorage.removeItem("user"); // Hapus token dari localStorage
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

// Fungsi untuk fetch user yang sedang login
export const fetchUser = async () => {
    try {
        const response = await apiClient.get("/api/user");
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

// Fungsi untuk fetch kategori
export const fetchCategories = async () => {
    try {
        const response = await apiClient.get("/api/kategori");
        return response.data.kategori;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Fungsi untuk fetch destinasi
export const fetchTopDestinations = async () => {
    try {
        const response = await apiClient.get("/api/top-wisata");
        return response.data.wisata;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        throw error;
    }
};
export const fetchDestinations = async () => {
    try {
        const response = await apiClient.get("/api/wisata");
        return response.data.wisata;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        throw error;
    }
};

export const fetchDestinationById = async (id: number) => {
    try {
        const response = await apiClient.get(`/api/wisata/${id}`);
        return response.data.wisata;
    } catch (error) {
        console.error("Error fetching destination by ID:", error);
        throw error;
    }
};

export const addToFavorites = async (destinationId: number) => {
    try {
        const response = await apiClient.post(`/api/wisata/${destinationId}/favorit`);
        return response.data;
    } catch (error) {
        console.error("Error adding to favorites:", error);
        throw error;
    }
};
export const removeFromFavorites = async (destinationId: number) => {
    try {
        const response = await apiClient.delete(`/api/wisata/${destinationId}/favorit`);
        return response.data;
    } catch (error) {
        console.error("Error removing from favorites:", error);
        throw error;
    }
};

export const fetchWisataFavorites = async () => {
    try {
        const response = await apiClient.get("/api/wisata/favorit");
        return response.data.wisata;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        throw error;
    }
};


export const updateProfile = async (payload: {
    name?: string;
    email?: string;
    password?: string;
    new_password?: string;
    new_password_confirmation?: string;
}) => {
    try {
        const response = await apiClient.put("/api/update-profile", payload);
        return response.data;
    } catch (error: any) {
        console.error("Error updating profile:", error.response?.data || error.message);
        throw error;
    }
};

export default apiClient;