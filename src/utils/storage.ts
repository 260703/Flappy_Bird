import type { MapData } from '../types';

const STORAGE_KEY = 'flappy_bird_custom_maps';

export const getMaps = (): MapData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load maps', e);
    return [];
  }
};

export const saveMap = (map: MapData): void => {
  const maps = getMaps();
  const existingIndex = maps.findIndex((m) => m.id === map.id);
  
  if (existingIndex >= 0) {
    maps[existingIndex] = map;
  } else {
    maps.push(map);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
};

export const deleteMap = (id: string): void => {
  const maps = getMaps().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
};

export const getMap = (id: string): MapData | undefined => {
  return getMaps().find((m) => m.id === id);
};
