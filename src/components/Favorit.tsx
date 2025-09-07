import { useEffect, useState } from "react";
import { fetchWisataFavorites, removeFromFavorites } from "../utils/apiClient";
import { Link } from "react-router-dom";

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

const categoryColors: { [key: number]: string } = {
  1: "bg-green-500",
  2: "bg-yellow-500",
  3: "bg-blue-500",
  4: "bg-red-500",
  5: "bg-purple-500",
};
const defaultColor = "bg-gray-500";

const Favorit = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favLoading, setFavLoading] = useState<number | null>(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        setLoading(true);
        const data = await fetchWisataFavorites();
        setDestinations(data);
      } catch (error) {
        setError("Error fetching favorites");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getFavorites();
  }, []);

  const handleRemoveFavorite = async (destinationId: number) => {
    try {
      setFavLoading(destinationId);
      await removeFromFavorites(destinationId);
      setDestinations((prev) =>
        prev.filter((dest) => dest.id !== destinationId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    } finally {
      setFavLoading(null);
    }
  };

  // skeleton loading
  if (loading) {
    return (
      <div className="grid py-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">Favoritmu</h3>
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
                className={`badge capitalize text-white ${categoryColors[dest.kategori_id] || defaultColor
                  }`}
              >
                {dest.kategori?.nama || "Tidak diketahui"}
              </div>
              <div className="card-actions justify-between items-center mt-auto">
                <Link
                  to={`/wisata/${dest.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Jelajahi
                </Link>
                {/* tombol unfavorit pakai ikon hati merah */}
                <button
                  className={`btn btn-ghost btn-sm text-red-500`}
                  onClick={() => handleRemoveFavorite(dest.id)}
                  aria-label="Hapus dari Favorit"
                  disabled={favLoading === dest.id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorit;
