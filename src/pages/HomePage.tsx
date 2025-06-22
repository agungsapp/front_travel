import DiSekitar from "../components/DiSekitar";
import Explorasi from "../components/Explorasi";

const HomePage = () => {
    return (
        <div className="p-4 pb-72">
            <div className="h-full">
                <label className="input">
                    <svg
                        className="h-full opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                    />
                </label>
            </div>

            <DiSekitar />
            <Explorasi />
        </div>
    );
};

export default HomePage;
