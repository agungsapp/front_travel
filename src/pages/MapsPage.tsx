import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { fetchDestinations, fetchCategories } from "../utils/apiClient";

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
  kordinat: string; // API mengembalikan string JSON
  created_at: string;
  updated_at: string;
  kategori: Category;
}

interface ParsedDestination {
  id: number;
  nama: string;
  kategori_id: number;
  image: string;
  deskripsi: string;
  alamat: string;
  koordinat: {
    lat: number;
    lng: number;
  };
  created_at: string;
  updated_at: string;
  kategori: Category;
}

const CustomMapController = () => {
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", (e: any) => {
      map.flyTo(e.latlng, 10);
    });
  }, [map]);
  return null;
};

const MapsPage = () => {
  const [wisata, setWisata] = useState<ParsedDestination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // "" untuk "Semua"
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [destinationsData, categoriesData] = await Promise.all([
          fetchDestinations(),
          fetchCategories(),
        ]);
        // Parse kordinat dari string JSON ke objek
        const parsedDestinations: ParsedDestination[] = destinationsData.map((dest: Destination) => ({
          ...dest,
          koordinat: JSON.parse(dest.kordinat),
        }));
        setWisata(parsedDestinations);
        setCategories(categoriesData);
      } catch {
        setError("Gagal memuat");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Filter destinasi berdasarkan kategori dan pencarian
  const filteredDestinations = wisata.filter((dest) => {
    const matchesCategory = selectedCategory === "" || dest.kategori_id === parseInt(selectedCategory);
    const matchesSearch =
      searchQuery === "" ||
      dest.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.kategori.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ikon kustom untuk marker
  const customIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"></path>
          </svg>
          <p className="text-lg text-gray-600">Memuat peta wisata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <h3 className="text-3xl font-extrabold mb-6 text-accent">Peta Wisata Lampung</h3>
      {/* Filter dan Pencarian */}
      <div className="mb-6 grid grid-cols-12 gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-primary w-full col-span-4 shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nama}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Cari destinasi atau kategori..."
          className="input input-primary w-full col-span-8 shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="card bg-base-200 shadow-xl rounded-xl overflow-hidden">
        <div className="h-[500px] w-full relative">
          <MapContainer
            center={[-5.3, 105.2]} // Koordinat tengah Lampung
            zoom={8}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <CustomMapController />
            {error ? (
              <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-[1000]">
                <p className="text-red-500 text-sm">Gagal memuat</p>
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-[1000]">
                <p className="text-red-500 text-sm">Tidak ada destinasi ditemukan</p>
              </div>
            ) : (
              filteredDestinations.map((dest) => (
                <Marker
                  key={dest.id}
                  position={[dest.koordinat.lat, dest.koordinat.lng]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="text-center">
                      <img
                        src={dest.image}
                        alt={dest.nama}
                        className="w-32 h-20 object-cover mx-auto mb-2 rounded"
                      />
                      <h4 className="text-lg font-semibold">{dest.nama}</h4>
                      <p className="text-sm text-gray-600">{dest.kategori.nama}</p>
                      <Link
                        to={`/detail/${dest.id}`}
                        className="btn btn-primary btn-sm mt-2"
                      >
                        <span className="text-white">Lihat Detail</span>
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;