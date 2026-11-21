import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Task, TaskPriority, TaskStatus, User, EmailTemplate } from '../types';
import { 
  CheckSquare, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Users, 
  Building2, 
  Mail, 
  FileText, 
  SlidersHorizontal, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Save, 
  UserPlus, 
  ExternalLink 
} from 'lucide-react';
import { Badge } from '../components/shared/Badge';
import { Modal } from '../components/shared/Modal';

export const TasksAdministrationPage: React.FC = () => {
  const { 
    tasks, 
    addTask, 
    updateTask, 
    toggleTaskStatus, 
    deleteTask, 
    users, 
    currentUser, 
    currentCompany, 
    updateCompanyProfile,
    emailTemplates,
    updateEmailTemplate,
    syncOutlook,
    isSyncing,
    connectOutlook,
    disconnectOutlook,
    projects,
    enquiries,
    addToast
  } = useWorkspace();

  const [activeMainTab, setActiveMainTab] = useState<'tasks' | 'admin'>('tasks');
  const [adminSubTab, setAdminSubTab] = useState<'profile' | 'team' | 'outlook' | 'templates' | 'general'>('outlook');

  // Task Filter state
  const [taskView, setTaskView] = useState<'all' | 'my' | 'overdue' | 'completed'>('all');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<string>('all');
  const [taskSearch, setTaskSearch] = useState('');

  // Modals
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [inviteUserModalOpen, setInviteUserModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [msAuthModalOpen, setMsAuthModalOpen] = useState(false);

  // New Task Form State
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: currentUser.name,
    dueDate: '2026-11-25',
    priority: 'High' as TaskPriority,
    relatedProjectId: projects[0]?.id || ''
  });

  // Company Profile form state
  const [companyForm, setCompanyForm] = useState({
    name: currentCompany.name,
    legalName: currentCompany.legalName,
    address: currentCompany.address,
    phone: currentCompany.phone,
    vatNumber: currentCompany.vatNumber,
    companyNumber: currentCompany.companyNumber
  });

  // Invite user state
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'Team Member' as 'Company Administrator' | 'Team Member'
  });

  // Task counts
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const overdueTasks = tasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date()).length;

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (taskView === 'my' && task.assignedTo !== currentUser.name) return false;
      if (taskView === 'overdue' && (task.status === 'Completed' || new Date(task.dueDate) >= new Date())) return false;
      if (taskView === 'completed' && task.status !== 'Completed') return false;
      if (taskView === 'all' && task.status === 'Completed') return false; // Show active by default

      if (taskPriorityFilter !== 'all' && task.priority !== taskPriorityFilter) return false;

      if (taskSearch.trim()) {
        const q = taskSearch.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchDesc = task.description.toLowerCase().includes(q);
        const matchAssignee = task.assignedTo.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchAssignee) return false;
      }

      return true;
    }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [tasks, taskView, taskPriorityFilter, taskSearch, currentUser]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    addTask({
      ...newTask,
      status: 'To Do',
      relatedProjectName: projects.find(p => p.id === newTask.relatedProjectId)?.name
    });
    setCreateTaskModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      assignedTo: currentUser.name,
      dueDate: '2026-11-25',
      priority: 'High',
      relatedProjectId: projects[0]?.id || ''
    });
  };

  const handleSaveCompanyProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(companyForm);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    updateEmailTemplate(editingTemplate.id, editingTemplate);
    setEditingTemplate(null);
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Invitation Sent (Demo)', `Invited ${inviteForm.name} (${inviteForm.email}) as ${inviteForm.role}.`, 'success');
    setInviteUserModalOpen(false);
    setInviteForm({ name: '', email: '', role: 'Team Member' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E9E4]">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#252B29]">Tasks & Administration</h1>
          <p className="text-xs text-[#747B76]">Keep your team aligned and every important action moving.</p>
        </div>

        {activeMainTab === 'tasks' ? (
          <button
            onClick={() => setCreateTaskModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Task</span>
          </button>
        ) : (
          <button
            onClick={() => syncOutlook()}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F7F7F4] border border-[#E7E9E4] text-xs font-semibold text-[#252B29] shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#536F67] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronising...' : 'Sync Microsoft 365'}</span>
          </button>
        )}
      </div>

      {/* Main Two Tabs: Tasks vs Administration */}
      <div className="flex items-center gap-3 border-b border-[#E7E9E4]">
        <button
          onClick={() => setActiveMainTab('tasks')}
          className={`pb-3 px-2 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeMainTab === 'tasks' ? 'text-[#354843]' : 'text-[#747B76] hover:text-[#252B29]'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Operational Tasks</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeMainTab === 'tasks' ? 'bg-[#536F67] text-white' : 'bg-[#E7E9E4] text-[#747B76]'
          }`}>
            {pendingTasks}
          </span>
          {activeMainTab === 'tasks' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#536F67] rounded-t" />
          )}
        </button>

        <button
          onClick={() => setActiveMainTab('admin')}
          className={`pb-3 px-2 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeMainTab === 'admin' ? 'text-[#354843]' : 'text-[#747B76] hover:text-[#252B29]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Workspace Administration</span>
          {activeMainTab === 'admin' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#536F67] rounded-t" />
          )}
        </button>
      </div>

      {/* TAB 1: OPERATIONAL TASKS */}
      {activeMainTab === 'tasks' && (
        <div className="space-y-6">
          {/* 12.1 Task Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
              <span className="text-xs text-[#747B76]">Total Registered Tasks</span>
              <div className="text-2xl font-bold font-heading text-[#252B29] mt-1">{totalTasks}</div>
              <span className="text-[10px] text-[#747B76] mt-0.5 block">Across all active contracts</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
              <span className="text-xs text-[#875317]">Pending Follow-ups</span>
              <div className="text-2xl font-bold font-heading text-[#875317] mt-1">{pendingTasks}</div>
              <span className="text-[10px] text-[#875317] mt-0.5 block">Awaiting completion</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
              <span className="text-xs text-[#94372D]">Overdue Deadlines</span>
              <div className="text-2xl font-bold font-heading text-[#94372D] mt-1">{overdueTasks}</div>
              <span className="text-[10px] text-[#94372D] mt-0.5 block">Requires immediate action</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E7E9E4] shadow-subtle">
              <span className="text-xs text-[#275E38]">Completed Actions</span>
              <div className="text-2xl font-bold font-heading text-[#275E38] mt-1">{completedTasks}</div>
              <span className="text-[10px] text-[#275E38] mt-0.5 block">Audited & closed</span>
            </div>
          </div>

          {/* 12.3 Task Filters & Views Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-[#E7E9E4] shadow-subtle text-xs">
            {/* View Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Active' },
                { id: 'my', label: 'Assigned to Me' },
                { id: 'overdue', label: 'Overdue' },
                { id: 'completed', label: 'Completed' },
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => setTaskView(v.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    taskView === v.id 
                      ? 'bg-[#EBF2EE] text-[#354843] font-semibold border border-[#CAD7D0]' 
                      : 'text-[#747B76] hover:bg-[#F7F7F4]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8E9690] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#E7E9E4] bg-white focus:outline-none focus:border-[#536F67]"
                />
              </div>

              {/* Priority Filter */}
              <select
                value={taskPriorityFilter}
                onChange={(e) => setTaskPriorityFilter(e.target.value)}
                className="p-1.5 rounded-xl border border-[#E7E9E4] bg-white text-xs text-[#48504B]"
              >
                <option value="all">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* 12.2 Task Table */}
          <div className="bg-white rounded-2xl border border-[#E7E9E4] shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFBF9] border-b border-[#E7E9E4] text-[#747B76] font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-10">Done</th>
                    <th className="py-3.5 px-4">Task Description</th>
                    <th className="py-3.5 px-4">Related Scheme</th>
                    <th className="py-3.5 px-4">Assigned To</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4">Priority</th>
                    <th className="py-3.5 px-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E9E4]">
                  {filteredTasks.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#747B76]">
                        No tasks match the active view criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTasks.map(task => {
                      const isOverdue = task.status !== 'Completed' && new Date(task.dueDate) < new Date();
                      const isDone = task.status === 'Completed';

                      return (
                        <tr 
                          key={task.id}
                          className={`hover:bg-[#F7F7F4] transition-colors ${isDone ? 'opacity-60 bg-[#FAFBF9]' : ''}`}
                        >
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => toggleTaskStatus(task.id)}
                              className="rounded border-[#CAD7D0] text-[#536F67] focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className={`font-semibold ${isDone ? 'line-through text-[#747B76]' : 'text-[#252B29]'}`}>
                              {task.title}
                            </div>
                            <div className="text-[11px] text-[#747B76] line-clamp-1 mt-0.5">{task.description}</div>
                          </td>
                          <td className="py-3 px-4 text-[#48504B]">
                            {task.relatedProjectName || 'General Workspace'}
                          </td>
                          <td className="py-3 px-4 font-medium text-[#252B29]">
                            {task.assignedTo}
                          </td>
                          <td className={`py-3 px-4 font-medium ${isOverdue ? 'text-[#94372D] font-semibold' : 'text-[#48504B]'}`}>
                            {task.dueDate}
                          </td>
                          <td className="py-3 px-4">
                            <Badge label={task.priority} size="sm" />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1 text-[#8E9690] hover:text-[#94372D] rounded-lg transition-colors"
                              title="Delete demonstration task"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORKSPACE ADMINISTRATION */}
      {activeMainTab === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Secondary Administration Navigation */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-[#E7E9E4] p-3 shadow-subtle space-y-1 h-fit">
            <div className="text-[10px] font-bold text-[#8E9690] uppercase tracking-wider px-3 py-1.5">
              System Settings
            </div>
            {[
              { id: 'outlook', label: 'Outlook Connection', icon: Mail },
              { id: 'team', label: 'Team & Directory', icon: Users },
              { id: 'profile', label: 'Company Profile', icon: Building2 },
              { id: 'templates', label: 'Email Templates', icon: FileText },
              { id: 'general', label: 'General Preferences', icon: SlidersHorizontal },
            ].map(sub => {
              const Icon = sub.icon;
              return (
                <button
                  key={sub.id}
                  onClick={() => setAdminSubTab(sub.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    adminSubTab === sub.id 
                      ? 'bg-[#EBF2EE] text-[#354843] font-semibold' 
                      : 'text-[#48504B] hover:bg-[#F7F7F4]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${adminSubTab === sub.id ? 'text-[#536F67]' : 'text-[#747B76]'}`} />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>

          {/* Administration View Container */}
          <div className="md:col-span-9 bg-white rounded-2xl border border-[#E7E9E4] p-6 shadow-subtle">
            {/* 13.3 Outlook Connection Page */}
            {adminSubTab === 'outlook' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold font-heading text-[#252B29]">Microsoft 365 Outlook Integration</h3>
                  <p className="text-xs text-[#747B76]">
                    Configure mailbox polling, permissions, and automated AI analysis thresholds for your company.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAFBF9] border border-[#CAD7D0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#536F67] text-white flex items-center justify-center font-bold text-sm">
                      M365
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#252B29]">Commercial Outlook Feed</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F0E9] text-[#275E38] font-medium border border-[#CCE0CE]">
                          {currentCompany.connectionStatus}
                        </span>
                      </div>
                      <p className="text-xs text-[#747B76] mt-0.5 font-mono">{currentCompany.mailbox}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => syncOutlook()}
                      disabled={isSyncing}
                      className="px-3.5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Processing...' : 'Sync Mailbox Now'}</span>
                    </button>
                    <button
                      onClick={() => setMsAuthModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl border border-[#E7E9E4] bg-white text-xs font-medium text-[#48504B] hover:bg-[#F0F1ED] transition-colors"
                    >
                      Reconnect
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4] space-y-2">
                    <div className="font-semibold text-[#252B29]">Connection Settings</div>
                    <div className="flex justify-between text-[#747B76]">
                      <span>Monitored Folder:</span>
                      <span className="font-medium text-[#252B29]">{currentCompany.folder}</span>
                    </div>
                    <div className="flex justify-between text-[#747B76]">
                      <span>Polling Frequency:</span>
                      <span className="font-medium text-[#252B29]">Every 5 minutes (Real-time webhook)</span>
                    </div>
                    <div className="flex justify-between text-[#747B76]">
                      <span>Last Synchronisation:</span>
                      <span className="font-medium text-[#252B29]">{currentCompany.lastSync}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7F7F4] border border-[#E7E9E4] space-y-2">
                    <div className="font-semibold text-[#252B29]">AI Filtering Guardrails</div>
                    <div className="flex justify-between text-[#747B76]">
                      <span>Confidence Threshold:</span>
                      <span className="font-medium text-[#252B29]">85% (Flag for review)</span>
                    </div>
                    <div className="flex justify-between text-[#747B76]">
                      <span>Spam / Merchant Filter:</span>
                      <span className="font-medium text-[#275E38]">Active (Excluded from enquiries)</span>
                    </div>
                    <div className="flex justify-between text-[#747B76]">
                      <span>Human Approval Gate:</span>
                      <span className="font-medium text-[#275E38]">Enforced (No automated actions)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 13.2 Team & Users Directory */}
            {adminSubTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E9E4]">
                  <div>
                    <h3 className="text-base font-bold font-heading text-[#252B29]">Team Directory & Permissions</h3>
                    <p className="text-xs text-[#747B76]">Role-based access control for estimators, project managers and directors.</p>
                  </div>
                  <button
                    onClick={() => setInviteUserModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Invite Team Member</span>
                  </button>
                </div>

                <div className="divide-y divide-[#E7E9E4]">
                  {users.map(u => (
                    <div key={u.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#536F67] text-white font-bold font-heading flex items-center justify-center">
                          {u.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-[#252B29]">{u.name}</div>
                          <div className="text-[11px] text-[#747B76]">{u.email} • {u.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          u.role === 'Company Administrator' 
                            ? 'bg-[#EBF2EE] text-[#354843] border-[#CAD7D0]' 
                            : 'bg-[#F0F1ED] text-[#48504B] border-[#E7E9E4]'
                        }`}>
                          {u.role}
                        </span>
                        <span className="text-[11px] text-[#8E9690] hidden sm:inline">Active {u.lastActive}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 13.1 Company Profile */}
            {adminSubTab === 'profile' && (
              <form onSubmit={handleSaveCompanyProfile} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold font-heading text-[#252B29]">Company Profile</h3>
                  <p className="text-xs text-[#747B76]">Manage organization legal details and regional address.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">Company Trading Name</label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">Registered Legal Entity</label>
                    <input
                      type="text"
                      value={companyForm.legalName}
                      onChange={(e) => setCompanyForm({ ...companyForm, legalName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">Company Registration Number</label>
                    <input
                      type="text"
                      value={companyForm.companyNumber}
                      onChange={(e) => setCompanyForm({ ...companyForm, companyNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">VAT Registration Number</label>
                    <input
                      type="text"
                      value={companyForm.vatNumber}
                      onChange={(e) => setCompanyForm({ ...companyForm, vatNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-medium text-[#48504B] mb-1">Principal Regional Office Address</label>
                    <input
                      type="text"
                      value={companyForm.address}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E7E9E4] flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Company Information</span>
                  </button>
                </div>
              </form>
            )}

            {/* 13.4 Email Templates */}
            {adminSubTab === 'templates' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold font-heading text-[#252B29]">Standard Correspondence Templates</h3>
                  <p className="text-xs text-[#747B76]">
                    Configure default templates used by BuildFlow AI when generating replies.
                  </p>
                </div>

                <div className="space-y-3">
                  {emailTemplates.map(tmpl => (
                    <div 
                      key={tmpl.id} 
                      className="p-4 rounded-xl border border-[#E7E9E4] bg-[#FAFBF9] hover:border-[#CAD7D0] transition-colors flex items-start justify-between gap-4 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#252B29]">{tmpl.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#EBF2EE] text-[#354843]">
                            {tmpl.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#747B76] font-mono mb-2">Subject: {tmpl.subject}</div>
                        <p className="text-[11px] text-[#48504B] line-clamp-2 leading-relaxed whitespace-pre-line">
                          {tmpl.body}
                        </p>
                      </div>

                      <button
                        onClick={() => setEditingTemplate(tmpl)}
                        className="px-3 py-1.5 rounded-lg border border-[#E7E9E4] bg-white text-xs font-medium text-[#48504B] hover:bg-[#F0F1ED] shrink-0"
                      >
                        Edit Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 13.5 General Settings */}
            {adminSubTab === 'general' && (
              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="text-base font-bold font-heading text-[#252B29]">General Workspace Preferences</h3>
                  <p className="text-xs text-[#747B76]">Regional formatting and system defaults.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">Currency Format</label>
                    <input
                      type="text"
                      disabled
                      value="GBP (£) — United Kingdom"
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4] bg-[#F7F7F4] text-[#747B76]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">Timezone</label>
                    <input
                      type="text"
                      disabled
                      value="Europe/London (GMT/BST)"
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4] bg-[#F7F7F4] text-[#747B76]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">Date Format</label>
                    <input
                      type="text"
                      disabled
                      value="DD/MM/YYYY (UK standard)"
                      className="w-full p-2.5 rounded-xl border border-[#E7E9E4] bg-[#F7F7F4] text-[#747B76]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#48504B] mb-1">Default Task Priority</label>
                    <select className="w-full p-2.5 rounded-xl border border-[#E7E9E4] bg-white">
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E7E9E4]">
                  <button
                    onClick={() => addToast('Settings Saved', 'Workspace defaults updated.', 'success')}
                    className="px-5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Create Task */}
      {createTaskModalOpen && (
        <Modal
          isOpen={createTaskModalOpen}
          onClose={() => setCreateTaskModalOpen(false)}
          title="Create New Action Item"
          subtitle="Assign an operational milestone or task to team members."
        >
          <form onSubmit={handleCreateTask} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Task Title *</label>
              <input
                type="text"
                required
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g. Request missing structural drawings"
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Description</label>
              <textarea
                rows={2}
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Operational notes or context..."
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Related Scheme / Project</label>
              <select
                value={newTask.relatedProjectId}
                onChange={(e) => setNewTask({ ...newTask, relatedProjectId: e.target.value })}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.ref} — {p.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Assignee</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
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
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold hover:bg-[#425952]"
              >
                Create Task
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Simulated Microsoft 365 Authorization */}
      {msAuthModalOpen && (
        <Modal
          isOpen={msAuthModalOpen}
          onClose={() => setMsAuthModalOpen(false)}
          title="Microsoft 365 Permissions Authorization (Demo)"
          subtitle="Simulated OAuth 2.0 tenant authorization grant dialog"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-[#FAFBF9] border border-[#E7E9E4] rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-[#536F67] text-white flex items-center justify-center font-bold text-xs">
                BF
              </div>
              <div>
                <div className="font-semibold text-[#252B29]">BuildFlow AI Construction Assistant</div>
                <div className="text-[11px] text-[#747B76]">Requires read access to commercial mailbox</div>
              </div>
            </div>

            <p className="text-[#48504B] leading-relaxed">
              In production, this flow requests Azure Active Directory delegated or application permissions (<code>Mail.Read</code>, <code>Mail.Send</code>) to poll your dedicated inbox.
            </p>

            <div className="p-3 bg-[#FDF9F3] border border-[#F1DFC4] rounded-xl text-[#875317] text-[11px]">
              Note: This is an interactive frontend demonstration. No actual Microsoft Graph or tenant API connection is made.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMsAuthModalOpen(false)}
                className="px-3 py-2 text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  connectOutlook();
                  setMsAuthModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white font-semibold hover:bg-[#425952]"
              >
                Authorize & Continue (Demo)
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Edit Email Template */}
      {editingTemplate && (
        <Modal
          isOpen={!!editingTemplate}
          onClose={() => setEditingTemplate(null)}
          title={`Edit Template: ${editingTemplate.name}`}
          subtitle="Modify boilerplate text used for client and subcontractor drafts."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveTemplate} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Subject Line</label>
              <input
                type="text"
                value={editingTemplate.subject}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Body Template</label>
              <textarea
                rows={8}
                value={editingTemplate.body}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-[#E7E9E4] font-mono leading-relaxed"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingTemplate(null)}
                className="px-3 py-2 text-xs text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold"
              >
                Save Template
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Invite User */}
      {inviteUserModalOpen && (
        <Modal
          isOpen={inviteUserModalOpen}
          onClose={() => setInviteUserModalOpen(false)}
          title="Invite Team Member"
          subtitle="Send access invitation to colleague or subcontractor coordinator."
        >
          <form onSubmit={handleInviteUser} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Gemma Taylor"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Corporate Email Address</label>
              <input
                type="email"
                required
                placeholder="g.taylor@northstarconstruction.co.uk"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Workspace Role</label>
              <select
                value={inviteForm.role}
                onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as any })}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
              >
                <option value="Team Member">Team Member (Project Manager / Estimator)</option>
                <option value="Company Administrator">Company Administrator (Full access)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setInviteUserModalOpen(false)}
                className="px-3 py-2 text-xs text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#536F67] text-white text-xs font-semibold"
              >
                Send Invite
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
