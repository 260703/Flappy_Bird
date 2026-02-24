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
    "menu" | "playing" | "gameover" | "editor" | "custom-select" | "profile" | "auth"
  >("menu");
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedMap, setSelectedMap] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingScore, setPendingScore] = useState<number | null>(null);

  // Ensure a profile exists for the current user (handles OAuth edge cases)
  const ensureProfileExists = async (userId: string, email: string, fullName?: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (!data) {
      // Profile doesn't exist — create it
      const username = email ? email.split("@")[0] : "player";
      await supabase.from("profiles").upsert({
        id: userId,
        username,
        full_name: fullName || "",
        age: 0,
        high_score: 0,
      });
    }
  };

  const fetchHighScore = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("high_score")
      .eq("id", userId)
      .single();

    if (error) {
      console.warn("Could not fetch high score:", error.message);
      setHighScore(0);
      return;
    }

    if (data) {
      setHighScore(data.high_score || 0);
    }
  };

  // Effect 1: Auth state listener — ONLY sets session, no API calls here
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setHighScore(0);
        setLoading(false);
      }
      // If we were on the auth screen, go back to menu after successful login
      if (session?.user) {
        setGameState((prev) => (prev === 'auth' ? 'menu' : prev));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Effect 2: When session changes, load profile & high score (safely, with catch)
  useEffect(() => {
    if (!session?.user) return;

    let cancelled = false;

    const loadUserData = async () => {
      try {
        await ensureProfileExists(
          session.user.id,
          session.user.email || "",
          session.user.user_metadata?.full_name
        );
        if (cancelled) return;

        // If there's a pending score from guest play, save it now
        if (pendingScore !== null && pendingScore > 0) {
          await supabase.rpc('update_high_score', { new_score: pendingScore });
          setPendingScore(null);
        }

        await fetchHighScore(session.user.id);
      } catch (err) {
        console.error("Error loading user data:", err);
        if (!cancelled) setHighScore(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUserData();

    return () => { cancelled = true; };
  }, [session?.user?.id]);

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
        // Use server-side function for secure score update
        const { error } = await supabase.rpc('update_high_score', {
          new_score: finalScore,
        });

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

  const handleOpenAuth = () => {
    setGameState("auth");
  };

  const handleLoginToSaveScore = () => {
    // Store the guest's score so it can be saved after login
    setPendingScore(score);
    setGameState("auth");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      {gameState === "menu" && (
          <MainMenu
            onStart={startGame}
            onOpenEditor={() => setGameState("editor")}
            onOpenCustomMap={() => setGameState("custom-select")}
            onOpenProfile={() => session ? setGameState("profile") : setGameState("auth")}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
            highScore={highScore}
            isGuest={!session}
            isLoggedIn={!!session}
          />
      )}

      {gameState === "editor" && <MapEditor onBack={handleBackToMenu} />}

      {gameState === "custom-select" && (
        <MapSelector
          onSelect={startCustomGame}
          onBack={handleBackToMenu}
        />
      )}

      {gameState === "auth" && (
        <Auth onLogin={() => setGameState("menu")} onBack={handleBackToMenu} />
      )}

      {gameState === 'profile' && session?.user && (
        <Profile 
          onBack={handleBackToMenu} 
          onLogout={handleLogout} 
          userId={session.user.id} 
        />
      )}

      {gameState === "playing" && (
        <Game 
          onGameOver={handleGameOver} 
          initialPipes={selectedMap?.pipes} 
        />
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
              {!session && (
                <button
                  onClick={handleLoginToSaveScore}
                  className="px-6 py-3 bg-blue-500 text-white border-2 border-black hover:scale-105 active:translate-y-1 transition-transform"
                  style={{ boxShadow: "0 4px 0 #2563eb" }}
                >
                  LOGIN TO SAVE SCORE
                </button>
              )}

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
