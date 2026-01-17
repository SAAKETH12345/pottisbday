
import React from 'react';
// @ts-ignore
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

interface ConfettiButtonProps {
  children: React.ReactNode;
  className?: string;
  onTrigger?: () => void;
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({ children, className, onTrigger }) => {
  const handleFire = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#f43f5e', '#ffffff', '#fbbf24']
    });
    if (onTrigger) onTrigger();
  };

  return (
    <button onClick={handleFire} className={className}>
      {children}
    </button>
  );
};

export default ConfettiButton;
