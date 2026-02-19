import { useState, useEffect } from "react";
import { MainMenu } from "./components/MainMenu";
import { Game } from "./components/Game";
import { MapEditor } from "./components/MapEditor";
import { MapSelector } from "./components/MapSelector";
import { Profile } from "./components/Profile";
import Auth from "./components/Auth";
import { supabase } from "./utils/supabaseClient";
import type { MapData } from "./types";
import type { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [gameState, setGameState] = useState<
    "menu" | "playing" | "gameover" | "editor" | "custom-select" | "profile"
  >("menu");
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedMap, setSelectedMap] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Define this BEFORE using it anywhere
  const fetchHighScore = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("high_score")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching high score:", error.message);
      return;
    }

    if (data) {
      setHighScore(data.high_score || 0);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session?.user) {
        fetchHighScore(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session?.user) {
        fetchHighScore(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const startGame = () => {
    setSelectedMap(null);
    setGameState("playing");
    setScore(0);
  };

  const startCustomGame = (map: MapData) => {
    setSelectedMap(map);
    setGameState("playing");
    setScore(0);
  };

  const handleGameOver = async (finalScore: number) => {
    setScore(finalScore);

    // Only update high score for normal mode
    if (finalScore > highScore && !selectedMap) {
      setHighScore(finalScore);

      if (session?.user) {
        const { error } = await supabase
          .from("profiles")
          .update({ high_score: finalScore })
          .eq("id", session.user.id);

        if (error) {
          console.error("Error updating high score:", error.message);
        }
      }
    }

    setGameState("gameover");
  };

  const handleBackToMenu = () => {
    setGameState("menu");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Auth onLogin={() => {}} />;
  }

  return (
    <>
      {gameState === "menu" && (
        <div className="relative">
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow border-2 border-black font-game text-xs"
          >
            LOGOUT
          </button>

          <MainMenu
            onStart={startGame}
            onOpenEditor={() => setGameState("editor")}
            onOpenCustomMap={() => setGameState("custom-select")}
            onOpenProfile={() => setGameState("profile")}
            highScore={highScore}
          />
        </div>
      )}

      {gameState === "editor" && <MapEditor onBack={handleBackToMenu} />}

      {gameState === "custom-select" && (
        <MapSelector
          onSelect={startCustomGame}
          onBack={handleBackToMenu}
        />
      )}

      {gameState === 'profile' && session?.user && (
        <Profile 
          onBack={handleBackToMenu} 
          onLogout={handleLogout} 
          userId={session.user.id} 
        />
      )}

      {gameState === "playing" && (
        <Game onGameOver={handleGameOver} initialPipes={selectedMap?.pipes} />
      )}

      {gameState === "gameover" && (
        <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black/80 font-game z-50">
          <div className="bg-[#ded895] p-8 border-4 border-black text-center rounded-lg shadow-lg">
            <h2
              className="text-4xl text-[#f2994a] mb-6"
              style={{ textShadow: "2px 2px 0 #000" }}
            >
              {selectedMap && score === selectedMap.pipes.length
                ? "LEVEL COMPLETED!"
                : "GAME OVER"}
            </h2>

            <div className="bg-[#d0c874] p-4 border-2 border-[#b9a35a] mb-6 rounded">
              <p className="text-[#e86101] text-xl mb-2">SCORE</p>
              <p
                className="text-white text-3xl mb-4"
                style={{ textShadow: "2px 2px 0 #000" }}
              >
                {score}
              </p>

              {!selectedMap && (
                <>
                  <p className="text-[#e86101] text-xl mb-2">BEST</p>
                  <p
                    className="text-white text-3xl"
                    style={{ textShadow: "2px 2px 0 #000" }}
                  >
                    {highScore}
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={selectedMap ? () => startCustomGame(selectedMap) : startGame}
                className="px-6 py-3 bg-[#54ac42] text-white border-2 border-black hover:scale-105 active:translate-y-1 transition-transform"
                style={{ boxShadow: "0 4px 0 #367d2a" }}
              >
                PLAY AGAIN
              </button>

              <button
                onClick={handleBackToMenu}
                className="px-6 py-3 bg-[#e86101] text-white border-2 border-black hover:scale-105 active:translate-y-1 transition-transform"
                style={{ boxShadow: "0 4px 0 #b34b00" }}
              >
                MAIN MENU
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
