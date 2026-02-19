import React, { useEffect, useState } from 'react';
import type { MapData } from '../types';
import { getMaps, deleteMap } from '../utils/storage';

interface MapSelectorProps {
  onSelect: (map: MapData) => void;
  onBack: () => void;
}

export const MapSelector: React.FC<MapSelectorProps> = ({ onSelect, onBack }) => {
  const [maps, setMaps] = useState<MapData[]>([]);

  useEffect(() => {
    setMaps(getMaps());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this map?')) {
        deleteMap(id);
        setMaps(getMaps());
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#112116] p-4 font-game">
      <div className="w-full max-w-2xl bg-[#ded895] p-8 border-4 border-black rounded-lg shadow-lg relative">
        <button 
            onClick={onBack}
            className="absolute top-4 left-4 px-4 py-2 bg-slate-500 text-white font-bold border-2 border-black"
        >
            BACK
        </button>
        <h2 className="text-4xl text-[#f2994a] mb-8 text-center" style={{ textShadow: '2px 2px 0 #000' }}>SELECT MAP</h2>
        
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {maps.length === 0 ? (
                <div className="text-center text-xl text-black py-8">
                    No custom maps found. Create one first!
                </div>
            ) : (
                maps.map((map) => (
                    <div 
                        key={map.id} 
                        onClick={() => onSelect(map)}
                        className="flex justify-between items-center p-4 bg-white/50 border-2 border-black hover:bg-white/80 cursor-pointer transition-colors"
                    >
                        <div>
                            <h3 className="text-2xl text-black">{map.name}</h3>
                            <p className="text-sm text-gray-700">{map.pipes.length} Pipes</p>
                        </div>
                        <button 
                            onClick={(e) => handleDelete(map.id, e)}
                            className="px-3 py-1 bg-red-500 text-white border-2 border-black hover:scale-105"
                        >
                            DELETE
                        </button>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};
