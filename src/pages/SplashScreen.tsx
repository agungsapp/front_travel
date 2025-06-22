const SplashScreen = () => {
    return (
        <div className="flex items-center absolute top-0 left-0 right-0 bottom-0 justify-center h-screen bg-primary-600 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Lampung Go!</h1>
                <p className="mt-4 text-lg">Menjelajahi keindahan Lampung...</p>
                <span className="loading loading-spinner loading-lg mt-6 block"></span>
            </div>
        </div>
    );
};

export default SplashScreen;
