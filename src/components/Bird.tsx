import React from 'react';

interface BirdProps {
  y: number;
  velocity: number;
}

export const Bird: React.FC<BirdProps> = ({ y, velocity }) => {
  const rotation = Math.min(Math.max(velocity * 3, -25), 90);

  return (
    <div
      className="absolute left-[100px] w-12 h-9 transition-transform duration-75"
      style={{ top: y, transform: `rotate(${rotation}deg)` }}
    >
      <img src="/src/assets/bird.png" alt="bird" className="w-full h-full object-contain pixelated" />
    </div>
  );
};
