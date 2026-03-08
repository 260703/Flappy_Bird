import { type FC } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface TermsOfServiceProps {
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

export const TermsOfService: FC<TermsOfServiceProps> = ({ onBack, onOpenPrivacy, onOpenTerms }) => {
  return (
    <LegalPageLayout 
      title="Terms of Service" 
      lastUpdated="March 2026" 
      onBack={onBack}
      onOpenPrivacy={onOpenPrivacy}
      onOpenTerms={onOpenTerms}
    >
      <AnimatedSection className="prose prose-invert prose-slate max-w-none">
        <p className="text-xl font-medium text-slate-200 mb-8 border-l-4 border-primary pl-4 py-1 bg-white/5 rounded-r w-fit">
          These Terms of Service ("Terms") govern your access to and use of the WingTrials website and game services operated by Kuldeep Kumar.
        </p>
        <p className="mb-12 text-slate-400 italic">
          By accessing or using WingTrials, you agree to these Terms.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">1</span>
          Acceptance of Terms
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">By accessing or using WingTrials, you agree to comply with these Terms of Service and all applicable laws.</p>
          <div className="bg-game-orange/10 border-l-4 border-game-orange p-4 rounded-r mt-4">
            <p className="font-bold text-game-orange tracking-wide">If you do not agree with these Terms, you should not use the WingTrials service.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">2</span>
          Eligibility
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4 text-lg">WingTrials is intended for users <strong className="text-white">13 years of age or older.</strong></p>
          <p className="mb-3">By using the service, you confirm that:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-success text-sm">check_circle</span>
              You are at least 13 years old
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-success text-sm">check_circle</span>
              You have permission to use the service in your jurisdiction
            </li>
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">3</span>
          Accounts and Authentication
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5 space-y-8">
          <p className="text-lg">Users may access WingTrials in two ways:</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">person_off</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">person_off</span>
                Guest Access
              </h3>
              <p className="mb-4 text-slate-300">Guest users may play the game without creating an account.</p>
              <p className="font-medium text-slate-400 mb-2 uppercase tracking-wide text-xs">Guest users cannot:</p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2 opacity-70">
                  <span className="material-symbols-outlined text-red-400 text-sm">close</span>
                  save scores
                </li>
                <li className="flex items-center gap-2 opacity-70">
                  <span className="material-symbols-outlined text-red-400 text-sm">close</span>
                  access leaderboards
                </li>
                <li className="flex items-center gap-2 opacity-70">
                  <span className="material-symbols-outlined text-red-400 text-sm">close</span>
                  create or play custom maps
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                Registered Users
              </h3>
              <p className="mb-4 text-slate-300">Users may create an account using Google authentication.</p>
              <p className="font-medium text-primary mb-2 uppercase tracking-wide text-xs">Registered users may:</p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-sm">check</span>
                  save scores
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-sm">check</span>
                  participate in leaderboards
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-sm">check</span>
                  create and share custom maps
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-sm">check</span>
                  upload a profile image
                </li>
              </ul>
            </div>
          </div>
          
          <p className="mt-6 text-center italic text-slate-400 border-t border-white/10 pt-6">
            Users are responsible for maintaining the security of their accounts.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">4</span>
          User-Generated Content
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">WingTrials allows users to create custom maps that can be played by other users.</p>
          <p className="mb-3">By submitting custom maps, you agree that:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-300 mb-6">
            <li>Your content does not violate laws or copyrights</li>
            <li>Your content does not contain harmful or abusive material</li>
            <li>Your content may be publicly visible to other users</li>
          </ul>
          <div className="bg-slate-900 border-l-4 border-primary p-4 rounded-r">
            <p className="text-white">WingTrials reserves the right to remove any user-generated content that violates these Terms.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-red-500/20 text-red-500 text-sm">5</span>
          Prohibited Conduct
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
          <p className="mb-4 text-lg font-medium text-white">Users agree not to:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/10">
              <span className="material-symbols-outlined text-red-400">gavel</span>
              <span className="text-slate-300">cheat or manipulate leaderboard scores</span>
            </div>
            <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/10">
              <span className="material-symbols-outlined text-red-400">bug_report</span>
              <span className="text-slate-300">exploit bugs or vulnerabilities</span>
            </div>
            <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/10">
              <span className="material-symbols-outlined text-red-400">block</span>
              <span className="text-slate-300">upload harmful or offensive content</span>
            </div>
            <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/10">
              <span className="material-symbols-outlined text-red-400">masks</span>
              <span className="text-slate-300">impersonate other users</span>
            </div>
            <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/10">
              <span className="material-symbols-outlined text-red-400">report</span>
              <span className="text-slate-300">attempt to disrupt or damage the service</span>
            </div>
            <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/10">
              <span className="material-symbols-outlined text-red-400">coronavirus</span>
              <span className="text-slate-300">upload malicious files or code</span>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-lg">
            <p className="text-red-400 font-bold mb-2 uppercase tracking-wide text-sm">Violation of these rules may result in:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li>removal of scores</li>
              <li>removal of maps</li>
              <li>suspension or termination of accounts</li>
            </ul>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">6</span>
          Leaderboards and Scores
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">WingTrials maintains leaderboards for competitive gameplay.</p>
          <p className="mb-3">The operator reserves the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-6">
            <li>reset scores</li>
            <li>remove suspicious scores</li>
            <li>remove players suspected of cheating</li>
          </ul>
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded text-center">
            <p className="text-blue-200 font-medium">Leaderboard integrity is important for fair gameplay.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">7</span>
          Profile Images
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">Users may upload profile images. Users agree that uploaded images:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
            <li>must not violate copyright</li>
            <li>must not contain offensive or illegal material</li>
            <li>must not impersonate others</li>
          </ul>
          <p className="text-slate-400 italic">WingTrials may remove profile images that violate these rules.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">8</span>
          Future Features and Monetization
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">WingTrials may introduce additional features in the future, including:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
            <li>advertisements</li>
            <li>cosmetic items</li>
            <li>optional in-game purchases</li>
          </ul>
          <p className="mb-2">These features may be added to support the continued development of the game.</p>
          <p className="text-slate-400 italic">Updates to these features may modify these Terms.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">9</span>
          Third-Party Services
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">WingTrials uses third-party services including:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
            <li>Google Authentication</li>
            <li>Supabase</li>
            <li>Vercel hosting and analytics</li>
          </ul>
          <p className="text-slate-400 italic">Use of these services may be subject to their own terms and policies.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">10</span>
          Service Availability
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-3 text-lg">WingTrials is provided <strong className="text-white">“as is”</strong> without guarantees of uninterrupted service.</p>
          <p className="text-slate-400">The operator may modify or discontinue the service at any time.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">11</span>
          Limitation of Liability
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-4">WingTrials is provided for entertainment purposes. The operator is not responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>loss of game data</li>
            <li>service interruptions</li>
            <li>damages resulting from the use of the service</li>
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-red-500/20 text-red-500 text-sm">12</span>
          Termination
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-3">WingTrials reserves the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
            <li>suspend accounts</li>
            <li>remove content</li>
            <li>restrict access</li>
          </ul>
          <p className="font-bold text-white uppercase tracking-wider text-sm">if users violate these Terms.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">13</span>
          Changes to Terms
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
          <p className="mb-3">These Terms may be updated periodically.</p>
          <p className="mb-3">Changes will be posted on this page with the updated date.</p>
          <div className="bg-white/5 p-4 rounded border border-white/10 mt-4 text-center">
            <p className="text-slate-300 font-medium tracking-wide">Continued use of WingTrials after updates indicates acceptance of the revised Terms.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center size-8 rounded bg-primary/20 text-primary text-sm">14</span>
          Contact Information
        </h2>
        <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-8xl">contact_support</span>
          </div>
          <div className="relative z-10">
            <p className="mb-6 text-lg">If you have questions about these Terms, please contact:</p>
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
