import React from 'react';
import { useWorkspace, AppRoute } from '../../context/WorkspaceContext';
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Settings, 
  Network, 
  HelpCircle,
  Building2,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    currentCompany, 
    currentUser, 
    companies, 
    switchWorkspace,
    correspondence,
    tasks
  } = useWorkspace();

  const [companyDropdownOpen, setCompanyDropdownOpen] = React.useState(false);

  const pendingEmailCount = correspondence.filter(c => c.status === 'awaiting_review').length;
  const pendingTaskCount = tasks.filter(t => t.status !== 'Completed').length;

  const navItems: {
    category?: string;
    id: AppRoute;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { category: 'OVERVIEW', id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { category: 'WORKSPACE', id: 'emails', label: 'Email Review', icon: Mail, badge: pendingEmailCount },
    { id: 'enquiries-projects', label: 'Enquiries & Projects', icon: Briefcase },
    { id: 'tasks-admin', label: 'Tasks & Admin', icon: CheckSquare, badge: pendingTaskCount },
  ];

  return (
    <aside className="w-[250px] shrink-0 bg-[#F0F1ED] border-r border-[#E7E9E4] flex flex-col justify-between h-screen sticky top-0 select-none z-20">
      {/* Top Branding & Workspace Selector */}
      <div>
        <div className="p-4 border-b border-[#E7E9E4]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#536F67] flex items-center justify-center text-white shadow-sm font-heading font-bold text-sm tracking-tight">
              BF
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-sm tracking-tight text-[#252B29]">BUILDFLOW</span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#536F67]/15 text-[#354843]">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-[#747B76] tracking-wider uppercase">Founders Edition</p>
            </div>
          </div>

          {/* Company Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-white/80 hover:bg-white border border-[#E7E9E4] text-left transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className="w-3.5 h-3.5 text-[#536F67] shrink-0" />
                <div className="min-w-0 truncate">
                  <div className="text-xs font-semibold text-[#252B29] truncate">{currentCompany.name}</div>
                  <div className="text-[10px] text-[#747B76]">UK Commercial</div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#747B76] group-hover:text-[#252B29] shrink-0 transition-transform" />
            </button>

            {companyDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setCompanyDropdownOpen(false)} 
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E7E9E4] rounded-xl shadow-popover py-1 z-40 animate-fade-in">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-[#747B76] uppercase tracking-wider">
                    Switch Organisation (Demo)
                  </div>
                  {companies.map(comp => (
                    <button
                      key={comp.id}
                      onClick={() => {
                        switchWorkspace(comp.id);
                        setCompanyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        comp.id === currentCompany.id 
                          ? 'bg-[#EBF2EE] text-[#354843] font-semibold' 
                          : 'text-[#252B29] hover:bg-[#FAFBF9]'
                      }`}
                    >
                      <span className="truncate">{comp.name}</span>
                      {comp.id === currentCompany.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#536F67]" />
                      )}
                    </button>
                  ))}
                  <div className="border-t border-[#E7E9E4] mt-1 pt-1 px-3 py-1 text-[10px] text-[#747B76]">
                    Simulated multi-tenant isolation
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="p-3 space-y-1">
          {navItems.map((item, index) => {
            const isActive = currentRoute === item.id || (item.id === 'enquiries-projects' && currentRoute === 'detail');
            const Icon = item.icon;

            return (
              <React.Fragment key={item.id}>
                {item.category && (
                  <div className={`px-3 text-[10px] font-bold text-[#8E9690] tracking-wider uppercase ${index > 0 ? 'mt-4 mb-1' : 'mb-1'}`}>
                    {item.category}
                  </div>
                )}
                <button
                  onClick={() => setCurrentRoute(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-[#EBF2EE] text-[#354843] font-semibold shadow-xs'
                      : 'text-[#48504B] hover:bg-black/5 hover:text-[#252B29]'
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#536F67] rounded-r" />
                  )}
                  
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#536F67]' : 'text-[#747B76] group-hover:text-[#252B29]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-[#536F67] text-white' 
                        : 'bg-[#E7E9E4] text-[#48504B] group-hover:bg-[#D5D8D0]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}

          <div className="px-3 text-[10px] font-bold text-[#8E9690] tracking-wider uppercase mt-4 mb-1">
            INTELLIGENCE
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#536F67]/10 via-[#536F67]/5 to-transparent border border-[#536F67]/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#354843]">
              <Sparkles className="w-3.5 h-3.5 text-[#536F67]" />
              <span>AI Classifier Active</span>
            </div>
            <p className="text-[11px] text-[#747B76] mt-1 leading-snug">
              Continuous scan of Microsoft 365 inbox for new RFQs & changes.
            </p>
          </div>
        </nav>
      </div>

      {/* Bottom User Profile & Help */}
      <div className="p-3 border-t border-[#E7E9E4] bg-[#EAECE6]/50">
        <button
          onClick={() => setCurrentRoute('landing')}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#747B76] hover:text-[#252B29] hover:bg-black/5 rounded-xl transition-colors mb-2"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#747B76]" />
            <span>Product Overview</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#747B76]" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-[#E7E9E4]">
          <div className="w-8 h-8 rounded-full bg-[#536F67] text-white flex items-center justify-center text-xs font-bold font-heading shrink-0">
            {currentUser.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-[#252B29] truncate">{currentUser.name}</div>
            <div className="text-[10px] text-[#747B76] truncate">{currentUser.role}</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" title="Online" />
        </div>
      </div>
    </aside>
  );
};
