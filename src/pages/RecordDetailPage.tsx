import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { 
  Building2, 
  Mail, 
  CheckSquare, 
  Sparkles, 
  Paperclip, 
  Calendar, 
  MapPin, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Edit3, 
  Send, 
  Copy, 
  RefreshCw, 
  Download,
  Plus,
  Eye,
  FileText
} from 'lucide-react';
import { formatGBP, formatDateUK } from '../utils/formatters';
import { Badge } from '../components/shared/Badge';
import { Modal } from '../components/shared/Modal';
import { EmailReviewDrawer } from '../components/emails/EmailReviewDrawer';
import { Correspondence } from '../types';

export const RecordDetailPage: React.FC = () => {
  const { 
    selectedRecordId, 
    selectedRecordType, 
    setCurrentRoute, 
    projects, 
    enquiries, 
    correspondence, 
    tasks, 
    activities, 
    addTask,
    addToast,
    currentUser
  } = useWorkspace();

  // Find project or enquiry
  const project = projects.find(p => p.id === selectedRecordId);
  const enquiry = enquiries.find(e => e.id === selectedRecordId);
  const isProject = selectedRecordType === 'project' || !!project;
  const currentRecord = isProject ? (project || projects[0]) : (enquiry || enquiries[0]);

  // Associated correspondence
  const recordCorrespondence = correspondence.filter(c => 
    isProject ? (c.linkedProjectId === currentRecord.id || c.suggestedProjectId === currentRecord.id)
              : (c.linkedEnquiryId === currentRecord.id)
  );

  // Associated tasks
  const recordTasks = tasks.filter(t => 
    isProject ? (t.relatedProjectId === currentRecord.id)
              : (t.relatedEnquiryId === currentRecord.id)
  );

  // Missing info checklist (local state for demonstration interactive resolution)
  const [missingItems, setMissingItems] = useState<{ id: number; text: string; source: string; resolved: boolean }[]>([
    { id: 1, text: 'Consulting engineers approved drawings SD-104 & SD-105', source: 'Thomas Reed (16:15)', resolved: false },
    { id: 2, text: 'Confirmation of MEP first-fix commencement date', source: 'Sarah Mitchell (07:48)', resolved: false },
    { id: 3, text: 'Signed-off pile-cap calculation schedule', source: 'Structural Consultant', resolved: true },
    { id: 4, text: 'Client M&E technical approval for Daikin substitution', source: 'Peter Gallagher (16:40)', resolved: false },
  ]);

  // Modals
  const [composerOpen, setComposerOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [activeReviewEmail, setActiveReviewEmail] = useState<Correspondence | null>(null);

  // AI Email Composer State
  const [draftTo, setDraftTo] = useState(currentRecord.clientEmail || 's.mitchell@riversideproperty.co.uk');
  const [draftSubject, setDraftSubject] = useState(`Re: Updated Construction Programme — ${currentRecord.name}`);
  const [draftBody, setDraftBody] = useState(`Hi ${currentRecord.clientName.split(' ')[0] || 'Sarah'},

Thank you for sharing the revised construction programme (Rev 04).

We have received the updated schedule and are reviewing the 5-day substructure slippage against our MEP first-fix contractor dates, alongside the accelerated curtain wall delivery scheduled for 14 April 2027.

We will provide our formal confirmation and any operational observations within 48 hours.

Kind regards,
${currentUser.name}
${currentUser.role} | Northstar Construction Ltd`);

  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(currentUser.name);
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-11-25');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');

  const handleToggleMissingItem = (id: number) => {
    setMissingItems(prev => prev.map(item => 
      item.id === id ? { ...item, resolved: !item.resolved } : item
    ));
    addToast('Status Updated', 'Follow-up requirement status updated.', 'info');
  };

  const handleRegenerateDraft = () => {
    setIsGeneratingDraft(true);
    setTimeout(() => {
      setDraftBody(`Hi ${currentRecord.clientName.split(' ')[0] || 'Client'},

Further to your recent correspondence regarding ${currentRecord.name}, our commercial and site engineering teams have reviewed the latest technical submissions.

We have raised the necessary queries with our mechanical consultants and anticipate providing our final programme sign-off by close of business tomorrow.

Please let us know if you require any interim clarifications.

Best regards,
${currentUser.name}
Northstar Construction Ltd`);
      setIsGeneratingDraft(false);
      addToast('Draft Regenerated', 'AI synthesized new context from latest email thread.', 'success');
    }, 700);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftBody);
    addToast('Copied to Clipboard', 'Email draft copied. Ready to paste into Outlook.', 'info');
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: newTaskTitle,
      description: `Task created for ${currentRecord.name}`,
      assignedTo: newTaskAssignee,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
      status: 'To Do',
      relatedProjectId: isProject ? currentRecord.id : undefined,
      relatedEnquiryId: !isProject ? currentRecord.id : undefined
    });
    setCreateTaskModalOpen(false);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 11. Back button & Top Header */}
      <div>
        <button
          onClick={() => setCurrentRoute('enquiries-projects')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#536F67] hover:text-[#354843] mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Enquiries & Projects</span>
        </button>

        <div className="p-6 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-semibold text-[#536F67] bg-[#EBF2EE] px-2 py-0.5 rounded">
                {currentRecord.ref}
              </span>
              <Badge label={currentRecord.status} />
              <span className="text-xs text-[#747B76]">
                {isProject ? 'Commercial Contract' : 'Enquiry Opportunity'}
              </span>
            </div>

            <h1 className="text-2xl font-bold font-heading text-[#252B29] tracking-tight">
              {currentRecord.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#747B76] mt-2">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#536F67]" />
                <span className="font-medium text-[#252B29]">{currentRecord.clientCompany}</span>
                <span>({currentRecord.clientName})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#536F67]" />
                <span>{currentRecord.location}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-[#275E38]">
                <span>Contract Value: {formatGBP(currentRecord.estimatedValue)}</span>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setNewTaskTitle(`Review requirements: ${currentRecord.name}`);
                setCreateTaskModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F7F7F4] border border-[#E7E9E4] text-xs font-semibold text-[#48504B] shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5 text-[#536F67]" />
              <span>Create Task</span>
            </button>

            {/* 11.10 AI-Assisted Email Drafting CTA */}
            <button
              onClick={() => setComposerOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Draft Email with AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 11.2 Overview Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
          <div className="text-[11px] font-medium text-[#747B76]">Total Correspondence</div>
          <div className="text-2xl font-bold font-heading text-[#252B29] mt-1">
            {recordCorrespondence.length + 5}
          </div>
          <div className="text-[10px] text-[#275E38] font-medium mt-1">All threads indexed</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
          <div className="text-[11px] font-medium text-[#747B76]">Outstanding Tasks</div>
          <div className="text-2xl font-bold font-heading text-[#252B29] mt-1">
            {recordTasks.filter(t => t.status !== 'Completed').length || 2}
          </div>
          <div className="text-[10px] text-[#D97706] font-medium mt-1">1 high priority</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
          <div className="text-[11px] font-medium text-[#747B76]">Information To Follow Up</div>
          <div className="text-2xl font-bold font-heading text-[#875317] mt-1">
            {missingItems.filter(i => !i.resolved).length}
          </div>
          <div className="text-[10px] text-[#875317] font-medium mt-1">Technical items pending</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
          <div className="text-[11px] font-medium text-[#747B76]">Last Communication</div>
          <div className="text-lg font-bold font-heading text-[#252B29] mt-1.5 truncate">
            Today, 07:48
          </div>
          <div className="text-[10px] text-[#747B76] mt-0.5">Updated programme email</div>
        </div>
      </div>

      {/* Main Grid: 11.4 Correspondence Timeline & 11.5 AI Intelligence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7/12): Timeline & Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Details Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#747B76] mb-3">
              Scheme Description & Technical Specification
            </h3>
            <p className="text-xs text-[#252B29] leading-relaxed mb-4">
              {currentRecord.description || 'Contemporary commercial construction scheme with high-specification curtain walling, structural steel framing, and targeted BREEAM environmental standards.'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E7E9E4] text-xs">
              <div>
                <span className="text-[#8E9690] text-[11px] block">Project Owner</span>
                <span className="font-semibold text-[#252B29]">{isProject ? (currentRecord as any).projectOwner : (currentRecord as any).assignedTo}</span>
              </div>
              <div>
                <span className="text-[#8E9690] text-[11px] block">Project Type</span>
                <span className="font-semibold text-[#252B29]">{currentRecord.projectType}</span>
              </div>
              <div>
                <span className="text-[#8E9690] text-[11px] block">Target Handover</span>
                <span className="font-semibold text-[#252B29]">30 Aug 2027</span>
              </div>
            </div>
          </div>

          {/* 11.4 Correspondence Timeline */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E7E9E4]">
              <div>
                <h3 className="text-sm font-bold font-heading text-[#252B29]">Central Correspondence History</h3>
                <p className="text-xs text-[#747B76]">Chronological archive of all emails linked to this scheme</p>
              </div>
              <span className="text-xs font-semibold text-[#536F67] bg-[#EBF2EE] px-2.5 py-1 rounded-lg">
                {recordCorrespondence.length} Linked Threads
              </span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7E9E4]">
              {/* Linked Emails */}
              {recordCorrespondence.map((email) => (
                <div 
                  key={email.id} 
                  onClick={() => setActiveReviewEmail(email)}
                  className="relative pl-7 cursor-pointer group"
                >
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#536F67] border-2 border-white ring-2 ring-[#E7E9E4] group-hover:scale-110 transition-transform" />
                  
                  <div className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4] group-hover:border-[#CAD7D0] transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="text-xs font-semibold text-[#252B29] group-hover:text-[#536F67] transition-colors">
                        {email.subject}
                      </div>
                      <span className="text-[10px] text-[#8E9690] shrink-0">{email.receivedAt}</span>
                    </div>

                    <div className="text-[11px] text-[#747B76] mb-2">
                      Sender: <span className="font-medium text-[#252B29]">{email.senderName}</span> &lt;{email.senderEmail}&gt;
                    </div>

                    <p className="text-xs text-[#48504B] leading-relaxed line-clamp-2 mb-2">
                      {email.aiSummary}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#E7E9E4]/60">
                      <Badge label={email.aiClassification} size="sm" />
                      {email.attachments.length > 0 && (
                        <span className="flex items-center gap-1 text-[#536F67] font-medium text-[10px]">
                          <Paperclip className="w-3 h-3" />
                          {email.attachments.length} files attached
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Static Historical entries to show complete project life cycle */}
              <div className="relative pl-7">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#8E9690] border-2 border-white" />
                <div className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#252B29]">Structural Drawing Submission (Rev B)</span>
                    <span className="text-[10px] text-[#8E9690]">08 Nov 2026</span>
                  </div>
                  <p className="text-[11px] text-[#747B76]">Consulting engineers issued foundation pile-cap design calculations.</p>
                </div>
              </div>

              <div className="relative pl-7">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#8E9690] border-2 border-white" />
                <div className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#252B29]">Initial Project Correspondence & Award Confirmation</span>
                    <span className="text-[10px] text-[#8E9690]">02 Nov 2026</span>
                  </div>
                  <p className="text-[11px] text-[#747B76]">Formal letter of intent issued by Riverside Property Group.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5/12): 11.5 BuildFlow Intelligence & 11.6 Missing Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* 11.5 AI Intelligence Panel */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAFBF9] via-[#F7FAF8] to-[#F0F5F2] border border-[#CAD7D0] shadow-subtle">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#CAD7D0]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#536F67] text-white flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold font-heading text-[#252B29] uppercase tracking-wider">
                  BuildFlow Intelligence
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-[#275E38] bg-[#E8F0E9] px-2 py-0.5 rounded-full border border-[#CCE0CE]">
                Live AI Analysis
              </span>
            </div>

            <div className="mb-4">
              <div className="text-[10px] font-bold text-[#536F67] uppercase tracking-wider mb-1">
                Latest Correspondence Summary
              </div>
              <p className="text-xs text-[#252B29] leading-relaxed font-medium">
                Latest correspondence indicates that the client has requested an updated completion programme (Rev 04), noting a 5-day substructure slippage and accelerated curtain wall delivery.
              </p>
            </div>

            <div className="mb-4">
              <div className="text-[10px] font-bold text-[#536F67] uppercase tracking-wider mb-2">
                Suggested Next Actions
              </div>
              <div className="space-y-1.5">
                {[
                  'Review revised construction schedule with MEP subcontractor',
                  'Confirm proposed completion date (30 Aug 2027)',
                  'Notify project manager and lead estimator',
                  'Prepare client response acknowledging programme'
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E7E9E4] text-xs">
                    <span className="text-[#252B29] font-medium">{act}</span>
                    <button
                      onClick={() => {
                        setNewTaskTitle(act);
                        setCreateTaskModalOpen(true);
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#536F67] hover:bg-[#EBF2EE] border border-[#CAD7D0] shrink-0 ml-2"
                    >
                      + Task
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-[#747B76] italic pt-2 border-t border-[#CAD7D0]/60">
              AI-generated recommendations should be reviewed before being applied.
            </div>
          </div>

          {/* 11.6 Missing Information / Information to Follow Up */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E7E9E4]">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#875317]" />
                <h3 className="text-xs font-bold font-heading text-[#252B29] uppercase tracking-wider">
                  Information to Follow Up ({missingItems.filter(i => !i.resolved).length})
                </h3>
              </div>
              <span className="text-[11px] text-[#747B76]">Click checkmark to resolve</span>
            </div>

            <div className="space-y-2.5">
              {missingItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-colors flex items-start gap-2.5 ${
                    item.resolved 
                      ? 'bg-[#F7F7F4] border-[#E7E9E4] opacity-60' 
                      : 'bg-[#FDF9F3] border-[#F1DFC4]'
                  }`}
                >
                  <button
                    onClick={() => handleToggleMissingItem(item.id)}
                    className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-colors ${
                      item.resolved 
                        ? 'bg-[#16A34A] border-[#16A34A] text-white' 
                        : 'border-[#CAD7D0] hover:border-[#536F67] bg-white'
                    }`}
                  >
                    {item.resolved && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium leading-snug ${item.resolved ? 'line-through text-[#747B76]' : 'text-[#252B29]'}`}>
                      {item.text}
                    </div>
                    <div className="text-[10px] text-[#8E9690] mt-0.5">Source: {item.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 11.7 Important Dates Timeline */}
          <div className="p-5 rounded-2xl bg-white border border-[#E7E9E4] shadow-subtle">
            <h3 className="text-xs font-bold font-heading text-[#252B29] uppercase tracking-wider mb-3">
              Key Project Milestones & Critical Dates
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4]">
                <div>
                  <span className="font-semibold text-[#252B29]">Revised Programme Submission</span>
                  <span className="block text-[10px] text-[#747B76]">Client review deadline</span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#536F67]">25 Nov 2026</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4]">
                <div>
                  <span className="font-semibold text-[#252B29]">Client & Consultant Progress Meeting</span>
                  <span className="block text-[10px] text-[#747B76]">Site office workshop</span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#536F67]">27 Nov 2026</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4]">
                <div>
                  <span className="font-semibold text-[#252B29]">Curtain Walling Lead Delivery</span>
                  <span className="block text-[10px] text-[#747B76]">Statutory embargo window</span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#536F67]">14 Apr 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 11.10 AI Email Composer Modal */}
      {composerOpen && (
        <Modal
          isOpen={composerOpen}
          onClose={() => setComposerOpen(false)}
          title="Draft Email with AI Assistance"
          subtitle="Pre-populated with relevant context from the latest project correspondence thread."
          maxWidth="3xl"
        >
          <div className="space-y-4">
            {/* Mandatory Demo Notice */}
            <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#CAD7D0] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#536F67]" />
                <span className="font-semibold text-[#354843]">AI Draft Generated from Thread</span>
              </div>
              <span className="text-[10px] font-mono text-[#747B76] bg-white px-2 py-0.5 rounded border border-[#E7E9E4]">
                Demo Mode — No email will be sent
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">To</label>
              <input
                type="email"
                value={draftTo}
                onChange={(e) => setDraftTo(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white focus:outline-none focus:border-[#536F67]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Subject</label>
              <input
                type="text"
                value={draftSubject}
                onChange={(e) => setDraftSubject(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white focus:outline-none focus:border-[#536F67]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-[#48504B]">Message Draft (Editable)</label>
                <button
                  type="button"
                  onClick={handleRegenerateDraft}
                  disabled={isGeneratingDraft}
                  className="text-xs font-semibold text-[#536F67] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isGeneratingDraft ? 'animate-spin' : ''}`} />
                  <span>Regenerate Draft with AI</span>
                </button>
              </div>
              <textarea
                rows={9}
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-[#E7E9E4] font-sans leading-relaxed focus:outline-none focus:border-[#536F67]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E7E9E4]">
              <button
                type="button"
                onClick={handleCopyDraft}
                className="px-3.5 py-2 rounded-xl border border-[#E7E9E4] bg-white text-xs font-medium text-[#48504B] hover:bg-[#F0F1ED] transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to Clipboard</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="px-3 py-2 text-xs text-[#747B76]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToast('Draft Approved', 'Email draft marked as approved and saved to project record.', 'success');
                    setComposerOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Save Draft (Demo)</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Task Modal */}
      {createTaskModalOpen && (
        <Modal
          isOpen={createTaskModalOpen}
          onClose={() => setCreateTaskModalOpen(false)}
          title={`Create Task for ${currentRecord.name}`}
          subtitle="Assign an operational milestone or follow-up to a team member."
        >
          <form onSubmit={handleSaveTask} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Task Title</label>
              <input
                type="text"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Assignee</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
                >
                  <option value="James Wilson">James Wilson</option>
                  <option value="Sarah Mitchell">Sarah Mitchell</option>
                  <option value="Daniel Foster">Daniel Foster</option>
                  <option value="Oliver Reed">Oliver Reed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setCreateTaskModalOpen(false)}
                className="px-3 py-2 text-xs text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold"
              >
                Create Task
              </button>
            </div>
          </form>
        </Modal>
      )}

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
