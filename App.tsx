
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messages = [
    "Happy Birthday Varshini!",
    "Have a wonderful day...",
    "Filled with joy, laughter...",
    "And lots of cake!"
  ];

  const handlePlay = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => console.log("Audio play deferred", err));
    }
  };

  // Typing logic
  useEffect(() => {
    if (!isStarted) return;

    let currentMsgIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentFullText = messages[currentMsgIndex];
      
      if (isDeleting) {
        setTypedText(currentFullText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentFullText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentFullText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentMsgIndex = (currentMsgIndex + 1) % messages.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, [isStarted]);

  // Confetti logic
  useEffect(() => {
    if (!isStarted) return;

    const fire = () => {
      // On mobile, fire from corners for better visual spread
      const count = 150;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#ff9999', '#ff4d4d', '#ffffff', '#ffccdd']
      };

      function fireSide(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fireSide(0.25, { spread: 26, startVelocity: 55 });
      fireSide(0.2, { spread: 60 });
      fireSide(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fireSide(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fireSide(0.1, { spread: 120, startVelocity: 45 });
    };

    fire();
    const interval = setInterval(fire, 5000);
    return () => clearInterval(interval);
  }, [isStarted]);

  return (
    <div className="min-h-screen flex flex-col">
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Loader Screen */}
      {!isStarted && (
        <div className="fixed inset-0 bg-[#ff9999] flex flex-col items-center justify-center z-[9999] p-6 text-center">
          <div className="mb-8 animate-bounce text-6xl">🎈</div>
          <button 
            onClick={handlePlay}
            className="px-8 py-4 bg-white text-[#ff6666] text-xl md:text-2xl font-pacifico rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 ring-4 ring-white/30"
          >
            Click to Start the Party!
          </button>
          <div className="absolute bottom-10 text-white/80 font-light tracking-widest text-sm">
            DESIGNED BY SAAKETH
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isStarted ? 'opacity-100 flex-grow' : 'opacity-0 hidden'} bg-gradient-to-b from-[#fff0f0] to-[#ffe6e6]`}>
        <div className="container px-4 pt-6 md:pt-12">
          <div className="flex flex-col items-center">
            
            <div className="w-full max-w-[600px] text-center mb-6 md:mb-10">
              <img 
                src="https://placehold.co/600x400/ffccdd/ff4444?text=Happy+Birthday+Varshini!" 
                className="banner-img" 
                alt="Birthday Banner" 
              />
            </div>

            <div className="w-full text-center mb-6">
              <div className="area mb-2 md:mb-4">Varshini</div>
              
              <div className="type-wrap">
                <span className="font-light italic">
                  {typedText}
                  <span className="animate-pulse border-r-2 border-gray-400 ml-1"></span>
                </span>
              </div>
            </div>

            <div className="w-full text-center mt-2 pb-8">
              <img 
                src="https://media.giphy.com/media/He4wudo59enf2/giphy.gif" 
                className="max-w-[250px] md:max-w-[300px] w-[80%] inline-block shadow-lg rounded-xl" 
                alt="Birthday Cake" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer message and Attribution */}
      {isStarted && (
        <footer className="w-full py-6 text-center bg-[#ffe6e6]">
          <div className="text-rose-400 text-xs md:text-sm font-medium tracking-wider mb-2">
            © 2026 SAAKETH | ALL RIGHTS RESERVED
          </div>
          <div className="text-rose-300 text-[10px] md:text-xs uppercase tracking-[0.2em]">
            Designed by Saaketh
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
