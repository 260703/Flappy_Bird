import { type FC } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PrivacyPolicyProps {
  onBack: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const AnimatedSection: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useScrollAnimation(0.2);
  
  return (
    <section 
      ref={ref} 
      className={`opacity-0 translate-y-4 transition-all duration-500 ease-out fill-mode-forwards ${className}`}
    >
      {children}
    </section>
  );
};

export const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ onBack, onOpenPrivacy, onOpenTerms }) => {
  return (
    <LegalPageLayout 
      title="Privacy Policy" 
      lastUpdated="March 2026" 
      onBack={onBack}
      onOpenPrivacy={onOpenPrivacy}
      onOpenTerms={onOpenTerms}
    >
      <AnimatedSection className="prose prose-invert prose-slate max-w-none">
        <p className="text-xl font-medium text-slate-200 mb-8 border-l-4 border-primary pl-4 py-1 bg-white/5 rounded-r w-fit">
          Welcome to WingTrials, a web-based game created and operated by Kuldeep Kumar.
        </p>
        <p className="mb-6">
          This Privacy Policy explains how information is collected, used, and protected when you use the WingTrials website and services.
        </p>
        <p className="mb-12 text-slate-400 italic">
          By using WingTrials, you agree to the practices described in this Privacy Policy.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">1</span>
          Information We Collect
        </h2>
        
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Account Information</h3>
            <p className="mb-3">When you sign in using Google authentication, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
              <li>Email address</li>
              <li>Basic account identifier</li>
              <li>Username used within the game</li>
            </ul>
            <p className="text-sm text-yellow-500/80 bg-yellow-500/10 p-3 rounded border border-yellow-500/20">
              WingTrials does not access your Gmail inbox, contacts, or other Google account data.
            </p>
          </div>

          <div className="h-px w-full bg-white/5 my-4" />

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Profile Information</h3>
            <p className="mb-3">Users may optionally upload a profile image to personalize their game profile. Profile images are:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Uploaded voluntarily by the user</li>
              <li>Stored securely for use within the game interface</li>
            </ul>
          </div>

          <div className="h-px w-full bg-white/5 my-4" />

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Gameplay Data</h3>
            <p className="mb-3">To support the leaderboard and gameplay features, WingTrials stores:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Game scores</li>
              <li>Leaderboard rankings</li>
              <li>Player usernames</li>
              <li>Custom maps created by players</li>
              <li>Map usage statistics</li>
            </ul>
          </div>

          <div className="h-px w-full bg-white/5 my-4" />

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Custom Maps</h3>
            <p className="mb-3">WingTrials allows users to create and share custom maps. When a user creates a map, the following may be stored:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Map configuration data</li>
              <li>Map creator username</li>
              <li>Map play statistics</li>
            </ul>
            <p className="mt-4 italic">These maps may be publicly playable by other users within the game.</p>
          </div>

          <div className="h-px w-full bg-white/5 my-4" />

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Guest Users</h3>
            <p className="mb-3">WingTrials allows users to play as Guest Users without creating an account. Guest users:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
              <li>Can play the game</li>
              <li>Do not have scores stored permanently</li>
              <li>Cannot access leaderboards</li>
              <li>Cannot create or play custom maps</li>
            </ul>
            <p className="text-sm text-success/80 bg-success/10 p-3 rounded border border-success/20">
              Guest sessions do not store personal account data.
            </p>
          </div>

          <div className="h-px w-full bg-white/5 my-4" />

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Analytics Information</h3>
            <p className="mb-3">WingTrials uses Vercel Analytics to understand how the website is used. Analytics may collect limited technical information such as:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
              <li>Pages visited</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>General usage patterns</li>
            </ul>
            <p className="mb-3">This data is used only to improve the performance and user experience of the game.</p>
            <p className="text-sm italic text-slate-400">WingTrials currently does not use Google Analytics, but analytics tools may be added in the future.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">2</span>
          How We Use Information
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">Collected information is used to:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-300 mb-6">
            <li>Provide login and account functionality</li>
            <li>Maintain game leaderboards</li>
            <li>Store and display custom maps</li>
            <li>Improve gameplay experience</li>
            <li>Monitor site performance and stability</li>
          </ul>
          <div className="bg-slate-900 border-l-4 border-game-green p-4 rounded-r">
            <p className="font-bold text-game-green tracking-wide">WingTrials does not sell, rent, or trade personal information.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">3</span>
          Data Storage
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">Game data and user account information are stored using secure third-party infrastructure, including:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-300 mb-6">
            <li><strong className="text-white">Supabase</strong> for authentication and database services</li>
            <li><strong className="text-white">Vercel</strong> for website hosting and analytics</li>
          </ul>
          <p>These services maintain their own security practices to protect user data.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">4</span>
          Third-Party Services
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">WingTrials relies on third-party services to operate. These include:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-300 mb-6">
            <li>Google Authentication</li>
            <li>Supabase</li>
            <li>Vercel</li>
          </ul>
          <p className="text-sm italic text-slate-400">Each service may process limited data according to their own privacy policies.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">5</span>
          Age Restrictions
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4 text-lg">WingTrials is intended for users aged <strong className="text-white">13 years or older.</strong></p>
          <p className="mb-4">If you are under the age of 13, you should not create an account or submit personal information.</p>
          <p className="text-game-orange font-medium bg-game-orange/10 p-3 rounded border border-game-orange/20">
            If we discover that personal information from a child under 13 has been collected, it will be removed.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">6</span>
          Future Features
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">In the future, WingTrials may introduce features such as:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-300 mb-6">
            <li>Advertisements</li>
            <li>Cosmetic items</li>
            <li>Optional in-game purchases</li>
          </ul>
          <p>If these features are introduced, this Privacy Policy will be updated accordingly.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">7</span>
          Data Security
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">WingTrials takes reasonable measures to protect user data from unauthorized access, misuse, or loss.</p>
          <p className="italic text-slate-400">However, no internet service can guarantee absolute security.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">8</span>
          User Rights
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="flex-1">
            <p className="mb-2">Users may request deletion of their account or stored data by contacting:</p>
            <a href="mailto:wingtrials@gmail.com" className="text-primary hover:text-white font-bold transition-colors underline underline-offset-4 decoration-primary/50 text-xl inline-block mt-2 mb-4">
              wingtrials@gmail.com
            </a>
            <p className="text-sm text-slate-400">Requests will be processed within a reasonable timeframe.</p>
          </div>
          <div className="hidden sm:flex size-16 rounded-full bg-primary/10 items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl text-primary">mail</span>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">9</span>
          Changes to This Policy
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-2">This Privacy Policy may be updated from time to time to reflect improvements or legal requirements.</p>
          <p className="text-slate-400">Updates will be posted on this page with the updated date.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">10</span>
          Contact Information
        </h2>
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-8xl">contact_support</span>
          </div>
          <div className="relative z-10">
            <p className="mb-6 text-lg">If you have questions regarding this Privacy Policy, please contact:</p>
            <div className="grid gap-4 bg-black/20 p-6 rounded-lg border border-white/5 w-fit">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Operator</p>
                <p className="text-xl font-bold text-white">Kuldeep Kumar</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:wingtrials@gmail.com" className="text-primary hover:text-white transition-colors text-lg">
                  wingtrials@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </LegalPageLayout>
  );
};
