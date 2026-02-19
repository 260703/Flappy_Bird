import React from 'react';
import birdImg from '../assets/bird.png';

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
      <img src={birdImg} alt="bird" className="w-full h-full object-contain pixelated" />
    </div>
  );
};
