import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Building2, CheckCircle2, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentRoute, currentCompany, addToast } = useWorkspace();
  const [email, setEmail] = useState('j.wilson@northstarconstruction.co.uk');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast('Welcome back, James', 'Successfully signed into Northstar Construction workspace.', 'success');
      setCurrentRoute('dashboard');
    }, 600);
  };

  const handleMicrosoftSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast('Microsoft 365 Verified', 'Authenticated via simulated single sign-on.', 'success');
      setCurrentRoute('dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] flex flex-col justify-center sm:px-6 lg:px-8 py-12 selection:bg-[#536F67]/20 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white rounded-3xl border border-[#E7E9E4] shadow-modal overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Brand & Visuals */}
          <div className="bg-[#536F67] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background architectural graphic lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <path d="M0 50H400M0 150H400M0 250H400M0 350H400" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M50 0V400M150 0V400M250 0V400M350 0V400" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="1" />
              </svg>
            </div>

            <div>
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-heading font-bold text-base border border-white/20">
                  BF
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-base tracking-tight text-white">BUILDFLOW</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
                      AI
                    </span>
                  </div>
                  <p className="text-[9px] font-medium text-white/70 uppercase tracking-wider">Founders Edition</p>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight leading-tight mb-4">
                "Your construction correspondence, intelligently organised."
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                Connect your commercial mailbox to turn tenders, enquiries, and programme variations into structured project intelligence.
              </p>
            </div>

            <div className="pt-8 border-t border-white/20 mt-8 space-y-2.5 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5D3CC]" />
                <span>Simulated multi-company architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5D3CC]" />
                <span>Zero real backend credentials required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5D3CC]" />
                <span>Pre-loaded realistic UK construction data</span>
              </div>
            </div>
          </div>

          {/* Right Side: Clean Sign-In Form */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            {/* Demo Mode Notice */}
            <div className="mb-6 p-3 rounded-xl bg-[#FAFBF9] border border-[#CAD7D0] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#536F67]" />
                <span className="font-semibold text-[#354843]">Interactive Demo Mode</span>
              </div>
              <span className="text-[10px] font-mono text-[#747B76]">No password needed</span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold font-heading text-[#252B29]">Sign In to BuildFlow</h3>
              <p className="text-xs text-[#747B76] mt-1">Select an access method below to enter the workspace.</p>
            </div>

            {/* Direct Instant Demo Entry Button */}
            <button
              onClick={() => {
                addToast('Welcome to BuildFlow AI', 'Loaded Northstar Construction Ltd demonstration environment.', 'success');
                setCurrentRoute('dashboard');
              }}
              className="w-full mb-4 py-3 px-4 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <span>Enter Interactive Demo (1-Click)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Microsoft 365 Button */}
            <button
              type="button"
              onClick={handleMicrosoftSignIn}
              disabled={isLoading}
              className="w-full mb-6 py-2.5 px-4 rounded-xl bg-white hover:bg-[#F7F7F4] text-[#252B29] text-xs font-semibold border border-[#E7E9E4] shadow-xs flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              <span>Continue with Microsoft (Simulated)</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E7E9E4]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-[#8E9690] font-semibold">Or with credentials</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8E9690] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E7E9E4] bg-white text-[#252B29] focus:outline-none focus:border-[#536F67]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8E9690] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-[#E7E9E4] bg-white text-[#252B29] focus:outline-none focus:border-[#536F67]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#8E9690] hover:text-[#252B29]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#E7E9E4] text-[#536F67] focus:ring-0"
                  />
                  <span className="text-[#747B76]">Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => addToast('Demo Password Reset', 'Demonstration mode: use any mock password to sign in.', 'info')}
                  className="text-[#536F67] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F0F1ED] hover:bg-[#E7E9E4] text-[#252B29] text-xs font-semibold transition-colors"
              >
                {isLoading ? 'Verifying Workspace...' : 'Sign In as Administrator'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentRoute('landing')}
                className="text-xs text-[#747B76] hover:text-[#252B29] transition-colors"
              >
                ← Return to Public Product Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
