import { useState, useEffect } from 'react';

// Define type for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPromptPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if prompt was dismissed today
    const promptStatus = localStorage.getItem('pwa_install_prompt');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    if (promptStatus) {
      const { dismissedDate } = JSON.parse(promptStatus);
      if (dismissedDate === today) {
        return; // Don't show prompt if dismissed today
      }
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Show popup immediately for iOS (no beforeinstallprompt)
    if (isIOSDevice) {
      setIsVisible(true);
    } else {
      // Handle beforeinstallprompt for non-iOS (e.g., Android)
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setIsVisible(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Instruct user to install manually on iOS
      alert(
        'To install Lampung Go on your iPhone:\n1. Tap the "Share" button in Safari.\n2. Select "Add to Home Screen".\n3. Tap "Add" to confirm.'
      );
    } else if (deferredPrompt) {
      // Trigger install prompt for non-iOS
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    }
    setIsVisible(false);
  };

  const handleDismissClick = () => {
    // Save dismissal status with today's date
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(
      'pwa_install_prompt',
      JSON.stringify({ dismissed: true, dismissedDate: today })
    );
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl transform transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Install Lampung Go?
        </h3>
        <p className="text-gray-600 text-center mb-6">
          {isIOS
            ? 'Nikmati pengalaman wisata Lampung lebih cepat dengan menginstal aplikasi ke Home Screen Anda!'
            : 'Nikmati pengalaman wisata Lampung lebih cepat dengan menginstal aplikasi!'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleInstallClick}
            className="btn btn-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Install
          </button>
          <button
            onClick={handleDismissClick}
            className="btn btn-ghost px-6 py-2 rounded-lg font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPromptPopup;