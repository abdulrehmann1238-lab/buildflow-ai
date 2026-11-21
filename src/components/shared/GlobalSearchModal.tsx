import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Search, X, Briefcase, Mail, CheckSquare, ArrowRight } from 'lucide-react';
import { formatGBP } from '../../utils/formatters';

export const GlobalSearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { enquiries, projects, correspondence, tasks, viewRecordDetail, setCurrentRoute, setSelectedEmailId } = useWorkspace();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return { enquiries: [], projects: [], correspondence: [], tasks: [] };
    const q = query.toLowerCase();

    return {
      enquiries: enquiries.filter(e => 
        e.name.toLowerCase().includes(q) || 
        e.ref.toLowerCase().includes(q) || 
        e.clientCompany.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      ).slice(0, 4),
      projects: projects.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.ref.toLowerCase().includes(q) || 
        p.clientCompany.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      ).slice(0, 4),
      correspondence: correspondence.filter(c => 
        c.subject.toLowerCase().includes(q) || 
        c.senderName.toLowerCase().includes(q) || 
        c.senderEmail.toLowerCase().includes(q) ||
        c.body.toLowerCase().includes(q)
      ).slice(0, 4),
      tasks: tasks.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.assignedTo.toLowerCase().includes(q)
      ).slice(0, 4),
    };
  }, [query, enquiries, projects, correspondence, tasks]);

  if (!isOpen) return null;

  const totalResults = 
    results.enquiries.length + 
    results.projects.length + 
    results.correspondence.length + 
    results.tasks.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-[#252B29]/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white border border-[#E7E9E4] rounded-2xl shadow-modal w-full max-w-2xl overflow-hidden z-10 animate-fade-in">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E7E9E4] bg-[#FAFBF9]">
          <Search className="w-5 h-5 text-[#747B76] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search enquiries, projects, correspondence, and tasks..."
            className="w-full bg-transparent text-sm text-[#252B29] placeholder-[#8E9690] focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#747B76] hover:text-[#252B29]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-[#747B76]">
              <p className="font-medium text-[#252B29] mb-1">Quick Search</p>
              <p>Type project names, client names, email subjects, or references (e.g. "Riverside", "BF-ENQ", "drawings")</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-[#747B76]">
              No matches found for "{query}".
            </div>
          ) : (
            <>
              {/* Projects */}
              {results.projects.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-[#8E9690] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Projects ({results.projects.length})
                  </div>
                  <div className="space-y-1">
                    {results.projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          viewRecordDetail('project', p.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F7F4] text-left transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#252B29] group-hover:text-[#536F67]">
                            <span className="font-mono text-[#8E9690] mr-2">{p.ref}</span>
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[#747B76]">{p.clientCompany} • {p.location} • {formatGBP(p.estimatedValue)}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8E9690] group-hover:text-[#536F67] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enquiries */}
              {results.enquiries.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-[#8E9690] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Enquiries ({results.enquiries.length})
                  </div>
                  <div className="space-y-1">
                    {results.enquiries.map(e => (
                      <button
                        key={e.id}
                        onClick={() => {
                          viewRecordDetail('enquiry', e.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F7F4] text-left transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#252B29] group-hover:text-[#536F67]">
                            <span className="font-mono text-[#8E9690] mr-2">{e.ref}</span>
                            {e.name}
                          </div>
                          <div className="text-[11px] text-[#747B76]">{e.clientCompany} • {e.status} • {formatGBP(e.estimatedValue)}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8E9690] group-hover:text-[#536F67] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Correspondence */}
              {results.correspondence.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-[#8E9690] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Correspondence ({results.correspondence.length})
                  </div>
                  <div className="space-y-1">
                    {results.correspondence.map(c => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedEmailId(c.id);
                          setCurrentRoute('emails');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F7F4] text-left transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-[#252B29] truncate group-hover:text-[#536F67]">
                            {c.subject}
                          </div>
                          <div className="text-[11px] text-[#747B76] truncate">
                            {c.senderName} ({c.senderCompany || c.senderEmail}) • {c.aiClassification}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8E9690] group-hover:text-[#536F67] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {results.tasks.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-[#8E9690] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    Tasks ({results.tasks.length})
                  </div>
                  <div className="space-y-1">
                    {results.tasks.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setCurrentRoute('tasks-admin');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F7F4] text-left transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-[#252B29] truncate group-hover:text-[#536F67]">
                            {t.title}
                          </div>
                          <div className="text-[11px] text-[#747B76] truncate">
                            Assigned to {t.assignedTo} • Due {t.dueDate} • {t.status}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8E9690] group-hover:text-[#536F67] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
