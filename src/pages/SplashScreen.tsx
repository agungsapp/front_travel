import Logo from '../assets/img/logo.png'

const SplashScreen = () => {
    return (
        <div className="flex max-w-xl mx-auto items-center absolute top-0 left-0 right-0 bottom-0 justify-center h-screen bg-primary-600 text-white">
            <div className="text-center">
                <img src={Logo} alt="Logo" className="w-2/3 animate-bounce mx-auto mb-8" />
                <p className="mt-4 text-lg">Menjelajahi keindahan Lampung...</p>
                <span className="loading mx-auto loading-spinner loading-lg mt-6 block"></span>
            </div>
        </div>
    );
};

export default SplashScreen;
