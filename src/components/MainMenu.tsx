import React from 'react';
import { PixelButton } from './ui/Button';
import birdImg from '../assets/bird.png';
import cloudImg from '../assets/cloud.png';
import backgroundImg from '../assets/background.png';

interface MainMenuProps {
  onStart: () => void;
  onOpenEditor: () => void;
  onOpenCustomMap: () => void;
  onOpenProfile: () => void;
  highScore: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStart, onOpenEditor, onOpenCustomMap, onOpenProfile, highScore }) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-flappy-sky">
      {/* Animated Background Layers */}
      <div 
        className="absolute inset-0 w-[200%] animate-scroll-bg opacity-80 pixelated"
        style={{ 
          backgroundImage: `url(${cloudImg})`, 
          backgroundSize: '50% auto',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: '0 20%'
        }} 
      />
      
      <div 
        className="absolute bottom-0 w-[200%] h-[200px] animate-scroll-bg z-0 pixelated"
        style={{ 
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: '50% 100%',
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4">
        
        {/* Title Area */}
        <div className="animate-float flex flex-col items-center mb-12">
            <div className="relative">
                <img 
                    src={birdImg}
                    alt="Bird" 
                    className="w-16 h-12 absolute -left-20 -top-4 pixelated rotate-[-15deg]" 
                />
                <h1 className="font-game text-6xl md:text-8xl text-flappy-bird text-center drop-shadow-[0_4px_0_#000] tracking-tighter"
                    style={{ 
                        textShadow: '-4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000, 4px 4px 0 #000, 8px 8px 0 rgba(0,0,0,0.2)' 
                    }}
                >
                    FLAPPY<br/>BIRD
                </h1>
            </div>
            
            <div className="mt-6 bg-black/40 backdrop-blur-sm p-4 rounded-xl border-2 border-white/20">
                <p className="font-game text-white text-xl text-center" style={{ textShadow: '2px 2px 0 #000' }}>
                    HIGH SCORE: <span className="text-flappy-bird">{highScore}</span>
                </p>
            </div>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md items-center">
          <PixelButton onClick={onStart} size="lg" className="w-full hover:scale-105 transition-transform">
            START GAME
          </PixelButton>
          
          <div className="flex gap-4 w-full">
            <PixelButton onClick={onOpenEditor} variant="secondary" className="flex-1 text-sm md:text-lg hover:scale-105 transition-transform">
              CREATE MAP
            </PixelButton>
            <PixelButton onClick={onOpenCustomMap} variant="accent" className="flex-1 text-sm md:text-lg hover:scale-105 transition-transform">
              CUSTOM MAPS
            </PixelButton>
          </div>
          
           <PixelButton onClick={onOpenProfile} variant="secondary" className="w-full text-sm md:text-lg hover:scale-105 transition-transform border-t-4 border-yellow-400">
              PROFILE
           </PixelButton>
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 w-full text-center z-20 pointer-events-none">
        <p className="font-game text-white/80 text-xs" style={{ textShadow: '1px 1px 0 #000' }}>
          Remastered Edition
        </p>
      </div>
    </div>
  );
};

