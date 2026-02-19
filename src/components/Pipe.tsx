import React from 'react';

interface PipeProps {
  x: number;
  topHeight: number;
  gap: number;
}

export const Pipe: React.FC<PipeProps> = ({ x, topHeight, gap }) => {
  const pipeWidth = 70; // Matches game logic

  // Gradient for the green pipe body (left-to-right 3D effect)
  const pipeGradient = "linear-gradient(90deg, #55aa30 0%, #9add50 15%, #55aa30 40%, #2d5e1e 100%)";
  // Gradient for the rim (slightly lighter/different to stand out)
  const rimGradient = "linear-gradient(90deg, #55aa30 0%, #bbea70 15%, #55aa30 40%, #2d5e1e 100%)";

  return (
    <div className="absolute top-0 bottom-0" style={{ left: x, width: pipeWidth }}>
       {/* Top Pipe Container */}
       <div 
         className="absolute top-0 w-full flex flex-col justify-end"
         style={{ height: topHeight }}
       >
         {/* Pipe Body */}
         <div 
            className="w-full grow border-x-2 border-black"
            style={{ background: pipeGradient }}
         ></div>
         
         {/* Pipe Rim (Bottom of top pipe) */}
         <div 
            className="w-[104%] -ml-[2%] h-[24px] border-2 border-black relative z-10"
            style={{ background: rimGradient }}
         ></div>
       </div>

       {/* Bottom Pipe Container */}
       <div 
         className="absolute w-full flex flex-col"
         style={{ top: topHeight + gap, bottom: 0 }}
       >
          {/* Pipe Rim (Top of bottom pipe) */}
         <div 
            className="w-[104%] -ml-[2%] h-[24px] border-2 border-black relative z-10"
            style={{ background: rimGradient }}
         ></div>

         {/* Pipe Body */}
         <div 
            className="w-full grow border-x-2 border-black"
            style={{ background: pipeGradient }}
         ></div>
       </div>
    </div>
  );
};
