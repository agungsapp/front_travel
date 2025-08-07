import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";

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
    // Data statis destinasi dengan koordinat
    const destinations = [
        {
            id: "1",
            name: "Danau Ranau",
            coordinates: [-5.0417, 104.4833],
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
        },
        {
            id: "2",
            name: "Vihara Kamasan",
            coordinates: [-5.3986, 105.2643],
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
        },
        {
            id: "3",
            name: "Kopi Lampung",
            coordinates: [-5.0333, 104.05],
            image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?w=400&q=80",
        },
        {
            id: "4",
            name: "Menara Siger",
            coordinates: [-5.4171, 105.2641],
            image: "https://images.unsplash.com/photo-1501705832102-73efa1ecde9d?w=400&q=80",
        },
        {
            id: "5",
            name: "Taman Nasional Way Kambas",
            coordinates: [-4.9167, 105.8167],
            image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80",
        },
        {
            id: "6",
            name: "Museum Lampung",
            coordinates: [-5.4181, 105.2627],
            image: "https://images.unsplash.com/photo-1516455590570-59f1e95f7c8a?w=400&q=80",
        },
    ];

    // Ikon kustom untuk marker
    const customIcon = new Icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <h3 className="text-3xl font-extrabold mb-6 text-accent">
                Peta Wisata Lampung
            </h3>
            <div className="card bg-base-200 shadow-xl rounded-xl overflow-hidden">
                <div className="h-96 w-full relative">
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
                        {destinations.map((dest) => (
                            <Marker
                                key={dest.id}
                                position={dest.coordinates as [number, number]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <div className="text-center">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-32 h-20 object-cover mx-auto mb-2 rounded"
                                        />
                                        <h4 className="text-lg font-semibold">
                                            {dest.name}
                                        </h4>
                                        <Link
                                            to={`/detail/${dest.id}`}
                                            className="btn btn-primary btn-sm mt-2"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default MapsPage;
