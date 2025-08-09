import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopDestinations } from "../utils/apiClient";

interface Category {
    id: number;
    nama: string;
    kategori_image: string;
    created_at: string;
    updated_at: string;
}

interface Destination {
    id: number;
    nama: string;
    kategori_id: number;
    image: string;
    deskripsi: string;
    alamat: string;
    kordinat: {
        lat: number;
        lng: number;
    };
    created_at: string;
    updated_at: string;
    kategori: Category;
}

// Mapping warna berdasarkan ID kategori
const categoryColors: { [key: number]: string } = {
    1: "bg-green-500", // Alam: Hijau
    2: "bg-yellow-500", // Budaya: Kuning
    3: "bg-blue-500", // Religi: Biru
    4: "bg-red-500", // Kuliner: Merah
    5: "bg-purple-500", // Hiburan: Ungu (atau warna lain untuk kategori baru)
};

// Default warna untuk kategori yang tidak dikenal
const defaultColor = "bg-gray-500";

const PopularDestinations = () => {

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Data statis destinasi populer (sesuai sampel API)
    useEffect(() => {
        const getDestinations = async () => {
            try {
                setLoading(true);
                const data = await fetchTopDestinations();
                setDestinations(data);
            } catch {
                setError("Failed to fetch destinations");
            } finally {
                setLoading(false);
            }
        }
        getDestinations();
    }, []);

    // skeleton loading
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="card bg-base-200 shadow-md rounded-lg overflow-hidden animate-pulse"
                    >
                        <div className="w-full h-48 bg-gray-300" />
                        <div className="card-body p-4">
                            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                            <div className="flex justify-end">
                                <div className="btn btn-primary btn-sm pointer-events-none opacity-50 w-20 h-8 bg-gray-300 border-none" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (error) return <div className="text-center text-error">{error}</div>;


    return (
        <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Destinasi Populer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                    <div
                        key={dest.id}
                        className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden"
                    >
                        <figure>
                            <img
                                src={dest.image}
                                alt={dest.nama}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-lg font-semibold">{dest.nama}</h2>
                            <div
                                className={`badge capitalize text-white ${
                                    categoryColors[dest.kategori_id] || defaultColor
                                }`}
                            >
                                {dest.kategori?.nama || "Tidak diketahui"}
                            </div>
                            <div className="card-actions justify-end mt-2">
                                <Link
                                    to={`/detail/${dest.id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Jelajahi
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularDestinations;