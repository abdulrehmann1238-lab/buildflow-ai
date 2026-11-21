import { Company, Enquiry, Project, Correspondence, Task, User, Activity, EmailTemplate } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'northstar',
    name: 'Northstar Construction Ltd',
    legalName: 'Northstar Construction Services (UK) Ltd',
    mailbox: 'enquiries@northstarconstruction.co.uk',
    address: '42 Peter Street, St Peter\'s Square, Manchester, M2 5QR',
    phone: '+44 (0)161 832 9400',
    vatNumber: 'GB 894 2201 84',
    companyNumber: '08492019',
    currency: 'GBP (£)',
    timezone: 'Europe/London (GMT/BST)',
    dateFormat: 'DD/MM/YYYY',
    connectionStatus: 'Connected (DEMO)',
    lastSync: '21 Nov 2026, 08:56',
    mailboxAccount: 'enquiries@northstarconstruction.co.uk',
    folder: 'Inbox / Primary Business Enquiries'
  },
  {
    id: 'westbrook',
    name: 'Westbrook Developments Ltd',
    legalName: 'Westbrook Commercial & Residential Developments Ltd',
    mailbox: 'tenders@westbrookdev.co.uk',
    address: '14 Wellington Place, Leeds, LS1 4AP',
    phone: '+44 (0)113 245 7700',
    vatNumber: 'GB 612 9043 11',
    companyNumber: '07183922',
    currency: 'GBP (£)',
    timezone: 'Europe/London (GMT/BST)',
    dateFormat: 'DD/MM/YYYY',
    connectionStatus: 'Connected (DEMO)',
    lastSync: '21 Nov 2026, 08:30',
    mailboxAccount: 'tenders@westbrookdev.co.uk',
    folder: 'Inbox / Main Commercial Feed'
  }
];

export const mockUsers: Record<string, User[]> = {
  northstar: [
    {
      id: 'usr-1',
      name: 'James Wilson',
      email: 'j.wilson@northstarconstruction.co.uk',
      role: 'Company Administrator',
      status: 'Active',
      lastActive: 'Just now',
      avatar: 'JW',
      phone: '+44 7700 900142'
    },
    {
      id: 'usr-2',
      name: 'Sarah Mitchell',
      email: 's.mitchell@northstarconstruction.co.uk',
      role: 'Team Member',
      status: 'Active',
      lastActive: '12 mins ago',
      avatar: 'SM',
      phone: '+44 7700 900289'
    },
    {
      id: 'usr-3',
      name: 'Daniel Foster',
      email: 'd.foster@northstarconstruction.co.uk',
      role: 'Team Member',
      status: 'Active',
      lastActive: '45 mins ago',
      avatar: 'DF',
      phone: '+44 7700 900351'
    },
    {
      id: 'usr-4',
      name: 'Oliver Reed',
      email: 'o.reed@northstarconstruction.co.uk',
      role: 'Team Member',
      status: 'Active',
      lastActive: '2 hours ago',
      avatar: 'OR',
      phone: '+44 7700 900418'
    },
    {
      id: 'usr-5',
      name: 'Gemma Taylor',
      email: 'g.taylor@northstarconstruction.co.uk',
      role: 'Team Member',
      status: 'Active',
      lastActive: 'Yesterday',
      avatar: 'GT',
      phone: '+44 7700 900593'
    }
  ],
  westbrook: [
    {
      id: 'usr-w1',
      name: 'Marcus Vance',
      email: 'm.vance@westbrookdev.co.uk',
      role: 'Company Administrator',
      status: 'Active',
      lastActive: 'Just now',
      avatar: 'MV',
      phone: '+44 7700 910401'
    },
    {
      id: 'usr-w2',
      name: 'Eleanor Campbell',
      email: 'e.campbell@westbrookdev.co.uk',
      role: 'Team Member',
      status: 'Active',
      lastActive: '25 mins ago',
      avatar: 'EC',
      phone: '+44 7700 910522'
    },
    {
      id: 'usr-w3',
      name: 'Stuart Higgins',
      email: 's.higgins@westbrookdev.co.uk',
      role: 'Team Member',
      status: 'Active',
      lastActive: '3 hours ago',
      avatar: 'SH',
      phone: '+44 7700 910688'
    }
  ]
};

export const mockEnquiries: Record<string, Enquiry[]> = {
  northstar: [
    {
      id: 'enq-1',
      companyId: 'northstar',
      ref: 'BF-ENQ-001',
      name: 'Commercial Extension & Plant Room',
      clientName: 'Daniel Foster',
      clientCompany: 'Foster Developments Ltd',
      clientEmail: 'd.foster@fosterdevelopments.co.uk',
      contactNumber: '+44 (0)161 749 2011',
      projectType: 'Commercial Development',
      location: 'Manchester, M3 4AE',
      description: 'Single-storey steel frame commercial extension, new staff welfare block and structural modification of existing warehouse envelope.',
      estimatedValue: 450000,
      expectedStartDate: '2027-02-15',
      assignedTo: 'James Wilson',
      status: 'New Enquiry',
      internalNotes: 'Client contacted via primary inbox. Drawings rev A reviewed. Need geotechnical survey.',
      createdAt: '2026-11-20',
      lastActivity: '14 mins ago',
      correspondenceCount: 2
    },
    {
      id: 'enq-2',
      companyId: 'northstar',
      ref: 'BF-ENQ-002',
      name: 'Oakfield Residential Phase 2',
      clientName: 'Julian Croft',
      clientCompany: 'Oakfield Group',
      clientEmail: 'j.croft@oakfieldgroup.co.uk',
      contactNumber: '+44 (0)161 882 1090',
      projectType: 'Residential Construction',
      location: 'Salford, M5 3EQ',
      description: '14 luxury townhouse blocks with podium parking and sustainable timber cladding. Seeking pre-construction advice and fixed tender pricing.',
      estimatedValue: 1200000,
      expectedStartDate: '2027-04-01',
      assignedTo: 'Sarah Mitchell',
      status: 'Awaiting Information',
      internalNotes: 'Awaiting structural engineer foundation calculations and confirmation of utility connection covenants.',
      createdAt: '2026-11-18',
      lastActivity: '2 hours ago',
      correspondenceCount: 4
    },
    {
      id: 'enq-3',
      companyId: 'northstar',
      ref: 'BF-ENQ-003',
      name: 'Logistics Warehouse Refurbishment',
      clientName: 'David Brooks',
      clientCompany: 'NorthWest Logistics PLC',
      clientEmail: 'd.brooks@nwlogistics.co.uk',
      contactNumber: '+44 (0)1925 670 120',
      projectType: 'Industrial Refurbishment',
      location: 'Trafford Park, Manchester, M17 1TN',
      description: 'Overhaul of 45,000 sq ft high-bay distribution hub including epoxy floor coatings, dock leveller replacements and LED conversion.',
      estimatedValue: 320000,
      expectedStartDate: '2027-01-18',
      assignedTo: 'Daniel Foster',
      status: 'Under Review',
      internalNotes: 'Site walkover completed last Thursday. Subcontractor quotations being assembled by estimating team.',
      createdAt: '2026-11-15',
      lastActivity: 'Yesterday',
      correspondenceCount: 3
    },
    {
      id: 'enq-4',
      companyId: 'northstar',
      ref: 'BF-ENQ-004',
      name: 'Meridian House Office Fit-Out',
      clientName: 'Claire Thornton',
      clientCompany: 'Meridian Properties UK',
      clientEmail: 'c.thornton@meridianprops.com',
      contactNumber: '+44 (0)161 445 9210',
      projectType: 'Office Fit-Out',
      location: 'Deansgate, Manchester, M3 2BB',
      description: 'Cat B fit-out across 2 floors (12,000 sq ft) with acoustic glass partitions, exposed services ceiling and executive boardroom suite.',
      estimatedValue: 185000,
      expectedStartDate: '2027-01-05',
      assignedTo: 'James Wilson',
      status: 'Qualified',
      internalNotes: 'Client confirmed funding and target lease start date. Tender document issued.',
      createdAt: '2026-11-12',
      lastActivity: '3 days ago',
      correspondenceCount: 5
    },
    {
      id: 'enq-5',
      companyId: 'northstar',
      ref: 'BF-ENQ-005',
      name: 'Cheshire Medical Centre Expansion',
      clientName: 'Dr. Ian Hargreaves',
      clientCompany: 'Cheshire Healthcare Trust',
      clientEmail: 'i.hargreaves@cheshiretrust.nhs.uk',
      contactNumber: '+44 (0)1625 332 900',
      projectType: 'Healthcare & Public Sector',
      location: 'Wilmslow, SK9 1AA',
      description: 'Cleanroom facility extension and disabled access ramp construction compliant with HTM regulations.',
      estimatedValue: 620000,
      expectedStartDate: '2027-06-01',
      assignedTo: 'Oliver Reed',
      status: 'Future Opportunity',
      internalNotes: 'PQQ submitted. Board approval meeting scheduled for mid-January 2027.',
      createdAt: '2026-11-08',
      lastActivity: '4 days ago',
      correspondenceCount: 1
    },
    {
      id: 'enq-6',
      companyId: 'northstar',
      ref: 'BF-ENQ-006',
      name: 'High Street Heritage Façade Repair',
      clientName: 'Arthur Pendelton',
      clientCompany: 'Pendelton Conservation Heritage',
      clientEmail: 'a.pendelton@pendeltonheritage.org',
      contactNumber: '+44 (0)161 902 4411',
      projectType: 'Structural Renovation',
      location: 'Stockport, SK1 1ES',
      description: 'Grade II listed masonry restoration and lintel replacement on Victorian commercial property.',
      estimatedValue: 95000,
      expectedStartDate: '2026-12-01',
      assignedTo: 'James Wilson',
      status: 'Declined / Closed',
      internalNotes: 'Declined due to heritage specialist capacity constraints during Q4 2026.',
      createdAt: '2026-11-02',
      lastActivity: '1 week ago',
      correspondenceCount: 2
    },
    {
      id: 'enq-7',
      companyId: 'northstar',
      ref: 'BF-ENQ-007',
      name: 'Spinningfields Hospitality Unit Conversion',
      clientName: 'Hannah Davies',
      clientCompany: 'Urban Dining Concepts',
      clientEmail: 'hdavies@urbandining.co.uk',
      contactNumber: '+44 (0)161 834 6721',
      projectType: 'Retail Development',
      location: 'Spinningfields, Manchester, M3 3BE',
      description: 'Conversion of former banking hall into 140-cover premium restaurant with commercial kitchen extract plant.',
      estimatedValue: 410000,
      expectedStartDate: '2027-03-01',
      assignedTo: 'Sarah Mitchell',
      status: 'Under Review',
      internalNotes: 'Planning permission granted. Awaiting structural engineers floor loading report.',
      createdAt: '2026-11-17',
      lastActivity: '5 hours ago',
      correspondenceCount: 2
    },
    {
      id: 'enq-8',
      companyId: 'northstar',
      ref: 'BF-ENQ-008',
      name: 'Bolton Advanced Manufacturing Workshop',
      clientName: 'Martin Cross',
      clientCompany: 'Apex Precision Engineering',
      clientEmail: 'm.cross@apexprecision.co.uk',
      contactNumber: '+44 (0)1204 591 220',
      projectType: 'Industrial Refurbishment',
      location: 'Bolton, BL1 2NY',
      description: 'Construction of reinforced 30-tonne gantry crane runway beams and high-voltage substation housing.',
      estimatedValue: 530000,
      expectedStartDate: '2027-04-15',
      assignedTo: 'Daniel Foster',
      status: 'New Enquiry',
      internalNotes: 'Received RFQ package via email. Needs site visit to inspect existing column foundations.',
      createdAt: '2026-11-19',
      lastActivity: '18 hours ago',
      correspondenceCount: 1
    },
    {
      id: 'enq-9',
      companyId: 'northstar',
      ref: 'BF-ENQ-009',
      name: 'Ancoats Canal Basin Apartments',
      clientName: 'Fiona Gallagher',
      clientCompany: 'Northern Core Living',
      clientEmail: 'fiona.g@northerncore.co.uk',
      contactNumber: '+44 (0)161 273 8810',
      projectType: 'Residential Construction',
      location: 'Ancoats, Manchester, M4 6EE',
      description: '24 residential units overlooking canal basin with sub-surface drainage attenuation tanks.',
      estimatedValue: 2850000,
      expectedStartDate: '2027-08-01',
      assignedTo: 'James Wilson',
      status: 'Qualified',
      internalNotes: 'Developer has secured Tier 1 bank funding. Two-stage tender negotiated agreement.',
      createdAt: '2026-11-10',
      lastActivity: '2 days ago',
      correspondenceCount: 6
    },
    {
      id: 'enq-10',
      companyId: 'northstar',
      ref: 'BF-ENQ-010',
      name: 'Liverpool Knowledge Quarter Lab Suite',
      clientName: 'Prof. Simon Ward',
      clientCompany: 'KQ LifeSciences Ltd',
      clientEmail: 's.ward@kqlifesciences.org',
      contactNumber: '+44 (0)151 709 4321',
      projectType: 'Commercial Development',
      location: 'Liverpool, L7 3NY',
      description: 'Biosafety Level 2 laboratory conversion including specialised drainage and negative pressure ventilation.',
      estimatedValue: 780000,
      expectedStartDate: '2027-05-10',
      assignedTo: 'Oliver Reed',
      status: 'Awaiting Information',
      internalNotes: 'Awaiting detailed HVAC equipment load schedules from consulting engineers.',
      createdAt: '2026-11-16',
      lastActivity: '1 day ago',
      correspondenceCount: 2
    },
    {
      id: 'enq-11',
      companyId: 'northstar',
      ref: 'BF-ENQ-011',
      name: 'Birchwood Logistics Hub Canopy',
      clientName: 'Kevin Marsh',
      clientCompany: 'Direct Fleet Northern',
      clientEmail: 'k.marsh@directfleet.co.uk',
      contactNumber: '+44 (0)1925 821 004',
      projectType: 'Commercial Development',
      location: 'Warrington, WA3 6GR',
      description: 'Weatherproof loading canopy extension over 6 loading bays with integrated stormwater drainage.',
      estimatedValue: 210000,
      expectedStartDate: '2027-02-01',
      assignedTo: 'Daniel Foster',
      status: 'New Enquiry',
      internalNotes: 'Initial enquiry processed through AI classifier. Reviewing structural clearances.',
      createdAt: '2026-11-20',
      lastActivity: '6 hours ago',
      correspondenceCount: 1
    },
    {
      id: 'enq-12',
      companyId: 'northstar',
      ref: 'BF-ENQ-012',
      name: 'Didsbury Village Primary School Sports Hall',
      clientName: 'Margaret Hall',
      clientCompany: 'South Manchester Academies Trust',
      clientEmail: 'm.hall@smatrust.org.uk',
      contactNumber: '+44 (0)161 434 2200',
      projectType: 'Commercial Development',
      location: 'Didsbury, Manchester, M20 2RJ',
      description: 'Multi-use sports hall timber lamella frame structure and acoustic wall cladding.',
      estimatedValue: 890000,
      expectedStartDate: '2027-07-20',
      assignedTo: 'Sarah Mitchell',
      status: 'Future Opportunity',
      internalNotes: 'Capital grant application submitted to Department for Education. Awaiting spring decision.',
      createdAt: '2026-11-05',
      lastActivity: '1 week ago',
      correspondenceCount: 2
    }
  ],
  westbrook: [
    {
      id: 'enq-w1',
      companyId: 'westbrook',
      ref: 'BF-ENQ-W01',
      name: 'Holbeck Urban Village Co-Working Hub',
      clientName: 'Gary Neville-Smythe',
      clientCompany: 'Nexus Workspace Group',
      clientEmail: 'gns@nexuswork.co.uk',
      contactNumber: '+44 (0)113 294 8811',
      projectType: 'Office Fit-Out',
      location: 'Leeds, LS11 9PQ',
      description: 'Substantial Victorian mill conversion into flexible tech co-working spaces with cafe bar and podcast studios.',
      estimatedValue: 890000,
      expectedStartDate: '2027-03-01',
      assignedTo: 'Marcus Vance',
      status: 'Under Review',
      internalNotes: 'Full bill of quantities received.',
      createdAt: '2026-11-14',
      lastActivity: 'Yesterday',
      correspondenceCount: 3
    },
    {
      id: 'enq-w2',
      companyId: 'westbrook',
      ref: 'BF-ENQ-W02',
      name: 'Harrogate Spa Luxury Townhouses',
      clientName: 'Belinda Carlisle',
      clientCompany: 'Spa Town Developments',
      clientEmail: 'belinda@spatowndev.com',
      contactNumber: '+44 (0)1423 502 911',
      projectType: 'Residential Construction',
      location: 'Harrogate, HG1 2SZ',
      description: '6 bespoke stone townhouses with subterranean wine cellars and landscaped private courtyards.',
      estimatedValue: 1650000,
      expectedStartDate: '2027-04-15',
      assignedTo: 'Eleanor Campbell',
      status: 'Qualified',
      internalNotes: 'Site access agreement finalised.',
      createdAt: '2026-11-10',
      lastActivity: '3 days ago',
      correspondenceCount: 4
    }
  ]
};

export const mockProjects: Record<string, Project[]> = {
  northstar: [
    {
      id: 'prj-1',
      companyId: 'northstar',
      ref: 'BF-PRJ-001',
      name: 'Riverside Office Development',
      clientName: 'Sarah Mitchell',
      clientCompany: 'Riverside Property Group Ltd',
      clientEmail: 's.mitchell@riversideproperty.co.uk',
      location: 'Irwell Bank, Manchester, M3 5AB',
      projectType: 'Commercial Office Development',
      description: 'Construction of a contemporary 6-storey Grade A commercial office building including basement substructure, curtain walling and BREEAM "Excellent" targeted mechanical installation.',
      estimatedValue: 2450000,
      status: 'Active Project',
      projectOwner: 'James Wilson',
      startDate: '2026-06-01',
      expectedCompletionDate: '2027-08-30',
      createdAt: '2026-05-15',
      lastCorrespondence: '2 hours ago',
      correspondenceCount: 14,
      tasksCount: 6
    },
    {
      id: 'prj-2',
      companyId: 'northstar',
      ref: 'BF-PRJ-002',
      name: 'Oakfield Residential Development',
      clientName: 'Thomas Reed',
      clientCompany: 'Oakfield Group',
      clientEmail: 't.reed@oakfieldgroup.co.uk',
      location: 'Chapel Street, Salford, M3 6AZ',
      projectType: 'Residential Construction',
      description: 'High-density residential scheme consisting of 38 two-bedroom apartments with energy-efficient heat pump networks and private balconies.',
      estimatedValue: 3850000,
      status: 'On Site',
      projectOwner: 'Sarah Mitchell',
      startDate: '2026-03-10',
      expectedCompletionDate: '2027-11-15',
      createdAt: '2026-02-20',
      lastCorrespondence: '4 hours ago',
      correspondenceCount: 22,
      tasksCount: 8
    },
    {
      id: 'prj-3',
      companyId: 'northstar',
      ref: 'BF-PRJ-003',
      name: 'Manchester Distribution Centre',
      clientName: 'Marcus Davies',
      clientCompany: 'Logix UK Estates',
      clientEmail: 'm.davies@logixuk.com',
      location: 'Trafford Park, Manchester, M17 1PT',
      projectType: 'Industrial Refurbishment',
      description: 'Large-scale warehouse extension with high-tolerance concrete slabs, external yard expansion and acoustic attenuation wall.',
      estimatedValue: 1950000,
      status: 'Pre-Construction',
      projectOwner: 'Daniel Foster',
      startDate: '2026-09-01',
      expectedCompletionDate: '2027-04-25',
      createdAt: '2026-08-10',
      lastCorrespondence: 'Yesterday',
      correspondenceCount: 9,
      tasksCount: 4
    },
    {
      id: 'prj-4',
      companyId: 'northstar',
      ref: 'BF-PRJ-004',
      name: 'Westbrook Commercial Units',
      clientName: 'Geoff Harrison',
      clientCompany: 'Westbrook Commercial Trust',
      clientEmail: 'gharrison@westbrooktrust.co.uk',
      location: 'Macclesfield, SK10 2BN',
      projectType: 'Commercial Development',
      description: 'Development of 8 trade counter units with associated infrastructure, vehicle turning areas and EV charging sub-station.',
      estimatedValue: 1120000,
      status: 'Active Project',
      projectOwner: 'Oliver Reed',
      startDate: '2026-07-15',
      expectedCompletionDate: '2027-03-30',
      createdAt: '2026-06-20',
      lastCorrespondence: '2 days ago',
      correspondenceCount: 11,
      tasksCount: 5
    },
    {
      id: 'prj-5',
      companyId: 'northstar',
      ref: 'BF-PRJ-005',
      name: 'Northgate Industrial Refurbishment',
      clientName: 'Victoria Price',
      clientCompany: 'Northgate Industrial Parks',
      clientEmail: 'v.price@northgateparks.co.uk',
      location: 'Bury, BL9 7AA',
      projectType: 'Industrial Refurbishment',
      description: 'Structural refurbishment of former manufacturing plant, asbestos encapsulation, new composite roof cladding and steel strengthening.',
      estimatedValue: 840000,
      status: 'On Site',
      projectOwner: 'Daniel Foster',
      startDate: '2026-04-01',
      expectedCompletionDate: '2027-01-30',
      createdAt: '2026-03-12',
      lastCorrespondence: '3 days ago',
      correspondenceCount: 17,
      tasksCount: 3
    },
    {
      id: 'prj-6',
      companyId: 'northstar',
      ref: 'BF-PRJ-006',
      name: 'Castlefield Artisan Brewery & Taproom',
      clientName: 'Lewis Brennan',
      clientCompany: 'Seven Bro7hers Brewing Co',
      clientEmail: 'l.brennan@sevenbro7hers.com',
      location: 'Castlefield, Manchester, M3 4LZ',
      projectType: 'Retail Development',
      description: 'Bespoke brewery fit-out under Victorian railway arches including stainless steel drainage troughs, cold storage and mezzanine tasting room.',
      estimatedValue: 560000,
      status: 'Practical Completion',
      projectOwner: 'James Wilson',
      startDate: '2026-01-15',
      expectedCompletionDate: '2026-10-31',
      createdAt: '2025-11-10',
      lastCorrespondence: '1 week ago',
      correspondenceCount: 26,
      tasksCount: 1
    },
    {
      id: 'prj-7',
      companyId: 'northstar',
      ref: 'BF-PRJ-007',
      name: 'Alderley Edge Private Residence',
      clientName: 'Richard Sterling',
      clientCompany: 'Sterling Family Trust',
      clientEmail: 'r.sterling@sterlingtrust.co.uk',
      location: 'Alderley Edge, SK9 7TL',
      projectType: 'Residential Construction',
      description: 'Super-prime 7,500 sq ft contemporary dwelling featuring subterranean spa pool, curved architectural glass and automated environmental controls.',
      estimatedValue: 3100000,
      status: 'On Site',
      projectOwner: 'Sarah Mitchell',
      startDate: '2026-02-01',
      expectedCompletionDate: '2027-09-30',
      createdAt: '2025-12-05',
      lastCorrespondence: '4 days ago',
      correspondenceCount: 19,
      tasksCount: 7
    },
    {
      id: 'prj-8',
      companyId: 'northstar',
      ref: 'BF-PRJ-008',
      name: 'MediaCityUK Creative Studio Suites',
      clientName: 'Chloe Bennett',
      clientCompany: 'Dock10 Media Infrastructure',
      clientEmail: 'c.bennett@dock10.co.uk',
      location: 'Salford Quays, M50 2EQ',
      projectType: 'Office Fit-Out',
      description: 'Acoustically isolated sound recording and video editing pods with dedicated dual-redundant UPS power feeds.',
      estimatedValue: 720000,
      status: 'Pre-Construction',
      projectOwner: 'Oliver Reed',
      startDate: '2026-10-01',
      expectedCompletionDate: '2027-05-15',
      createdAt: '2026-09-12',
      lastCorrespondence: '5 days ago',
      correspondenceCount: 8,
      tasksCount: 3
    },
    {
      id: 'prj-9',
      companyId: 'northstar',
      ref: 'BF-PRJ-009',
      name: 'Stockport Interchange Retail Units',
      clientName: 'Alan Green',
      clientCompany: 'Greater Manchester Combined Transport',
      clientEmail: 'alan.green@tfgm.gov.uk',
      location: 'Stockport, SK1 1SW',
      projectType: 'Retail Development',
      description: 'Internal shell and core completion of 4 ground floor transport hub retail kiosks.',
      estimatedValue: 430000,
      status: 'Active Project',
      projectOwner: 'Daniel Foster',
      startDate: '2026-08-15',
      expectedCompletionDate: '2027-02-28',
      createdAt: '2026-07-25',
      lastCorrespondence: '1 week ago',
      correspondenceCount: 12,
      tasksCount: 4
    },
    {
      id: 'prj-10',
      companyId: 'northstar',
      ref: 'BF-PRJ-010',
      name: 'Liverpool Docklands Logistics Gatehouse',
      clientName: 'Martin Vance',
      clientCompany: 'Mersey Maritime Docks',
      clientEmail: 'm.vance@merseydocks.com',
      location: 'Bootle, Liverpool, L20 1DF',
      projectType: 'Commercial Development',
      description: 'Secure multi-lane ANPR port gatehouse building with blast-resistant glazing and reinforced vehicle barriers.',
      estimatedValue: 690000,
      status: 'Closed',
      projectOwner: 'James Wilson',
      startDate: '2025-08-01',
      expectedCompletionDate: '2026-06-15',
      createdAt: '2025-06-10',
      lastCorrespondence: '2 weeks ago',
      correspondenceCount: 31,
      tasksCount: 0
    }
  ],
  westbrook: [
    {
      id: 'prj-w1',
      companyId: 'westbrook',
      ref: 'BF-PRJ-W01',
      name: 'Leeds South Bank Creative Campus',
      clientName: 'Alistair Finch',
      clientCompany: 'South Bank Investments',
      clientEmail: 'a.finch@southbankleeds.co.uk',
      location: 'Crown Point, Leeds, LS10 1HD',
      projectType: 'Commercial Office Development',
      description: 'Transformation of historic foundry buildings into sustainable design studios and auditorium.',
      estimatedValue: 3400000,
      status: 'Active Project',
      projectOwner: 'Marcus Vance',
      startDate: '2026-04-10',
      expectedCompletionDate: '2027-07-15',
      createdAt: '2026-03-01',
      lastCorrespondence: '1 day ago',
      correspondenceCount: 18,
      tasksCount: 5
    },
    {
      id: 'prj-w2',
      companyId: 'westbrook',
      ref: 'BF-PRJ-W02',
      name: 'York Minster Quarter Townhouses',
      clientName: 'Helena Rowe',
      clientCompany: 'Heritage Living York',
      clientEmail: 'h.rowe@heritagelivingyork.co.uk',
      location: 'Gillygate, York, YO31 7EQ',
      projectType: 'Residential Construction',
      description: 'Construction of 8 conservation-compliant stone dwellings in the sensitive Minster precinct.',
      estimatedValue: 2150000,
      status: 'On Site',
      projectOwner: 'Eleanor Campbell',
      startDate: '2026-05-20',
      expectedCompletionDate: '2027-10-30',
      createdAt: '2026-04-12',
      lastCorrespondence: '3 days ago',
      correspondenceCount: 14,
      tasksCount: 4
    }
  ]
};

export const mockCorrespondence: Record<string, Correspondence[]> = {
  northstar: [
    {
      id: 'email-1',
      companyId: 'northstar',
      senderName: 'Daniel Foster',
      senderEmail: 'd.foster@fosterdevelopments.co.uk',
      senderCompany: 'Foster Developments Ltd',
      recipient: 'enquiries@northstarconstruction.co.uk',
      subject: 'Request for quotation — Commercial extension, Manchester',
      receivedAt: 'Today, 08:34',
      preview: 'Good morning James, we are currently preparing the procurement package for our proposed commercial extension at our Manchester site...',
      body: `Good morning James,

We are currently preparing the procurement package for our proposed commercial extension at our Manchester facility (M3 4AE). 

The scheme involves a single-storey steel frame extension of approximately 450 sq metres, including new staff welfare facilities, internal partitions, and structural modification to the existing warehouse gable wall to link the structures.

We have attached the preliminary general arrangement drawings (Rev A) and an outline specification. We are inviting Northstar to submit a competitive lump-sum quotation.

Could you review and confirm if you have the capacity to price this scheme? If so, we would appreciate confirmation of your expected lead time for tender submission.

Kind regards,
Daniel Foster
Managing Director | Foster Developments Ltd
Tel: +44 (0)161 749 2011`,
      aiClassification: 'New Enquiry',
      aiConfidence: 96,
      aiSummary: 'Potential new commercial construction enquiry requesting a quotation for a proposed 450 sqm extension in Manchester. Initial project scope and drawings are provided, but budget and target programme dates require confirmation.',
      missingInfo: [
        'Client estimated target budget / cost ceiling not stated',
        'Proposed site possession / start date unconfirmed',
        'Formal tender submission deadline date not specified'
      ],
      suggestedActions: [
        'Create new enquiry record (ref: BF-ENQ-001)',
        'Request estimated project budget from Daniel Foster',
        'Confirm expected start date & tender submission window',
        'Assign to estimating team for preliminary takeoff'
      ],
      suggestedProjectId: undefined,
      suggestedProjectName: undefined,
      status: 'awaiting_review',
      attachments: [
        { name: 'GA_Drawings_Rev_A.pdf', size: '4.8 MB', type: 'PDF' },
        { name: 'Outline_Specification_Manchester.docx', size: '1.2 MB', type: 'DOCX' },
        { name: 'Site_Location_Plan.pdf', size: '1.9 MB', type: 'PDF' }
      ],
      extractedDetails: {
        clientName: 'Daniel Foster',
        clientCompany: 'Foster Developments Ltd',
        clientEmail: 'd.foster@fosterdevelopments.co.uk',
        contactNumber: '+44 (0)161 749 2011',
        projectName: 'Manchester Commercial Extension',
        projectLocation: 'Manchester, M3 4AE',
        projectType: 'Commercial Development',
        estimatedValue: 450000,
        expectedStartDate: '2027-02-15',
        requirements: ['Steel frame extension (450 sqm)', 'Staff welfare block', 'Gable wall structural knock-through']
      }
    },
    {
      id: 'email-2',
      companyId: 'northstar',
      senderName: 'Sarah Mitchell',
      senderEmail: 's.mitchell@riversideproperty.co.uk',
      senderCompany: 'Riverside Property Group Ltd',
      recipient: 'j.wilson@northstarconstruction.co.uk',
      subject: 'Updated construction programme — Riverside Offices',
      receivedAt: 'Today, 07:48',
      preview: 'Hi James, please find attached the revised construction programme (Rev 04) following our design team coordination workshop on Wednesday...',
      body: `Hi James,

Please find attached the revised construction programme (Rev 04) following our design team coordination workshop on Wednesday.

Key changes to note:
1. Substructure waterproofing hand-over date has slipped by 5 working days due to concrete curing requirements.
2. Curtain walling delivery sequence has been brought forward to 14 April 2027 to avoid statutory embargo periods.
3. Target Practical Completion date remains 30 August 2027.

Could you review the revised handover dates against your subcontractor procurement schedule and confirm whether this causes any pinch points with the MEP first-fix contractors?

Best regards,
Sarah Mitchell
Senior Development Manager | Riverside Property Group Ltd`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 98,
      aiSummary: 'Client has shared an updated construction programme (Rev 04) and proposed schedule changes for Riverside Office Development. Target completion remains 30 Aug 2027, but substructure hand-over is delayed by 5 days and curtain walling is brought forward.',
      missingInfo: [
        'Confirmation of revised MEP first-fix commencement date',
        'Subcontractor cost implications for accelerated curtain wall installation'
      ],
      suggestedActions: [
        'Link correspondence to BF-PRJ-001 (Riverside Office Development)',
        'Review revised programme dates with MEP subcontractor',
        'Update project milestone tracking in BuildFlow',
        'Draft client confirmation response'
      ],
      suggestedProjectId: 'prj-1',
      suggestedProjectName: 'Riverside Office Development',
      suggestedMatchReason: 'Project reference and client organisation directly match active project BF-PRJ-001.',
      matchConfidence: 98,
      status: 'awaiting_review',
      linkedProjectId: 'prj-1',
      linkedProjectName: 'Riverside Office Development',
      attachments: [
        { name: 'Riverside_Master_Programme_Rev04.pdf', size: '3.4 MB', type: 'PDF' },
        { name: 'Schedule_Variations_Log.xlsx', size: '640 KB', type: 'XLSX' }
      ]
    },
    {
      id: 'email-3',
      companyId: 'northstar',
      senderName: 'Thomas Reed',
      senderEmail: 't.reed@oakfieldgroup.co.uk',
      senderCompany: 'Oakfield Group',
      recipient: 's.mitchell@northstarconstruction.co.uk',
      subject: 'Missing structural drawings — Oakfield Residential Development',
      receivedAt: 'Yesterday, 16:15',
      preview: 'Hello Sarah, our site manager noted today that the revised foundation connection details (drawings SD-104 and SD-105) are still outstanding...',
      body: `Hello Sarah,

Our groundworks site manager noted today that the revised foundation connection details (drawings SD-104 and SD-105) from your consulting engineers are still outstanding.

We are scheduled to commence the pile-cap reinforcement fixing on Monday morning, and our subcontractor cannot proceed past the setting-out stage without these stamped drawings.

Please can you urgently follow up with your structural consultants and issue the approved PDFs today so we do not suffer standing-time claims from the steel fixers?

Regards,
Thomas Reed
Project Director | Oakfield Group`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 94,
      aiSummary: 'Client reports that foundation connection drawings SD-104 and SD-105 are urgently outstanding for Oakfield Residential Development. Groundworks team faces standing-time claims on Monday if drawings are not issued.',
      missingInfo: [
        'Approved structural drawings SD-104 & SD-105 from consulting engineers',
        'Signed-off pile-cap calculation schedule'
      ],
      suggestedActions: [
        'Link email to BF-PRJ-002 (Oakfield Residential Development)',
        'Create urgent task: "Request missing structural drawings from consulting engineers"',
        'Draft urgent response to Thomas Reed confirming drawing delivery window',
        'Flag potential delay notification to project team'
      ],
      suggestedProjectId: 'prj-2',
      suggestedProjectName: 'Oakfield Residential Development',
      suggestedMatchReason: 'Subject and project reference correspond with active scheme BF-PRJ-002.',
      matchConfidence: 94,
      status: 'awaiting_review',
      linkedProjectId: 'prj-2',
      linkedProjectName: 'Oakfield Residential Development',
      attachments: []
    },
    {
      id: 'email-4',
      companyId: 'northstar',
      senderName: 'Accounts Department',
      senderEmail: 'statements@buildermat-supplies.co.uk',
      senderCompany: 'BuilderMat Northern Ltd',
      recipient: 'accounts@northstarconstruction.co.uk',
      subject: 'November supplier statement & remittance advice',
      receivedAt: 'Yesterday, 14:20',
      preview: 'Dear Customer, please find attached your monthly statement of account for November 2026. Total balance currently due for settlement is...',
      body: `Dear Customer,

Please find attached your monthly statement of account for November 2026.

Current outstanding balance: £18,452.19
Due for settlement under 30-day end-of-month terms: 30 November 2026.

Please remit payment to our nominated Barclays account. If you have any queries regarding individual invoice items, please contact credit control.

Yours faithfully,
BuilderMat Northern Ltd | Credit Control Team`,
      aiClassification: 'Unrelated Communication',
      aiConfidence: 99,
      aiSummary: 'Routine monthly supplier account statement and invoice remittance advice from materials merchant. Does not pertain to project enquiries, contracts, or site technical correspondence.',
      missingInfo: [],
      suggestedActions: [
        'Exclude from construction enquiry & project records',
        'Forward to internal accounting folder or mark as reviewed'
      ],
      status: 'awaiting_review',
      attachments: [
        { name: 'Supplier_Statement_Nov2026.pdf', size: '280 KB', type: 'PDF' }
      ]
    },
    {
      id: 'email-5',
      companyId: 'northstar',
      senderName: 'Marcus Davies',
      senderEmail: 'm.davies@logixuk.com',
      senderCompany: 'Logix UK Estates',
      recipient: 'd.foster@northstarconstruction.co.uk',
      subject: 'Subcontractor MEP tender query — Manchester Distribution Centre',
      receivedAt: '20 Nov 2026, 11:45',
      preview: 'Hi Daniel, in reference to the incoming gas main diversion on drawing MEP-003, we need clarification on whether Northstar or Cadent Gas...',
      body: `Hi Daniel,

In reference to the incoming gas main diversion on drawing MEP-003 for the Manchester Distribution Centre (BF-PRJ-003), we need formal clarification on whether Northstar or Cadent Gas is responsible for the civil trenching across the external boundary.

Our cost consultants require this clarification before we can sign off the provisional sum agreement in next Tuesday's meeting.

Could you provide your formal RFI response by Monday 12:00?

Thanks,
Marcus Davies | Development Director`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 97,
      aiSummary: 'Client seeks clarification on trenching demarcation between Northstar and Cadent Gas for Manchester Distribution Centre incoming gas diversion. RFI response required by Monday 12:00.',
      missingInfo: ['Utility demarcation agreement between Cadent Gas and main contractor'],
      suggestedActions: [
        'Link to BF-PRJ-003 (Manchester Distribution Centre)',
        'Create task: "Prepare RFI response for Cadent Gas boundary trenching"',
        'Draft response to Marcus Davies'
      ],
      suggestedProjectId: 'prj-3',
      suggestedProjectName: 'Manchester Distribution Centre',
      suggestedMatchReason: 'Matches project BF-PRJ-003 and client contact Marcus Davies.',
      matchConfidence: 97,
      status: 'reviewed',
      linkedProjectId: 'prj-3',
      linkedProjectName: 'Manchester Distribution Centre',
      attachments: [
        { name: 'RFI_Gas_Demarcation_MEP003.pdf', size: '1.1 MB', type: 'PDF' }
      ]
    },
    {
      id: 'email-6',
      companyId: 'northstar',
      senderName: 'Victoria Price',
      senderEmail: 'v.price@northgateparks.co.uk',
      senderCompany: 'Northgate Industrial Parks',
      recipient: 'd.foster@northstarconstruction.co.uk',
      subject: 'Site progress update request & asbestos sign-off',
      receivedAt: '19 Nov 2026, 15:30',
      preview: 'Daniel, could you provide the 4-weekly photographic progress report for Northgate Refurbishment alongside the UKAS asbestos clearance...',
      body: `Daniel,

Could you provide the 4-weekly photographic progress report for Northgate Industrial Refurbishment alongside the UKAS accredited asbestos clearance certificate for Bay 3?

Our fund monitors are visiting the site next Thursday and require these compliance documents 48 hours in advance.

Kind regards,
Victoria Price`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 95,
      aiSummary: 'Client requests 4-weekly progress photos and UKAS asbestos certificate for Bay 3 at Northgate Industrial Refurbishment ahead of fund monitor inspection.',
      missingInfo: ['UKAS Asbestos Clearance Certificate for Bay 3'],
      suggestedActions: [
        'Link to BF-PRJ-005 (Northgate Industrial Refurbishment)',
        'Collate progress photos from site team',
        'Request clearance cert from environmental subcontractor'
      ],
      suggestedProjectId: 'prj-5',
      suggestedProjectName: 'Northgate Industrial Refurbishment',
      suggestedMatchReason: 'Mentions project name and client manager.',
      matchConfidence: 95,
      status: 'reviewed',
      linkedProjectId: 'prj-5',
      linkedProjectName: 'Northgate Industrial Refurbishment',
      attachments: []
    },
    {
      id: 'email-7',
      companyId: 'northstar',
      senderName: 'Geoff Harrison',
      senderEmail: 'gharrison@westbrooktrust.co.uk',
      senderCompany: 'Westbrook Commercial Trust',
      recipient: 'o.reed@northstarconstruction.co.uk',
      subject: 'Instruction to proceed with Variation 03 — Additional EV Chargers',
      receivedAt: '19 Nov 2026, 09:12',
      preview: 'Oliver, following client committee approval yesterday, please treat this email as our formal instruction to proceed with Variation Notice 03...',
      body: `Oliver,

Following client committee approval yesterday, please treat this email as our formal instruction to proceed with Variation Notice 03 for the installation of 4 additional 50kW DC rapid EV chargers at Westbrook Commercial Units.

The agreed adjustment to the contract sum is £38,400 + VAT.

Please update the monthly payment schedule accordingly and confirm lead times for the transformer upgrade.

Kind regards,
Geoff Harrison`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 98,
      aiSummary: 'Client issued instruction to proceed with Variation 03 (+£38,400) for 4 additional EV chargers at Westbrook Commercial Units.',
      missingInfo: ['Formal signed Architect Instruction (AI) document pending receipt'],
      suggestedActions: [
        'Link to BF-PRJ-004 (Westbrook Commercial Units)',
        'Update project contract value (+£38,400)',
        'Create task: "Request transformer upgrade delivery dates from DNO"'
      ],
      suggestedProjectId: 'prj-4',
      suggestedProjectName: 'Westbrook Commercial Units',
      suggestedMatchReason: 'Matches project reference BF-PRJ-004.',
      matchConfidence: 98,
      status: 'reviewed',
      linkedProjectId: 'prj-4',
      linkedProjectName: 'Westbrook Commercial Units',
      attachments: [
        { name: 'Variation_Notice_03_Signed.pdf', size: '820 KB', type: 'PDF' }
      ]
    },
    {
      id: 'email-8',
      companyId: 'northstar',
      senderName: 'David Brooks',
      senderEmail: 'd.brooks@nwlogistics.co.uk',
      senderCompany: 'NorthWest Logistics PLC',
      recipient: 'd.foster@northstarconstruction.co.uk',
      subject: 'Follow-up on quotation — Warehouse Refurbishment, Trafford Park',
      receivedAt: '18 Nov 2026, 17:05',
      preview: 'Hi Daniel, just checking if Northstar had chance to review the revised floor loading specifications we sent over on Monday...',
      body: `Hi Daniel,

Just checking if Northstar had a chance to review the revised floor loading specifications we sent over on Monday for the Trafford Park distribution hub.

Our directors are holding a CAPEX review on the 26th of November and we are keen to include your proposal. Could you let us know when we might receive the final pricing?

Best regards,
David Brooks`,
      aiClassification: 'New Enquiry',
      aiConfidence: 92,
      aiSummary: 'Client chasing progress on final quotation for Warehouse Refurbishment ahead of 26th November CAPEX board review.',
      missingInfo: ['Internal subcontractor floor coating pricing not yet finalised'],
      suggestedActions: [
        'Link to enquiry BF-ENQ-003',
        'Create task: "Finalise quotation for David Brooks before 25 Nov"',
        'Draft interim courtesy response'
      ],
      suggestedProjectId: undefined,
      suggestedProjectName: undefined,
      status: 'reviewed',
      attachments: []
    },
    {
      id: 'email-9',
      companyId: 'northstar',
      senderName: 'Elena Rostova',
      senderEmail: 'e.rostova@urbanretailgrowth.com',
      senderCompany: 'Urban Retail Growth Partners',
      recipient: 'enquiries@northstarconstruction.co.uk',
      subject: 'Enquiry: Highfield Retail Park Façade Modernisation',
      receivedAt: '18 Nov 2026, 11:20',
      preview: 'Dear Estimating Team, we are seeking experienced regional main contractors for the exterior re-cladding of 6 retail warehouse units in Leeds...',
      body: `Dear Estimating Team,

We are seeking expressions of interest and tenders from experienced regional main contractors for the exterior re-cladding of 6 retail warehouse units in Leeds.

Estimated contract value is £750k - £900k. Phased work while units remain trading.

Tender packages will be distributed via Procore on 1st December. Please reply to register your interest and sign the non-disclosure agreement.

Sincerely,
Elena Rostova | Procurement Manager`,
      aiClassification: 'New Enquiry',
      aiConfidence: 94,
      aiSummary: 'New expression of interest for £750k-£900k retail park re-cladding in Leeds. Phased working required while trading continues. Tender docs on 1 Dec.',
      missingInfo: ['NDA signature requested', 'Specific trading operational constraints'],
      suggestedActions: [
        'Create new enquiry record',
        'Review company capacity in Leeds area',
        'Sign and return non-disclosure agreement'
      ],
      suggestedProjectId: undefined,
      suggestedProjectName: undefined,
      status: 'awaiting_review',
      attachments: [
        { name: 'Mutual_NDA_Highfield.pdf', size: '340 KB', type: 'PDF' }
      ]
    },
    {
      id: 'email-10',
      companyId: 'northstar',
      senderName: 'Peter Gallagher',
      senderEmail: 'peter@gallagher-mep.co.uk',
      senderCompany: 'Gallagher Mechanical Services',
      recipient: 's.mitchell@northstarconstruction.co.uk',
      subject: 'Revised M&E specification approval query — Riverside Offices',
      receivedAt: '17 Nov 2026, 16:40',
      preview: 'Hi Sarah, regarding the heat recovery units on the 4th floor plant room, the specified Daikin units are currently on a 22-week lead time...',
      body: `Hi Sarah,

Regarding the heat recovery units on the 4th floor plant room for Riverside Offices (BF-PRJ-001), the specified Daikin units are currently on a 22-week factory lead time, which would breach the first-fix milestone.

We have sourced an equivalent Mitsubishi Electric VRV system with identical BREEAM performance data available within 6 weeks.

Please find technical comparison datasheet attached. We need client consultant approval by Friday to place the purchase order.

Regards,
Peter Gallagher | Technical Director`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 96,
      aiSummary: 'Subcontractor highlights 22-week lead time risk on specified Daikin HVAC units for Riverside Offices. Proposes equivalent Mitsubishi VRV unit with 6-week delivery. Requires consultant approval.',
      missingInfo: ['Client M&E consultant technical sign-off on equipment substitution'],
      suggestedActions: [
        'Link to BF-PRJ-001 (Riverside Office Development)',
        'Forward comparison sheet to client M&E consultant for urgent review',
        'Create task: "Obtain equipment substitution approval for Riverside HVAC"'
      ],
      suggestedProjectId: 'prj-1',
      suggestedProjectName: 'Riverside Office Development',
      suggestedMatchReason: 'Mentions Riverside Offices and active project manager Sarah Mitchell.',
      matchConfidence: 96,
      status: 'reviewed',
      linkedProjectId: 'prj-1',
      linkedProjectName: 'Riverside Office Development',
      attachments: [
        { name: 'HVAC_Substitution_Comparison.pdf', size: '2.1 MB', type: 'PDF' }
      ]
    },
    {
      id: 'email-11',
      companyId: 'northstar',
      senderName: 'Clara Bennett',
      senderEmail: 'c.bennett@bennett-architects.co.uk',
      senderCompany: 'Bennett & Partners Architects',
      recipient: 'j.wilson@northstarconstruction.co.uk',
      subject: 'Architectural drawings Revision C submission — Oakfield Scheme',
      receivedAt: '17 Nov 2026, 10:15',
      preview: 'Dear James, please find download links for the complete architectural drawing register Revision C reflecting local authority planning comments...',
      body: `Dear James,

Please find attached the updated architectural drawing register (Rev C) for Oakfield Residential Scheme (BF-PRJ-002), incorporating planning condition requirements regarding external brick detailing and cycle store ventilation.

Please issue to site immediately and supersede Rev B drawings.

Kind regards,
Clara Bennett RIBA`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 97,
      aiSummary: 'Architect issued Revision C drawing set incorporating local authority planning conditions for Oakfield Residential Scheme. Site team must supersede Rev B.',
      missingInfo: ['Confirmation of receipt and distribution to groundworks & masonry subcontractors'],
      suggestedActions: [
        'Link to BF-PRJ-002 (Oakfield Residential Development)',
        'Issue drawing notice to site manager and subcontractors',
        'Mark Rev B drawings as superseded'
      ],
      suggestedProjectId: 'prj-2',
      suggestedProjectName: 'Oakfield Residential Development',
      suggestedMatchReason: 'Matches project reference BF-PRJ-002.',
      matchConfidence: 97,
      status: 'reviewed',
      linkedProjectId: 'prj-2',
      linkedProjectName: 'Oakfield Residential Development',
      attachments: [
        { name: 'Drawing_Register_Rev_C.pdf', size: '1.4 MB', type: 'PDF' },
        { name: 'Planning_Condition_Compliance_Note.pdf', size: '920 KB', type: 'PDF' }
      ]
    },
    {
      id: 'email-12',
      companyId: 'northstar',
      senderName: 'James Houghton',
      senderEmail: 'j.houghton77@gmail.com',
      recipient: 'enquiries@northstarconstruction.co.uk',
      subject: 'Building work inquiry',
      receivedAt: '16 Nov 2026, 18:22',
      preview: 'Hi, I need someone to build an outbuilding and renovate a small garage at my property in Altrincham. Can you send someone around to quote?...',
      body: `Hi,

I need someone to build an outbuilding and renovate a small garage at my property in Altrincham.

Can you send someone around next Tuesday to quote for it?

Thanks,
James Houghton`,
      aiClassification: 'New Enquiry',
      aiConfidence: 89,
      aiSummary: 'Domestic enquiry for small garage renovation in Altrincham. Falls below typical commercial contracting thresholds and lacks plans, planning permissions, or budget indicators.',
      missingInfo: [
        'Project budget not specified (likely domestic scale <£50k)',
        'Drawings and planning permission details missing',
        'Detailed site address incomplete'
      ],
      suggestedActions: [
        'Evaluate against company commercial minimum threshold (£150,000)',
        'Send standard polite declination / domestic referral template'
      ],
      status: 'awaiting_review',
      attachments: []
    },
    {
      id: 'email-13',
      companyId: 'northstar',
      senderName: 'Subcontractor Payments Team',
      senderEmail: 'admin@apex-cladding.co.uk',
      senderCompany: 'Apex Cladding Specialists Ltd',
      recipient: 'accounts@northstarconstruction.co.uk',
      subject: 'Application for Payment No. 04 — Riverside Offices',
      receivedAt: '16 Nov 2026, 12:00',
      preview: 'Dear James, please find attached our formal Application for Payment No. 04 for curtain walling bracketry and aluminium extrusions delivered to site...',
      body: `Dear James,

Please find attached our formal Subcontract Application for Payment No. 04 in respect of the Riverside Office Development (BF-PRJ-001).

Gross valuation claimed: £64,200.00
Less 5% retention: £3,210.00
Net amount claimed: £60,990.00 + VAT

Due date for Payment Notice: 23 November 2026.

Kind regards,
Apex Cladding Specialists Ltd`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 96,
      aiSummary: 'Subcontractor Application for Payment No. 04 (£60,990 + VAT) for curtain walling bracketry delivered to Riverside Offices. Payment notice due 23 Nov.',
      missingInfo: ['Quantity Surveyor verification of on-site materials verification'],
      suggestedActions: [
        'Link to BF-PRJ-001 (Riverside Office Development)',
        'Notify project Quantity Surveyor for valuation check before 23 Nov',
        'Record payment notice deadline'
      ],
      suggestedProjectId: 'prj-1',
      suggestedProjectName: 'Riverside Office Development',
      suggestedMatchReason: 'Matches project reference BF-PRJ-001.',
      matchConfidence: 96,
      status: 'reviewed',
      linkedProjectId: 'prj-1',
      linkedProjectName: 'Riverside Office Development',
      attachments: [
        { name: 'Payment_Application_04_Riverside.pdf', size: '1.8 MB', type: 'PDF' },
        { name: 'Vesting_Certificate_Materials.pdf', size: '750 KB', type: 'PDF' }
      ]
    },
    {
      id: 'email-14',
      companyId: 'northstar',
      senderName: 'Salford City Council Planning',
      senderEmail: 'planning@salford.gov.uk',
      recipient: 's.mitchell@northstarconstruction.co.uk',
      subject: 'Discharge of Conditions Notice — Planning Ref 25/78922/FUL (Oakfield)',
      receivedAt: '15 Nov 2026, 14:10',
      preview: 'Dear Applicant, notice is hereby given that the Council of the City of Salford has discharged Condition 4 (Construction Traffic Management Plan)...',
      body: `Dear Applicant,

Notice is hereby given that the Council of the City of Salford has formally DISCHARGED Condition 4 (Construction Traffic Management Plan) and Condition 7 (Surface Water Drainage Scheme) in relation to Planning Approval 25/78922/FUL (Oakfield Residential Development, Chapel Street).

A copy of the formal decision notice has been uploaded to the planning portal.

Salford Planning Authority`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 98,
      aiSummary: 'Salford Council planning authority has formally discharged Condition 4 (Traffic Management) and Condition 7 (Drainage) for Oakfield Residential Development.',
      missingInfo: [],
      suggestedActions: [
        'Link to BF-PRJ-002 (Oakfield Residential Development)',
        'Upload decision notice to project compliance folder',
        'Notify logistics and site management team'
      ],
      suggestedProjectId: 'prj-2',
      suggestedProjectName: 'Oakfield Residential Development',
      suggestedMatchReason: 'Refers to Chapel Street Oakfield scheme.',
      matchConfidence: 98,
      status: 'reviewed',
      linkedProjectId: 'prj-2',
      linkedProjectName: 'Oakfield Residential Development',
      attachments: [
        { name: 'Decision_Notice_Discharge_25_78922.pdf', size: '420 KB', type: 'PDF' }
      ]
    },
    {
      id: 'email-15',
      companyId: 'northstar',
      senderName: 'BAM Construction JV',
      senderEmail: 'tenders@bam-jv-manchester.co.uk',
      recipient: 'enquiries@northstarconstruction.co.uk',
      subject: 'Tender Deadline Extension: Manchester Health Innovation Campus',
      receivedAt: '14 Nov 2026, 09:30',
      preview: 'Please be advised that following queries from multiple bidding trade contractors, the tender return deadline for the structural package has been extended...',
      body: `Dear Bidders,

Please be advised that following requests for clarification regarding foundation piling depth, the tender return deadline for the Structural Steel & RC Frame Package has been extended by seven calendar days.

New Tender Return Deadline: 04 December 2026 at 12:00 noon.

Please submit all bids through the Conject procurement portal.

BAM JV Procurement Team`,
      aiClassification: 'New Enquiry',
      aiConfidence: 91,
      aiSummary: 'Tender deadline extension for Manchester Health Innovation Campus structural package until 4 Dec 2026.',
      missingInfo: ['Clarification responses to geotechnical queries pending from client'],
      suggestedActions: [
        'Update estimating calendar deadline to 04 Dec 2026',
        'Inform lead estimator Daniel Foster'
      ],
      status: 'reviewed',
      attachments: []
    }
  ],
  westbrook: [
    {
      id: 'email-w1',
      companyId: 'westbrook',
      senderName: 'Alistair Finch',
      senderEmail: 'a.finch@southbankleeds.co.uk',
      recipient: 'm.vance@westbrookdev.co.uk',
      subject: 'Foundry roof truss inspection report — South Bank Campus',
      receivedAt: 'Today, 08:15',
      preview: 'Marcus, following the structural engineers high-level inspection yesterday, 3 wrought iron timber joints require plate reinforcement...',
      body: `Marcus,

Following the structural engineer's high-level inspection of the historic foundry roof yesterday, 3 wrought iron timber joints require plate reinforcement before we can erect the acoustic plasterboard ceiling.

See attached engineering recommendations and timber repair details.

Regards,
Alistair Finch`,
      aiClassification: 'Existing Project Correspondence',
      aiConfidence: 96,
      aiSummary: 'Structural engineer advises 3 wrought iron timber joints in historic foundry roof require steel plate reinforcement before ceiling installation at South Bank Campus.',
      missingInfo: ['Structural calculation sign-off for steel plate bolt configuration'],
      suggestedActions: [
        'Link to BF-PRJ-W01',
        'Request structural calculations from consultant',
        'Source specialist heritage joiner'
      ],
      suggestedProjectId: 'prj-w1',
      suggestedProjectName: 'Leeds South Bank Creative Campus',
      suggestedMatchReason: 'Matches project BF-PRJ-W01 and client contact.',
      matchConfidence: 96,
      status: 'awaiting_review',
      linkedProjectId: 'prj-w1',
      linkedProjectName: 'Leeds South Bank Creative Campus',
      attachments: [
        { name: 'Heritage_Roof_Inspection_Report.pdf', size: '3.1 MB', type: 'PDF' }
      ]
    }
  ]
};

export const mockTasks: Record<string, Task[]> = {
  northstar: [
    {
      id: 'tsk-1',
      companyId: 'northstar',
      title: 'Review revised Riverside construction programme (Rev 04)',
      description: 'Check substructure 5-day handover slippage against MEP first-fix contractor dates and verify curtain wall delivery schedule.',
      assignedTo: 'James Wilson',
      dueDate: '2026-11-23',
      priority: 'High',
      status: 'To Do',
      relatedProjectId: 'prj-1',
      relatedProjectName: 'Riverside Office Development',
      relatedCorrespondenceId: 'email-2',
      createdAt: '2026-11-21'
    },
    {
      id: 'tsk-2',
      companyId: 'northstar',
      title: 'Request missing structural drawings SD-104 & SD-105',
      description: 'Urgent: groundworks team face standing-time claims on Monday morning if foundation connection details are not issued.',
      assignedTo: 'Sarah Mitchell',
      dueDate: '2026-11-21',
      priority: 'Urgent',
      status: 'To Do',
      relatedProjectId: 'prj-2',
      relatedProjectName: 'Oakfield Residential Development',
      relatedCorrespondenceId: 'email-3',
      createdAt: '2026-11-20'
    },
    {
      id: 'tsk-3',
      companyId: 'northstar',
      title: 'Follow up Manchester commercial extension quotation',
      description: 'Contact Daniel Foster at Foster Developments to confirm target budget ceiling and proposed site start dates for 450 sqm scheme.',
      assignedTo: 'James Wilson',
      dueDate: '2026-11-24',
      priority: 'Medium',
      status: 'To Do',
      relatedEnquiryId: 'enq-1',
      relatedCorrespondenceId: 'email-1',
      createdAt: '2026-11-20'
    },
    {
      id: 'tsk-4',
      companyId: 'northstar',
      title: 'Submit Cadent Gas boundary trenching RFI response',
      description: 'Clarify trenching demarcation on drawing MEP-003 for Marcus Davies before Monday 12:00 cost consultant meeting.',
      assignedTo: 'Daniel Foster',
      dueDate: '2026-11-23',
      priority: 'High',
      status: 'In Progress',
      relatedProjectId: 'prj-3',
      relatedProjectName: 'Manchester Distribution Centre',
      relatedCorrespondenceId: 'email-5',
      createdAt: '2026-11-20'
    },
    {
      id: 'tsk-5',
      companyId: 'northstar',
      title: 'Obtain UKAS asbestos certificate for Bay 3',
      description: 'Collate photographic records and clearance documentation for fund monitor inspection next Thursday.',
      assignedTo: 'Daniel Foster',
      dueDate: '2026-11-25',
      priority: 'Medium',
      status: 'To Do',
      relatedProjectId: 'prj-5',
      relatedProjectName: 'Northgate Industrial Refurbishment',
      relatedCorrespondenceId: 'email-6',
      createdAt: '2026-11-19'
    },
    {
      id: 'tsk-6',
      companyId: 'northstar',
      title: 'Submit Payment Notice for Riverside Cladding App 04',
      description: 'Ensure Quantity Surveyor signs off valuation of on-site aluminium extrusions before statutory deadline of 23 Nov.',
      assignedTo: 'James Wilson',
      dueDate: '2026-11-23',
      priority: 'High',
      status: 'In Progress',
      relatedProjectId: 'prj-1',
      relatedProjectName: 'Riverside Office Development',
      relatedCorrespondenceId: 'email-13',
      createdAt: '2026-11-16'
    },
    {
      id: 'tsk-7',
      companyId: 'northstar',
      title: 'Issue Revision C drawings to groundworks site team',
      description: 'Supersede Rev B drawings on Oakfield site and obtain signed drawing issue slips from foremen.',
      assignedTo: 'Sarah Mitchell',
      dueDate: '2026-11-20',
      priority: 'High',
      status: 'Completed',
      relatedProjectId: 'prj-2',
      relatedProjectName: 'Oakfield Residential Development',
      relatedCorrespondenceId: 'email-11',
      createdAt: '2026-11-17',
      completedAt: '2026-11-18'
    },
    {
      id: 'tsk-8',
      companyId: 'northstar',
      title: 'Request DNO quote for Westbrook transformer upgrade',
      description: 'Follow up Variation 03 instruction for 4 additional EV chargers at Westbrook Commercial Units.',
      assignedTo: 'Oliver Reed',
      dueDate: '2026-11-27',
      priority: 'Medium',
      status: 'To Do',
      relatedProjectId: 'prj-4',
      relatedProjectName: 'Westbrook Commercial Units',
      relatedCorrespondenceId: 'email-7',
      createdAt: '2026-11-19'
    },
    {
      id: 'tsk-9',
      companyId: 'northstar',
      title: 'Finalise quotation pricing for David Brooks (Trafford Park)',
      description: 'Assemble subcontractor epoxy floor coating rates ahead of client board CAPEX review on 26th Nov.',
      assignedTo: 'Daniel Foster',
      dueDate: '2026-11-25',
      priority: 'High',
      status: 'In Progress',
      relatedEnquiryId: 'enq-3',
      relatedCorrespondenceId: 'email-8',
      createdAt: '2026-11-18'
    },
    {
      id: 'tsk-10',
      companyId: 'northstar',
      title: 'Return signed NDA for Highfield Retail Park modernisation',
      description: 'Sign and return confidentiality agreement to Elena Rostova to secure access to Procore tender portal on 1 Dec.',
      assignedTo: 'James Wilson',
      dueDate: '2026-11-28',
      priority: 'Low',
      status: 'To Do',
      relatedCorrespondenceId: 'email-9',
      createdAt: '2026-11-18'
    },
    {
      id: 'tsk-11',
      companyId: 'northstar',
      title: 'Submit revised HVAC technical schedule to client M&E consultant',
      description: 'Forward Mitsubishi VRV datasheet for Riverside 4th floor plant room to overcome 22-week Daikin supply delay.',
      assignedTo: 'Sarah Mitchell',
      dueDate: '2026-11-21',
      priority: 'Urgent',
      status: 'To Do',
      relatedProjectId: 'prj-1',
      relatedProjectName: 'Riverside Office Development',
      relatedCorrespondenceId: 'email-10',
      createdAt: '2026-11-17'
    },
    {
      id: 'tsk-12',
      companyId: 'northstar',
      title: 'Review planning discharge conditions for Salford council',
      description: 'Confirm traffic management and drainage discharge notices with local highways inspector.',
      assignedTo: 'Sarah Mitchell',
      dueDate: '2026-11-19',
      priority: 'Low',
      status: 'Completed',
      relatedProjectId: 'prj-2',
      relatedProjectName: 'Oakfield Residential Development',
      relatedCorrespondenceId: 'email-14',
      createdAt: '2026-11-15',
      completedAt: '2026-11-19'
    },
    {
      id: 'tsk-13',
      companyId: 'northstar',
      title: 'Perform site survey for Brewery taproom handover',
      description: 'Complete final defects snagging inspection with Seven Bro7hers management team.',
      assignedTo: 'James Wilson',
      dueDate: '2026-11-14',
      priority: 'Medium',
      status: 'Completed',
      relatedProjectId: 'prj-6',
      relatedProjectName: 'Castlefield Artisan Brewery & Taproom',
      createdAt: '2026-11-08',
      completedAt: '2026-11-14'
    },
    {
      id: 'tsk-14',
      companyId: 'northstar',
      title: 'Obtain building control sign-off for Alderley Edge pool',
      description: 'Coordinate hydraulic testing inspection with Cheshire East structural building inspector.',
      assignedTo: 'Sarah Mitchell',
      dueDate: '2026-11-30',
      priority: 'High',
      status: 'To Do',
      relatedProjectId: 'prj-7',
      relatedProjectName: 'Alderley Edge Private Residence',
      createdAt: '2026-11-12'
    },
    {
      id: 'tsk-15',
      companyId: 'northstar',
      title: 'Update tender schedule for BAM Manchester Health Campus',
      description: 'Adjust internal estimating timeline following 7-day client deadline extension to 04 Dec.',
      assignedTo: 'Daniel Foster',
      dueDate: '2026-11-26',
      priority: 'Low',
      status: 'To Do',
      relatedCorrespondenceId: 'email-15',
      createdAt: '2026-11-14'
    }
  ],
  westbrook: [
    {
      id: 'tsk-w1',
      companyId: 'westbrook',
      title: 'Appoint specialist heritage carpenter for foundry trusses',
      description: 'Secure pricing for plate reinforcement on Leeds South Bank Creative Campus.',
      assignedTo: 'Marcus Vance',
      dueDate: '2026-11-24',
      priority: 'High',
      status: 'To Do',
      relatedProjectId: 'prj-w1',
      relatedProjectName: 'Leeds South Bank Creative Campus',
      createdAt: '2026-11-21'
    },
    {
      id: 'tsk-w2',
      companyId: 'westbrook',
      title: 'Review Minster conservation stone delivery schedule',
      description: 'Ensure York Minster precinct access permits match delivery lorry delivery slots.',
      assignedTo: 'Eleanor Campbell',
      dueDate: '2026-11-26',
      priority: 'Medium',
      status: 'In Progress',
      relatedProjectId: 'prj-w2',
      relatedProjectName: 'York Minster Quarter Townhouses',
      createdAt: '2026-11-18'
    }
  ]
};

export const mockActivities: Record<string, Activity[]> = {
  northstar: [
    {
      id: 'act-1',
      companyId: 'northstar',
      type: 'email_reviewed',
      title: 'Email Reviewed by James Wilson',
      description: 'AI recommendation accepted for "Request for quotation — Commercial extension, Manchester". New enquiry record created.',
      timestamp: 'Today, 08:42',
      user: 'James Wilson',
      relatedRef: 'BF-ENQ-001'
    },
    {
      id: 'act-2',
      companyId: 'northstar',
      type: 'email_linked',
      title: 'Correspondence Linked to Project',
      description: 'Updated construction programme linked to Riverside Office Development (BF-PRJ-001).',
      timestamp: 'Today, 07:55',
      user: 'Sarah Mitchell',
      relatedRef: 'BF-PRJ-001'
    },
    {
      id: 'act-3',
      companyId: 'northstar',
      type: 'task_created',
      title: 'Urgent Task Created',
      description: 'Created task "Request missing structural drawings SD-104 & SD-105" for Oakfield Residential.',
      timestamp: 'Yesterday, 16:30',
      user: 'Sarah Mitchell',
      relatedRef: 'BF-PRJ-002'
    },
    {
      id: 'act-4',
      companyId: 'northstar',
      type: 'status_changed',
      title: 'Enquiry Status Updated to Qualified',
      description: 'Meridian House Office Fit-Out moved to "Qualified" following financial appraisal confirmation.',
      timestamp: 'Yesterday, 11:15',
      user: 'James Wilson',
      relatedRef: 'BF-ENQ-004'
    },
    {
      id: 'act-5',
      companyId: 'northstar',
      type: 'task_completed',
      title: 'Task Completed',
      description: 'Sarah Mitchell completed "Issue Revision C drawings to groundworks site team".',
      timestamp: '18 Nov 2026, 17:20',
      user: 'Sarah Mitchell',
      relatedRef: 'BF-PRJ-002'
    },
    {
      id: 'act-6',
      companyId: 'northstar',
      type: 'details_edited',
      title: 'Project Contract Value Updated',
      description: 'Westbrook Commercial Units value revised by +£38,400 following client Variation Notice 03.',
      timestamp: '19 Nov 2026, 10:05',
      user: 'Oliver Reed',
      relatedRef: 'BF-PRJ-004'
    },
    {
      id: 'act-7',
      companyId: 'northstar',
      type: 'enquiry_created',
      title: 'New Enquiry Registered',
      description: 'Spinningfields Hospitality Unit Conversion added with estimated value £410,000.',
      timestamp: '17 Nov 2026, 14:00',
      user: 'Sarah Mitchell',
      relatedRef: 'BF-ENQ-007'
    },
    {
      id: 'act-8',
      companyId: 'northstar',
      type: 'email_linked',
      title: 'Payment Application Registered',
      description: 'Subcontract Application No. 04 from Apex Cladding recorded under Riverside Office Development.',
      timestamp: '16 Nov 2026, 12:45',
      user: 'James Wilson',
      relatedRef: 'BF-PRJ-001'
    }
  ],
  westbrook: [
    {
      id: 'act-w1',
      companyId: 'westbrook',
      type: 'email_reviewed',
      title: 'Foundry Roof Report Analysed',
      description: 'AI recommendation processed for historic roof truss reinforcement at South Bank Campus.',
      timestamp: 'Today, 08:30',
      user: 'Marcus Vance',
      relatedRef: 'BF-PRJ-W01'
    }
  ]
};

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Enquiry Acknowledgement & Information Request',
    category: 'Enquiries',
    subject: 'Thank you for your enquiry — {Project_Name}',
    body: `Dear {Client_Name},

Thank you for contacting Northstar Construction regarding the proposed works for {Project_Name}.

We have registered your enquiry and our estimating team is currently reviewing the initial information provided.

To assist us with preparing an accurate and competitive proposal, could you please confirm the following details if currently available:
1. Target procurement timeline and tender submission deadline
2. Proposed commencement on site and completion dates
3. Any preliminary budget guidelines or cost ceilings
4. Availability of site investigation / geotechnical surveys

We will be in touch shortly once our preliminary review is complete.

Kind regards,
{User_Name}
Northstar Construction Ltd`,
    lastEdited: '18 Nov 2026'
  },
  {
    id: 'tmpl-2',
    name: 'Request for Missing Project Information',
    category: 'Project Management',
    subject: 'Urgent Information Request: {Project_Name} — {Subject_Reference}',
    body: `Dear {Client_Name},

In relation to ongoing works on {Project_Name}, we would appreciate your assistance with the following outstanding items required by our site engineering team:

{Missing_Information_List}

To prevent any impact on the agreed construction programme milestones, we would be grateful if this information could be provided by {Required_Date}.

Please let us know if you require any technical clarification from our side.

Best regards,
{User_Name}
Northstar Construction Ltd`,
    lastEdited: '15 Nov 2026'
  },
  {
    id: 'tmpl-3',
    name: 'Programme Update & Schedule Acknowledgement',
    category: 'Project Management',
    subject: 'Re: Construction Programme Update — {Project_Name}',
    body: `Hi {Client_Name},

Thank you for sharing the updated construction schedule for {Project_Name}.

We have received the revised programme details and our project management team is reviewing the milestone variations against subcontractor procurement and site readiness.

We will provide our formal confirmation and any operational observations within 48 hours.

Kind regards,
{User_Name}
Northstar Construction Ltd`,
    lastEdited: '12 Nov 2026'
  },
  {
    id: 'tmpl-4',
    name: 'Tender Quotation Submission Follow-up',
    category: 'Estimating',
    subject: 'Quotation Follow-up: {Project_Name}',
    body: `Dear {Client_Name},

Following the submission of our quotation for {Project_Name} on {Submission_Date}, we are following up to enquire whether you have had an opportunity to review our proposal.

We remain enthusiastic about the opportunity to partner with {Client_Company} on this scheme. Should your team have any technical queries or wish to discuss value engineering options, we would be delighted to arrange a brief call.

Yours sincerely,
{User_Name}
Estimating Team | Northstar Construction Ltd`,
    lastEdited: '08 Nov 2026'
  }
];
