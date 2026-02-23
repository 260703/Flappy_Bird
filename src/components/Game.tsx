import { useEffect, useRef, useState, Fragment, type FC } from 'react';
import { useGameLoop, BIRD_WIDTH, BIRD_HEIGHT, BIRD_VISUAL_OFFSET_X, BIRD_VISUAL_OFFSET_Y, PIPE_WIDTH, PIPE_GAP } from '../hooks/useGameLoop';
import { Bird } from './Bird';
import { Pipe } from './Pipe';

import type { PipeData } from '../types';

interface GameProps {
  onGameOver: (score: number) => void;
  initialPipes?: PipeData[];
}

export const Game: FC<GameProps> = ({ onGameOver, initialPipes }) => {
  const [gameHeight, setGameHeight] = useState(window.innerHeight);
  const { birdY, pipes, score, jump, birdVelocity, hasStarted } = useGameLoop(
    true, 
    onGameOver, 
    initialPipes, 
    gameHeight
  );
  const gameRef = useRef<HTMLDivElement>(null);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyH') {
        setDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
        setGameHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  return (
    <div 
      ref={gameRef}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[#70c5ce] select-none"
      onMouseDown={(e) => { e.preventDefault(); jump(); }}
      onTouchStart={(e) => { e.preventDefault(); jump(); }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Dynamic Sky Background */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#4fc3f7] to-[#e1f5fe]"></div>
        
        {/* Clouds */}
        <div className="absolute top-10 left-10 text-white/50 text-9xl select-none animate-pulse">☁</div>
        <div className="absolute top-24 left-1/3 text-white/40 text-8xl select-none animate-pulse delay-75">☁</div>
        <div className="absolute top-5 right-20 text-white/60 text-9xl select-none animate-pulse delay-150">☁</div>

        {/* Cityscape Silhouette (CSS) */}
        <div className="absolute bottom-[20%] left-0 right-0 h-48 z-0 pointer-events-none opacity-50 flex items-end overflow-hidden">
             {/* Simple buildings using css bars */}
             {Array.from({ length: 20 }).map((_, i) => (
                <div 
                    key={i}
                    className="w-16 bg-[#b3e5fc] mx-1 border-t-4 border-[#81d4fa]"
                    style={{ 
                        height: `${Math.random() * 100 + 50}px`,
                        flexShrink: 0
                    }} 
                />
             ))}
             {/* Repeat to fill screen width roughly if needed, or just let them be background decoration */}
        </div>

        {/* Game World */}
        <div className="relative z-10 w-full h-full">
          <Bird y={birdY} velocity={birdVelocity} />
          {pipes.map((pipe) => (
            <Pipe key={pipe.id} x={pipe.x} topHeight={pipe.topHeight} gap={PIPE_GAP} />
          ))}

          {/* Debug Hitboxes */}
          {debug && (
            <>
              {/* Bird Hitbox */}
              <div 
                className="absolute border-2 border-red-500 bg-red-500/30 z-50 pointer-events-none"
                style={{
                  left: 100 + BIRD_VISUAL_OFFSET_X,
                  top: birdY + BIRD_VISUAL_OFFSET_Y,
                  width: BIRD_WIDTH,
                  height: BIRD_HEIGHT,
                }}
              />
              {/* Pipe Hitboxes */}
              {pipes.map(pipe => (
                <Fragment key={`debug-${pipe.id}`}>
                    <div 
                        className="absolute border-2 border-green-500 bg-green-500/30 z-50 pointer-events-none"
                        style={{
                            left: pipe.x,
                            top: 0,
                            width: PIPE_WIDTH,
                            height: pipe.topHeight,
                        }}
                    />
                     <div 
                        className="absolute border-2 border-green-500 bg-green-500/30 z-50 pointer-events-none"
                        style={{
                            left: pipe.x,
                            top: pipe.topHeight + PIPE_GAP,
                            bottom: 0,
                            width: PIPE_WIDTH,
                        }}
                    />
                </Fragment>
              ))}
            </>
          )}
          
          {/* Score */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <h1 className="text-white tracking-light text-6xl font-bold font-pixel drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" style={{ 
                 textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' 
            }}>{score}</h1>
          </div>

          {/* Get Ready Message */}
          {!hasStarted && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center animate-pulse pointer-events-none">
                <h2 className="text-4xl text-white font-bold font-pixel mb-4" style={{ textShadow: '2px 2px 0 #000' }}>GET READY!</h2>
                <p className="text-xl text-white font-pixel" style={{ textShadow: '1px 1px 0 #000' }}>Click or Press Space to Start</p>
            </div>
          )}
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-[20%] z-20">
            {/* Grass Top */}
            <div className="h-6 w-full bg-[#73bf2e] border-t-4 border-t-black border-b-4 border-b-[#558c22] relative z-10">
                 {/* Grass highlighting */}
                 <div className="absolute top-0 left-0 right-0 h-2 bg-[#9add50] opacity-50"></div>
            </div>
            {/* Dirt Bottom */}
            <div 
                className="w-full h-[calc(100%-24px)] bg-[#ded895] border-t-0 border-black" 
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(45deg, #d0c874 25%, transparent 25%, transparent 75%, #d0c874 75%, #d0c874),
                        repeating-linear-gradient(45deg, #d0c874 25%, #ded895 25%, #ded895 75%, #d0c874 75%, #d0c874)
                    `,
                    backgroundPosition: '0 0, 10px 10px',
                    backgroundSize: '20px 20px'
                }}
            ></div>
        </div>
      </div>
    </div>
  );
};
