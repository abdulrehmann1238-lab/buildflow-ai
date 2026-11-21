import React, { useState, useMemo } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Enquiry, Project, EnquiryStatus, ProjectStatus } from '../types';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Archive, 
  ArrowUpDown, 
  Calendar, 
  MapPin, 
  Building2, 
  Clock, 
  FileText,
  Mail,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { formatGBP, formatDateUK } from '../utils/formatters';
import { Badge } from '../components/shared/Badge';
import { Modal } from '../components/shared/Modal';

export const EnquiriesProjectsPage: React.FC = () => {
  const { 
    enquiries, 
    projects, 
    addEnquiry, 
    updateEnquiry, 
    changeEnquiryStatus, 
    deleteEnquiry,
    addProject,
    updateProject,
    changeProjectStatus,
    deleteProject,
    viewRecordDetail,
    enquiryPipelineFilter,
    setEnquiryPipelineFilter,
    users
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState<'enquiries' | 'projects'>('enquiries');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>(enquiryPipelineFilter || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'value' | 'date'>('date');

  // Modals
  const [createEnquiryModalOpen, setCreateEnquiryModalOpen] = useState(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState<Enquiry | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // New Enquiry Form State
  const [enqForm, setEnqForm] = useState({
    name: '',
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    contactNumber: '',
    projectType: 'Commercial Development',
    location: 'Manchester',
    description: '',
    estimatedValue: 250000,
    expectedStartDate: '2027-03-01',
    assignedTo: 'James Wilson',
    status: 'New Enquiry' as EnquiryStatus,
    internalNotes: ''
  });

  // New Project Form State
  const [prjForm, setPrjForm] = useState({
    name: '',
    ref: 'BF-PRJ-011',
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    location: 'Manchester, UK',
    projectType: 'Commercial Office Development',
    description: '',
    estimatedValue: 1500000,
    status: 'Active Project' as ProjectStatus,
    projectOwner: 'James Wilson',
    startDate: '2026-11-01',
    expectedCompletionDate: '2027-08-31'
  });

  // Update selectedStatus if pipeline filter was set from Dashboard
  React.useEffect(() => {
    if (enquiryPipelineFilter) {
      setSelectedStatus(enquiryPipelineFilter);
      setActiveTab('enquiries');
    }
  }, [enquiryPipelineFilter]);

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(enq => {
      if (selectedStatus !== 'all' && enq.status !== selectedStatus) return false;
      if (selectedType !== 'all' && enq.projectType !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = enq.name.toLowerCase().includes(q);
        const matchRef = enq.ref.toLowerCase().includes(q);
        const matchClient = enq.clientCompany.toLowerCase().includes(q) || enq.clientName.toLowerCase().includes(q);
        const matchLoc = enq.location.toLowerCase().includes(q);
        if (!matchName && !matchRef && !matchClient && !matchLoc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'value') return b.estimatedValue - a.estimatedValue;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [enquiries, selectedStatus, selectedType, searchQuery, sortBy]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(prj => {
      if (selectedStatus !== 'all' && prj.status !== selectedStatus) return false;
      if (selectedType !== 'all' && prj.projectType !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prj.name.toLowerCase().includes(q);
        const matchRef = prj.ref.toLowerCase().includes(q);
        const matchClient = prj.clientCompany.toLowerCase().includes(q);
        const matchLoc = prj.location.toLowerCase().includes(q);
        if (!matchName && !matchRef && !matchClient && !matchLoc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'value') return b.estimatedValue - a.estimatedValue;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [projects, selectedStatus, selectedType, searchQuery, sortBy]);

  // Handlers for creating new enquiry
  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enqForm.name || !enqForm.clientCompany) return;
    addEnquiry({
      ...enqForm,
      estimatedValue: Number(enqForm.estimatedValue)
    });
    setCreateEnquiryModalOpen(false);
    setEnqForm({
      name: '',
      clientName: '',
      clientCompany: '',
      clientEmail: '',
      contactNumber: '',
      projectType: 'Commercial Development',
      location: 'Manchester',
      description: '',
      estimatedValue: 250000,
      expectedStartDate: '2027-03-01',
      assignedTo: 'James Wilson',
      status: 'New Enquiry',
      internalNotes: ''
    });
  };

  // Handlers for creating existing project manually
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prjForm.name || !prjForm.clientCompany) return;
    addProject({
      ...prjForm,
      estimatedValue: Number(prjForm.estimatedValue)
    });
    setCreateProjectModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 10. Header & Create Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E9E4]">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#252B29]">Enquiries & Projects</h1>
          <p className="text-xs text-[#747B76]">Manage opportunities and keep every project organised.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCreateEnquiryModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Enquiry</span>
          </button>

          <button
            onClick={() => setCreateProjectModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F7F7F4] border border-[#E7E9E4] text-[#252B29] text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-[#536F67]" />
            <span>+ New Project (Manual)</span>
          </button>
        </div>
      </div>

      {/* 10.1 Two Prominent Tabs */}
      <div className="flex items-center gap-3 border-b border-[#E7E9E4]">
        <button
          onClick={() => {
            setActiveTab('enquiries');
            setSelectedStatus('all');
            setEnquiryPipelineFilter(null);
          }}
          className={`pb-3 px-2 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'enquiries' ? 'text-[#354843]' : 'text-[#747B76] hover:text-[#252B29]'
          }`}
        >
          <span>Enquiries Pipeline</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === 'enquiries' ? 'bg-[#536F67] text-white' : 'bg-[#E7E9E4] text-[#747B76]'
          }`}>
            {enquiries.length}
          </span>
          {activeTab === 'enquiries' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#536F67] rounded-t" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('projects');
            setSelectedStatus('all');
            setEnquiryPipelineFilter(null);
          }}
          className={`pb-3 px-2 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'projects' ? 'text-[#354843]' : 'text-[#747B76] hover:text-[#252B29]'
          }`}
        >
          <span>Active & Historical Projects</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === 'projects' ? 'bg-[#536F67] text-white' : 'bg-[#E7E9E4] text-[#747B76]'
          }`}>
            {projects.length}
          </span>
          {activeTab === 'projects' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#536F67] rounded-t" />
          )}
        </button>
      </div>

      {/* 10.5 Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-[#E7E9E4] shadow-subtle text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#8E9690] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab === 'enquiries' ? 'enquiries' : 'projects'} by reference, name, client, location...`}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#E7E9E4] bg-white focus:outline-none focus:border-[#536F67]"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-1.5 rounded-xl border border-[#E7E9E4] bg-white text-[#48504B] text-xs"
          >
            <option value="all">All Statuses</option>
            {activeTab === 'enquiries' ? (
              <>
                <option value="New Enquiry">New Enquiry</option>
                <option value="Awaiting Information">Awaiting Information</option>
                <option value="Under Review">Under Review</option>
                <option value="Qualified">Qualified</option>
                <option value="Future Opportunity">Future Opportunity</option>
                <option value="Declined / Closed">Declined / Closed</option>
              </>
            ) : (
              <>
                <option value="Active Project">Active Project</option>
                <option value="Pre-Construction">Pre-Construction</option>
                <option value="On Site">On Site</option>
                <option value="Practical Completion">Practical Completion</option>
                <option value="Closed">Closed</option>
              </>
            )}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-1.5 rounded-xl border border-[#E7E9E4] bg-white text-[#48504B] text-xs"
          >
            <option value="date">Sort by Date</option>
            <option value="value">Sort by Estimated Value (£)</option>
          </select>
        </div>
      </div>

      {/* Main Content Tables */}
      <div className="bg-white rounded-2xl border border-[#E7E9E4] shadow-subtle overflow-hidden">
        {activeTab === 'enquiries' ? (
          /* 10.2 Enquiries Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAFBF9] border-b border-[#E7E9E4] text-[#747B76] font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ref</th>
                  <th className="py-3.5 px-4">Enquiry / Scheme</th>
                  <th className="py-3.5 px-4">Client Company</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Est. Value</th>
                  <th className="py-3.5 px-4">Workflow Status</th>
                  <th className="py-3.5 px-4">Assigned</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E9E4]">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#747B76]">
                      No enquiries match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq) => (
                    <tr 
                      key={enq.id}
                      className="hover:bg-[#F7F7F4] transition-colors group cursor-pointer"
                      onClick={() => viewRecordDetail('enquiry', enq.id)}
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-[#536F67]">
                        {enq.ref}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#252B29] group-hover:text-[#536F67] transition-colors">
                          {enq.name}
                        </div>
                        <div className="text-[11px] text-[#747B76] truncate max-w-xs">{enq.projectType}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#252B29]">{enq.clientCompany}</div>
                        <div className="text-[11px] text-[#747B76]">{enq.clientName}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#48504B]">
                        {enq.location}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#252B29]">
                        {formatGBP(enq.estimatedValue)}
                      </td>
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        {/* 10.3 Direct Status Dropdown */}
                        <select
                          value={enq.status}
                          onChange={(e) => changeEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                          className="text-xs py-1 px-2 rounded-lg border border-[#CAD7D0] bg-white font-medium text-[#354843] focus:outline-none"
                        >
                          <option value="New Enquiry">New Enquiry</option>
                          <option value="Awaiting Information">Awaiting Information</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Future Opportunity">Future Opportunity</option>
                          <option value="Declined / Closed">Declined / Closed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-[#48504B]">
                        {enq.assignedTo}
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => viewRecordDetail('enquiry', enq.id)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#E7E9E4] hover:bg-[#F0F1ED] text-xs font-medium text-[#48504B]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* 10.4 Projects Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAFBF9] border-b border-[#E7E9E4] text-[#747B76] font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ref</th>
                  <th className="py-3.5 px-4">Project Name</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Contract Value</th>
                  <th className="py-3.5 px-4">Project Status</th>
                  <th className="py-3.5 px-4">Project Owner</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E9E4]">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#747B76]">
                      No projects match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((prj) => (
                    <tr 
                      key={prj.id}
                      className="hover:bg-[#F7F7F4] transition-colors group cursor-pointer"
                      onClick={() => viewRecordDetail('project', prj.id)}
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-[#536F67]">
                        {prj.ref}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#252B29] group-hover:text-[#536F67] transition-colors">
                          {prj.name}
                        </div>
                        <div className="text-[11px] text-[#747B76] truncate max-w-xs">{prj.projectType}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#252B29]">
                        {prj.clientCompany}
                      </td>
                      <td className="py-3.5 px-4 text-[#48504B]">
                        {prj.location}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#252B29]">
                        {formatGBP(prj.estimatedValue)}
                      </td>
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={prj.status}
                          onChange={(e) => changeProjectStatus(prj.id, e.target.value as ProjectStatus)}
                          className="text-xs py-1 px-2 rounded-lg border border-[#CAD7D0] bg-white font-medium text-[#275E38] focus:outline-none"
                        >
                          <option value="Active Project">Active Project</option>
                          <option value="Pre-Construction">Pre-Construction</option>
                          <option value="On Site">On Site</option>
                          <option value="Practical Completion">Practical Completion</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-[#48504B]">
                        {prj.projectOwner}
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => viewRecordDetail('project', prj.id)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#E7E9E4] hover:bg-[#F0F1ED] text-xs font-medium text-[#48504B]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 10.6 Create New Enquiry Modal */}
      {createEnquiryModalOpen && (
        <Modal
          isOpen={createEnquiryModalOpen}
          onClose={() => setCreateEnquiryModalOpen(false)}
          title="Create New Construction Enquiry"
          subtitle="Register an incoming commercial enquiry into BuildFlow central pipeline."
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateEnquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Enquiry Scheme Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Manchester Logistics Hub Extension"
                  value={enqForm.name}
                  onChange={(e) => setEnqForm({ ...enqForm, name: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] focus:outline-none focus:border-[#536F67]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Client Company *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Foster Developments Ltd"
                  value={enqForm.clientCompany}
                  onChange={(e) => setEnqForm({ ...enqForm, clientCompany: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] focus:outline-none focus:border-[#536F67]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Client Contact Name</label>
                <input
                  type="text"
                  placeholder="e.g. Daniel Foster"
                  value={enqForm.clientName}
                  onChange={(e) => setEnqForm({ ...enqForm, clientName: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Client Email</label>
                <input
                  type="email"
                  placeholder="d.foster@fosterdev.co.uk"
                  value={enqForm.clientEmail}
                  onChange={(e) => setEnqForm({ ...enqForm, clientEmail: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Project Scheme Type</label>
                <select
                  value={enqForm.projectType}
                  onChange={(e) => setEnqForm({ ...enqForm, projectType: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
                >
                  <option value="Commercial Development">Commercial Development</option>
                  <option value="Residential Construction">Residential Construction</option>
                  <option value="Industrial Refurbishment">Industrial Refurbishment</option>
                  <option value="Office Fit-Out">Office Fit-Out</option>
                  <option value="Retail Development">Retail Development</option>
                  <option value="Structural Renovation">Structural Renovation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Project Location</label>
                <input
                  type="text"
                  placeholder="e.g. Manchester, M3 4AE"
                  value={enqForm.location}
                  onChange={(e) => setEnqForm({ ...enqForm, location: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Estimated Value (£ GBP)</label>
                <input
                  type="number"
                  placeholder="450000"
                  value={enqForm.estimatedValue}
                  onChange={(e) => setEnqForm({ ...enqForm, estimatedValue: Number(e.target.value) })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Expected Start Date</label>
                <input
                  type="date"
                  value={enqForm.expectedStartDate}
                  onChange={(e) => setEnqForm({ ...enqForm, expectedStartDate: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Assigned Estimator / PM</label>
                <select
                  value={enqForm.assignedTo}
                  onChange={(e) => setEnqForm({ ...enqForm, assignedTo: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Initial Status</label>
                <select
                  value={enqForm.status}
                  onChange={(e) => setEnqForm({ ...enqForm, status: e.target.value as EnquiryStatus })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
                >
                  <option value="New Enquiry">New Enquiry</option>
                  <option value="Awaiting Information">Awaiting Information</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Qualified">Qualified</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Scope Description</label>
              <textarea
                rows={2}
                placeholder="Outline summary of proposed works, site conditions, or special requirements..."
                value={enqForm.description}
                onChange={(e) => setEnqForm({ ...enqForm, description: e.target.value })}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E7E9E4]">
              <button
                type="button"
                onClick={() => setCreateEnquiryModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all"
              >
                Register Enquiry
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 10.7 Create Existing Project Modal */}
      {createProjectModalOpen && (
        <Modal
          isOpen={createProjectModalOpen}
          onClose={() => setCreateProjectModalOpen(false)}
          title="Manually Register Existing Construction Project"
          subtitle="Add an active or pre-existing contract that was not originally sourced via BuildFlow."
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riverside Office Development"
                  value={prjForm.name}
                  onChange={(e) => setPrjForm({ ...prjForm, name: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] focus:outline-none focus:border-[#536F67]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Project Reference *</label>
                <input
                  type="text"
                  required
                  placeholder="BF-PRJ-011"
                  value={prjForm.ref}
                  onChange={(e) => setPrjForm({ ...prjForm, ref: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Client Company *</label>
                <input
                  type="text"
                  required
                  placeholder="Riverside Property Group"
                  value={prjForm.clientCompany}
                  onChange={(e) => setPrjForm({ ...prjForm, clientCompany: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Contract Value (£ GBP)</label>
                <input
                  type="number"
                  value={prjForm.estimatedValue}
                  onChange={(e) => setPrjForm({ ...prjForm, estimatedValue: Number(e.target.value) })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Project Location</label>
                <input
                  type="text"
                  value={prjForm.location}
                  onChange={(e) => setPrjForm({ ...prjForm, location: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Current Status</label>
                <select
                  value={prjForm.status}
                  onChange={(e) => setPrjForm({ ...prjForm, status: e.target.value as ProjectStatus })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4] bg-white"
                >
                  <option value="Active Project">Active Project</option>
                  <option value="Pre-Construction">Pre-Construction</option>
                  <option value="On Site">On Site</option>
                  <option value="Practical Completion">Practical Completion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Project Start Date</label>
                <input
                  type="date"
                  value={prjForm.startDate}
                  onChange={(e) => setPrjForm({ ...prjForm, startDate: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#48504B] mb-1">Target Completion Date</label>
                <input
                  type="date"
                  value={prjForm.expectedCompletionDate}
                  onChange={(e) => setPrjForm({ ...prjForm, expectedCompletionDate: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#48504B] mb-1">Contract / Project Description</label>
              <textarea
                rows={2}
                value={prjForm.description}
                onChange={(e) => setPrjForm({ ...prjForm, description: e.target.value })}
                className="w-full p-2 text-xs rounded-xl border border-[#E7E9E4]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E7E9E4]">
              <button
                type="button"
                onClick={() => setCreateProjectModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-[#747B76]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#536F67] hover:bg-[#425952] text-white text-xs font-semibold shadow-card transition-all"
              >
                Register Existing Project
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
