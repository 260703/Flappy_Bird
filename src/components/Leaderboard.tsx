import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

interface LeaderboardProps {
  onBack: () => void;
  isGuest: boolean;
  onOpenAuth: () => void;
  userId?: string;
}

interface ProfileRecord {
  id: string;
  username: string;
  avatar_url?: string;
  high_score: number;
}

export const Leaderboard = ({
  onBack,
  isGuest,
  onOpenAuth,
  userId,
}: LeaderboardProps) => {
  const [activeTab, setActiveTab] = useState<"all_time" | "weekly" | "daily">(
    "all_time",
  );
  const [scores, setScores] = useState<ProfileRecord[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<{
    rank: number;
    score: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .rpc('get_leaderboard', { time_filter: activeTab });

      if (!error && data) {
        setScores(data);

        // Find current user rank within this tab's top 50
        if (!isGuest && userId) {
          const userIndex = data.findIndex((p: ProfileRecord) => p.id === userId);
          if (userIndex !== -1) {
            setCurrentUserRank({
              rank: userIndex + 1,
              score: data[userIndex].high_score,
            });
          } else {
            // Find their best score in history explicitly for this time tab context
            // Since this could get complicated, let's simply get their global high score to show
            const { data: userData } = await supabase
              .from("profiles")
              .select("high_score")
              .eq("id", userId)
              .single();

            if (userData) {
              setCurrentUserRank({ rank: 0, score: userData.high_score });
            }
          }
        }
      } else {
         console.error(error);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, [activeTab, isGuest, userId]);

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen relative overflow-hidden flex flex-col items-center justify-center w-full px-4 py-8">
      {/* Blurred Background Layer */}
      <div
        className="absolute inset-0 z-0 scale-110 blur-xl opacity-40 dark:opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDz6JFgGD257M8MLN5edzDgJEqS6INGjobSkTbeXgWpi4xXAx5vEBjxYpoNHKVro94uiLZHxcMlqNggU0cKx5k0PUAKomLaoOVDmCfBTZHgp6CXfFVhvps97sqElmhwPuIT7waA4GP243oSnv95G5wGO2rNjveo65YHunGOzDVyequoxbr7H1eV66_vlPgwbevV5arZnGk4mmvEr7Iqu6EN8ufWiQUtqE_3PaS0fiwAodaLRoeJeZn6HtufUeR4Uky7fXbNvdzlHijo')",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Back Button & Header */}
        <div className="w-full flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold transition-all hover:bg-primary hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back
            </span>
            <span>Back</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-12 bg-primary rounded-full shadow-[0_0_20px_rgba(37,157,244,0.4)] border border-white/20 shrink-0">
              <span className="material-symbols-outlined text-white">
                leaderboard
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 uppercase italic drop-shadow-sm">
              Hall of Fame
            </h1>
          </div>
          <div className="w-[88px]"></div> {/* Spacer for centering */}
        </div>

        {/* Leaderboard Card */}
        <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/30 dark:border-slate-700/50 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 p-2 gap-1">
            <button
              onClick={() => setActiveTab("all_time")}
              className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${activeTab === "all_time" ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
            >
              All Time
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${activeTab === "weekly" ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab("daily")}
              className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${activeTab === "daily" ? "bg-primary text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
            >
              Daily
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center p-12 text-slate-400 font-bold">
                Loading records...
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    <th className="px-8 py-5 font-semibold">Rank</th>
                    <th className="px-8 py-5 font-semibold">Player</th>
                    <th className="px-8 py-5 font-semibold text-right">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 dark:text-slate-100">
                  {scores.length > 0 ? (
                    scores.map((score, index) => {
                      const rank = index + 1;
                      const isFirst = rank === 1;

                      return (
                        <tr
                          key={score.id}
                          className={
                            isFirst
                              ? "group relative bg-amber-400/10 dark:bg-amber-400/5 border-b border-amber-400/20"
                              : "border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                          }
                        >
                          <td className="px-8 py-5">
                            {isFirst ? (
                              <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center size-8 rounded-full bg-amber-400 text-amber-900 font-extrabold text-sm">
                                  1
                                </span>
                                <span
                                  className="material-symbols-outlined text-amber-500"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  workspace_premium
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-500 dark:text-slate-400 font-bold text-lg">
                                {rank}
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div
                                className={`size-10 rounded-full overflow-hidden flex items-center justify-center ${isFirst ? "bg-primary/20 border-2 border-amber-400" : "bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"}`}
                              >
                                {score.avatar_url ? (
                                  <img
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                    src={score.avatar_url}
                                  />
                                ) : (
                                  <span className="material-symbols-outlined text-slate-400 text-2xl">
                                    person
                                  </span>
                                )}
                              </div>
                              <span
                                className={`font-semibold ${isFirst ? "text-lg" : ""}`}
                              >
                                {score.username || "Anonymous"}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right flex-col justify-center">
                            <span
                              className={`font-bold ${isFirst ? "text-amber-500 text-xl font-black tracking-tight" : "text-slate-700 dark:text-slate-300"}`}
                            >
                              {score.high_score.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-12 text-slate-500 font-bold"
                      >
                        No scores recorded yet!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Current User Rank Footer / Guest Prompt */}
          <div className="bg-primary/10 dark:bg-primary/5 p-6 border-t border-primary/20">
            {isGuest ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-slate-600 dark:text-slate-400 font-bold text-sm">
                  Login or create an account to view your leaderboard position!
                </p>
                <button
                  onClick={onOpenAuth}
                  className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition-colors uppercase tracking-wider text-sm"
                >
                  Login / Create Account
                </button>
              </div>
            ) : currentUserRank ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full border-2 border-primary overflow-hidden shadow-lg shadow-primary/20 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    {/* The user's active profile image could be retrieved, but fallback to icon */}
                    <span className="material-symbols-outlined text-slate-400 text-2xl">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">
                      Your Position
                    </p>
                    <p className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                      You
                    </p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                      Rank
                    </p>
                    <p className="text-xl font-black text-primary">
                      #{currentUserRank.rank > 0 ? currentUserRank.rank : "50+"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                      Personal Best
                    </p>
                    <p className="text-xl font-black text-primary">
                      {currentUserRank.score.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
