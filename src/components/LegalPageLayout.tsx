import { type FC, type ReactNode, useEffect, useState } from 'react';
import { PixelButton } from './ui/Button';
import { Footer } from './Footer';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
  onBack: () => void;
}

export const LegalPageLayout: FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  children,
  onBack,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      if (documentHeight > windowHeight) {
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    // Scroll to top on mount
    window.scrollTo(0, 0);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background-dark text-slate-200 font-display selection:bg-primary/30 selection:text-white">
      {/* ── Scroll Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-800 z-50">
        <div 
          className="h-full bg-linear-to-r from-primary to-game-green transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Background Subtle Effects ── */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        <div className="absolute top-[-20%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Header Area ── */}
      <div className="sticky top-0 z-10 bg-background-dark/80 backdrop-blur-xl border-b border-white/5 py-4 px-4 sm:px-8 flex justify-between items-center w-full">
        <PixelButton onClick={onBack} variant="secondary" size="sm">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            BACK
          </span>
        </PixelButton>
        <div className="text-xl font-bold tracking-widest text-white italic logo-3d sm:hidden select-none">
          WT
        </div>
        <div className="hidden sm:block text-2xl font-black tracking-tighter text-white italic logo-3d select-none">
          WINGTRIALS
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-12 sm:py-20 flex flex-col gap-12">
        {/* Title Section */}
        <header className="flex flex-col items-center justify-center text-center gap-4 mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-2">
            {title}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="material-symbols-outlined text-sm text-slate-400">calendar_month</span>
            <span className="text-sm font-semibold text-slate-400 tracking-wide uppercase">
              Last updated: {lastUpdated}
            </span>
          </div>
        </header>

        {/* The Document Content */}
        <div className="flex flex-col gap-8 text-base sm:text-lg leading-relaxed text-slate-300">
          {children}
        </div>
      </main>

      {/* ── Footer ── */}
      <div className="relative z-10 mt-auto px-4 max-w-5xl mx-auto w-full">
        <Footer />
      </div>
    </div>
  );
};
