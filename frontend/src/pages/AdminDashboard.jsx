import { useEffect, useRef, useState } from 'react'
import {
  ComplaintStorageError,
  formatComplaintDate,
  updateComplaint as saveComplaint,
  useComplaints,
} from '../data/complaints.js'
import { logoutDemoUser } from '../data/demoAuth.js'

const departmentNames = [
  'Roads & Infrastructure',
  'Sanitation',
  'Water Supply',
  'Electrical',
  'Public Safety',
]

const departmentOptions = [
  'Roads & Infrastructure',
  'Sanitation',
  'Water Supply',
  'Electrical',
  'Public Safety',
  'Citizen Service Desk',
]

const workerOptions = ['Unassigned', 'worker@civiccomplaint.com', 'Arun Mehta', 'Nisha Rao', 'Imran Khan', 'Sara Patel', 'Dev Shah', 'Ravi Kumar']
const statusOptions = ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Reopened']
const priorityOptions = ['Low', 'Medium', 'High', 'Critical']

const stats = [
  {
    label: 'Total Complaints',
    value: '1,248',
    change: '+12.8%',
    detail: 'vs. last month',
    kind: 'total',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: 'Pending Review',
    value: '186',
    change: '−4.2%',
    detail: 'vs. last month',
    kind: 'pending',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: 'In Progress',
    value: '312',
    change: '+6.4%',
    detail: 'vs. last month',
    kind: 'progress',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 17h16M6 14l3-4 3 2 5-7 2 2" />
        <circle cx="6" cy="18" r="1" />
        <circle cx="18" cy="18" r="1" />
      </svg>
    ),
  },
  {
    label: 'Resolved',
    value: '750',
    change: '+18.2%',
    detail: 'vs. last month',
    kind: 'resolved',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16.5 9" />
      </svg>
    ),
  },
]

const categoryOptions = ['Road Damage', 'Streetlight', 'Garbage & Waste', 'Water Leakage', 'Traffic Signal', 'Drainage', 'Public Safety', 'Other']

function departmentProgress(department) {
  return department.assigned
    ? Math.round((department.resolved / department.assigned) * 100)
    : 0
}

function AdminBrand() {
  return (
    <a className="admin-brand" href="/" aria-label="CivicComplaint home">
      <span className="admin-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
          <path d="M12 11h4" />
        </svg>
      </span>
      <span>Civic<span>Complaint</span></span>
    </a>
  )
}

function AdminIcon({ name }) {
  const paths = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    complaints: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    departments: <><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M8 10h.01M16 10h.01" /></>,
    workers: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1H3ZM16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6v1.4" /></>,
    analytics: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 6-7" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z" transform="translate(-1 -1) scale(1.08)" /></>,
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function AdminDashboard() {
  const complaints = useComplaints()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [priorityFilter, setPriorityFilter] = useState('All priorities')
  const [dateFilter, setDateFilter] = useState('All dates')
  const [selectedId, setSelectedId] = useState(null)
  const [draft, setDraft] = useState(null)
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const dialogRef = useRef(null)

  function handleLogout(event) {
    event.preventDefault()
    logoutDemoUser()
    window.location.href = '/login'
  }

  const selectedComplaint = complaints.find((complaint) => complaint.id === selectedId)
  const statusDistribution = [
    {
      name: 'Pending',
      count: complaints.filter((complaint) => ['Submitted', 'Under Review'].includes(complaint.status)).length,
      kind: 'pending',
    },
    {
      name: 'In Progress',
      count: complaints.filter((complaint) => complaint.status === 'In Progress').length,
      kind: 'progress',
    },
    {
      name: 'Resolved',
      count: complaints.filter((complaint) => complaint.status === 'Resolved').length,
      kind: 'resolved',
    },
    {
      name: 'Reopened',
      count: complaints.filter((complaint) => complaint.status === 'Reopened').length,
      kind: 'reopened',
    },
  ].map((item) => ({
    ...item,
    percent: complaints.length ? Math.round((item.count / complaints.length) * 100) : 0,
  }))
  const departments = departmentNames.map((name) => {
    const assignedComplaints = complaints.filter((complaint) => complaint.department === name)
    return {
      name,
      assigned: assignedComplaints.length,
      resolved: assignedComplaints.filter((complaint) => complaint.status === 'Resolved').length,
      pending: assignedComplaints.filter((complaint) => ['Submitted', 'Under Review', 'Reopened'].includes(complaint.status)).length,
    }
  })
  const filteredComplaints = complaints.filter((complaint) => {
    const normalizedSearch = search.trim().toLowerCase()
    const matchesSearch = !normalizedSearch || [
      complaint.id,
      complaint.title,
      complaint.category,
      complaint.location,
    ].some((value) => value.toLowerCase().includes(normalizedSearch))
    const matchesStatus = statusFilter === 'All statuses' || complaint.status === statusFilter
    const matchesCategory = categoryFilter === 'All categories' || complaint.category === categoryFilter
    const matchesPriority = priorityFilter === 'All priorities' || complaint.priority === priorityFilter
    const matchesDate = dateFilter === 'All dates'
      || (dateFilter === 'Last 7 days' && complaint.submittedAt.slice(0, 10) >= '2026-09-28')
      || (dateFilter === 'Last 30 days' && complaint.submittedAt.slice(0, 10) >= '2026-09-05')

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesDate
  })

  useEffect(() => {
    if (!selectedComplaint) return undefined

    dialogRef.current?.focus()

    function closeOnEscape(event) {
      if (event.key === 'Escape') setSelectedId(null)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [selectedComplaint])

  function openComplaint(complaint) {
    setSelectedId(complaint.id)
    setDraft({
      status: complaint.status,
      priority: complaint.priority,
      department: complaint.department,
      assignedWorker: complaint.assignedWorker,
    })
  }

  function showToast(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }

  function reviewPending() {
    setStatusFilter('Submitted')
    document.getElementById('admin-complaints')?.scrollIntoView({ behavior: 'smooth' })
  }

  function assignUnassigned() {
    const unassigned = complaints.filter((complaint) => complaint.assignedWorker === 'Unassigned')
    if (!unassigned.length) {
      showToast('All demo complaints are already assigned.')
      return
    }

    const workers = workerOptions.filter((worker) => worker !== 'Unassigned')
    unassigned.forEach((complaint, index) => {
      saveComplaint(complaint.id, { assignedWorker: workers[index % workers.length] })
    })
    showToast(`${unassigned.length} demo complaint${unassigned.length > 1 ? 's' : ''} assigned locally.`)
  }

  function saveChanges() {
    if (!selectedComplaint || !draft) return
    const statusChanged = draft.status !== selectedComplaint.status
    let saved
    try {
      saved = saveComplaint(selectedComplaint.id, draft)
    } catch (error) {
      if (!(error instanceof ComplaintStorageError)) throw error
      showToast('Changes could not be saved. Check browser storage and try again.')
      return
    }
    if (!saved) {
      showToast('This complaint could not be found. Refresh the complaint list and try again.')
      return
    }
    showToast(statusChanged
      ? 'Complaint status updated successfully.'
      : 'Complaint details updated successfully.')
  }

  const navItems = [
    { label: 'Overview', href: '#admin-overview', icon: 'overview', active: true },
    { label: 'Complaints', href: '#admin-complaints', icon: 'complaints', badge: filteredComplaints.length },
    { label: 'Departments', href: '#admin-departments', icon: 'departments' },
    { label: 'Workers', href: '#admin-quick-actions', icon: 'workers' },
    { label: 'Analytics', href: '#admin-analytics', icon: 'analytics' },
    { label: 'Settings', href: '#admin-settings', icon: 'settings' },
  ]

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand-area">
            <button
              className="admin-menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close admin navigation' : 'Open admin navigation'}
              aria-expanded={menuOpen}
              aria-controls="admin-sidebar"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
            <AdminBrand />
            <span className="admin-portal-label">Admin Portal</span>
          </div>
          <div className="admin-header-actions">
            <div className="admin-notification-wrap">
              <button
                className="admin-icon-button"
                type="button"
                aria-label={noticeOpen ? 'Close notifications' : 'Open notifications'}
                aria-expanded={noticeOpen}
                onClick={() => {
                  setNoticeOpen(!noticeOpen)
                  setProfileOpen(false)
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
                </svg>
                <span className="admin-notification-dot" aria-hidden="true" />
              </button>
              {noticeOpen && (
                <div className="admin-header-popover" role="status">
                  <strong>Notifications</strong>
                  <p>3 complaints are awaiting review.</p>
                  <p>Department performance is up 8% this month.</p>
                </div>
              )}
            </div>
            <div className="admin-profile-wrap">
              <button
                className="admin-profile-button"
                type="button"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen(!profileOpen)
                  setNoticeOpen(false)
                }}
              >
                <span className="admin-avatar" aria-hidden="true">AD</span>
                <span className="admin-profile-copy">
                  <strong>Admin Desk</strong>
                  <small>City Administrator</small>
                </span>
                <span className="admin-profile-chevron" aria-hidden="true">⌄</span>
              </button>
              {profileOpen && (
                <div className="admin-profile-popover">
                  <strong>Admin Desk</strong>
                  <span>City Administrator</span>
                  <a href="/login" onClick={handleLogout}>Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="admin-app-layout">
        <aside className={`admin-sidebar${menuOpen ? ' admin-sidebar-open' : ''}`} id="admin-sidebar">
          <div className="admin-sidebar-label">WORKSPACE</div>
          <nav aria-label="Admin navigation">
            {navItems.map((item) => (
              <a
                className={`admin-sidebar-link${item.active ? ' admin-sidebar-active' : ''}`}
                href={item.href}
                key={item.label}
                aria-current={item.active ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <AdminIcon name={item.icon} />
                <span>{item.label}</span>
                {item.badge !== undefined && <span className="admin-sidebar-badge">{item.badge}</span>}
              </a>
            ))}
          </nav>
          <div className="admin-sidebar-bottom">
            <span className="admin-sidebar-help-icon" aria-hidden="true">?</span>
            <span><strong>Need assistance?</strong><small>Contact platform support</small></span>
            <a href="mailto:support@civiccomplaint.example" aria-label="Email platform support">↗</a>
          </div>
        </aside>

        <main className="admin-content" id="admin-overview">
          <div className="admin-content-inner">
            <div className="admin-breadcrumb"><span>Workspace</span><span aria-hidden="true">/</span><strong>Overview</strong></div>
            <section className="admin-page-heading">
              <div>
                <span className="admin-eyebrow">CITY OPERATIONS</span>
                <h1>Admin Dashboard</h1>
                <p>Monitor civic issues, manage complaints, and coordinate resolutions.</p>
              </div>
              <div className="admin-system-status">
                <span aria-hidden="true" />
                <span><strong>System status</strong><small>Operational</small></span>
              </div>
            </section>

            <section className="admin-stats-grid" aria-label="Complaint statistics">
              {stats.map((stat) => (
                <article className={`admin-stat-card admin-stat-${stat.kind}`} key={stat.label}>
                  <div className="admin-stat-top">
                    <span className="admin-stat-icon">{stat.icon}</span>
                    <span className={`admin-stat-change${stat.change.startsWith('−') ? ' change-positive' : ''}`}>
                      {stat.change}
                    </span>
                  </div>
                  <span className="admin-stat-value">{stat.value}</span>
                  <div className="admin-stat-bottom">
                    <h2>{stat.label}</h2>
                    <span>{stat.detail}</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="admin-overview-grid" id="admin-analytics">
              <article className="admin-panel admin-distribution-panel" aria-labelledby="distribution-title">
                <div className="admin-panel-heading">
                  <div>
                    <span className="admin-eyebrow">LIVE SNAPSHOT</span>
                    <h2 id="distribution-title">Complaint Overview</h2>
                  </div>
                  <span className="admin-period-chip">This month <span aria-hidden="true">⌄</span></span>
                </div>
                <div className="admin-distribution-summary">
                  <strong>1,248</strong>
                  <span>complaints across all statuses</span>
                </div>
                <div className="admin-distribution-bars">
                  {statusDistribution.map((item) => (
                    <div className={`admin-distribution-row distribution-${item.kind}`} key={item.name}>
                      <div className="admin-distribution-label">
                        <span><i aria-hidden="true" />{item.name}</span>
                        <strong>{item.count.toLocaleString()}</strong>
                      </div>
                      <div
                        className="admin-progress-track"
                        role="progressbar"
                        aria-label={`${item.name} complaints`}
                        aria-valuenow={item.percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <span style={{ width: `${Math.max(item.percent, 4)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="admin-chart-footnote"><span aria-hidden="true">↗</span> Resolutions are trending up 8% from last month</p>
              </article>

              <article className="admin-panel admin-quick-panel" id="admin-quick-actions" aria-labelledby="admin-quick-title">
                <div className="admin-panel-heading">
                  <div>
                    <span className="admin-eyebrow">WORKFLOW</span>
                    <h2 id="admin-quick-title">Quick Actions</h2>
                  </div>
                </div>
                <div className="admin-quick-actions">
                  <button type="button" onClick={reviewPending}>
                    <span className="admin-action-icon action-review" aria-hidden="true"><AdminIcon name="complaints" /></span>
                    <span><strong>Review Pending Complaints</strong><small>Open items awaiting review</small></span>
                    <span className="admin-action-arrow" aria-hidden="true">→</span>
                  </button>
                  <button type="button" onClick={assignUnassigned}>
                    <span className="admin-action-icon action-assign" aria-hidden="true"><AdminIcon name="workers" /></span>
                    <span><strong>Assign Unassigned Complaints</strong><small>Allocate demo reports to workers</small></span>
                    <span className="admin-action-arrow" aria-hidden="true">→</span>
                  </button>
                  <a href="#admin-analytics">
                    <span className="admin-action-icon action-analytics" aria-hidden="true"><AdminIcon name="analytics" /></span>
                    <span><strong>View Analytics</strong><small>Review status distribution</small></span>
                    <span className="admin-action-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="#admin-departments">
                    <span className="admin-action-icon action-workers" aria-hidden="true"><AdminIcon name="departments" /></span>
                    <span><strong>Manage Workers</strong><small>See department assignments</small></span>
                    <span className="admin-action-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </section>

            <section className="admin-panel admin-complaints-panel" id="admin-complaints" aria-labelledby="admin-complaints-title">
              <div className="admin-panel-heading admin-complaints-heading">
                <div>
                  <span className="admin-eyebrow">CITIZEN REPORTS</span>
                  <h2 id="admin-complaints-title">Recent Complaints</h2>
                  <p>Review incoming reports and coordinate the next response.</p>
                </div>
                <span className="admin-results-count">{filteredComplaints.length} of {complaints.length} shown</span>
              </div>

              <div className="admin-filter-bar" role="search" aria-label="Filter complaints">
                <label className="admin-search-field">
                  <span className="visually-hidden">Search complaints</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="10.8" cy="10.8" r="6.8" />
                    <path d="m16 16 5 5" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search ID, issue, category, location..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <label className="admin-filter-control">
                  <span className="visually-hidden">Filter by status</span>
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                    <option>All statuses</option>
                    {statusOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label className="admin-filter-control">
                  <span className="visually-hidden">Filter by category</span>
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                    <option>All categories</option>
                    {categoryOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label className="admin-filter-control">
                  <span className="visually-hidden">Filter by priority</span>
                  <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
                    <option>All priorities</option>
                    {priorityOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label className="admin-filter-control admin-date-filter">
                  <span className="visually-hidden">Filter by date</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                  </svg>
                  <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
                    <option>All dates</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </label>
              </div>

              {filteredComplaints.length ? (
                <div className="admin-table-wrap">
                  <table className="admin-complaints-table">
                    <thead>
                      <tr>
                        <th scope="col">Complaint ID</th>
                        <th scope="col">Issue</th>
                        <th scope="col">Category</th>
                        <th scope="col">Location</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col">Assigned To</th>
                        <th scope="col">Date</th>
                        <th scope="col"><span className="visually-hidden">Action</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredComplaints.map((complaint) => (
                        <tr key={complaint.id}>
                          <td data-label="Complaint ID"><span className="admin-complaint-id">{complaint.id}</span></td>
                          <td data-label="Issue"><strong className="admin-issue-title">{complaint.title}</strong></td>
                          <td data-label="Category">{complaint.category}</td>
                          <td data-label="Location">{complaint.location}</td>
                          <td data-label="Priority">
                            <span className={`admin-priority priority-${complaint.priority.toLowerCase()}`}>
                              <i aria-hidden="true" />{complaint.priority}
                            </span>
                          </td>
                          <td data-label="Status">
                            <span className={`admin-status status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
                              <i aria-hidden="true" />{complaint.status}
                            </span>
                          </td>
                          <td data-label="Assigned To">{complaint.assignedWorker}</td>
                          <td data-label="Date">{formatComplaintDate(complaint.submittedAt)}</td>
                          <td data-label="Action">
                            <button
                              className="admin-view-button"
                              type="button"
                              aria-label={`View complaint ${complaint.id}`}
                              onClick={() => openComplaint(complaint)}
                            >
                              View <span aria-hidden="true">↗</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="admin-empty-state" role="status">
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="10.8" cy="10.8" r="6.8" />
                      <path d="m16 16 5 5M8 11h5" />
                    </svg>
                  </span>
                  <h3>No complaints found</h3>
                  <p>Try changing your filters or search terms.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      setStatusFilter('All statuses')
                      setCategoryFilter('All categories')
                      setPriorityFilter('All priorities')
                      setDateFilter('All dates')
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>

            <section className="admin-departments-section" id="admin-departments" aria-labelledby="departments-title">
              <div className="admin-panel-heading">
                <div>
                  <span className="admin-eyebrow">SERVICE DELIVERY</span>
                  <h2 id="departments-title">Department Performance</h2>
                  <p>Complaint progress across city service teams.</p>
                </div>
                <a className="admin-section-link" href="#admin-departments">All departments <span aria-hidden="true">→</span></a>
              </div>
              <div className="admin-department-grid">
                {departments.map((department) => (
                  <article className="admin-department-card" key={department.name}>
                    <div className="admin-department-title">
                      <span className="admin-department-icon" aria-hidden="true"><AdminIcon name="departments" /></span>
                      <h3>{department.name}</h3>
                    </div>
                    <div className="admin-department-progress">
                      <span>Resolution progress</span>
                      <strong>{departmentProgress(department)}%</strong>
                      <div
                        className="admin-progress-track"
                        role="progressbar"
                        aria-label={`${department.name} resolution progress`}
                        aria-valuenow={departmentProgress(department)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <span style={{ width: `${departmentProgress(department)}%` }} />
                      </div>
                    </div>
                    <div className="admin-department-metrics">
                      <span><strong>{department.assigned}</strong> assigned</span>
                      <span><strong>{department.resolved}</strong> resolved</span>
                      <span><strong>{department.pending}</strong> pending</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <span className="visually-hidden" id="admin-settings">Settings are not available in this frontend demo.</span>
          </div>
          <footer className="admin-footer" id="admin-settings-footer">
            <span>© {new Date().getFullYear()} CivicComplaint Admin Portal</span>
            <span>City services, working together.</span>
          </footer>
        </main>
      </div>

      {toast && (
        <div className="admin-toast" role="status">
          <span aria-hidden="true">✓</span>{toast}
        </div>
      )}

      {selectedComplaint && (
        <div
          className="admin-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedId(null)
          }}
        >
          <section
            className="admin-detail-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-detail-title"
            tabIndex={-1}
            ref={dialogRef}
          >
            <div className="admin-detail-header">
              <div>
                <span className="admin-eyebrow">COMPLAINT DETAILS</span>
                <span className="admin-detail-id">{selectedComplaint.id}</span>
              </div>
              <button
                className="admin-detail-close"
                type="button"
                aria-label="Close complaint details"
                onClick={() => setSelectedId(null)}
              >
                ×
              </button>
            </div>
            <h2 id="admin-detail-title">{selectedComplaint.title}</h2>
            <p className="admin-detail-description">{selectedComplaint.description}</p>

            <div className="admin-detail-badges">
              <span className={`admin-priority priority-${selectedComplaint.priority.toLowerCase()}`}>
                <i aria-hidden="true" />{selectedComplaint.priority} priority
              </span>
              <span className={`admin-status status-${selectedComplaint.status.toLowerCase().replace(' ', '-')}`}>
                <i aria-hidden="true" />{selectedComplaint.status}
              </span>
            </div>

            <dl className="admin-detail-facts">
              <div><dt>Category</dt><dd>{selectedComplaint.category}</dd></div>
              <div><dt>Location</dt><dd>{selectedComplaint.location}</dd></div>
              <div><dt>Submitted</dt><dd>{formatComplaintDate(selectedComplaint.submittedAt)}</dd></div>
              <div><dt>Assigned department</dt><dd>{selectedComplaint.department}</dd></div>
              <div><dt>Assigned worker</dt><dd>{selectedComplaint.assignedWorker}</dd></div>
            </dl>

            <section className="admin-detail-controls" aria-label="Update complaint">
              <h3>Manage complaint</h3>
              <div className="admin-detail-control-grid">
                <label>
                  Change Status
                  <select
                    value={draft.status}
                    onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
                  >
                    {statusOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  Change Priority
                  <select
                    value={draft.priority}
                    onChange={(event) => setDraft((current) => ({ ...current, priority: event.target.value }))}
                  >
                    {priorityOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  Assign Department
                  <select
                    value={draft.department}
                    onChange={(event) => setDraft((current) => ({ ...current, department: event.target.value }))}
                  >
                    {departmentOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label>
                  Assign Worker
                  <select
                    value={draft.assignedWorker}
                    onChange={(event) => setDraft((current) => ({ ...current, assignedWorker: event.target.value }))}
                  >
                    {workerOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
              </div>
              <p>Changes are saved to this browser for the current demo session.</p>
              <button className="admin-save-changes" type="button" onClick={saveChanges}>
                Save changes
              </button>
            </section>

            <section className="admin-timeline" aria-labelledby="admin-timeline-title">
              <h3 id="admin-timeline-title">Activity</h3>
              <ol>
                {[...selectedComplaint.updates]
                  .sort((first, second) => second.timestamp.localeCompare(first.timestamp))
                  .map((event, index) => (
                  <li className={index === 0 ? 'timeline-current' : 'timeline-done'} key={event.id}>
                    <span className="admin-timeline-marker" aria-hidden="true">{index === 0 ? '' : '✓'}</span>
                    <span>
                      <strong>{event.title}</strong>
                      <small>{formatComplaintDate(event.timestamp)}</small>
                      {event.department && <small>{event.department}</small>}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </section>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
