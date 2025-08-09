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
  const [wisata, setWisata] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const categoriesData = await fetchCategories();
        const destinationsData = await fetchDestinations();
        setCategories(categoriesData);
        setWisata(destinationsData);
      } catch {
        setError("Gagal memuat kategori & wisata");
      } finally {
        setLoading(false);
      }
    };

    getCategory(); // Panggil fungsi
  }, []);

  // Data statis destinasi untuk eksplorasi (sebagai fallback)
  const allDestinations: Destination[] = [
    {
      id: 1,
      nama: "Danau Ranau",
      kategori_id: 1,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
      deskripsi: "Danau indah di Lampung",
      alamat: "Lampung Selatan",
      kordinat: { lat: -4.858, lng: 105.321 },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      kategori: { id: 1, nama: "Alam", kategori_image: "", created_at: "", updated_at: "" },
    },
    {
      id: 2,
      nama: "Vihara Kamasan",
      kategori_id: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      deskripsi: "Vihara bersejarah di Lampung",
      alamat: "Bandar Lampung",
      kordinat: { lat: -5.429, lng: 105.262 },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      kategori: { id: 2, nama: "Budaya", kategori_image: "", created_at: "", updated_at: "" },
    },
    {
      id: 3,
      nama: "Kopi Lampung",
      kategori_id: 3,
      image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?w=400&q=80",
      deskripsi: "Kopi khas Lampung",
      alamat: "Lampung Barat",
      kordinat: { lat: -5.123, lng: 104.567 },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      kategori: { id: 3, nama: "Kuliner", kategori_image: "", created_at: "", updated_at: "" },
    },
    {
      id: 4,
      nama: "Menara Siger",
      kategori_id: 2,
      image: "https://images.unsplash.com/photo-1501705832102-73efa1ecde9d?w=400&q=80",
      deskripsi: "Ikon budaya Lampung",
      alamat: "Bakauheni",
      kordinat: { lat: -5.876, lng: 105.753 },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      kategori: { id: 2, nama: "Budaya", kategori_image: "", created_at: "", updated_at: "" },
    },
    {
      id: 5,
      nama: "Taman Nasional Way Kambas",
      kategori_id: 1,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80",
      deskripsi: "Taman nasional dengan satwa liar",
      alamat: "Lampung Timur",
      kordinat: { lat: -4.921, lng: 105.783 },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      kategori: { id: 1, nama: "Alam", kategori_image: "", created_at: "", updated_at: "" },
    },
    {
      id: 6,
      nama: "Museum Lampung",
      kategori_id: 4,
      image: "https://images.unsplash.com/photo-1516455590570-59f1e95f7c8a?w=400&q=80",
      deskripsi: "Museum sejarah Lampung",
      alamat: "Bandar Lampung",
      kordinat: { lat: -5.429, lng: 105.262 },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      kategori: { id: 4, nama: "Sejarah", kategori_image: "", created_at: "", updated_at: "" },
    },
  ];

  // Data kategori untuk eksplorasi (sebagai fallback)
  const exploreCategories: Category[] = [
    {
      id: 1,
      nama: "Alam",
      kategori_image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      nama: "Budaya",
      kategori_image: "https://images.unsplash.com/photo-1501705832102-73efa1ecde9d?w=300&q=80",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      nama: "Kuliner",
      kategori_image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?w=300&q=80",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      nama: "Sejarah",
      kategori_image: "https://images.unsplash.com/photo-1516455590570-59f1e95f7c8a?w=300&q=80",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  // Gunakan data dinamis jika tersedia, jika tidak gunakan data statis
  const displayDestinations = wisata.length > 0 ? wisata : allDestinations;
  const displayCategories = categories.length > 0 ? categories : exploreCategories;

  // Filter destinasi berdasarkan pencarian
  const filteredDestinations = displayDestinations.filter(
    (dest) =>
      dest.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.kategori.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen bg-base-100 p-4">Memuat...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-base-100 p-4">Error: {error}</div>;
  }

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
        {filteredDestinations.length === 0 ? (
          <p>Tidak ada destinasi ditemukan.</p>
        ) : (
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
                      alt={dest.nama}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h4 className="text-white font-semibold text-xl drop-shadow-lg">
                        {dest.nama}
                      </h4>
                      <p className="text-white text-sm bg-opacity-75 bg-black px-2 rounded-full">
                        {dest.kategori.nama}
                      </p>
                    </div>
                  </figure>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kategori Eksplorasi */}
      <div>
        <h3 className="text-3xl font-extrabold mb-6 text-accent">
          Jelajahi Kategori
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              to={`/explore?category=${category.nama.toLowerCase()}`}
              className="card compact bg-base-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden transform hover:scale-105"
            >
              <figure>
                <img
                  src={category.kategori_image}
                  alt={category.nama}
                  className="w-full h-32 object-cover"
                />
              </figure>
              <div className="card-body p-2 text-center">
                <h4 className="text-lg font-medium text-primary">
                  {category.nama}
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