import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDestinationById, addToFavorites } from "../utils/apiClient";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom marker icon agar tidak error di Vite
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
});

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
    is_favorit?: boolean;
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

const DetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [wisata, setWisata] = useState<Destination | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorit, setIsFavorit] = useState<boolean>(false);
    const [favLoading, setFavLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                setLoading(true);
                const response = await fetchDestinationById(Number(id));
                let kordinat = response.kordinat;
                if (typeof kordinat === "string") {
                    try {
                        kordinat = JSON.parse(kordinat);
                    } catch {
                        kordinat = { lat: 0, lng: 0 };
                    }
                }
                setWisata({ ...response, kordinat });
                setIsFavorit(!!response.is_favorit);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Terjadi kesalahan");
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [id]);

    const handleFavorite = async () => {
        if (!wisata) return;
        setFavLoading(true);
        try {
            await addToFavorites(wisata.id);
            setIsFavorit((prev) => !prev);
        } catch (err) {
            // Optional: tampilkan pesan error
        } finally {
            setFavLoading(false);
        }
    };

    // Kembali ke halaman sebelumnya
    const handleBack = () => navigate(-1);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    if (!wisata) {
        return (
            <div className="text-center p-4">Destinasi tidak ditemukan.</div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <button onClick={handleBack} className="btn btn-ghost mb-4">
                ← Kembali
            </button>
            <div className="card bg-base-200 shadow-xl">
                <figure>
                    <img
                        src={wisata.image}
                        alt={wisata.nama}
                        className="w-full h-64 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold">
                        {wisata.nama}
                    </h2>
                    <div
                                className={`badge capitalize text-white ${
                                    categoryColors[wisata.kategori_id] || defaultColor
                                }`}
                            >
                                {wisata.kategori?.nama || "Tidak diketahui"}
                            </div>
                    <p className="text-base mb-4">{wisata.deskripsi}</p>
                    <div className="flex items-center gap-2 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                        </svg>
                        <p className="text-sm">{wisata.alamat}</p>
                    </div>
                    <div className="card-actions justify-end">
                <a
                    href={`https://www.google.com/maps?q=${wisata.kordinat.lat},${wisata.kordinat.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                >
                    Lihat di Maps
                </a>
                <button
                    className={`btn btn-ghost btn-sm ${isFavorit ? "text-red-500" : "text-gray-400"}`}
                    onClick={handleFavorite}
                    aria-label="Tambah ke Favorit"
                    disabled={favLoading}
                >
                    {isFavorit ? (
                        // Heart solid
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    ) : (
                        // Heart outline
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/>
                        </svg>
                    )}
                </button>
            </div>
                </div>
            </div>
            {/* MAPS ADA DI SINI */}
            <div className="mt-6">
                <h3 className="font-semibold mb-2">Lokasi di Peta</h3>
               
                <div className="rounded-xl overflow-hidden shadow border border-base-200" style={{ height: 320 }}>
                    <MapContainer
                        center={[wisata.kordinat.lat, wisata.kordinat.lng]}
                        zoom={15}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[wisata.kordinat.lat, wisata.kordinat.lng]} icon={markerIcon}>
                            <Popup>
                                <b>{wisata.nama}</b>
                                <br />
                                {wisata.alamat}
                                <div className="flex justify-start mt-4 mb-2">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${wisata.kordinat.lat},${wisata.kordinat.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-success text-white btn-sm"
                                    >
                                        Rute ke Lokasi
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
