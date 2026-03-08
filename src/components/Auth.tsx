import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { PixelButton } from './ui/Button';
import { Footer } from './Footer';

interface AuthProps {
  onLogin: () => void;
  onBack?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export default function Auth({ onLogin, onBack, onOpenPrivacy, onOpenTerms }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async ({
    email,
    username,
    fullName,
    age,
    password,
  }: {
    email: string;
    username: string;
    fullName: string;
    age: number;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
            age: age,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Create profile record
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            username,
            full_name: fullName,
            age: age,
          },
        ]);

        if (profileError) throw profileError;
        onLogin(); // Auto login after signup
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen w-screen overflow-y-auto flex flex-col font-display">
      {/* Background Layer with Blur */}
      <div
        className="fixed inset-0 z-0 bg-game-world scale-110 blur-md pointer-events-none"
        data-alt="Artistic blurred flappy bird game world with blue sky and green hills"
      ></div>
      
      {onBack && (
        <div className="absolute top-4 left-4 z-50">
          <PixelButton onClick={onBack} variant="secondary" size="sm">
            BACK TO MENU
          </PixelButton>
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          {mode === 'login' ? (
              <LoginForm
                  onLogin={handleLogin}
                  onGoogleLogin={handleGoogleLogin}
                  onSwitchMode={() => {
                      setMode('signup');
                      setError(null);
                  }}
                  loading={loading}
                  error={error}
              />
          ) : (
              <SignupForm
                  onSignup={handleSignup}
                  onSwitchMode={() => {
                      setMode('login');
                      setError(null);
                  }}
                  loading={loading}
                  error={error}
              />
          )}
      </div>

      {onOpenPrivacy && onOpenTerms && (
        <div className="relative z-10 w-full mt-auto">
          <Footer onOpenPrivacy={onOpenPrivacy} onOpenTerms={onOpenTerms} />
        </div>
      )}

      {/* Floating Decorative Assets (Subtle) */}
      <div className="fixed top-20 right-20 opacity-20 hidden lg:block pointer-events-none">
        <div className="bg-white/40 w-24 h-8 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}
