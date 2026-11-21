import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Company, Enquiry, Project, Correspondence, Task, User, Activity, EmailTemplate,
  EnquiryStatus, ProjectStatus, TaskStatus, TaskPriority 
} from '../types';
import { 
  mockCompanies, mockUsers, mockEnquiries, mockProjects, 
  mockCorrespondence, mockTasks, mockActivities, mockEmailTemplates 
} from '../data/mockData';

export type AppRoute = 
  | 'landing' 
  | 'login' 
  | 'dashboard' 
  | 'emails' 
  | 'enquiries-projects' 
  | 'detail' 
  | 'tasks-admin';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface WorkspaceContextType {
  // Navigation & View
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  selectedRecordId: string | null;
  selectedRecordType: 'enquiry' | 'project' | null;
  viewRecordDetail: (type: 'enquiry' | 'project', id: string) => void;
  selectedEmailId: string | null;
  setSelectedEmailId: (id: string | null) => void;
  
  // Workspace / Multi-company
  activeCompanyId: string;
  currentCompany: Company;
  switchWorkspace: (companyId: string) => void;
  companies: Company[];
  
  // Data
  users: User[];
  currentUser: User;
  enquiries: Enquiry[];
  projects: Project[];
  correspondence: Correspondence[];
  tasks: Task[];
  activities: Activity[];
  emailTemplates: EmailTemplate[];
  
  // Enquiries Operations
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'companyId' | 'ref' | 'createdAt' | 'lastActivity'>) => string;
  updateEnquiry: (id: string, updates: Partial<Enquiry>) => void;
  changeEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteEnquiry: (id: string) => void;
  
  // Projects Operations
  addProject: (project: Omit<Project, 'id' | 'companyId' | 'createdAt' | 'lastCorrespondence'>) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  changeProjectStatus: (id: string, status: ProjectStatus) => void;
  deleteProject: (id: string) => void;
  
  // Email & AI Operations
  acceptEmailRecommendation: (emailId: string, customDetails?: Partial<Enquiry>) => void;
  rejectEmailRecommendation: (emailId: string) => void;
  linkEmailToProject: (emailId: string, projectId: string) => void;
  updateEmailStatus: (emailId: string, status: Correspondence['status']) => void;
  
  // Task Operations
  addTask: (task: Omit<Task, 'id' | 'companyId' | 'createdAt'>) => string;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  
  // Settings & Microsoft 365
  syncOutlook: () => Promise<void>;
  isSyncing: boolean;
  connectOutlook: () => void;
  disconnectOutlook: () => void;
  updateCompanyProfile: (updates: Partial<Company>) => void;
  updateEmailTemplate: (id: string, updates: Partial<EmailTemplate>) => void;
  
  // Global Search & Filtering
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  enquiryPipelineFilter: EnquiryStatus | null;
  setEnquiryPipelineFilter: (filter: EnquiryStatus | null) => void;

  // Notifications & Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routes & Selection
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>('prj-1');
  const [selectedRecordType, setSelectedRecordType] = useState<'enquiry' | 'project' | null>('project');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  // Workspace
  const [activeCompanyId, setActiveCompanyId] = useState<string>('northstar');
  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem('buildflow_companies');
    return saved ? JSON.parse(saved) : mockCompanies;
  });

  const [allEnquiries, setAllEnquiries] = useState<Record<string, Enquiry[]>>(() => {
    const saved = localStorage.getItem('buildflow_enquiries');
    return saved ? JSON.parse(saved) : mockEnquiries;
  });

  const [allProjects, setAllProjects] = useState<Record<string, Project[]>>(() => {
    const saved = localStorage.getItem('buildflow_projects');
    return saved ? JSON.parse(saved) : mockProjects;
  });

  const [allCorrespondence, setAllCorrespondence] = useState<Record<string, Correspondence[]>>(() => {
    const saved = localStorage.getItem('buildflow_correspondence');
    return saved ? JSON.parse(saved) : mockCorrespondence;
  });

  const [allTasks, setAllTasks] = useState<Record<string, Task[]>>(() => {
    const saved = localStorage.getItem('buildflow_tasks');
    return saved ? JSON.parse(saved) : mockTasks;
  });

  const [allActivities, setAllActivities] = useState<Record<string, Activity[]>>(() => {
    const saved = localStorage.getItem('buildflow_activities');
    return saved ? JSON.parse(saved) : mockActivities;
  });

  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(() => {
    const saved = localStorage.getItem('buildflow_templates');
    return saved ? JSON.parse(saved) : mockEmailTemplates;
  });

  // UI States
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enquiryPipelineFilter, setEnquiryPipelineFilter] = useState<EnquiryStatus | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync back to localStorage
  useEffect(() => {
    localStorage.setItem('buildflow_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('buildflow_enquiries', JSON.stringify(allEnquiries));
  }, [allEnquiries]);

  useEffect(() => {
    localStorage.setItem('buildflow_projects', JSON.stringify(allProjects));
  }, [allProjects]);

  useEffect(() => {
    localStorage.setItem('buildflow_correspondence', JSON.stringify(allCorrespondence));
  }, [allCorrespondence]);

  useEffect(() => {
    localStorage.setItem('buildflow_tasks', JSON.stringify(allTasks));
  }, [allTasks]);

  useEffect(() => {
    localStorage.setItem('buildflow_activities', JSON.stringify(allActivities));
  }, [allActivities]);

  useEffect(() => {
    localStorage.setItem('buildflow_templates', JSON.stringify(emailTemplates));
  }, [emailTemplates]);

  // Active Company Getters
  const currentCompany = companies.find(c => c.id === activeCompanyId) || companies[0];
  const users = mockUsers[activeCompanyId] || mockUsers['northstar'];
  const currentUser = users[0]; // James Wilson or Marcus Vance

  const enquiries = allEnquiries[activeCompanyId] || [];
  const projects = allProjects[activeCompanyId] || [];
  const correspondence = allCorrespondence[activeCompanyId] || [];
  const tasks = allTasks[activeCompanyId] || [];
  const activities = allActivities[activeCompanyId] || [];

  // Toast Helpers
  const addToast = (title: string, description: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add Activity helper
  const recordActivity = (
    type: Activity['type'], 
    title: string, 
    description: string, 
    relatedRef?: string, 
    relatedId?: string
  ) => {
    const newAct: Activity = {
      id: 'act-' + Date.now(),
      companyId: activeCompanyId,
      type,
      title,
      description,
      timestamp: 'Just now',
      user: currentUser.name,
      relatedRef,
      relatedId
    };
    setAllActivities(prev => ({
      ...prev,
      [activeCompanyId]: [newAct, ...(prev[activeCompanyId] || [])]
    }));
  };

  // Workspace Switcher
  const switchWorkspace = (companyId: string) => {
    setActiveCompanyId(companyId);
    const targetComp = companies.find(c => c.id === companyId);
    // Reset selection to first project of new workspace
    const newProjects = allProjects[companyId] || [];
    if (newProjects.length > 0) {
      setSelectedRecordId(newProjects[0].id);
      setSelectedRecordType('project');
    } else {
      setSelectedRecordId(null);
      setSelectedRecordType(null);
    }
    setSelectedEmailId(null);
    setEnquiryPipelineFilter(null);
    addToast(
      `Switched to ${targetComp?.name || companyId}`,
      'Workspace data updated with isolated company records.',
      'info'
    );
  };

  const viewRecordDetail = (type: 'enquiry' | 'project', id: string) => {
    setSelectedRecordType(type);
    setSelectedRecordId(id);
    setCurrentRoute('detail');
  };

  // Enquiries Operations
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'companyId' | 'ref' | 'createdAt' | 'lastActivity'>) => {
    const count = enquiries.length + 1;
    const ref = `BF-ENQ-${activeCompanyId === 'westbrook' ? 'W' : ''}${String(count).padStart(3, '0')}`;
    const newId = 'enq-' + Date.now();
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: newId,
      companyId: activeCompanyId,
      ref,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      correspondenceCount: 1
    };

    setAllEnquiries(prev => ({
      ...prev,
      [activeCompanyId]: [newEnquiry, ...(prev[activeCompanyId] || [])]
    }));

    recordActivity(
      'enquiry_created',
      `New Enquiry Created (${ref})`,
      `${newEnquiry.name} registered for ${newEnquiry.clientCompany}.`,
      ref,
      newId
    );

    addToast('Enquiry Created', `${ref} — ${newEnquiry.name} has been added.`, 'success');
    return newId;
  };

  const updateEnquiry = (id: string, updates: Partial<Enquiry>) => {
    setAllEnquiries(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(enq => 
        enq.id === id ? { ...enq, ...updates, lastActivity: 'Just now' } : enq
      )
    }));
    recordActivity('details_edited', 'Enquiry Details Updated', `Updated details for enquiry record.`, undefined, id);
    addToast('Enquiry Updated', 'Changes saved successfully.', 'success');
  };

  const changeEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setAllEnquiries(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(enq => 
        enq.id === id ? { ...enq, status, lastActivity: 'Just now' } : enq
      )
    }));
    recordActivity('status_changed', 'Enquiry Status Changed', `Status updated to ${status}.`, undefined, id);
    addToast('Status Updated', `Enquiry status moved to "${status}".`, 'info');
  };

  const deleteEnquiry = (id: string) => {
    setAllEnquiries(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).filter(enq => enq.id !== id)
    }));
    addToast('Enquiry Removed', 'The enquiry has been archived.', 'info');
  };

  // Projects Operations
  const addProject = (projectData: Omit<Project, 'id' | 'companyId' | 'createdAt' | 'lastCorrespondence'>) => {
    const newId = 'prj-' + Date.now();
    const newProject: Project = {
      ...projectData,
      id: newId,
      companyId: activeCompanyId,
      createdAt: new Date().toISOString().split('T')[0],
      lastCorrespondence: 'Just now',
      correspondenceCount: 0,
      tasksCount: 0
    };

    setAllProjects(prev => ({
      ...prev,
      [activeCompanyId]: [newProject, ...(prev[activeCompanyId] || [])]
    }));

    recordActivity(
      'details_edited',
      `Project Added (${newProject.ref})`,
      `New project record created for ${newProject.name}.`,
      newProject.ref,
      newId
    );

    addToast('Project Created', `${newProject.ref} — ${newProject.name} is now active.`, 'success');
    return newId;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setAllProjects(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(prj => 
        prj.id === id ? { ...prj, ...updates } : prj
      )
    }));
    recordActivity('details_edited', 'Project Details Updated', 'Updated project attributes and timeline.', undefined, id);
    addToast('Project Updated', 'Project information saved successfully.', 'success');
  };

  const changeProjectStatus = (id: string, status: ProjectStatus) => {
    setAllProjects(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(prj => 
        prj.id === id ? { ...prj, status } : prj
      )
    }));
    recordActivity('status_changed', 'Project Status Updated', `Project moved to status ${status}.`, undefined, id);
    addToast('Project Status Changed', `Status set to ${status}.`, 'info');
  };

  const deleteProject = (id: string) => {
    setAllProjects(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).filter(prj => prj.id !== id)
    }));
    addToast('Project Archived', 'Project removed from active view.', 'info');
  };

  // Email & AI Intelligence Operations
  const acceptEmailRecommendation = (emailId: string, customDetails?: Partial<Enquiry>) => {
    const email = correspondence.find(e => e.id === emailId);
    if (!email) return;

    if (email.aiClassification === 'New Enquiry') {
      const extracted = email.extractedDetails || {};
      const newEnqId = addEnquiry({
        name: customDetails?.name || extracted.projectName || email.subject,
        clientName: customDetails?.clientName || extracted.clientName || email.senderName,
        clientCompany: customDetails?.clientCompany || extracted.clientCompany || email.senderCompany || 'Private Client',
        clientEmail: customDetails?.clientEmail || extracted.clientEmail || email.senderEmail,
        contactNumber: customDetails?.contactNumber || extracted.contactNumber || '+44 (0)161 700 0000',
        projectType: customDetails?.projectType || extracted.projectType || 'Commercial Development',
        location: customDetails?.location || extracted.projectLocation || 'Manchester, UK',
        description: customDetails?.description || email.aiSummary,
        estimatedValue: customDetails?.estimatedValue || extracted.estimatedValue || 250000,
        expectedStartDate: customDetails?.expectedStartDate || extracted.expectedStartDate || '2027-03-01',
        assignedTo: customDetails?.assignedTo || currentUser.name,
        status: 'New Enquiry',
        internalNotes: `Created from AI correspondence analysis of email: "${email.subject}".`
      });

      // Update email status
      setAllCorrespondence(prev => ({
        ...prev,
        [activeCompanyId]: (prev[activeCompanyId] || []).map(item => 
          item.id === emailId 
            ? { ...item, status: 'enquiry_created', linkedEnquiryId: newEnqId } 
            : item
        )
      }));

      recordActivity('email_reviewed', 'AI Recommendation Accepted', `New enquiry created from email "${email.subject}".`, undefined, emailId);
      addToast('Recommendation Accepted', 'New enquiry record registered from email.', 'success');
    } else if (email.aiClassification === 'Existing Project Correspondence') {
      const targetProjId = email.suggestedProjectId || projects[0]?.id;
      if (targetProjId) {
        linkEmailToProject(emailId, targetProjId);
      }
    } else {
      // Unrelated
      setAllCorrespondence(prev => ({
        ...prev,
        [activeCompanyId]: (prev[activeCompanyId] || []).map(item => 
          item.id === emailId ? { ...item, status: 'reviewed' } : item
        )
      }));
      addToast('Email Marked as Reviewed', 'Unrelated communication filed.', 'info');
    }
  };

  const rejectEmailRecommendation = (emailId: string) => {
    const email = correspondence.find(e => e.id === emailId);
    setAllCorrespondence(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(item => 
        item.id === emailId ? { ...item, status: 'rejected' } : item
      )
    }));
    recordActivity('email_reviewed', 'AI Recommendation Rejected', `Recommendation for "${email?.subject || 'Email'}" marked as dismissed.`, undefined, emailId);
    addToast('Recommendation Dismissed', 'Email removed from pending review queue.', 'info');
  };

  const linkEmailToProject = (emailId: string, projectId: string) => {
    const targetProject = projects.find(p => p.id === projectId);
    const email = correspondence.find(e => e.id === emailId);
    if (!targetProject || !email) return;

    setAllCorrespondence(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(item => 
        item.id === emailId 
          ? { 
              ...item, 
              status: 'linked', 
              linkedProjectId: projectId, 
              linkedProjectName: targetProject.name 
            } 
          : item
      )
    }));

    // Update project correspondence count
    setAllProjects(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(p => 
        p.id === projectId 
          ? { 
              ...p, 
              correspondenceCount: (p.correspondenceCount || 0) + 1,
              lastCorrespondence: 'Just now'
            } 
          : p
      )
    }));

    recordActivity(
      'email_linked',
      'Correspondence Linked',
      `"${email.subject}" linked to ${targetProject.name} (${targetProject.ref}).`,
      targetProject.ref,
      projectId
    );

    addToast('Correspondence Linked', `Email linked to ${targetProject.name}.`, 'success');
  };

  const updateEmailStatus = (emailId: string, status: Correspondence['status']) => {
    setAllCorrespondence(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(item => 
        item.id === emailId ? { ...item, status } : item
      )
    }));
  };

  // Task Operations
  const addTask = (taskData: Omit<Task, 'id' | 'companyId' | 'createdAt'>) => {
    const newId = 'tsk-' + Date.now();
    const newTask: Task = {
      ...taskData,
      id: newId,
      companyId: activeCompanyId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAllTasks(prev => ({
      ...prev,
      [activeCompanyId]: [newTask, ...(prev[activeCompanyId] || [])]
    }));

    recordActivity('task_created', 'Task Created', `"${newTask.title}" assigned to ${newTask.assignedTo}.`, undefined, newId);
    addToast('Task Created', `"${newTask.title}" has been created.`, 'success');
    return newId;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setAllTasks(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(t => 
        t.id === id ? { ...t, ...updates } : t
      )
    }));
    addToast('Task Updated', 'Task changes saved.', 'success');
  };

  const toggleTaskStatus = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const isCompleted = task.status === 'Completed';
    const newStatus: TaskStatus = isCompleted ? 'In Progress' : 'Completed';
    const completedAt = isCompleted ? undefined : new Date().toISOString().split('T')[0];

    setAllTasks(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).map(t => 
        t.id === id ? { ...t, status: newStatus, completedAt } : t
      )
    }));

    if (!isCompleted) {
      recordActivity('task_completed', 'Task Completed', `"${task.title}" marked as complete by ${currentUser.name}.`, undefined, id);
      addToast('Task Completed', `"${task.title}" is complete.`, 'success');
    } else {
      addToast('Task Reopened', `"${task.title}" marked as In Progress.`, 'info');
    }
  };

  const deleteTask = (id: string) => {
    setAllTasks(prev => ({
      ...prev,
      [activeCompanyId]: (prev[activeCompanyId] || []).filter(t => t.id !== id)
    }));
    addToast('Task Deleted', 'The task has been removed.', 'info');
  };

  // Outlook Connection & Simulation
  const syncOutlook = async () => {
    setIsSyncing(true);
    addToast('Checking Outlook...', 'Connecting to Microsoft 365 mailbox for new correspondence...', 'info');

    await new Promise(resolve => setTimeout(resolve, 2200));

    // Update company lastSync
    const nowStr = '21 Nov 2026, ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setCompanies(prev => prev.map(c => 
      c.id === activeCompanyId ? { ...c, lastSync: nowStr } : c
    ));

    setIsSyncing(false);
    addToast(
      'Sync Completed (DEMO)',
      'Mailbox synchronised. 3 new construction messages verified and classified by BuildFlow AI.',
      'success'
    );
  };

  const connectOutlook = () => {
    setCompanies(prev => prev.map(c => 
      c.id === activeCompanyId ? { ...c, connectionStatus: 'Connected (DEMO)' } : c
    ));
    addToast('Microsoft 365 Connected', 'Simulated Outlook integration active for ' + currentCompany.mailbox, 'success');
  };

  const disconnectOutlook = () => {
    setCompanies(prev => prev.map(c => 
      c.id === activeCompanyId ? { ...c, connectionStatus: 'Disconnected' } : c
    ));
    addToast('Outlook Disconnected', 'Mailbox integration has been paused (Demo).', 'warning');
  };

  const updateCompanyProfile = (updates: Partial<Company>) => {
    setCompanies(prev => prev.map(c => 
      c.id === activeCompanyId ? { ...c, ...updates } : c
    ));
    addToast('Company Profile Saved', 'Workspace settings have been updated.', 'success');
  };

  const updateEmailTemplate = (id: string, updates: Partial<EmailTemplate>) => {
    setEmailTemplates(prev => prev.map(tmpl => 
      tmpl.id === id ? { ...tmpl, ...updates, lastEdited: 'Today' } : tmpl
    ));
    addToast('Template Saved', 'Email draft template updated successfully.', 'success');
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedRecordId,
        selectedRecordType,
        viewRecordDetail,
        selectedEmailId,
        setSelectedEmailId,
        activeCompanyId,
        currentCompany,
        switchWorkspace,
        companies,
        users,
        currentUser,
        enquiries,
        projects,
        correspondence,
        tasks,
        activities,
        emailTemplates,
        addEnquiry,
        updateEnquiry,
        changeEnquiryStatus,
        deleteEnquiry,
        addProject,
        updateProject,
        changeProjectStatus,
        deleteProject,
        acceptEmailRecommendation,
        rejectEmailRecommendation,
        linkEmailToProject,
        updateEmailStatus,
        addTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,
        syncOutlook,
        isSyncing,
        connectOutlook,
        disconnectOutlook,
        updateCompanyProfile,
        updateEmailTemplate,
        searchQuery,
        setSearchQuery,
        enquiryPipelineFilter,
        setEnquiryPipelineFilter,
        toasts,
        addToast,
        dismissToast
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
