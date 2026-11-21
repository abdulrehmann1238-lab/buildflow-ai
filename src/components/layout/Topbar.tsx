import React, { useState } from 'react';
import { useWorkspace, AppRoute } from '../../context/WorkspaceContext';
import { 
  Search, 
  Bell, 
  RefreshCw, 
  ChevronRight, 
  Sparkles,
  Building2,
  ExternalLink,
  SlidersHorizontal,
  Mail,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GlobalSearchModal } from '../shared/GlobalSearchModal';
import { NotificationsPanel } from '../shared/NotificationsPanel';

export const Topbar: React.FC = () => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    currentCompany, 
    syncOutlook, 
    isSyncing,
    correspondence,
    currentUser,
    selectedRecordType,
    selectedRecordId,
    projects,
    enquiries
  } = useWorkspace();

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const awaitingReviews = correspondence.filter(c => c.status === 'awaiting_review').length;

  const getBreadcrumb = () => {
    switch (currentRoute) {
      case 'dashboard':
        return ['Workspace', 'Dashboard'];
      case 'emails':
        return ['Workspace', 'Email Intelligence Review'];
      case 'enquiries-projects':
        return ['Workspace', 'Enquiries & Projects'];
      case 'detail':
        const name = selectedRecordType === 'project' 
          ? projects.find(p => p.id === selectedRecordId)?.name || 'Project Detail'
          : enquiries.find(e => e.id === selectedRecordId)?.name || 'Enquiry Detail';
        return ['Workspace', 'Enquiries & Projects', name];
      case 'tasks-admin':
        return ['Administration', 'Tasks & Organization'];
      default:
        return ['Workspace'];
    }
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <>
      <header className="h-14 bg-white/95 backdrop-blur-sm border-b border-[#E7E9E4] sticky top-0 z-10 px-6 flex items-center justify-between select-none">
        {/* Left: Breadcrumbs & Status */}
        <div className="flex items-center gap-2 text-xs">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#8E9690]" />}
              <span className={idx === breadcrumbs.length - 1 ? 'font-semibold text-[#252B29]' : 'text-[#747B76]'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
          <span className="ml-3 hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EBF2EE] text-[#354843] text-[11px] font-medium border border-[#CAD7D0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            Founders Edition Live
          </span>
        </div>

        {/* Right: Search, Sync, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7F7F4] hover:bg-[#F0F1ED] border border-[#E7E9E4] text-xs text-[#747B76] transition-all group"
          >
            <Search className="w-3.5 h-3.5 text-[#747B76] group-hover:text-[#252B29]" />
            <span className="hidden md:inline">Search enquiries, projects, emails...</span>
            <span className="inline md:hidden">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-[#E7E9E4] text-[#8E9690]">
              ⌘K
            </kbd>
          </button>

          {/* Simulated Outlook Sync Button */}
          <button
            onClick={() => syncOutlook()}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isSyncing 
                ? 'bg-[#EBF2EE] text-[#354843] border-[#CAD7D0]' 
                : 'bg-white hover:bg-[#F7F7F4] text-[#48504B] border-[#E7E9E4] shadow-xs'
            }`}
            title="Simulate polling Microsoft 365 Outlook Mailbox"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#536F67] ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync M365'}</span>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl text-[#747B76] hover:text-[#252B29] hover:bg-[#F7F7F4] border border-transparent hover:border-[#E7E9E4] transition-all relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {awaitingReviews > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D97706] ring-2 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
            )}
          </div>

          {/* User Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-[#F7F7F4] transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-[#536F67] text-white flex items-center justify-center text-xs font-bold font-heading">
                {currentUser.avatar}
              </div>
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E7E9E4] rounded-2xl shadow-popover py-2 z-40 animate-fade-in text-xs">
                  <div className="px-4 py-2 border-b border-[#E7E9E4]">
                    <p className="font-semibold text-[#252B29]">{currentUser.name}</p>
                    <p className="text-[11px] text-[#747B76] truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded bg-[#EBF2EE] text-[#354843]">
                      {currentUser.role}
                    </span>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentRoute('tasks-admin');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-[#48504B] hover:bg-[#F7F7F4] hover:text-[#252B29]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#747B76]" />
                      Company Settings
                    </button>
                    <button
                      onClick={() => {
                        setCurrentRoute('landing');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-[#48504B] hover:bg-[#F7F7F4] hover:text-[#252B29]"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#747B76]" />
                      Public Marketing Page
                    </button>
                  </div>

                  <div className="border-t border-[#E7E9E4] pt-1">
                    <button
                      onClick={() => {
                        setCurrentRoute('login');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-[#94372D] hover:bg-[#F4E9E6]"
                    >
                      Sign Out (Switch to Login)
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Dialog */}
      {searchOpen && <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
    </>
  );
};
