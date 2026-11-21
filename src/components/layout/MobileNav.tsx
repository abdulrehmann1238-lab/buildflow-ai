import React, { useState } from 'react';
import { useWorkspace, AppRoute } from '../../context/WorkspaceContext';
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  CheckSquare, 
  Menu, 
  X, 
  Building2, 
  Sparkles,
  RefreshCw,
  LogOut
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { currentRoute, setCurrentRoute, currentCompany, switchWorkspace, companies, correspondence, tasks, syncOutlook, isSyncing } = useWorkspace();

  const pendingEmailCount = correspondence.filter(c => c.status === 'awaiting_review').length;
  const pendingTaskCount = tasks.filter(t => t.status !== 'Completed').length;

  const navItems: { id: AppRoute; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'emails', label: 'Email Review', icon: Mail, badge: pendingEmailCount },
    { id: 'enquiries-projects', label: 'Enquiries & Projects', icon: Briefcase },
    { id: 'tasks-admin', label: 'Tasks & Admin', icon: CheckSquare, badge: pendingTaskCount },
  ];

  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#E7E9E4] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#536F67] flex items-center justify-center text-white font-bold text-xs">
          BF
        </div>
        <span className="font-heading font-bold text-sm text-[#252B29]">BuildFlow AI</span>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#EBF2EE] text-[#354843]">
          Demo
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => syncOutlook()}
          disabled={isSyncing}
          className="p-1.5 text-[#536F67] hover:bg-[#F7F7F4] rounded-lg transition-colors"
          title="Sync M365"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 text-[#252B29] hover:bg-[#F7F7F4] rounded-lg transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide-out mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 top-[53px] bg-black/40 z-30" onClick={() => setOpen(false)} />
          <div className="fixed top-[53px] left-0 right-0 bottom-0 bg-[#F0F1ED] z-40 p-4 flex flex-col justify-between overflow-y-auto animate-fade-in">
            <div className="space-y-4">
              {/* Workspace Selector */}
              <div className="p-3 bg-white rounded-xl border border-[#E7E9E4]">
                <div className="text-[10px] font-bold text-[#8E9690] uppercase tracking-wider mb-2">
                  Active Company
                </div>
                <div className="flex flex-col gap-1.5">
                  {companies.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        switchWorkspace(c.id);
                        setOpen(false);
                      }}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium text-left ${
                        c.id === currentCompany.id ? 'bg-[#EBF2EE] text-[#354843]' : 'text-[#252B29] hover:bg-[#F7F7F4]'
                      }`}
                    >
                      <span>{c.name}</span>
                      {c.id === currentCompany.id && <span className="w-1.5 h-1.5 rounded-full bg-[#536F67]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1">
                {navItems.map(item => {
                  const isActive = currentRoute === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentRoute(item.id);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium ${
                        isActive ? 'bg-[#EBF2EE] text-[#354843] font-semibold' : 'bg-white text-[#252B29]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#536F67]' : 'text-[#747B76]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#536F67] text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E9E4] space-y-2">
              <button
                onClick={() => {
                  setCurrentRoute('landing');
                  setOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-white text-xs font-semibold text-[#252B29] border border-[#E7E9E4]"
              >
                Return to Landing Page
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('login');
                  setOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#94372D] flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
