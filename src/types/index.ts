export type EnquiryStatus = 
  | 'New Enquiry' 
  | 'Awaiting Information' 
  | 'Under Review' 
  | 'Qualified' 
  | 'Future Opportunity' 
  | 'Declined / Closed';

export type ProjectStatus = 
  | 'Active Project' 
  | 'Pre-Construction' 
  | 'On Site' 
  | 'Practical Completion' 
  | 'Closed';

export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type AIClassification = 
  | 'New Enquiry' 
  | 'Existing Project Correspondence' 
  | 'Unrelated Communication';

export type CorrespondenceStatus = 
  | 'awaiting_review' 
  | 'reviewed' 
  | 'rejected' 
  | 'enquiry_created' 
  | 'linked';

export interface Attachment {
  name: string;
  size: string;
  type: string;
}

export interface Correspondence {
  id: string;
  companyId: string;
  senderName: string;
  senderEmail: string;
  senderCompany?: string;
  recipient: string;
  subject: string;
  receivedAt: string;
  preview: string;
  body: string;
  aiClassification: AIClassification;
  aiConfidence: number;
  aiSummary: string;
  missingInfo: string[];
  suggestedActions: string[];
  suggestedProjectId?: string;
  suggestedProjectName?: string;
  suggestedMatchReason?: string;
  matchConfidence?: number;
  status: CorrespondenceStatus;
  linkedProjectId?: string;
  linkedProjectName?: string;
  linkedEnquiryId?: string;
  attachments: Attachment[];
  extractedDetails?: {
    clientName?: string;
    clientCompany?: string;
    clientEmail?: string;
    contactNumber?: string;
    projectName?: string;
    projectLocation?: string;
    projectType?: string;
    estimatedValue?: number;
    expectedStartDate?: string;
    requirements?: string[];
  };
}

export interface Enquiry {
  id: string;
  companyId: string;
  ref: string;
  name: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  contactNumber: string;
  projectType: string;
  location: string;
  description: string;
  estimatedValue: number;
  expectedStartDate: string;
  assignedTo: string;
  status: EnquiryStatus;
  internalNotes: string;
  createdAt: string;
  lastActivity: string;
  correspondenceCount?: number;
}

export interface Project {
  id: string;
  companyId: string;
  ref: string;
  name: string;
  clientName: string;
  clientCompany: string;
  clientEmail?: string;
  location: string;
  projectType: string;
  description: string;
  estimatedValue: number;
  status: ProjectStatus;
  projectOwner: string;
  startDate: string;
  expectedCompletionDate: string;
  createdAt: string;
  lastCorrespondence: string;
  correspondenceCount?: number;
  tasksCount?: number;
}

export interface Task {
  id: string;
  companyId: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  relatedProjectId?: string;
  relatedProjectName?: string;
  relatedEnquiryId?: string;
  relatedCorrespondenceId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Company Administrator' | 'Team Member';
  status: 'Active' | 'Invited' | 'Offline';
  lastActive: string;
  avatar?: string;
  phone?: string;
}

export interface Activity {
  id: string;
  companyId: string;
  type: 'enquiry_created' | 'status_changed' | 'project_assigned' | 'email_linked' | 'task_created' | 'task_completed' | 'details_edited' | 'email_reviewed';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  relatedRef?: string;
  relatedId?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  lastEdited: string;
}

export interface Company {
  id: string;
  name: string;
  legalName: string;
  mailbox: string;
  address: string;
  phone: string;
  vatNumber: string;
  companyNumber: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  connectionStatus: 'Connected (DEMO)' | 'Disconnected' | 'Syncing';
  lastSync: string;
  mailboxAccount: string;
  folder: string;
}
