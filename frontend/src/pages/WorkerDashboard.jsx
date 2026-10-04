import { useEffect, useState } from 'react'
import {
  ComplaintStorageError,
  formatComplaintDate,
  updateComplaint,
  useComplaints,
} from '../data/complaints.js'
import { getDemoSession, logoutDemoUser } from '../data/demoAuth.js'

const filters = ['All', 'Pending', 'In Progress', 'Completed']

const statDefinitions = [
  { label: 'Assigned to Me', kind: 'assigned', note: 'All assigned work', icon: '▤' },
  { label: 'Pending', kind: 'pending', note: 'Ready to accept', icon: '◷' },
  { label: 'In Progress', kind: 'progress', note: 'Currently underway', icon: '↗' },
  { label: 'Completed', kind: 'completed', note: 'Work marked complete', icon: '✓' },
]

function WorkerBrand() {
  return (
    <a className="worker-brand" href="/" aria-label="CivicComplaint home">
      <span className="worker-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
          <path d="M12 11h4" />
        </svg>
      </span>
      <span>Civic<span>Complaint</span></span>
    </a>
  )
}

function statusKind(status) {
  if (status === 'Resolved') return 'resolved'
  if (status === 'In Progress') return 'progress'
  if (status === 'Under Review') return 'review'
  return 'pending'
}

function WorkerDashboard() {
  const complaints = useComplaints()
  const session = getDemoSession()
  const workerEmail = session?.email || ''
  const workerName = session?.name || 'Field Worker'
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const assignedComplaints = complaints.filter((complaint) => complaint.assignedWorker === workerEmail)
  const selectedComplaint = assignedComplaints.find((complaint) => complaint.id === selectedId) || null
  const stats = statDefinitions.map((stat) => {
    const value = stat.kind === 'assigned'
      ? assignedComplaints.length
      : assignedComplaints.filter((complaint) => {
        if (stat.kind === 'pending') return ['Submitted', 'Under Review', 'Reopened'].includes(complaint.status)
        return complaint.status === (stat.kind === 'progress' ? 'In Progress' : 'Resolved')
      }).length
    return { ...stat, value }
  })

  const visibleComplaints = assignedComplaints.filter((complaint) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || [
      complaint.id,
      complaint.title,
      complaint.location,
    ].some((value) => value.toLowerCase().includes(query))
    const matchesFilter = activeFilter === 'All'
      || (activeFilter === 'Pending' && ['Submitted', 'Under Review', 'Reopened'].includes(complaint.status))
      || (activeFilter === 'In Progress' && complaint.status === 'In Progress')
      || (activeFilter === 'Completed' && complaint.status === 'Resolved')
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    if (!notice) return undefined
    const timeoutId = window.setTimeout(() => setNotice(''), 4000)
    return () => window.clearTimeout(timeoutId)
  }, [notice])

  function handleLogout(event) {
    event.preventDefault()
    logoutDemoUser()
    window.location.href = '/login'
  }

  function performWorkAction(complaint) {
    const accepting = ['Submitted', 'Under Review', 'Reopened'].includes(complaint.status)
    const expectedStatus = accepting ? 'In Progress' : 'Resolved'
    try {
      const updated = updateComplaint(
        complaint.id,
        { status: expectedStatus },
        {
          actor: 'worker',
          title: accepting
            ? (complaint.status === 'Reopened'
              ? 'Worker accepted reopened complaint'
              : 'Worker accepted the complaint')
            : 'Work marked as completed',
          description: accepting
            ? `${workerName} accepted the assigned work for ${complaint.department}.`
            : `${workerName} marked the assigned work as completed.`,
        },
      )
      if (updated) setNotice(`Complaint ${complaint.id} is now ${updated.status}.`)
    } catch (error) {
      if (!(error instanceof ComplaintStorageError)) throw error
      setNotice('This update could not be saved in browser storage. Please try again.')
    }
  }

  const headingDate = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <div className="worker-page">
      <header className="worker-header">
        <div className="worker-header-inner">
          <div className="worker-header-leading">
            <button
              className="worker-menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close worker navigation' : 'Open worker navigation'}
              aria-expanded={menuOpen}
              aria-controls="worker-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
            <WorkerBrand />
            <span className="worker-portal-label">Field Operations</span>
          </div>
          <nav className={`worker-navigation${menuOpen ? ' worker-navigation-open' : ''}`} id="worker-navigation" aria-label="Worker navigation">
            <a className="worker-nav-active" href="#worker-overview" aria-current="page" onClick={() => setMenuOpen(false)}>Dashboard</a>
            <a href="#assigned-complaints" onClick={() => { setActiveFilter('All'); setMenuOpen(false) }}>Assigned Complaints</a>
            <a href="#assigned-complaints" onClick={() => { setActiveFilter('Completed'); setMenuOpen(false) }}>Completed</a>
            <a href="#worker-profile" onClick={() => setMenuOpen(false)}>Profile</a>
            <a className="worker-nav-logout" href="/login" onClick={handleLogout}>Logout</a>
          </nav>
          <span className="worker-profile-chip">
            <span aria-hidden="true">{workerName.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
            <span>{workerName}</span>
          </span>
        </div>
      </header>

      <main className="worker-main" id="worker-overview">
        <div className="worker-container">
          <div className="worker-date-line"><span>{headingDate}</span><span className="worker-online"><i aria-hidden="true" /> On duty</span></div>
          <section className="worker-welcome" aria-labelledby="worker-title">
            <div>
              <span className="worker-eyebrow">MUNICIPAL FIELD OPERATIONS</span>
              <h1 id="worker-title">Good morning, {workerName} <span aria-hidden="true">👋</span></h1>
              <p>Here are the complaints currently assigned to you.</p>
            </div>
            <a className="worker-welcome-link" href="#assigned-complaints">
              <span aria-hidden="true">⌖</span>
              <span><strong>{assignedComplaints.length} assigned</strong><small>View your work queue</small></span>
              <span aria-hidden="true">→</span>
            </a>
          </section>

          <section className="worker-stats-grid" aria-label="My work statistics">
            {stats.map((stat) => (
              <article className={`worker-stat-card worker-stat-${stat.kind}`} key={stat.kind}>
                <div className="worker-stat-top">
                  <span className="worker-stat-icon" aria-hidden="true">{stat.icon}</span>
                  <span className="worker-stat-label">{stat.label}</span>
                </div>
                <strong>{stat.value}</strong>
                <p>{stat.note}</p>
              </article>
            ))}
          </section>

          <section className="worker-queue-panel" id="assigned-complaints" aria-labelledby="assigned-title">
            <div className="worker-queue-heading">
              <div>
                <span className="worker-eyebrow">YOUR SERVICE QUEUE</span>
                <h2 id="assigned-title">Assigned Complaints</h2>
                <p>Review issue details and keep citizens informed as work progresses.</p>
              </div>
              <span className="worker-queue-count">{visibleComplaints.length} {visibleComplaints.length === 1 ? 'complaint' : 'complaints'}</span>
            </div>

            <div className="worker-tools">
              <label className="worker-search">
                <span className="visually-hidden">Search assigned complaints</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path d="m16 16 5 5" />
                </svg>
                <input
                  type="search"
                  placeholder="Search ID, issue, or location"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <div className="worker-filter-tabs" role="group" aria-label="Filter assigned complaints">
                {filters.map((filter) => (
                  <button
                    className={activeFilter === filter ? 'worker-filter-active' : ''}
                    type="button"
                    aria-pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                    key={filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {visibleComplaints.length ? (
              <div className="worker-complaint-list">
                {visibleComplaints.map((complaint) => (
                  <article className={`worker-complaint-card${selectedId === complaint.id ? ' worker-complaint-selected' : ''}`} key={complaint.id}>
                    <span className={`worker-issue-symbol worker-issue-${statusKind(complaint.status)}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 18h16M7 18l2-12h6l2 12M10 8h4M9 13h6" />
                      </svg>
                    </span>
                    <div className="worker-complaint-copy">
                      <span className="worker-complaint-category">{complaint.category}</span>
                      <h3>{complaint.title}</h3>
                      <p><span>{complaint.id}</span><span aria-hidden="true">·</span><span>{complaint.location}</span></p>
                    </div>
                    <div className="worker-complaint-meta">
                      <span className={`worker-priority priority-${complaint.priority.toLowerCase()}`}><i aria-hidden="true" />{complaint.priority}</span>
                      <span className={`worker-status status-${statusKind(complaint.status)}`}><i aria-hidden="true" />{complaint.status}</span>
                    </div>
                    <div className="worker-complaint-department">
                      <span>Department</span><strong>{complaint.department}</strong>
                    </div>
                    <div className="worker-complaint-date">
                      <span>Submitted</span><strong>{formatComplaintDate(complaint.submittedAt)}</strong>
                    </div>
                    <button
                      className="worker-view-button"
                      type="button"
                      aria-pressed={selectedId === complaint.id}
                      onClick={() => setSelectedId(selectedId === complaint.id ? null : complaint.id)}
                    >
                      {selectedId === complaint.id ? 'Hide details' : 'View Details'} <span aria-hidden="true">→</span>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="worker-empty-state" role="status">
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M4 19h16M6 19V8l6-4 6 4v11M9 12h6M9 15h6" /></svg>
                </span>
                <h3>{assignedComplaints.length ? 'No complaints match these filters' : 'No complaints assigned yet'}</h3>
                <p>{assignedComplaints.length ? 'Try a different search or select another status.' : 'New work will appear here when a complaint is assigned to your worker account.'}</p>
                {assignedComplaints.length > 0 && (
                  <button type="button" onClick={() => { setSearch(''); setActiveFilter('All') }}>Clear filters</button>
                )}
              </div>
            )}
          </section>

          {selectedComplaint && (
            <section className="worker-detail-panel" aria-labelledby="worker-detail-title">
              <div className="worker-detail-heading">
                <div>
                  <span className="worker-eyebrow">FIELD TASK DETAILS</span>
                  <h2 id="worker-detail-title">{selectedComplaint.title}</h2>
                  <span className="worker-detail-id">{selectedComplaint.id}</span>
                </div>
                <span className={`worker-status status-${statusKind(selectedComplaint.status)}`}><i aria-hidden="true" />{selectedComplaint.status}</span>
              </div>

              <p className="worker-detail-description">{selectedComplaint.description}</p>

              <dl className="worker-detail-facts">
                <div><dt>Category</dt><dd>{selectedComplaint.category}</dd></div>
                <div><dt>Location</dt><dd>{selectedComplaint.location}</dd></div>
                <div><dt>Priority</dt><dd><span className={`worker-priority priority-${selectedComplaint.priority.toLowerCase()}`}><i aria-hidden="true" />{selectedComplaint.priority}</span></dd></div>
                <div><dt>Department</dt><dd>{selectedComplaint.department}</dd></div>
                <div><dt>Assigned worker</dt><dd>{workerName}</dd></div>
                <div><dt>Submitted</dt><dd>{formatComplaintDate(selectedComplaint.submittedAt)}</dd></div>
              </dl>

              <div className="worker-detail-bottom">
                <div className="worker-activity">
                  <h3>Activity history</h3>
                  {selectedComplaint.updates.length ? (
                    <ol>
                      {[...selectedComplaint.updates]
                        .sort((first, second) => second.timestamp.localeCompare(first.timestamp))
                        .map((update) => (
                          <li key={update.id}>
                            <span className="worker-activity-marker" aria-hidden="true">•</span>
                            <span><strong>{update.title}</strong><small>{formatComplaintDate(update.timestamp)}{update.actor ? ` · ${update.actor}` : ''}</small><span>{update.description}</span></span>
                          </li>
                        ))}
                    </ol>
                  ) : <p>No activity has been recorded yet.</p>}
                </div>

                <div className="worker-task-actions">
                  {selectedComplaint.status === 'Resolved' ? (
                    <div className="worker-completed-notice" role="status">
                      <span aria-hidden="true">✓</span>
                      <span><strong>Work completed</strong><small>This task has been marked resolved.</small></span>
                    </div>
                  ) : (
                    <button className="worker-action-button" type="button" onClick={() => performWorkAction(selectedComplaint)}>
                      {selectedComplaint.status === 'In Progress'
                        ? 'Mark Completed'
                        : selectedComplaint.status === 'Reopened'
                          ? 'Start Work'
                          : 'Accept Task'}
                      <span aria-hidden="true">{selectedComplaint.status === 'In Progress' ? '✓' : '→'}</span>
                    </button>
                  )}
                  <a className="worker-citizen-details-link" href={`/complaints/${encodeURIComponent(selectedComplaint.id)}`}>
                    Open citizen tracking view <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </section>
          )}

          {notice && <div className="worker-toast" role="status"><span aria-hidden="true">✓</span>{notice}</div>}
        </div>
      </main>

      <footer className="worker-footer" id="worker-profile">
        <WorkerBrand />
        <span>City services, working together.</span>
        <a href="/login" onClick={handleLogout}>Sign out</a>
      </footer>
    </div>
  )
}

export default WorkerDashboard
