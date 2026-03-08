import { type FC } from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  className?: string;
}

export const Footer: FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, className = '' }) => {
  return (
    <footer className={`w-full py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-slate-400 text-sm font-semibold tracking-wide border-t border-white/5 bg-transparent ${className}`}>
      <button 
        onClick={onOpenPrivacy}
        className="hover:text-primary transition-colors hover:underline underline-offset-4 outline-none"
      >
        Privacy Policy
      </button>
      <span className="hidden sm:inline text-white/20">•</span>
      <button 
        onClick={onOpenTerms}
        className="hover:text-primary transition-colors hover:underline underline-offset-4 outline-none"
      >
        Terms of Service
      </button>
    </footer>
  );
};
