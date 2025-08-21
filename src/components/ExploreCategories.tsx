import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../utils/apiClient";

// Definisikan tipe untuk kategori
interface Category {
    id: number;
    nama: string;
    kategori_image: string;
    created_at: string;
    updated_at: string;
}

const ExploreCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const data = await fetchCategories();
                setCategories(data);
            } catch {
                setError("Gagal memuat kategori. Coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    if (loading) {
        return (
            <div>
                <h3 className="text-2xl font-bold mb-4">Jelajahi Kategori</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-lg overflow-hidden shadow-md animate-pulse bg-gray-200 h-36"
                        >
                            <div className="w-full h-28 bg-gray-300" />
                            <div className="absolute inset-0 flex items-end p-2">
                                <div className="h-4 w-2/3 bg-gray-300 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (error) return <div className="text-center text-error">{error}</div>;

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Jelajahi Kategori</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <Link to={`/explore?category=${category.nama.toLowerCase()}`}>
                            <img
                                src={category.kategori_image}
                                alt={category.nama}
                                className="w-full h-28 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
                                <h4 className="text-white font-medium text-base">
                                    {category.nama}
                                </h4>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreCategories;