import { useState, useEffect, type FC } from 'react';
import { supabase } from '../utils/supabaseClient';

interface ProfileProps {
  onBack: () => void;
  onLogout: () => void;
  userId: string;
}

export const Profile: FC<ProfileProps> = ({ onBack, onLogout, userId }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');

  // Validation helpers
  const sanitizeText = (text: string) => text.trim().replace(/[<>"'&]/g, '');

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

      const trimmedUsername = sanitizeText(username);
      const trimmedFullName = sanitizeText(fullName);
      const parsedAge = parseInt(age) || 0;

      if (trimmedUsername && !/^[a-zA-Z0-9_]{3,20}$/.test(trimmedUsername)) {
        setMsg('Error: Username must be 3-20 chars (letters, numbers, underscores)');
        setLoading(false);
        return;
      }
      if (trimmedFullName && !/^[a-zA-Z\s]{2,50}$/.test(trimmedFullName)) {
        setMsg('Error: Full name must be 2-50 chars (letters and spaces)');
        setLoading(false);
        return;
      }
      if (parsedAge && (parsedAge < 1 || parsedAge > 120)) {
        setMsg('Error: Age must be between 1 and 120');
        setLoading(false);
        return;
      }

      let finalAvatarUrl = avatarUrl;

      // Upload image if a new file is selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${userId}_${Math.random()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) {
          setMsg(`Error uploading image: ${uploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        finalAvatarUrl = publicUrl;
      }

      const updates = {
        id: userId,
        username: trimmedUsername,
        full_name: trimmedFullName,
        age: parsedAge,
        avatar_url: finalAvatarUrl,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 font-display text-slate-100 bg-black/50 backdrop-blur-sm">
      <div className="flex h-full grow flex-col max-w-[560px] w-full items-center justify-center">
        {/* Main Profile Card */}
        <div className="w-full bg-background-dark/85 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative">
          
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm rounded-xl">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Header with Back Button */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <button 
              onClick={onBack}
              className="flex items-center justify-center size-8 sm:size-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <span className="material-symbols-outlined text-sm sm:text-base">arrow_back</span>
            </button>
            <h2 className="text-white text-lg sm:text-xl font-extrabold tracking-tight">Edit Profile</h2>
            <div className="size-8 sm:size-10"></div> {/* Spacer for symmetry */}
          </header>

          <div className="px-6 py-4 flex flex-col gap-4 overflow-y-auto">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="size-24 sm:size-28 rounded-full p-1 bg-linear-to-tr from-game-green via-primary to-game-orange animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_20px_rgba(37,157,244,0.4)]">
                  <div className="size-full rounded-full overflow-hidden bg-background-dark border-4 border-background-dark flex items-center justify-center">
                    {(avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl) ? (
                        <img 
                          src={avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl} 
                          alt="Avatar" 
                          className="w-full h-full object-cover" 
                        />
                    ) : (
                        <span className="text-4xl text-gray-500 font-bold">?</span>
                    )}
                  </div>
                </div>
                {/* Visual purely for aesthetics, actual click target is below */}
                <div className="absolute bottom-0 right-0 size-8 sm:size-10 bg-primary rounded-full flex items-center justify-center border-4 border-background-dark text-white">
                  <span className="material-symbols-outlined text-xs sm:text-sm">edit</span>
                </div>
              </div>
              
              {/* Upload Avatar UI */}
              <div className="w-full flex flex-col items-center gap-1">
                <p className="text-white/60 text-xs sm:text-sm font-medium">Update your look</p>
                <label className="w-full cursor-pointer group">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl py-3 group-hover:border-primary/50 transition-colors bg-white/5">
                    <span className="material-symbols-outlined text-white/40 mb-1 group-hover:text-primary/70 transition-colors text-sm sm:text-base">cloud_upload</span>
                    <span className="text-white/80 text-xs sm:text-sm font-bold group-hover:text-white transition-colors">
                      {avatarFile ? avatarFile.name : "Choose Profile Picture"}
                    </span>
                    <input 
                      className="hidden" 
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                              setAvatarFile(e.target.files[0]);
                              setAvatarUrl('');
                          }
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-3 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 text-xs sm:text-sm font-bold px-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">person</span> Username
                </label>
                <input 
                  className="w-full h-11 sm:h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-white/20" 
                  placeholder="Enter username" 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 text-xs sm:text-sm font-bold px-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">badge</span> Full Name
                </label>
                <input 
                  className="w-full h-11 sm:h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-white/20" 
                  placeholder="Enter full name" 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/70 text-xs sm:text-sm font-bold px-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">calendar_today</span> Age
                </label>
                <input 
                  className="w-full h-11 sm:h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-white/20" 
                  placeholder="Enter age" 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            {msg && (
                <div className={`text-center text-xs sm:text-sm font-bold p-2 sm:p-3 rounded-lg ${msg.includes('Error') ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-green-500/20 text-green-400 border border-green-500/50'}`}>
                    {msg}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={onBack}
                disabled={loading}
                className="flex-1 h-12 bg-game-orange text-white font-extrabold text-sm sm:text-base rounded-xl shadow-[0_4px_0_#c2410c] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_4px_0_#c2410c]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
                Discard
              </button>
              <button 
                onClick={updateProfile}
                disabled={loading}
                className="flex-1 h-12 bg-game-green text-white font-extrabold text-sm sm:text-base rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_4px_0_#15803d]"
              >
                <span className="material-symbols-outlined text-lg">check</span>
                Save Changes
              </button>
            </div>

            {/* Footer Options */}
            <div className="flex flex-col items-center gap-4 mt-2">
              <div className="h-px w-full bg-white/10"></div>
              <button 
                onClick={onLogout}
                disabled={loading}
                className="flex items-center gap-2 text-game-red text-sm sm:text-base font-bold hover:scale-105 transition-transform group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">logout</span>
                Logout from Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
