import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchDestinations } from "../utils/apiClient";


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

const HomePage = () => {

        const [categories, setCategories] = useState<Category[]>([]);
        // const [wisata, setWisata] = useState<Destination[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);


        useEffect(() => {
const getCategory = async () => {
   try {
    setLoading(true);
    const categoris = await fetchCategories();
    const wisata = await fetchDestinations()
    setCategories(data)
    setCategories(wisata)
   } catch {
     setError("gagal memuat kategori & wisata")
   } finally {
    setLoading(false)
   }
}
        },[])

    // Data statis destinasi untuk eksplorasi
    const allDestinations = [
        {
            id: 1,
            name: "Danau Ranau",
            category: "Alam",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
        },
        {
            id: 2,
            name: "Vihara Kamasan",
            category: "Budaya",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
        },
        {
            id: 3,
            name: "Kopi Lampung",
            category: "Kuliner",
            image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?w=400&q=80",
        },
        {
            id: 4,
            name: "Menara Siger",
            category: "Budaya",
            image: "https://images.unsplash.com/photo-1501705832102-73efa1ecde9d?w=400&q=80",
        },
        {
            id: 5,
            name: "Taman Nasional Way Kambas",
            category: "Alam",
            image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80",
        },
        {
            id: 6,
            name: "Museum Lampung",
            category: "Sejarah",
            image: "https://images.unsplash.com/photo-1516455590570-59f1e95f7c8a?w=400&q=80",
        },
    ];

    // Data kategori untuk eksplorasi
    const exploreCategories = [
        {
            id: 1,
            name: "Alam",
            image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
        },
        {
            id: 2,
            name: "Budaya",
            image: "https://images.unsplash.com/photo-1501705832102-73efa1ecde9d?w=300&q=80",
        },
        {
            id: 3,
            name: "Kuliner",
            image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?w=300&q=80",
        },
        {
            id: 4,
            name: "Sejarah",
            image: "https://images.unsplash.com/photo-1516455590570-59f1e95f7c8a?w=300&q=80",
        },
    ];

    // State untuk pencarian
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Filter destinasi berdasarkan pencarian
    const filteredDestinations = allDestinations.filter(
        (dest) =>
            dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-base-100 p-4">
            {/* Pencarian */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Cari destinasi atau kategori..."
                    className="input input-primary w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Daftar Destinasi Populer */}
            <div className="mb-8">
                <h3 className="text-3xl font-bold mb-6 text-slate-900">
                    Destinasi Populer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredDestinations.map((dest) => (
                        <div
                            key={dest.id}
                            className="card compact bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                        >
                            <Link to={`/detail/${dest.id}`}>
                                <figure className="relative">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                        <h4 className="text-white font-semibold text-xl drop-shadow-lg">
                                            {dest.name}
                                        </h4>
                                        <p className="text-white text-sm bg-opacity-75 bg-black px-2 rounded-full">
                                            {dest.category}
                                        </p>
                                    </div>
                                </figure>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kategori Eksplorasi */}
            <div>
                <h3 className="text-3xl font-extrabold mb-6 text-accent">
                    Jelajahi Kategori
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {exploreCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/explore?category=${category.name.toLowerCase()}`} // Navigasi sederhana ke ExplorePage dengan query
                            className="card compact bg-base-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden transform hover:scale-105"
                        >
                            <figure>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-32 object-cover"
                                />
                            </figure>
                            <div className="card-body p-2 text-center">
                                <h4 className="text-lg font-medium text-primary">
                                    {category.name}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
