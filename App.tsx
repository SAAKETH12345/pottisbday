
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9999', '#ff4d4d', '#ffffff', '#ffccdd']
      });
    };

    fire();
    const interval = setInterval(fire, 3000);
    return () => clearInterval(interval);
  }, [isStarted]);

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Loader Screen */}
      {!isStarted && (
        <div className="fixed inset-0 bg-[#ff9999] flex items-center justify-center z-[9999] transition-opacity duration-1000">
          <button 
            onClick={handlePlay}
            className="px-10 py-4 bg-white text-[#ff6666] text-2xl font-pacifico rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
          >
            Click to Start the Party!
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isStarted ? 'opacity-100 block' : 'opacity-0 hidden'} min-h-screen bg-gradient-to-b from-[#fff0f0] to-[#ffe6e6]`}>
        <div className="container pt-12">
          <div className="row align-items-center">
            
            <div className="col-12 col-xl-6 mx-auto text-center mb-8">
              <img 
                src="https://placehold.co/600x400/ffccdd/ff4444?text=Happy+Birthday+Varshini!" 
                className="banner-img" 
                alt="Birthday Banner" 
              />
            </div>

            <div className="col-12 text-center mb-8">
              <div className="area mb-4">Varshini</div>
              
              <div className="type-wrap h-20 flex items-center justify-center">
                <span className="text-2xl font-light">
                  {typedText}
                  <span className="animate-pulse border-r-2 border-gray-400 ml-1"></span>
                </span>
              </div>
            </div>

            <div className="col-12 text-center mt-4 pb-20">
              <img 
                src="https://media.giphy.com/media/He4wudo59enf2/giphy.gif" 
                className="max-w-[300px] w-full inline-block" 
                alt="Birthday Cake" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
