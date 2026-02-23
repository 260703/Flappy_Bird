import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onSwitchMode: () => void;
  loading: boolean;
  error: string | null;
}

export default function LoginForm({
  onLogin,
  onGoogleLogin,
  onSwitchMode,
  loading,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setValidationError('Please enter your email');
      return;
    }
    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters');
      return;
    }

    onLogin(trimmedEmail, password);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 w-full">
      <div className="glass-card w-full max-w-xl p-6 lg:p-10 rounded-3xl shadow-2xl flex flex-col items-center relative z-20">
        {/* Premium Shine Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none"></div>

        {/* Game Icon/Logo */}
        <div className="mb-3 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--color-primary)]/30 blur-xl rounded-full"></div>
            <span className="material-symbols-outlined text-[var(--color-primary)] text-6xl relative">
              potted_plant
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-primary)] tracking-tighter mb-2 italic font-display">
            LOGIN
          </h2>
          <p className="text-white/60 text-sm font-medium tracking-wide uppercase font-display">
            Enter the Remastered Skies
          </p>
        </div>

        {(error || validationError) && (
          <div className="w-full bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {validationError || error}
          </div>
        )}

        {/* Login Form */}
        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-semibold ml-4 font-display">
              Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                mail
              </span>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-display"
                placeholder="pilot@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-4">
              <label className="text-white/80 text-sm font-semibold font-display">
                Password
              </label>
              <a
                className="text-[var(--color-primary)]/80 hover:text-[var(--color-primary)] text-xs font-bold transition-colors font-display"
                href="#"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                lock
              </span>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-display"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 pt-2">
            <input
              className="w-5 h-5 rounded-full border-white/10 bg-white/5 text-[var(--color-primary)] focus:ring-offset-[var(--color-background-dark)] focus:ring-[var(--color-primary)]"
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              className="text-white/60 text-sm cursor-pointer select-none font-display"
              htmlFor="remember"
            >
              Remember Me
            </label>
          </div>

          <button
            className="w-full bg-[var(--color-primary)] text-white font-black text-lg py-5 rounded-full glow-button uppercase tracking-widest mt-4 font-display disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Enter Game'}
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="w-full flex items-center gap-4 my-5">
          <div className="h-[1px] flex-1 bg-white/10"></div>
          <span className="text-white/30 text-xs font-bold uppercase tracking-widest font-display">
            Connect With
          </span>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 w-full">
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full py-3 transition-all font-display disabled:opacity-50"
            onClick={onGoogleLogin}
            disabled={loading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
            </svg>
            <span className="text-sm font-bold uppercase tracking-tight">
              Google
            </span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-white/60 text-sm font-display">
          New to the skies?{' '}
          <button
            className="text-[var(--color-primary)] font-bold hover:underline transition-all"
            onClick={onSwitchMode}
          >
            Sign Up Now
          </button>
        </p>
      </div>
    </div>
  );
}
