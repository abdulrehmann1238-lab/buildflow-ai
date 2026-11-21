import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { 
  Building2, 
  Mail, 
  Briefcase, 
  CheckSquare, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Filter,
  Layers,
  Calendar
} from 'lucide-react';
import { formatGBP, formatDateUK } from '../utils/formatters';
import { Badge } from '../components/shared/Badge';
import { EmailReviewDrawer } from '../components/emails/EmailReviewDrawer';
import { Correspondence, EnquiryStatus } from '../types';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    currentCompany, 
    enquiries, 
    projects, 
    correspondence, 
    tasks, 
    activities, 
    setCurrentRoute, 
    viewRecordDetail,
    setEnquiryPipelineFilter,
    syncOutlook,
    isSyncing,
    toggleTaskStatus
  } = useWorkspace();

  const [activeReviewEmail, setActiveReviewEmail] = useState<Correspondence | null>(null);

  // Statistics calculation
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New Enquiry').length;
  const activeProjectsCount = projects.filter(p => p.status === 'Active Project' || p.status === 'On Site').length;
  const awaitingReviewCount = correspondence.filter(c => c.status === 'awaiting_review').length;
  const pendingTasks = tasks.filter(t => t.status !== 'Completed');
  const overdueTasksCount = tasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date()).length;

  // Pipeline Stages
  const pipelineStages: { stage: EnquiryStatus; label: string }[] = [
    { stage: 'New Enquiry', label: 'New Enquiry' },
    { stage: 'Awaiting Information', label: 'Awaiting Info' },
    { stage: 'Under Review', label: 'Under Review' },
    { stage: 'Qualified', label: 'Qualified' },
    { stage: 'Future Opportunity', label: 'Future Opp.' },
    { stage: 'Declined / Closed', label: 'Declined / Closed' },
  ];

  const getStageMetrics = (stage: EnquiryStatus) => {
    const list = enquiries.filter(e => e.status === stage);
    const totalVal = list.reduce((sum, item) => sum + item.estimatedValue, 0);
    return { count: list.length, value: totalVal };
  };

  const handleStageClick = (stage: EnquiryStatus) => {
    setEnquiryPipelineFilter(stage);
    setCurrentRoute('enquiries-projects');
  };

  const pendingCorrespondence = correspondence
    .filter(c => c.status === 'awaiting_review')
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 8. Top Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E9E4]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#252B29] tracking-tight">
            Good morning, {currentUser.name.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-[#747B76] mt-0.5">
            Here's what's happening across your construction workspace today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E7E9E4] text-xs text-[#747B76]">
            <Calendar className="w-3.5 h-3.5 text-[#536F67]" />
            <span>21 Nov 2026</span>
          </div>

          <button
            onClick={() => syncOutlook()}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F7F7F4] border border-[#E7E9E4] text-xs font-medium text-[#48504B] shadow-xs transition-all"
            title="Refresh workspace correspondence"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#536F67] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {/* Outlook connection pill */}
          <button 
            onClick={() => setCurrentRoute('tasks-admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8F0E9] hover:bg-[#DDE9DF] text-[#275E38] border border-[#CCE0CE] text-xs font-semibold transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span>M365 Connected</span>
          </button>
        </div>
      </div>

      {/* 8.1 Overview Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: New Enquiries */}
        <div 
          onClick={() => {
            setEnquiryPipelineFilter('New Enquiry');
            setCurrentRoute('enquiries-projects');
          }}
          className="p-5 rounded-2xl bg-white border border-[#E7E9E4] hover:border-[#CAD7D0] shadow-subtle hover:shadow-card cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#747B76]">New Enquiries</span>
            <div className="w-8 h-8 rounded-xl bg-[#EBF2EE] text-[#536F67] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-heading text-[#252B29] mt-3 tracking-tight">
            {enquiries.length}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0F1ED] text-[11px]">
            <span className="text-[#275E38] font-semibold">+{newEnquiriesCount} unassigned</span>
            <span className="text-[#8E9690] group-hover:text-[#536F67] flex items-center gap-0.5">
              View pipeline <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div 
          onClick={() => setCurrentRoute('enquiries-projects')}
          className="p-5 rounded-2xl bg-white border border-[#E7E9E4] hover:border-[#CAD7D0] shadow-subtle hover:shadow-card cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#747B76]">Active Projects</span>
            <div className="w-8 h-8 rounded-xl bg-[#EAF0F4] text-[#235A75] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-heading text-[#252B29] mt-3 tracking-tight">
            {projects.length}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0F1ED] text-[11px]">
            <span className="text-[#747B76]">Across {new Set(projects.map(p => p.projectType)).size} scheme types</span>
            <span className="text-[#8E9690] group-hover:text-[#536F67] flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Emails Awaiting Review */}
        <div 
          onClick={() => setCurrentRoute('emails')}
          className="p-5 rounded-2xl bg-white border border-[#F1DFC4] hover:border-[#D97706] shadow-subtle hover:shadow-card cursor-pointer transition-all group bg-gradient-to-br from-white via-white to-[#FDF9F3]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#875317]">Emails Awaiting Review</span>
            <div className="w-8 h-8 rounded-xl bg-[#FBF6ED] text-[#875317] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-heading text-[#875317] mt-3 tracking-tight">
            {String(awaitingReviewCount).padStart(2, '0')}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F1DFC4]/50 text-[11px]">
            <span className="text-[#875317] font-semibold">Require attention</span>
            <span className="text-[#875317] font-medium flex items-center gap-0.5 group-hover:underline">
              Review queue <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 4: Outstanding Tasks */}
        <div 
          onClick={() => setCurrentRoute('tasks-admin')}
          className="p-5 rounded-2xl bg-white border border-[#E7E9E4] hover:border-[#CAD7D0] shadow-subtle hover:shadow-card cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#747B76]">Outstanding Tasks</span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F1ED] text-[#48504B] flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-heading text-[#252B29] mt-3 tracking-tight">
            {pendingTasks.length}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0F1ED] text-[11px]">
            <span className={overdueTasksCount > 0 ? 'text-[#94372D] font-semibold' : 'text-[#747B76]'}>
              {overdueTasksCount} overdue
            </span>
            <span className="text-[#8E9690] group-hover:text-[#536F67] flex items-center gap-0.5">
              Manage tasks <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* 8.2 Opportunity Pipeline Section */}
      <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold font-heading text-[#252B29]">Standard Opportunity Pipeline</h2>
            <p className="text-xs text-[#747B76]">Click any stage to filter enquiries by operational workflow phase.</p>
          </div>
          <button
            onClick={() => setCurrentRoute('enquiries-projects')}
            className="text-xs font-semibold text-[#536F67] hover:underline flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {pipelineStages.map((st) => {
            const metrics = getStageMetrics(st.stage);
            return (
              <button
                key={st.stage}
                onClick={() => handleStageClick(st.stage)}
                className="p-3 rounded-xl border border-[#E7E9E4] bg-[#FAFBF9] hover:bg-[#EBF2EE] hover:border-[#CAD7D0] text-left transition-all group"
              >
                <div className="text-[11px] font-semibold text-[#48504B] truncate group-hover:text-[#354843]">
                  {st.label}
                </div>
                <div className="text-xl font-bold font-heading text-[#252B29] mt-1">
                  {metrics.count}
                </div>
                <div className="text-[10px] text-[#747B76] font-mono mt-0.5 truncate">
                  {formatGBP(metrics.value)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): 8.3 Email Review Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E7E9E4]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF2EE] text-[#536F67] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-[#252B29]">Correspondence Requiring Attention</h3>
                  <p className="text-[11px] text-[#747B76]">AI-processed emails from Microsoft 365 awaiting human review</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentRoute('emails')}
                className="text-xs font-semibold text-[#536F67] hover:underline"
              >
                Open Full Inbox ({awaitingReviewCount})
              </button>
            </div>

            {/* Email Rows */}
            <div className="divide-y divide-[#E7E9E4]">
              {pendingCorrespondence.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setActiveReviewEmail(email)}
                  className="py-3.5 px-2 hover:bg-[#F7F7F4] rounded-xl cursor-pointer transition-colors group flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-[#252B29] group-hover:text-[#536F67] transition-colors">
                          {email.senderName}
                        </span>
                        {email.senderCompany && (
                          <span className="text-[11px] text-[#747B76] truncate hidden sm:inline">
                            • {email.senderCompany}
                          </span>
                        )}
                        <span className="text-[10px] text-[#8E9690] ml-auto shrink-0 font-medium">
                          {email.receivedAt}
                        </span>
                      </div>
                      <h4 className="text-xs font-medium text-[#252B29] truncate">{email.subject}</h4>
                      <p className="text-[11px] text-[#747B76] line-clamp-1 mt-0.5">{email.preview}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                    <div className="flex items-center gap-2">
                      <Badge label={email.aiClassification} />
                      <span className="text-[10px] text-[#536F67] bg-[#EBF2EE] px-2 py-0.5 rounded font-medium">
                        {email.aiConfidence}% Confidence
                      </span>
                      {email.suggestedProjectName && (
                        <span className="text-[10px] text-[#235A75] bg-[#EAF0F4] px-2 py-0.5 rounded truncate max-w-[180px]">
                          Match: {email.suggestedProjectName}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#536F67] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Review <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8.5 Recent Workspace Activity Timeline */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E7E9E4]">
              <h3 className="text-sm font-bold font-heading text-[#252B29]">Recent Activity Audit Trail</h3>
              <span className="text-xs text-[#747B76]">Chronological workspace feed</span>
            </div>

            <div className="space-y-3">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#536F67] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#252B29]">{act.title}</span>
                      <span className="text-[10px] text-[#8E9690]">{act.timestamp}</span>
                    </div>
                    <p className="text-[#747B76] text-[11px] mt-0.5">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Tasks & Outlook Status */}
        <div className="space-y-4">
          {/* 8.7 Outlook Connection Widget */}
          <div className="p-5 rounded-2xl bg-white border border-[#CAD7D0] shadow-subtle bg-gradient-to-br from-white to-[#FAFBF9]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#536F67] text-white flex items-center justify-center font-bold text-xs">
                  M365
                </div>
                <div>
                  <h4 className="text-xs font-bold font-heading text-[#252B29]">Microsoft 365 Outlook</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#275E38] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                    <span>{currentCompany.connectionStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4] text-[11px] space-y-1 mb-3">
              <div>
                <span className="text-[#747B76]">Mailbox: </span>
                <span className="font-mono font-medium text-[#252B29]">{currentCompany.mailbox}</span>
              </div>
              <div>
                <span className="text-[#747B76]">Folder: </span>
                <span className="text-[#252B29]">{currentCompany.folder}</span>
              </div>
              <div>
                <span className="text-[#747B76]">Last Sync: </span>
                <span className="text-[#252B29]">{currentCompany.lastSync}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => syncOutlook()}
                disabled={isSyncing}
                className="flex-1 py-2 px-3 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Checking...' : 'Sync Now'}</span>
              </button>
              <button
                onClick={() => setCurrentRoute('tasks-admin')}
                className="py-2 px-3 rounded-xl bg-white hover:bg-[#F0F1ED] border border-[#E7E9E4] text-xs font-medium text-[#48504B] transition-colors"
              >
                Settings
              </button>
            </div>
          </div>

          {/* 8.6 Upcoming & Overdue Tasks Widget */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E7E9E4]">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#536F67]" />
                <h3 className="text-xs font-bold font-heading text-[#252B29] uppercase tracking-wider">
                  Priority Action Items
                </h3>
              </div>
              <button
                onClick={() => setCurrentRoute('tasks-admin')}
                className="text-xs font-semibold text-[#536F67] hover:underline"
              >
                All ({pendingTasks.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingTasks.slice(0, 5).map((task) => {
                const isOverdue = new Date(task.dueDate) < new Date();
                return (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4] hover:border-[#CAD7D0] transition-colors text-xs flex items-start gap-2.5"
                  >
                    <input
                      type="checkbox"
                      checked={task.status === 'Completed'}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="rounded border-[#E7E9E4] text-[#536F67] focus:ring-0 mt-0.5 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#252B29] leading-snug line-clamp-1">{task.title}</div>
                      <div className="flex items-center gap-2 text-[10px] text-[#747B76] mt-1">
                        <span className={isOverdue ? 'text-[#94372D] font-semibold' : ''}>
                          Due {task.dueDate}
                        </span>
                        <span>•</span>
                        <span>{task.assignedTo}</span>
                        <span>•</span>
                        <Badge label={task.priority} size="sm" showDot={false} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Side Drawer for reviewing selected email */}
      {activeReviewEmail && (
        <EmailReviewDrawer
          email={activeReviewEmail}
          onClose={() => setActiveReviewEmail(null)}
        />
      )}
    </div>
  );
};
