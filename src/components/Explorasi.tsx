import Pantai from "../assets/img/pantai.jpeg";
import Budaya from "../assets/img/budaya.jpeg";
import Religi from "../assets/img/religi.jpeg";
import Alam from "../assets/img/alam.jpeg";

const Explorasi = () => {
    const jenisWisata = [
        {
            nama: "Wisata Pantai",
            gambar: Pantai,
        },
        {
            nama: "Wisata Budaya",
            gambar: Budaya,
        },
        {
            nama: "Wisata Religi",
            gambar: Religi,
        },
        {
            nama: "Wisata Alam",
            gambar: Alam,
        },
    ];

    return (
        <>
            <div className="py-5 pt-8">
                <h3 className="font-semibold text-xl">Explore Lokasi Lain</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {jenisWisata.map((item, index) => (
                    <div
                        key={index}
                        className="relative rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={item.gambar}
                            alt={item.nama}
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/25  flex items-center justify-center">
                            <h4 className="text-white font-semibold text-lg text-center px-2">
                                {item.nama}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Explorasi;
