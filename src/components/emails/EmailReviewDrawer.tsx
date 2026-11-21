import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Correspondence } from '../../types';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Link2, 
  FileText, 
  AlertTriangle, 
  Paperclip, 
  Calendar, 
  Building2, 
  User, 
  ArrowRight,
  ExternalLink,
  Edit3,
  Download,
  Eye
} from 'lucide-react';
import { formatGBP, formatDateUK } from '../../utils/formatters';
import { Badge } from '../shared/Badge';
import { Modal } from '../shared/Modal';

interface EmailReviewDrawerProps {
  email: Correspondence | null;
  onClose: () => void;
}

export const EmailReviewDrawer: React.FC<EmailReviewDrawerProps> = ({ email, onClose }) => {
  const { 
    acceptEmailRecommendation, 
    rejectEmailRecommendation, 
    linkEmailToProject, 
    projects, 
    viewRecordDetail,
    addTask,
    addToast
  } = useWorkspace();

  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('James Wilson');
  const [taskDueDate, setTaskDueDate] = useState('2026-11-24');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');
  const [editEnquiryModalOpen, setEditEnquiryModalOpen] = useState(false);
  const [editedEnquiryName, setEditedEnquiryName] = useState('');
  const [editedClientCompany, setEditedClientCompany] = useState('');
  const [editedValue, setEditedValue] = useState<number>(450000);
  const [attachmentPreviewName, setAttachmentPreviewName] = useState<string | null>(null);

  if (!email) return null;

  const handleOpenLinkModal = () => {
    setSelectedProjectId(email.suggestedProjectId || projects[0]?.id || '');
    setLinkModalOpen(true);
  };

  const handleConfirmLink = () => {
    if (!selectedProjectId) return;
    linkEmailToProject(email.id, selectedProjectId);
    setLinkModalOpen(false);
    onClose();
  };

  const handleOpenCreateTask = (suggestedTitle?: string) => {
    setTaskTitle(suggestedTitle || `Follow up: ${email.subject}`);
    setTaskDescription(email.aiSummary);
    setTaskPriority(email.missingInfo.length > 0 ? 'Urgent' : 'High');
    setCreateTaskModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: taskTitle,
      description: taskDescription,
      assignedTo: taskAssignee,
      dueDate: taskDueDate,
      priority: taskPriority,
      status: 'To Do',
      relatedProjectId: email.linkedProjectId || email.suggestedProjectId,
      relatedCorrespondenceId: email.id
    });
    setCreateTaskModalOpen(false);
  };

  const handleOpenEditEnquiry = () => {
    setEditedEnquiryName(email.extractedDetails?.projectName || email.subject);
    setEditedClientCompany(email.extractedDetails?.clientCompany || email.senderCompany || 'Foster Developments Ltd');
    setEditedValue(email.extractedDetails?.estimatedValue || 450000);
    setEditEnquiryModalOpen(true);
  };

  const handleConfirmEditEnquiry = () => {
    acceptEmailRecommendation(email.id, {
      name: editedEnquiryName,
      clientCompany: editedClientCompany,
      estimatedValue: Number(editedValue)
    });
    setEditEnquiryModalOpen(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#252B29]/30 backdrop-blur-xs z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-white shadow-modal z-50 flex flex-col overflow-hidden border-l border-[#E7E9E4] animate-fade-in">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#E7E9E4] bg-[#FAFBF9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#747B76]">Correspondence Analysis</span>
            <span className="text-[#8E9690]">•</span>
            <Badge label={email.aiClassification} />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#747B76] hover:text-[#252B29] hover:bg-[#F0F1ED] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Email Header Info */}
          <div>
            <h2 className="text-lg font-bold text-[#252B29] font-heading mb-3">{email.subject}</h2>
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4] text-xs">
              <div>
                <span className="text-[#747B76]">From: </span>
                <span className="font-semibold text-[#252B29]">{email.senderName}</span>
                {email.senderCompany && (
                  <span className="text-[#536F67] font-medium ml-1">({email.senderCompany})</span>
                )}
                <span className="block text-[11px] text-[#747B76]">{email.senderEmail}</span>
              </div>
              <div className="text-right">
                <span className="text-[#747B76] block">Received:</span>
                <span className="font-medium text-[#252B29]">{email.receivedAt}</span>
              </div>
            </div>
          </div>

          {/* AI Intelligence Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAFBF9] to-[#F2F5F3] border border-[#CAD7D0] shadow-xs relative">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E7E9E4]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#536F67] text-white flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold font-heading text-[#252B29] uppercase tracking-wider">
                  BuildFlow Intelligence
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#275E38] bg-[#E8F0E9] border border-[#CCE0CE] px-2.5 py-0.5 rounded-full">
                {email.aiConfidence}% AI Confidence
              </span>
            </div>

            {/* AI Summary */}
            <div className="mb-4">
              <span className="text-[10px] font-bold text-[#536F67] uppercase tracking-wider block mb-1">
                Executive Synthesis
              </span>
              <p className="text-xs text-[#252B29] leading-relaxed font-medium">
                {email.aiSummary}
              </p>
            </div>

            {/* Extracted Details (if New Enquiry) */}
            {email.extractedDetails && (
              <div className="mb-4 p-3 rounded-xl bg-white border border-[#E7E9E4]">
                <div className="text-[10px] font-bold text-[#747B76] uppercase tracking-wider mb-2">
                  Extracted Enquiry Specifications
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#747B76] text-[11px] block">Project Scheme:</span>
                    <span className="font-semibold text-[#252B29]">{email.extractedDetails.projectName || 'Commercial Extension'}</span>
                  </div>
                  <div>
                    <span className="text-[#747B76] text-[11px] block">Location:</span>
                    <span className="font-semibold text-[#252B29]">{email.extractedDetails.projectLocation || 'Manchester, UK'}</span>
                  </div>
                  <div>
                    <span className="text-[#747B76] text-[11px] block">Estimated Value:</span>
                    <span className="font-semibold text-[#275E38]">
                      {email.extractedDetails.estimatedValue ? formatGBP(email.extractedDetails.estimatedValue) : 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#747B76] text-[11px] block">Project Type:</span>
                    <span className="font-semibold text-[#252B29]">{email.extractedDetails.projectType || 'Commercial'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Project Match (if Existing Project) */}
            {email.suggestedProjectName && (
              <div className="mb-4 p-3 rounded-xl bg-white border border-[#CFDFEA]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold text-[#235A75] uppercase tracking-wider">
                    Suggested Project Match
                  </span>
                  <span className="text-[11px] font-semibold text-[#235A75]">{email.matchConfidence}% Match</span>
                </div>
                <div className="text-xs font-semibold text-[#252B29]">{email.suggestedProjectName}</div>
                <p className="text-[11px] text-[#747B76] mt-0.5">{email.suggestedMatchReason}</p>
              </div>
            )}

            {/* Missing Information Callout */}
            {email.missingInfo.length > 0 && (
              <div className="mb-4 p-3 rounded-xl bg-[#FDF9F3] border border-[#F1DFC4]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#875317] mb-2 uppercase tracking-wider text-[10px]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Identified Missing Information ({email.missingInfo.length})
                </div>
                <ul className="space-y-1">
                  {email.missingInfo.map((info, idx) => (
                    <li key={idx} className="text-xs text-[#875317] flex items-start gap-1.5">
                      <span className="text-[#D97706]">•</span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Actions */}
            <div>
              <span className="text-[10px] font-bold text-[#536F67] uppercase tracking-wider block mb-2">
                Suggested Next Actions
              </span>
              <div className="space-y-1.5">
                {email.suggestedActions.map((action, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E7E9E4] text-xs">
                    <span className="text-[#252B29] font-medium">{action}</span>
                    <button
                      onClick={() => handleOpenCreateTask(action)}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#536F67] hover:bg-[#EBF2EE] border border-[#CAD7D0] transition-colors"
                    >
                      + Create Task
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Human-in-the-loop disclaimer */}
            <div className="mt-3 pt-2 border-t border-[#E7E9E4] text-[10px] text-[#747B76] italic">
              AI-generated recommendations should be reviewed and verified by staff before being applied.
            </div>
          </div>

          {/* Email Body */}
          <div>
            <h3 className="text-xs font-bold text-[#747B76] uppercase tracking-wider mb-2">Message Body</h3>
            <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] text-xs text-[#252B29] whitespace-pre-line leading-relaxed font-sans">
              {email.body}
            </div>
          </div>

          {/* Attachments Section */}
          {email.attachments.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-[#747B76] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5" />
                Attachments ({email.attachments.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {email.attachments.map((att, i) => (
                  <div 
                    key={i}
                    onClick={() => setAttachmentPreviewName(att.name)}
                    className="p-2.5 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4] hover:border-[#CAD7D0] flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-[#536F67] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-[#252B29] truncate group-hover:text-[#536F67]">{att.name}</div>
                        <div className="text-[10px] text-[#747B76]">{att.size} • {att.type}</div>
                      </div>
                    </div>
                    <Eye className="w-3.5 h-3.5 text-[#747B76] group-hover:text-[#252B29] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E7E9E4] bg-[#FAFBF9] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                rejectEmailRecommendation(email.id);
                onClose();
              }}
              className="px-3 py-2 rounded-xl border border-[#E7E9E4] bg-white text-xs font-semibold text-[#94372D] hover:bg-[#FDF6F5] transition-colors"
            >
              Dismiss Recommendation
            </button>
            <button
              onClick={handleOpenEditEnquiry}
              className="px-3 py-2 rounded-xl border border-[#E7E9E4] bg-white text-xs font-semibold text-[#48504B] hover:bg-[#F0F1ED] transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Details
            </button>
          </div>

          <div className="flex items-center gap-2">
            {email.aiClassification === 'Existing Project Correspondence' && (
              <button
                onClick={handleOpenLinkModal}
                className="px-4 py-2 rounded-xl border border-[#CFDFEA] bg-[#EAF0F4] text-xs font-semibold text-[#235A75] hover:bg-[#DCE7EF] transition-colors flex items-center gap-1.5"
              >
                <Link2 className="w-3.5 h-3.5" />
                Link to Project
              </button>
            )}

            <button
              onClick={() => {
                acceptEmailRecommendation(email.id);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              {email.aiClassification === 'New Enquiry' ? 'Accept & Create Enquiry' : 'Accept Recommendation'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Link to Project */}
      {linkModalOpen && (
        <Modal
          isOpen={linkModalOpen}
          onClose={() => setLinkModalOpen(false)}
          title="Link Correspondence to Existing Project"
          subtitle="Select the project to associate this email and future thread correspondence with."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1.5">Select Target Project</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-[#E7E9E4] bg-white text-[#252B29] focus:outline-none focus:border-[#536F67]"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.ref} — {p.name} ({p.clientCompany})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4] text-xs space-y-1">
              <div className="font-semibold text-[#252B29]">AI Match Recommendation:</div>
              <div className="text-[#747B76]">
                {email.suggestedProjectName || 'Riverside Office Development'} ({email.matchConfidence || 95}% confidence match)
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="px-3 py-2 text-xs font-medium text-[#747B76] hover:text-[#252B29]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLink}
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold hover:bg-[#425952]"
              >
                Confirm Link
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Create Task */}
      {createTaskModalOpen && (
        <Modal
          isOpen={createTaskModalOpen}
          onClose={() => setCreateTaskModalOpen(false)}
          title="Create Action Item from Correspondence"
          subtitle="Assign this task to a project team member with clear priorities."
        >
          <form onSubmit={handleSaveTask} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Task Title</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] focus:outline-none focus:border-[#536F67]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Description / Context</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                rows={2}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] focus:outline-none focus:border-[#536F67]"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Assigned To</label>
                <select
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
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
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Priority</label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as any)}
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
                className="px-3 py-2 text-xs font-medium text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold hover:bg-[#425952]"
              >
                Create Task
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Edit Enquiry Info before accepting */}
      {editEnquiryModalOpen && (
        <Modal
          isOpen={editEnquiryModalOpen}
          onClose={() => setEditEnquiryModalOpen(false)}
          title="Review & Edit Extracted Enquiry Information"
          subtitle="Adjust details extracted from the email before registering in the central pipeline."
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Enquiry Scheme Name</label>
              <input
                type="text"
                value={editedEnquiryName}
                onChange={(e) => setEditedEnquiryName(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Client Company</label>
              <input
                type="text"
                value={editedClientCompany}
                onChange={(e) => setEditedClientCompany(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Estimated Value (£ GBP)</label>
              <input
                type="number"
                value={editedValue}
                onChange={(e) => setEditedValue(Number(e.target.value))}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditEnquiryModalOpen(false)}
                className="px-3 py-2 text-xs text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmEditEnquiry}
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold hover:bg-[#425952]"
              >
                Save & Create Enquiry
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Simulated Attachment Preview Modal */}
      {attachmentPreviewName && (
        <Modal
          isOpen={!!attachmentPreviewName}
          onClose={() => setAttachmentPreviewName(null)}
          title={`Document Preview: ${attachmentPreviewName}`}
          subtitle="Simulated drawing / specification viewer"
          maxWidth="2xl"
        >
          <div className="p-8 bg-[#F7F7F4] border border-[#E7E9E4] rounded-xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#CAD7D0] flex items-center justify-center text-[#536F67] mb-4 shadow-sm">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-[#252B29] font-heading">{attachmentPreviewName}</h4>
            <p className="text-xs text-[#747B76] mt-1 max-w-md">
              Demonstration document viewer. In production, BuildFlow integrates with Microsoft 365 SharePoint / OneDrive for native drawing inspection.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  addToast('Download Initiated (Demo)', `Downloaded ${attachmentPreviewName}`, 'info');
                  setAttachmentPreviewName(null);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold hover:bg-[#425952]"
              >
                <Download className="w-4 h-4" />
                Simulate Download
              </button>
              <button
                onClick={() => setAttachmentPreviewName(null)}
                className="px-4 py-2 rounded-xl border border-[#E7E9E4] bg-white text-xs font-medium text-[#48504B]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
