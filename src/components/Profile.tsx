import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

interface ProfileProps {
  onBack: () => void;
  onLogout: () => void;
  userId: string;
}

export const Profile: React.FC<ProfileProps> = ({ onBack, onLogout, userId }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getProfile();
  }, [userId]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, age, avatar_url')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username || '');
        setFullName(data.full_name || '');
        setAge(data.age?.toString() || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const updates = {
        id: userId,
        username,
        full_name: fullName,
        age: parseInt(age) || 0,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        setMsg(`Error: ${error.message}`);
      } else {
        setMsg('Profile updated!');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (error) {
       setMsg('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black/80 font-game z-50">
      <div className="bg-[#ded895] p-8 border-4 border-black w-full max-w-md rounded-lg shadow-lg relative">
        <h2 className="text-3xl text-[#f2994a] mb-6 text-center" style={{ textShadow: '2px 2px 0 #000' }}>
          PROFILE
        </h2>
        
        {loading ? (
             <div className="text-center p-4">Loading...</div>
        ) : (
            <div className="flex flex-col gap-4">
                {/* Avatar Preview */}
                <div className="flex justify-center mb-2">
                    <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-slate-300 flex items-center justify-center">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl text-gray-500">?</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[#e86101] text-sm font-bold">USERNAME</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border-2 border-black rounded bg-[#f0ebd8] focus:outline-none focus:ring-2 focus:ring-[#54ac42]"
                    />
                </div>

                 <div className="flex flex-col gap-1">
                    <label className="text-[#e86101] text-sm font-bold">FULL NAME</label>
                    <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                         className="p-2 border-2 border-black rounded bg-[#f0ebd8] focus:outline-none focus:ring-2 focus:ring-[#54ac42]"
                    />
                </div>

                 <div className="flex flex-col gap-1">
                    <label className="text-[#e86101] text-sm font-bold">AGE</label>
                    <input 
                        type="number" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                         className="p-2 border-2 border-black rounded bg-[#f0ebd8] focus:outline-none focus:ring-2 focus:ring-[#54ac42]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[#e86101] text-sm font-bold">AVATAR URL</label>
                    <input 
                        type="text" 
                        placeholder="https://example.com/image.png"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                         className="p-2 border-2 border-black rounded bg-[#f0ebd8] focus:outline-none focus:ring-2 focus:ring-[#54ac42]"
                    />
                </div>

                {msg && (
                    <div className={`text-center text-sm font-bold ${msg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {msg}
                    </div>
                )}

                <div className="flex gap-2 mt-4">
                     <button 
                        onClick={updateProfile}
                        className="flex-1 py-3 bg-[#54ac42] text-white border-2 border-black hover:scale-105 active:translate-y-1 transition-transform shadow-[0_4px_0_#367d2a]"
                    >
                        SAVE
                    </button>
                    <button 
                        onClick={onBack}
                        className="flex-1 py-3 bg-[#e86101] text-white border-2 border-black hover:scale-105 active:translate-y-1 transition-transform shadow-[0_4px_0_#b34b00]"
                    >
                        BACK
                    </button>
                </div>
                
                 <div className="border-t-2 border-black/20 my-2"></div>

                 <button 
                    onClick={onLogout}
                    className="w-full py-2 bg-red-500 text-white border-2 border-black hover:bg-red-600 active:translate-y-1 transition-transform shadow-[0_4px_0_#991b1b]"
                >
                    LOGOUT
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
