import { type FC } from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`w-full py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-slate-400 text-sm font-semibold tracking-wide border-t border-white/5 bg-transparent ${className}`}>
      <Link 
        to="/privacy"
        className="hover:text-primary transition-colors hover:underline underline-offset-4 outline-none"
      >
        Privacy Policy
      </Link>
      <span className="hidden sm:inline text-white/20">•</span>
      <Link 
        to="/terms"
        className="hover:text-primary transition-colors hover:underline underline-offset-4 outline-none"
      >
        Terms of Service
      </Link>
    </footer>
  );
};
