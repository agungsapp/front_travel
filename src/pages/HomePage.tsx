import { useState } from "react";
import PopularDestinations from "../components/PopularDestinations";
import ExploreCategories from "../components/ExploreCategories";
import Favorit from "../components/Favorit";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Cari destinasi atau kategori..."
                    className="input input-primary w-full max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <PopularDestinations />
            <ExploreCategories />
            <Favorit />
        </div>
    );
};

export default HomePage;