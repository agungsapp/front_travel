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
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Filter kategori

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

  // Filter destinasi berdasarkan kategori yang dipilih
  const categoryFilteredDestinations = selectedCategory
    ? displayDestinations.filter(dest =>
      dest.kategori.nama.toLowerCase() === selectedCategory.toLowerCase()
    )
    : displayDestinations;

  // Filter destinasi berdasarkan pencarian (dari hasil filter kategori)
  const filteredDestinations = categoryFilteredDestinations.filter(
    (dest) =>
      dest.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset search ketika kategori berubah
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery(""); // Reset search query ketika kategori berubah
  };

  // Clear filter function
  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 p-4 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
        <span className="ml-2">Memuat...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-100 p-4 flex items-center justify-center">
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-4">
      {/* Filter dan Pencarian */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filter Kategori */}
          <div className="flex-1">
            <label className="label">
              <span className="label-text font-semibold">Filter Kategori</span>
            </label>
            <select
              className="select select-primary w-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {displayCategories.map((category) => (
                <option key={category.id} value={category.nama}>
                  {category.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-2">
            <label className="label">
              <span className="label-text font-semibold">Pencarian</span>
            </label>
            <input
              type="text"
              placeholder="Cari destinasi, deskripsi, atau alamat..."
              className="input input-primary w-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Clear Filter Button */}
          {(selectedCategory || searchQuery) && (
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="btn btn-outline btn-secondary"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(selectedCategory || searchQuery) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm font-medium">Filter aktif:</span>
            {selectedCategory && (
              <div className="badge badge-primary gap-2">
                Kategori: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="btn btn-ghost btn-xs"
                >
                  ✕
                </button>
              </div>
            )}
            {searchQuery && (
              <div className="badge badge-secondary gap-2">
                Pencarian: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn btn-ghost btn-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Daftar Destinasi Populer */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-6 text-slate-900">
          Destinasi Populer
          {(selectedCategory || searchQuery) && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({filteredDestinations.length} hasil ditemukan)
            </span>
          )}
        </h3>
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">
              Tidak ada destinasi ditemukan
            </p>
            <p className="text-gray-500">
              Coba ubah filter atau kata kunci pencarian
            </p>
            {(selectedCategory || searchQuery) && (
              <button
                onClick={clearFilters}
                className="btn btn-primary mt-4"
              >
                Reset Filter
              </button>
            )}
          </div>
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
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-xl drop-shadow-lg">
                          {dest.nama}
                        </h4>
                        <p className="text-white/80 text-sm mt-1 line-clamp-2">
                          {dest.alamat}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-white text-sm bg-black/50 px-2 py-1 rounded-full">
                          {dest.kategori.nama}
                        </span>
                      </div>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {displayCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryChange(category.nama)}
              className={`card compact shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden transform hover:scale-105 cursor-pointer ${selectedCategory === category.nama
                  ? 'bg-primary text-primary-content ring-2 ring-primary'
                  : 'bg-base-200'
                }`}
            >
              <figure>
                <img
                  src={category.kategori_image}
                  alt={category.nama}
                  className="w-full h-32 object-cover"
                />
              </figure>
              <div className="card-body p-2 text-center">
                <h4 className={`text-lg font-medium ${selectedCategory === category.nama
                    ? 'text-primary-content'
                    : 'text-primary'
                  }`}>
                  {category.nama}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;