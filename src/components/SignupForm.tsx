import React, { useState } from 'react';

interface SignupFormProps {
  onSignup: (data: {
    email: string;
    username: string;
    fullName: string;
    age: number;
    password: string;
  }) => Promise<void>;
  onSwitchMode: () => void;
  loading: boolean;
  error: string | null;
}

// Validation helpers
const sanitizeText = (text: string) => text.trim().replace(/[<>"'&]/g, '');
const isValidUsername = (u: string) => /^[a-zA-Z0-9_]{3,20}$/.test(u);
const isValidFullName = (n: string) => /^[a-zA-Z\s]{2,50}$/.test(n);
const isValidAge = (a: number) => Number.isInteger(a) && a >= 1 && a <= 120;
const isValidPassword = (p: string) => p.length >= 8;

export default function SignupForm({
  onSignup,
  onSwitchMode,
  loading,
  error,
}: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedUsername = sanitizeText(username);
    const trimmedFullName = sanitizeText(fullName);
    const trimmedEmail = email.trim();
    const parsedAge = parseInt(age) || 0;

    if (!isValidUsername(trimmedUsername)) {
      setValidationError('Username must be 3-20 characters (letters, numbers, underscores only)');
      return;
    }
    if (!isValidFullName(trimmedFullName)) {
      setValidationError('Full name must be 2-50 characters (letters and spaces only)');
      return;
    }
    if (!isValidAge(parsedAge)) {
      setValidationError('Age must be between 1 and 120');
      return;
    }
    if (!isValidPassword(password)) {
      setValidationError('Password must be at least 8 characters');
      return;
    }

    onSignup({
      email: trimmedEmail,
      username: trimmedUsername,
      fullName: trimmedFullName,
      age: parsedAge,
      password,
    });
  };

  return (
    <div className="glass-card w-full max-w-2xl p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
      {/* Premium Shine Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none"></div>

      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[var(--color-primary)]/30">
          <span className="material-symbols-outlined text-white text-4xl">
            flutter_dash
          </span>
        </div>
        <h1 className="text-white text-4xl font-extrabold tracking-tighter arcade-glow font-display">
          SIGN UP
        </h1>
        <p className="text-slate-400 text-sm font-medium font-display">
          Join the next generation of arcade legends
        </p>
      </div>

      {(error || validationError) && (
        <div className="w-full bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center font-display">
          {validationError || error}
        </div>
      )}

      {/* Registration Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-300 text-xs font-bold uppercase tracking-widest px-2 font-display">
            Email Address
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
              mail
            </span>
            <input
              className="w-full h-14 pl-12 pr-6 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-300 font-display"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Username & Full Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-widest px-2 font-display">
              Username
            </label>
            <input
              className="w-full h-14 px-6 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-display"
              placeholder="Gamer tag"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-widest px-2 font-display">
              Age
            </label>
            <input
              className="w-full h-14 px-6 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-display"
              placeholder="Years"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Full Name Field */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-300 text-xs font-bold uppercase tracking-widest px-2 font-display">
            Full Name
          </label>
          <input
            className="w-full h-14 px-6 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-display"
            placeholder="Your full name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-300 text-xs font-bold uppercase tracking-widest px-2 font-display">
            Password
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
              lock
            </span>
            <input
              className="w-full h-14 pl-12 pr-12 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-display"
              placeholder="Create a strong password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          className="mt-4 w-full h-14 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold text-lg rounded-full shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all font-display disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>

      {/* Footer Link */}
      <div className="flex flex-col items-center gap-4">
        <div className="h-px w-full bg-white/10"></div>
        <p className="text-slate-400 text-sm font-display">
          Already have an account?{' '}
          <button
            className="text-[var(--color-primary)] font-bold hover:underline ml-1 transition-all"
            onClick={onSwitchMode}
          >
            Login
          </button>
        </p>
      </div>

      {/* Footer Small Print */}
      <div className="mt-8 text-white/50 text-xs flex gap-6 justify-center font-display">
        <a className="hover:text-white transition-colors" href="#">
          Terms of Service
        </a>
        <a className="hover:text-white transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-white transition-colors" href="#">
          Help Center
        </a>
      </div>
    </div>
  );
}
