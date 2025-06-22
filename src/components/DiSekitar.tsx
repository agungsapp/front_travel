const DiSekitar = () => {
    const tempatSekitar = [
        {
            nama: "Pantai Rio Beach",
            gambar: "https://image.idntimes.com/post/20241024/1000052816-d7a5cfe6be371380223a4ffc73ad4e08-307c1c9c9a9f1dd4862ad39280351405.jpg",
            alamat: "Jl. Panjang, Lampung Selatan, Provinsi Lampung.",
        },
        {
            nama: "Air Terjun Way Lalaan",
            gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94L4UkbWf0JGO8gmoi17on796377NnvD3pA&s",
            alamat: "Kota Agung, Tanggamus, Lampung.",
        },
        {
            nama: "Bukit Sakura",
            gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWhpUjlgrJV2Zx8pUOcqcencdkYjbJ9cQd0A&s",
            alamat: "Kemiling, Bandar Lampung.",
        },
    ];

    return (
        <>
            <div className="py-5 pt-8">
                <h3 className="font-semibold text-xl">Di Sekitarmu</h3>
            </div>
            <div className="flex flex-col gap-4">
                {tempatSekitar.map((tempat, index) => (
                    <div
                        key={index}
                        className="card card-side bg-base-100 shadow-sm"
                    >
                        <figure className="w-1/4">
                            <img src={tempat.gambar} alt={tempat.nama} />
                        </figure>
                        <div className="card-body w-3/4">
                            <h2 className="card-title">{tempat.nama}</h2>
                            <div className="flex gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                <p>{tempat.alamat}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DiSekitar;
