import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Bell, Sparkles, Mail, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const NotificationsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { correspondence, tasks, activities, setCurrentRoute, setSelectedEmailId } = useWorkspace();

  const pendingCorrespondence = correspondence.filter(c => c.status === 'awaiting_review');
  const overdueTasks = tasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date());

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E7E9E4] rounded-2xl shadow-popover py-3 z-40 animate-fade-in text-xs">
        <div className="flex items-center justify-between px-4 pb-2 border-b border-[#E7E9E4]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#536F67]" />
            <span className="font-semibold text-sm text-[#252B29] font-heading">Workspace Notifications</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF2EE] text-[#354843] font-medium">
            {pendingCorrespondence.length} Pending
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-2">
          {pendingCorrespondence.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-[#8E9690] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#536F67]" />
                Correspondence Needing Review
              </div>
              {pendingCorrespondence.slice(0, 3).map(email => (
                <div
                  key={email.id}
                  onClick={() => {
                    setSelectedEmailId(email.id);
                    setCurrentRoute('emails');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl hover:bg-[#F7F7F4] cursor-pointer transition-colors border border-transparent hover:border-[#E7E9E4]"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#252B29]">
                    <span className="truncate">{email.senderName}</span>
                    <span className="text-[10px] text-[#747B76] shrink-0 font-normal">{email.receivedAt}</span>
                  </div>
                  <p className="text-[11px] text-[#747B76] truncate mt-0.5">{email.subject}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded bg-[#EBF2EE] text-[#354843]">
                    {email.aiClassification}
                  </span>
                </div>
              ))}
            </div>
          )}

          {overdueTasks.length > 0 && (
            <div className="pt-2 border-t border-[#E7E9E4]">
              <div className="px-2 py-1 text-[10px] font-bold text-[#94372D] uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-[#94372D]" />
                Overdue Actions ({overdueTasks.length})
              </div>
              {overdueTasks.slice(0, 2).map(task => (
                <div
                  key={task.id}
                  onClick={() => {
                    setCurrentRoute('tasks-admin');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl hover:bg-[#FDF6F5] cursor-pointer transition-colors border border-transparent hover:border-[#E8CCC7]"
                >
                  <p className="text-xs font-semibold text-[#252B29] truncate">{task.title}</p>
                  <p className="text-[10px] text-[#94372D] mt-0.5">Due: {task.dueDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Recent Activity summary */}
          <div className="pt-2 border-t border-[#E7E9E4]">
            <div className="px-2 py-1 text-[10px] font-bold text-[#8E9690] uppercase tracking-wider">
              Recent Workspace Events
            </div>
            {activities.slice(0, 2).map(act => (
              <div key={act.id} className="p-2 text-[11px] text-[#747B76]">
                <span className="font-semibold text-[#252B29]">{act.title}:</span> {act.description}
                <span className="block text-[10px] text-[#8E9690] mt-0.5">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-3 pt-2 border-t border-[#E7E9E4] text-center">
          <button
            onClick={() => {
              setCurrentRoute('emails');
              onClose();
            }}
            className="w-full py-1.5 rounded-lg bg-[#F7F7F4] hover:bg-[#F0F1ED] text-xs font-medium text-[#354843] transition-colors"
          >
            Open All Correspondence
          </button>
        </div>
      </div>
    </>
  );
};
