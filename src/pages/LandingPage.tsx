import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { 
  Building2, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  FileText, 
  Layers, 
  Database, 
  Calendar, 
  Send,
  Zap,
  Lock,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { formatGBP } from '../utils/formatters';

export const LandingPage: React.FC = () => {
  const { setCurrentRoute } = useWorkspace();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#252B29] selection:bg-[#536F67]/20 font-sans">
      {/* 5.1 Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F4]/90 backdrop-blur-md border-b border-[#E7E9E4]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#536F67] flex items-center justify-center text-white font-heading font-bold text-base shadow-sm">
              BF
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-base tracking-tight text-[#252B29]">BUILDFLOW</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#536F67]/15 text-[#354843]">
                  AI
                </span>
              </div>
              <p className="text-[9px] font-medium text-[#747B76] uppercase tracking-wider">Founders Edition</p>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-[#48504B]">
            <button onClick={() => scrollToSection('platform')} className="hover:text-[#536F67] transition-colors">
              Platform
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#536F67] transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('workflow')} className="hover:text-[#536F67] transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('founders')} className="hover:text-[#536F67] transition-colors">
              Founders Edition
            </button>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoute('login')}
              className="text-xs font-semibold px-3.5 py-2 text-[#48504B] hover:text-[#252B29] transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setCurrentRoute('dashboard')}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white shadow-card transition-all transform active:scale-95"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 5.2 Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-[#E7E9E4]">
        {/* Architectural Subtle Grid Overlay Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#E7E9E4_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-b from-[#536F67]/8 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E9E4] shadow-subtle mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-xs font-medium text-[#48504B]">AI-Powered Construction Administration Assistant</span>
              <span className="text-[10px] font-bold text-[#536F67] uppercase tracking-wider ml-1">UK SPECIFIC</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#252B29] font-heading leading-[1.12] mb-6">
              Construction correspondence. <br />
              <span className="text-[#536F67]">Under control.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#747B76] leading-relaxed mb-8 max-w-2xl mx-auto">
              BuildFlow AI turns your construction emails into organised enquiries, connected project records and clear next actions — so your team can focus on delivering work, not chasing information.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
              <button
                onClick={() => setCurrentRoute('dashboard')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white font-semibold text-sm shadow-card transition-all transform active:scale-98"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('workflow')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F0F1ED] text-[#252B29] font-semibold text-sm border border-[#E7E9E4] shadow-subtle transition-colors"
              >
                See How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4 border-t border-[#E7E9E4]/60 text-xs font-medium text-[#747B76]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#536F67]" />
                <span>Built for UK construction companies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#536F67]" />
                <span>Seamless Microsoft 365 workflow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#536F67]" />
                <span>Human-approved AI recommendations</span>
              </div>
            </div>
          </div>

          {/* 5.4 Floating Interactive Product Preview */}
          <div className="relative max-w-5xl mx-auto rounded-2xl bg-white border border-[#E7E9E4] shadow-modal overflow-hidden p-2 sm:p-4 bg-gradient-to-b from-white via-white to-[#FAFBF9]">
            {/* Mock Dashboard Banner Header */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-[#E7E9E4] text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E7E9E4]" />
                <div className="w-3 h-3 rounded-full bg-[#E7E9E4]" />
                <div className="w-3 h-3 rounded-full bg-[#E7E9E4]" />
                <span className="ml-2 font-semibold text-[#48504B]">Northstar Construction Ltd — Live Workspace</span>
              </div>
              <div className="flex items-center gap-2 text-[#747B76] text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>Outlook Mailbox Synchronised</span>
              </div>
            </div>

            {/* Preview Grid inside App */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4]">
                <div className="text-[11px] font-medium text-[#747B76]">New Enquiries</div>
                <div className="text-2xl font-bold font-heading text-[#252B29] mt-1">18</div>
                <div className="text-[10px] text-[#275E38] font-medium mt-1">↑ +12% this month</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4]">
                <div className="text-[11px] font-medium text-[#747B76]">Active Projects</div>
                <div className="text-2xl font-bold font-heading text-[#252B29] mt-1">24</div>
                <div className="text-[10px] text-[#747B76] mt-1">Across 8 categories</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FBF6ED] border border-[#F1DFC4]">
                <div className="text-[11px] font-medium text-[#875317]">Awaiting Review</div>
                <div className="text-2xl font-bold font-heading text-[#875317] mt-1">07</div>
                <div className="text-[10px] text-[#875317] font-medium mt-1">Requires attention</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4]">
                <div className="text-[11px] font-medium text-[#747B76]">Outstanding Tasks</div>
                <div className="text-2xl font-bold font-heading text-[#252B29] mt-1">13</div>
                <div className="text-[10px] text-[#94372D] font-medium mt-1">3 due today</div>
              </div>
            </div>

            {/* Sample AI Correspondence Review Card */}
            <div className="p-4 rounded-xl bg-white border border-[#CAD7D0] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-[#E7E9E4]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#EBF2EE] text-[#354843] text-xs font-semibold">
                    New Enquiry Detected
                  </span>
                  <span className="text-xs font-medium text-[#747B76]">Daniel Foster (Foster Developments Ltd)</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[11px] text-[#536F67] font-semibold bg-[#EBF2EE] px-2 py-0.5 rounded">
                    96% AI Confidence
                  </span>
                  <span className="text-[11px] text-[#747B76]">08:34 AM</span>
                </div>
              </div>

              <div className="text-xs text-[#252B29] font-medium mb-1.5">
                "Request for quotation — Commercial extension, Manchester (450 sqm)"
              </div>
              <p className="text-[11px] text-[#747B76] leading-relaxed mb-3">
                <strong className="text-[#354843]">BuildFlow Intelligence:</strong> Potential new commercial enquiry. Initial GA drawings rev A provided; budget ceiling and expected start date require client confirmation.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E7E9E4] text-xs">
                <div className="flex items-center gap-2 text-[11px] text-[#747B76]">
                  <span>GA_Drawings_Rev_A.pdf (4.8 MB)</span>
                  <span>•</span>
                  <span>3 suggested actions identified</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentRoute('emails')}
                    className="px-3 py-1 rounded-lg bg-[#536F67] text-white font-semibold text-xs hover:bg-[#425952] transition-colors"
                  >
                    Accept & Create Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Problem Section */}
      <section className="py-20 bg-white border-b border-[#E7E9E4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#536F67] mb-2">The Operational Challenge</h2>
            <h3 className="text-3xl font-bold font-heading text-[#252B29] tracking-tight">
              Construction projects generate more correspondence than ever.
            </h3>
            <p className="text-sm text-[#747B76] mt-3">
              When critical information lives in individual inboxes, construction businesses face margin erosion, delayed tenders, and communication blind spots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: 'Valuable enquiries disappear into busy inboxes',
                desc: 'Tender invites and commercial RFQs arrive in personal email accounts without reaching the estimating team in time.'
              },
              {
                icon: Layers,
                title: 'Project updates become difficult to track',
                desc: 'Programme revisions, site sketches and subcontractor notices are scattered across months of disjointed email threads.'
              },
              {
                icon: Calendar,
                title: 'Important dates get buried in email threads',
                desc: 'Tender deadlines, payment notice dates and site hand-over milestones pass unnoticed without central visibility.'
              },
              {
                icon: Search,
                title: 'Staff spend hours searching for information',
                desc: 'Project managers waste valuable time searching Outlook for architectural approvals, RFI replies or drawing versions.'
              },
              {
                icon: AlertCircle,
                title: 'Follow-ups are forgotten during busy site phases',
                desc: 'Without automated tracking, requests for missing structural calculations or utility quotes slip through the cracks.'
              },
              {
                icon: Database,
                title: 'Project knowledge becomes dangerously fragmented',
                desc: 'When key personnel take leave or move on, historical correspondence and client commitments are lost from the business.'
              }
            ].map((problem, idx) => {
              const Icon = problem.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F7F7F4] border border-[#E7E9E4] hover:border-[#CAD7D0] transition-all hover:shadow-subtle group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E9E4] flex items-center justify-center mb-4 text-[#536F67] group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold font-heading text-[#252B29] mb-2">{problem.title}</h4>
                  <p className="text-xs text-[#747B76] leading-relaxed">{problem.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5.6 Solution Section & Visual Workflow */}
      <section id="workflow" className="py-20 bg-[#F7F7F4] border-b border-[#E7E9E4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#536F67] mb-2">The BuildFlow Solution</h2>
            <h3 className="text-3xl font-bold font-heading text-[#252B29] tracking-tight">
              One intelligent workspace for every important conversation.
            </h3>
            <p className="text-sm text-[#747B76] mt-3">
              BuildFlow monitors your primary construction inbox, extracts critical project data with AI, and surfaces structured recommendations for your team to approve.
            </p>
          </div>

          {/* Workflow Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
            {[
              { step: '01', title: 'Incoming Email', desc: 'Syncs continuously with Microsoft 365 Outlook.' },
              { step: '02', title: 'AI Classification', desc: 'Detects New Enquiry vs Project Update vs Unrelated.' },
              { step: '03', title: 'Extraction', desc: 'Identifies budget, dates, drawings & missing data.' },
              { step: '04', title: 'Human Review', desc: 'One-click accept, edit, or project match.' },
              { step: '05', title: 'Project Record', desc: 'Auto-updated timeline with central correspondence.' },
              { step: '06', title: 'Next Actions', desc: 'Creates assigned tasks and draft replies.' }
            ].map((st, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-white border border-[#E7E9E4] relative shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-[#536F67] tracking-wider mb-2 font-mono">
                    STEP {st.step}
                  </div>
                  <h4 className="text-xs font-semibold text-[#252B29] mb-1 font-heading">{st.title}</h4>
                  <p className="text-[11px] text-[#747B76] leading-relaxed">{st.desc}</p>
                </div>
                {i < 5 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-[#8E9690]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.7 Feature Showcase */}
      <section id="features" className="py-20 bg-white border-b border-[#E7E9E4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#536F67] mb-2">Platform Capabilities</h2>
            <h3 className="text-3xl font-bold font-heading text-[#252B29] tracking-tight">
              Engineered specifically for construction administration.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Intelligent Email Classification',
                desc: 'Instantly segregates new enquiries, project correspondence, and unrelated merchant statements.'
              },
              {
                icon: Building2,
                title: 'New Enquiry Detection',
                desc: 'Extracts client contact, scheme location, estimated value, and required scope of works automatically.'
              },
              {
                icon: Layers,
                title: 'Existing Project Recognition',
                desc: 'Matches updates directly against active contracts like Riverside Offices and Oakfield Residential.'
              },
              {
                icon: FileText,
                title: 'AI Correspondence Summaries',
                desc: 'Generates concise summaries answering what happened, why it matters, and what to do next.'
              },
              {
                icon: AlertCircle,
                title: 'Missing Information Detection',
                desc: 'Proactively flags absent budgets, unstated tender deadlines, and missing structural drawings.'
              },
              {
                icon: Calendar,
                title: 'Suggested Actions & Milestones',
                desc: 'Turns email requests into actionable tasks with suggested assignees, priorities, and deadlines.'
              },
              {
                icon: Database,
                title: 'Central Opportunity Pipeline',
                desc: 'Track enquiry stages from New Enquiry through Qualified to Won with estimated GBP values.'
              },
              {
                icon: Send,
                title: 'Human-Approved Email Drafting',
                desc: 'Generate contextual response drafts in seconds with zero risk of unreviewed outgoing messages.'
              }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-[#F7F7F4] border border-[#E7E9E4] hover:border-[#CAD7D0] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E7E9E4] flex items-center justify-center text-[#536F67] mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold font-heading text-[#252B29] mb-1.5">{f.title}</h4>
                  <p className="text-[11px] text-[#747B76] leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5.9 Founders Edition Section */}
      <section id="founders" className="py-20 bg-[#F0F1ED] border-b border-[#E7E9E4]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E7E9E4] shadow-card">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#354843] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#536F67]" />
              Founders Edition Scope
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#252B29] tracking-tight mb-4">
              Built for construction teams. Designed to grow with them.
            </h3>
            
            <p className="text-sm text-[#747B76] leading-relaxed mb-8 max-w-2xl">
              The Founders Edition focuses squarely on the highest-value pain points in regional construction: managing incoming commercial enquiries, preserving project correspondence, and automating administrative follow-ups with human-approved AI.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#252B29]">
              {[
                'One main Outlook mailbox per company integration',
                'AI-powered correspondence evaluation & extraction',
                'Enquiry & project automatic recognition matching',
                'Centralised project correspondence history timeline',
                'Operational task management linked to emails',
                'Multi-company workspace architecture demonstration',
                '100% human-approved AI recommendation safeguards',
                'Full export and communication transparency'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4]">
                  <CheckCircle2 className="w-4 h-4 text-[#536F67] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7E9E4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#747B76]">
                Ready to experience the Founders Edition interactive prototype?
              </div>
              <button
                onClick={() => setCurrentRoute('dashboard')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all"
              >
                Launch Live Demo Workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5.10 Final CTA */}
      <section className="py-20 bg-white border-b border-[#E7E9E4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold font-heading text-[#252B29] tracking-tight mb-4">
            Spend less time managing emails. <br />
            More time moving projects forward.
          </h3>
          <p className="text-sm sm:text-base text-[#747B76] mb-8 max-w-xl mx-auto">
            Bring your construction enquiries and project correspondence into one organised, intelligent workspace.
          </p>
          <button
            onClick={() => setCurrentRoute('dashboard')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white font-semibold text-sm shadow-modal transition-all transform active:scale-98"
          >
            <span>Explore BuildFlow AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5.11 Refined Footer */}
      <footer className="py-12 bg-[#F7F7F4] text-xs text-[#747B76]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-[#536F67] text-white font-bold text-xs flex items-center justify-center">
                  BF
                </div>
                <span className="font-heading font-bold text-sm text-[#252B29]">BuildFlow AI</span>
              </div>
              <p className="text-[11px] text-[#747B76] leading-relaxed">
                Your construction correspondence, intelligently organised. Never miss an enquiry. Never lose a project detail.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-[#252B29] mb-3 uppercase tracking-wider text-[10px]">Platform</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentRoute('dashboard')} className="hover:text-[#252B29]">Dashboard</button></li>
                <li><button onClick={() => setCurrentRoute('emails')} className="hover:text-[#252B29]">Email Review</button></li>
                <li><button onClick={() => setCurrentRoute('enquiries-projects')} className="hover:text-[#252B29]">Enquiry Management</button></li>
                <li><button onClick={() => setCurrentRoute('tasks-admin')} className="hover:text-[#252B29]">Tasks & Administration</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-[#252B29] mb-3 uppercase tracking-wider text-[10px]">Company</h5>
              <ul className="space-y-2">
                <li><span>About BuildFlow AI</span></li>
                <li><span>Founders Edition</span></li>
                <li><span className="text-[#8E9690]">hello@buildflow.ai (Demo Placeholder)</span></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-[#252B29] mb-3 uppercase tracking-wider text-[10px]">Legal & Notice</h5>
              <ul className="space-y-2 text-[11px]">
                <li><span>Frontend Demonstration Prototype</span></li>
                <li><span>Version 2.0 Scope</span></li>
                <li><span>Simulated M365 Integration</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E7E9E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>© 2026 BuildFlow AI. All rights reserved. Built for UK Construction.</div>
            <div className="text-[#8E9690]">Commercial Prototype — Simulated Environment</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
