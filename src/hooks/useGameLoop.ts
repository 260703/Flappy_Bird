import { useState, useEffect, useCallback, useRef } from 'react';
import type { PipeData } from '../types';

export const GRAVITY = 0.6; // Increased for DT scaling
export const JUMP_STRENGTH = -10; // Increased for DT scaling
export const PIPE_SPEED = 3.5; // Slightly faster for better feel
export const PIPE_SPAWN_RATE = 1500;
export const BIRD_WIDTH = 34;
export const BIRD_HEIGHT = 24;
export const BIRD_VISUAL_OFFSET_X = 8;
export const BIRD_VISUAL_OFFSET_Y = 6;
export const PIPE_WIDTH = 70;
export const PIPE_GAP = 150;

export const useGameLoop = (
  isPlaying: boolean, 
  onGameOver: (score: number) => void, 
  initialPipes?: PipeData[], 
  gameHeight: number = 600
) => {
  const [birdY, setBirdY] = useState(gameHeight / 2);
  const [score, setScore] = useState(0);
  const [pipes, setPipes] = useState<PipeData[]>(initialPipes ? JSON.parse(JSON.stringify(initialPipes)) : []);
  const [hasStarted, setHasStarted] = useState(false);
  const [birdVelocity, setBirdVelocity] = useState(0); // For rotation rendering

  // Refs for game loop logic to avoid re-renders and dependency cycles
  const birdYRef = useRef(gameHeight / 2);
  const birdVelocityRef = useRef(0);
  const pipesRef = useRef<PipeData[]>(initialPipes ? JSON.parse(JSON.stringify(initialPipes)) : []);
  const scoreRef = useRef(0);
  const gameActiveRef = useRef(false);

  const FLOOR_HEIGHT = gameHeight * 0.8; // 80% of screen is play area

  const jump = useCallback(() => {
    if (isPlaying) {
      if (!gameActiveRef.current) {
        gameActiveRef.current = true;
        setHasStarted(true);
      }
      birdVelocityRef.current = JUMP_STRENGTH;
    }
  }, [isPlaying]);

  useEffect(() => {
     // Reset on resize or mount
     if (!isPlaying) {
        birdYRef.current = gameHeight / 2;
        setBirdY(gameHeight / 2);
     }
  }, [gameHeight, isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      birdYRef.current = gameHeight / 2;
      birdVelocityRef.current = 0;
      pipesRef.current = initialPipes ? JSON.parse(JSON.stringify(initialPipes)) : []; // Deep copy to reset
      scoreRef.current = 0;
      gameActiveRef.current = false;
      
      setBirdY(gameHeight / 2);
      setBirdVelocity(0);
      setPipes(initialPipes ? JSON.parse(JSON.stringify(initialPipes)) : []);
      setScore(0);
      setHasStarted(false);
      return;
    }

    let lastTime = performance.now();
    let pipeSpawnTimer = 0;
    let animationFrameId: number;

    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!gameActiveRef.current) {
        // Hover animation
        const hoverY = (gameHeight / 2) + Math.sin(time / 300) * 5;
        birdYRef.current = hoverY;
        setBirdY(hoverY);
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      // Physics
      const dtFactor = deltaTime / 16.67; // Normalize to 60 FPS
      
      birdVelocityRef.current += GRAVITY * dtFactor;
      birdYRef.current += birdVelocityRef.current * dtFactor;

      // Floor collision
      if (birdYRef.current > FLOOR_HEIGHT - BIRD_HEIGHT - BIRD_VISUAL_OFFSET_Y) {
        onGameOver(scoreRef.current);
        return; // Stop loop
      }
      // Ceiling collision
      if (birdYRef.current < 0) {
        birdYRef.current = 0;
        birdVelocityRef.current = 0;
      }

      // Pipes
      if (!initialPipes) {
          pipeSpawnTimer += deltaTime;
          if (pipeSpawnTimer > PIPE_SPAWN_RATE) {
            pipeSpawnTimer = 0;
            pipesRef.current.push({
                id: Date.now(),
                x: window.innerWidth + 100, // Spawn offscreen right
                topHeight: Math.random() * (FLOOR_HEIGHT - 200) + 50,
                passed: false,
            });
          }
      }

      // Move pipes and cleanup
      pipesRef.current = pipesRef.current
        .map((pipe) => ({ ...pipe, x: pipe.x - (PIPE_SPEED * dtFactor) }))
        .filter((pipe) => pipe.x > -100);

      if (initialPipes && pipesRef.current.length === 0 && gameActiveRef.current) {
         onGameOver(scoreRef.current);
         return;
      }

      // Collision & Scoring
      pipesRef.current.forEach((pipe) => {
        // Tuned Collision Box
        // Bird is centered horizontally at 100px left offset in Game.tsx?
        // Wait, Bird.tsx says `left-[100px]`.
        // So Bird visual Left is 100.
        // Hitbox Left = 100 + BIRD_VISUAL_OFFSET_X.
        
        const birdLeft = 100 + BIRD_VISUAL_OFFSET_X;
        const birdRight = birdLeft + BIRD_WIDTH;
        const birdTop = birdYRef.current + BIRD_VISUAL_OFFSET_Y;
        const birdBottom = birdTop + BIRD_HEIGHT;

        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + PIPE_WIDTH;

        // Collision
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          if (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP) {
             onGameOver(scoreRef.current);
          }
        }

        // Scoring
        if (!pipe.passed && birdLeft > pipeRight) {
          scoreRef.current += 1;
          pipe.passed = true;
          setScore(scoreRef.current);
        }
      });

      // Update State for Rendering
      setBirdY(birdYRef.current);
      setBirdVelocity(birdVelocityRef.current);
      setPipes([...pipesRef.current]);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, onGameOver, initialPipes, gameHeight]);

  return { birdY, pipes, score, jump, birdVelocity, hasStarted };
};

