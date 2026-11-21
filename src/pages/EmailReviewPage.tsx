import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Correspondence, AIClassification } from '../types';
import { 
  Mail, 
  Search, 
  Sparkles, 
  Paperclip, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Link2, 
  ArrowRight,
  FileText,
  AlertTriangle,
  Building2,
  Calendar,
  Eye,
  Edit3,
  Download,
  Plus
} from 'lucide-react';
import { Badge } from '../components/shared/Badge';
import { formatGBP } from '../utils/formatters';
import { Modal } from '../components/shared/Modal';

export const EmailReviewPage: React.FC = () => {
  const { 
    correspondence, 
    selectedEmailId, 
    setSelectedEmailId, 
    acceptEmailRecommendation, 
    rejectEmailRecommendation, 
    linkEmailToProject, 
    projects,
    addTask,
    addToast
  } = useWorkspace();

  const [activeCategory, setActiveCategory] = useState<string>('awaiting');
  const [searchQuery, setSearchQuery] = useState('');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Modals inside preview
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [targetProjectId, setTargetProjectId] = useState<string>('');
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null);

  // Filtered list
  const filteredEmails = useMemo(() => {
    return correspondence
      .filter(item => {
        // Category filter
        if (activeCategory === 'awaiting' && item.status !== 'awaiting_review') return false;
        if (activeCategory === 'reviewed' && item.status === 'awaiting_review') return false;
        if (activeCategory === 'enquiries' && item.aiClassification !== 'New Enquiry') return false;
        if (activeCategory === 'projects' && item.aiClassification !== 'Existing Project Correspondence') return false;
        if (activeCategory === 'unrelated' && item.aiClassification !== 'Unrelated Communication') return false;

        // Classification dropdown
        if (classificationFilter !== 'all' && item.aiClassification !== classificationFilter) return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchSender = item.senderName.toLowerCase().includes(q) || item.senderEmail.toLowerCase().includes(q);
          const matchSubject = item.subject.toLowerCase().includes(q);
          const matchBody = item.body.toLowerCase().includes(q);
          if (!matchSender && !matchSubject && !matchBody) return false;
        }

        return true;
      })
      .sort((a, b) => {
        return sortOrder === 'newest' ? -1 : 1;
      });
  }, [correspondence, activeCategory, classificationFilter, searchQuery, sortOrder]);

  // Selected email
  const currentEmail = useMemo(() => {
    if (selectedEmailId) {
      const found = correspondence.find(c => c.id === selectedEmailId);
      if (found) return found;
    }
    return filteredEmails[0] || correspondence[0];
  }, [selectedEmailId, correspondence, filteredEmails]);

  const handleLinkProject = () => {
    if (!currentEmail || !targetProjectId) return;
    linkEmailToProject(currentEmail.id, targetProjectId);
    setLinkModalOpen(false);
  };

  const categories = [
    { id: 'awaiting', label: 'Awaiting Review', count: correspondence.filter(c => c.status === 'awaiting_review').length },
    { id: 'all', label: 'All Messages', count: correspondence.length },
    { id: 'enquiries', label: 'New Enquiries', count: correspondence.filter(c => c.aiClassification === 'New Enquiry').length },
    { id: 'projects', label: 'Project Updates', count: correspondence.filter(c => c.aiClassification === 'Existing Project Correspondence').length },
    { id: 'unrelated', label: 'Unrelated Comm.', count: correspondence.filter(c => c.aiClassification === 'Unrelated Communication').length },
    { id: 'reviewed', label: 'Reviewed & Processed', count: correspondence.filter(c => c.status !== 'awaiting_review').length },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E7E9E4]">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#252B29]">Email Intelligence Review</h1>
          <p className="text-xs text-[#747B76]">
            Examine incoming correspondence, inspect AI extraction, and authorise project links or new enquiry records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#536F67] bg-[#EBF2EE] px-3 py-1.5 rounded-xl border border-[#CAD7D0]">
            {correspondence.filter(c => c.status === 'awaiting_review').length} Awaiting Authorization
          </span>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[calc(100vh-190px)] min-h-[640px]">
        {/* Left Column (2/12): Categories Navigation */}
        <div className="md:col-span-3 lg:col-span-2 bg-white rounded-2xl border border-[#E7E9E4] p-3 shadow-subtle flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#8E9690] uppercase tracking-wider px-2 py-1">
              Inbox Folders
            </div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  activeCategory === cat.id 
                    ? 'bg-[#EBF2EE] text-[#354843] font-semibold' 
                    : 'text-[#48504B] hover:bg-[#F7F7F4]'
                }`}
              >
                <span className="truncate">{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-[#536F67] text-white' : 'bg-[#F0F1ED] text-[#747B76]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#CAD7D0] text-[11px] text-[#747B76]">
            <span className="font-semibold text-[#354843] block mb-1">Human Approval Mode</span>
            Every AI extraction must be explicitly authorised by an administrator.
          </div>
        </div>

        {/* Center Column (4/12 or 5/12): Email List */}
        <div className="md:col-span-4 lg:col-span-4 bg-white rounded-2xl border border-[#E7E9E4] shadow-subtle flex flex-col overflow-hidden">
          {/* List Search and Filter bar */}
          <div className="p-3 border-b border-[#E7E9E4] space-y-2 bg-[#FAFBF9]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8E9690] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages, senders, bodies..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#E7E9E4] bg-white focus:outline-none focus:border-[#536F67]"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <select
                value={classificationFilter}
                onChange={(e) => setClassificationFilter(e.target.value)}
                className="text-[11px] p-1.5 rounded-lg border border-[#E7E9E4] bg-white text-[#48504B]"
              >
                <option value="all">All Classifications</option>
                <option value="New Enquiry">New Enquiries</option>
                <option value="Existing Project Correspondence">Project Correspondence</option>
                <option value="Unrelated Communication">Unrelated</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="text-[11px] p-1.5 rounded-lg border border-[#E7E9E4] bg-white text-[#48504B]"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
              </select>
            </div>
          </div>

          {/* List of Emails */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E7E9E4]">
            {filteredEmails.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#747B76]">
                No messages match the selected filters.
              </div>
            ) : (
              filteredEmails.map(email => {
                const isSelected = currentEmail?.id === email.id;
                return (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmailId(email.id)}
                    className={`p-3.5 cursor-pointer transition-colors text-xs ${
                      isSelected 
                        ? 'bg-[#EBF2EE]/70 border-l-4 border-l-[#536F67]' 
                        : 'hover:bg-[#F7F7F4]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`font-semibold truncate ${isSelected ? 'text-[#354843]' : 'text-[#252B29]'}`}>
                        {email.senderName}
                      </span>
                      <span className="text-[10px] text-[#8E9690] shrink-0">{email.receivedAt}</span>
                    </div>
                    <div className="font-medium text-[#252B29] truncate mb-1">{email.subject}</div>
                    <p className="text-[11px] text-[#747B76] line-clamp-2 leading-relaxed mb-2">
                      {email.preview}
                    </p>
                    <div className="flex items-center justify-between gap-1 text-[10px]">
                      <Badge label={email.aiClassification} size="sm" />
                      {email.attachments.length > 0 && (
                        <span className="flex items-center gap-1 text-[#747B76]">
                          <Paperclip className="w-3 h-3" />
                          {email.attachments.length}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (5/12 or 6/12): Selected Email Full Preview & AI Panel */}
        <div className="md:col-span-5 lg:col-span-6 bg-white rounded-2xl border border-[#E7E9E4] shadow-subtle flex flex-col overflow-hidden">
          {currentEmail ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Message Header Bar */}
              <div className="p-4 border-b border-[#E7E9E4] bg-[#FAFBF9] flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge label={currentEmail.aiClassification} />
                    <span className="text-[11px] font-semibold text-[#275E38] bg-[#E8F0E9] px-2 py-0.5 rounded-full border border-[#CCE0CE]">
                      {currentEmail.aiConfidence}% AI Confidence
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-[#252B29] font-heading">{currentEmail.subject}</h2>
                  <div className="text-xs text-[#747B76] mt-1">
                    From: <span className="font-semibold text-[#252B29]">{currentEmail.senderName}</span>
                    {currentEmail.senderCompany && ` (${currentEmail.senderCompany})`} &lt;{currentEmail.senderEmail}&gt;
                  </div>
                </div>
                <span className="text-xs text-[#8E9690] shrink-0 font-medium">{currentEmail.receivedAt}</span>
              </div>

              {/* Scrollable Center: AI Intelligence & Message */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* AI Intelligence Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAFBF9] to-[#F2F5F3] border border-[#CAD7D0]">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#536F67]" />
                    <span className="text-xs font-bold font-heading text-[#252B29] uppercase tracking-wider">
                      BuildFlow Intelligence Summary
                    </span>
                  </div>
                  <p className="text-xs text-[#252B29] leading-relaxed font-medium mb-3">
                    {currentEmail.aiSummary}
                  </p>

                  {/* Extracted Details */}
                  {currentEmail.extractedDetails && (
                    <div className="p-3 bg-white rounded-xl border border-[#E7E9E4] mb-3 text-xs">
                      <div className="text-[10px] font-bold text-[#747B76] uppercase tracking-wider mb-2">
                        Extracted Data Points
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[#8E9690] text-[11px]">Scheme:</span>{' '}
                          <span className="font-semibold text-[#252B29]">{currentEmail.extractedDetails.projectName || 'Commercial Extension'}</span>
                        </div>
                        <div>
                          <span className="text-[#8E9690] text-[11px]">Location:</span>{' '}
                          <span className="font-semibold text-[#252B29]">{currentEmail.extractedDetails.projectLocation || 'Manchester, UK'}</span>
                        </div>
                        <div>
                          <span className="text-[#8E9690] text-[11px]">Est. Value:</span>{' '}
                          <span className="font-semibold text-[#275E38]">
                            {currentEmail.extractedDetails.estimatedValue ? formatGBP(currentEmail.extractedDetails.estimatedValue) : 'Not specified'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#8E9690] text-[11px]">Start Date:</span>{' '}
                          <span className="font-semibold text-[#252B29]">{currentEmail.extractedDetails.expectedStartDate || 'Pending'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Missing Info */}
                  {currentEmail.missingInfo.length > 0 && (
                    <div className="p-3 rounded-xl bg-[#FDF9F3] border border-[#F1DFC4] mb-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#875317] uppercase tracking-wider mb-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Missing Project Information Identified
                      </div>
                      <ul className="space-y-1">
                        {currentEmail.missingInfo.map((info, idx) => (
                          <li key={idx} className="text-xs text-[#875317] flex items-center gap-1.5">
                            <span>•</span>
                            <span>{info}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggested Actions */}
                  <div>
                    <div className="text-[10px] font-bold text-[#536F67] uppercase tracking-wider mb-1.5">
                      Recommended Next Actions
                    </div>
                    <div className="space-y-1.5">
                      {currentEmail.suggestedActions.map((act, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E7E9E4] text-xs">
                          <span className="text-[#252B29]">{act}</span>
                          <button
                            onClick={() => {
                              addTask({
                                title: act,
                                description: currentEmail.aiSummary,
                                assignedTo: 'James Wilson',
                                dueDate: '2026-11-25',
                                priority: 'High',
                                status: 'To Do',
                                relatedProjectId: currentEmail.suggestedProjectId
                              });
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#536F67] hover:bg-[#EBF2EE] border border-[#CAD7D0]"
                          >
                            + Add Task
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-[10px] text-[#747B76] italic border-t border-[#E7E9E4] pt-2">
                    AI-generated recommendations should be reviewed before being applied.
                  </div>
                </div>

                {/* Email Body */}
                <div>
                  <h4 className="text-xs font-bold text-[#747B76] uppercase tracking-wider mb-2">Message Body</h4>
                  <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E7E9E4] text-xs text-[#252B29] whitespace-pre-line leading-relaxed font-sans">
                    {currentEmail.body}
                  </div>
                </div>

                {/* Attachments */}
                {currentEmail.attachments.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#747B76] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5" />
                      Attached Files ({currentEmail.attachments.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentEmail.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          onClick={() => setAttachmentPreview(att.name)}
                          className="p-2.5 rounded-xl border border-[#E7E9E4] bg-[#FAFBF9] hover:border-[#CAD7D0] flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-[#536F67] shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#252B29] truncate">{att.name}</div>
                              <div className="text-[10px] text-[#747B76]">{att.size}</div>
                            </div>
                          </div>
                          <Eye className="w-3.5 h-3.5 text-[#747B76] shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 border-t border-[#E7E9E4] bg-[#FAFBF9] flex items-center justify-between gap-2">
                <button
                  onClick={() => rejectEmailRecommendation(currentEmail.id)}
                  className="px-3 py-2 rounded-xl border border-[#E7E9E4] text-xs font-semibold text-[#94372D] hover:bg-[#FDF6F5] transition-colors"
                >
                  Dismiss
                </button>

                <div className="flex items-center gap-2">
                  {currentEmail.aiClassification === 'Existing Project Correspondence' && (
                    <button
                      onClick={() => {
                        setTargetProjectId(currentEmail.suggestedProjectId || projects[0]?.id || '');
                        setLinkModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl border border-[#CFDFEA] bg-[#EAF0F4] text-xs font-semibold text-[#235A75] hover:bg-[#DCE7EF] transition-colors flex items-center gap-1.5"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      Link to Project
                    </button>
                  )}

                  <button
                    onClick={() => acceptEmailRecommendation(currentEmail.id)}
                    className="px-4 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {currentEmail.aiClassification === 'New Enquiry' ? 'Accept & Register Enquiry' : 'Accept Recommendation'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-[#747B76]">
              Select a message from the list to inspect AI extraction.
            </div>
          )}
        </div>
      </div>

      {/* Link Project Modal */}
      {linkModalOpen && currentEmail && (
        <Modal
          isOpen={linkModalOpen}
          onClose={() => setLinkModalOpen(false)}
          title="Link Email to Active Project"
          subtitle="Choose the project to bind this correspondence thread with."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1.5">Target Project</label>
              <select
                value={targetProjectId}
                onChange={(e) => setTargetProjectId(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-[#E7E9E4] bg-white text-[#252B29]"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.ref} — {p.name} ({p.clientCompany})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="px-3 py-2 text-xs font-medium text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLinkProject}
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold hover:bg-[#425952]"
              >
                Confirm Link
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Attachment Preview Modal */}
      {attachmentPreview && (
        <Modal
          isOpen={!!attachmentPreview}
          onClose={() => setAttachmentPreview(null)}
          title={`Document: ${attachmentPreview}`}
          subtitle="Simulated drawing / tender document inspection"
        >
          <div className="p-6 text-center text-xs text-[#747B76] bg-[#F7F7F4] rounded-xl border border-[#E7E9E4]">
            <FileText className="w-10 h-10 text-[#536F67] mx-auto mb-2" />
            <p className="font-semibold text-[#252B29]">{attachmentPreview}</p>
            <p className="mt-1">In commercial deployment, documents sync directly to Microsoft SharePoint.</p>
            <button
              onClick={() => {
                addToast('Download Complete (Demo)', `Saved ${attachmentPreview} to local downloads.`, 'info');
                setAttachmentPreview(null);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold hover:bg-[#425952]"
            >
              Simulate File Download
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
