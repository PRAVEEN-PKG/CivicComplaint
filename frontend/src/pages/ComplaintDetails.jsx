import { useEffect, useRef, useState } from 'react'

const complaintRecords = {
  'CC-2026-00124': {
    id: 'CC-2026-00124',
    title: 'Large pothole near Main Road',
    category: 'Road Damage',
    submitted: 'Oct 2, 2026 · 9:42 AM',
    location: 'Main Road, Sector 5',
    status: 'In Progress',
    priority: 'High',
    description: 'A deep pothole has formed near the Main Road crossing and is creating a hazard for people driving and cycling through the area. It becomes difficult to see after sunset.',
    department: 'Roads & Infrastructure',
    worker: 'Ravi Kumar · Field response team',
    eta: 'Estimated resolution: Oct 6–8, 2026',
    photo: true,
    timeline: [
      { title: 'Complaint Submitted', date: 'Oct 2 · 9:42 AM', description: 'Your report was received and added to the city service queue.', state: 'complete' },
      { title: 'Under Review', date: 'Oct 2 · 11:15 AM', description: 'The municipal team verified the location and issue details.', state: 'complete' },
      { title: 'Assigned / In Progress', date: 'Oct 3 · 8:30 AM', description: 'A road inspection and repair crew has been assigned.', department: 'Roads & Infrastructure', state: 'current' },
      { title: 'Resolved', date: 'Awaiting completion', description: 'We will let you know when the repair is complete.', state: 'upcoming' },
    ],
    updates: [
      { title: 'Work in progress', date: 'Oct 4, 2026 · 8:30 AM', description: 'The field crew has inspected the site and scheduled the surface repair.', department: 'Roads & Infrastructure', kind: 'work' },
      { title: 'Assigned to Roads & Infrastructure Department', date: 'Oct 3, 2026 · 8:30 AM', description: 'Your complaint was assigned to the road maintenance team.', department: 'Roads & Infrastructure', kind: 'assigned' },
      { title: 'Complaint reviewed by municipal team', date: 'Oct 2, 2026 · 11:15 AM', description: 'The submitted details were checked and confirmed for follow-up.', department: 'Citizen Service Desk', kind: 'review' },
      { title: 'Complaint submitted successfully', date: 'Oct 2, 2026 · 9:42 AM', description: 'Your report was recorded and is now visible to the service team.', department: '', kind: 'submitted' },
    ],
  },
  'CC-2026-00123': {
    id: 'CC-2026-00123',
    title: 'Streetlight not working',
    category: 'Streetlight',
    submitted: 'Oct 1, 2026 · 6:10 PM',
    location: 'Park Avenue, Sector 4',
    status: 'Pending',
    priority: 'Medium',
    description: 'The streetlight outside the community park has been out for several nights, leaving the walkway difficult to see after dark.',
    department: 'Electrical',
    worker: 'Awaiting assignment',
    eta: 'The electrical team will provide an estimate after initial review.',
    photo: false,
    timeline: [
      { title: 'Complaint Submitted', date: 'Oct 1 · 6:10 PM', description: 'Your report was received and added to the city service queue.', state: 'complete' },
      { title: 'Under Review', date: 'Oct 2 · 9:20 AM', description: 'The municipal team is reviewing the issue details.', state: 'current' },
      { title: 'Assigned / In Progress', date: 'Upcoming', description: 'The electrical team will be assigned after review.', department: 'Electrical', state: 'upcoming' },
      { title: 'Resolved', date: 'Awaiting completion', description: 'We will let you know when the streetlight is working again.', state: 'upcoming' },
    ],
    updates: [
      { title: 'Complaint reviewed by municipal team', date: 'Oct 2, 2026 · 9:20 AM', description: 'Your report is being checked by the local service desk.', department: 'Citizen Service Desk', kind: 'review' },
      { title: 'Complaint submitted successfully', date: 'Oct 1, 2026 · 6:10 PM', description: 'Your report was recorded and is awaiting review.', department: '', kind: 'submitted' },
    ],
  },
  'CC-2026-00122': {
    id: 'CC-2026-00122',
    title: 'Garbage collection issue',
    category: 'Garbage & Waste',
    submitted: 'Sep 27, 2026 · 10:30 AM',
    location: 'Green Park Market Area',
    status: 'Resolved',
    priority: 'High',
    description: 'Waste had accumulated at the market collection point. The collection area needed a scheduled pickup and a thorough cleanup.',
    department: 'Sanitation',
    worker: 'Nisha Rao · Neighborhood sanitation team',
    eta: 'Resolved Oct 1, 2026',
    photo: false,
    timeline: [
      { title: 'Complaint Submitted', date: 'Sep 27 · 10:30 AM', description: 'Your report was received and added to the city service queue.', state: 'complete' },
      { title: 'Under Review', date: 'Sep 27 · 12:05 PM', description: 'The issue was verified and sent to the sanitation team.', state: 'complete' },
      { title: 'Assigned / In Progress', date: 'Sep 28 · 8:40 AM', description: 'A neighborhood cleanup team was scheduled.', department: 'Sanitation', state: 'complete' },
      { title: 'Resolved', date: 'Oct 1 · 4:20 PM', description: 'The collection point was cleared and the pickup schedule confirmed.', state: 'complete' },
    ],
    updates: [
      { title: 'Resolution submitted', date: 'Oct 1, 2026 · 4:20 PM', description: 'The team cleared the area and confirmed the next scheduled collection.', department: 'Sanitation', kind: 'resolved' },
      { title: 'Field worker assigned', date: 'Sep 28, 2026 · 8:40 AM', description: 'Nisha Rao and the neighborhood team were assigned to the cleanup.', department: 'Sanitation', kind: 'assigned' },
      { title: 'Complaint reviewed by municipal team', date: 'Sep 27, 2026 · 12:05 PM', description: 'The collection point was verified for service.', department: 'Citizen Service Desk', kind: 'review' },
      { title: 'Complaint submitted successfully', date: 'Sep 27, 2026 · 10:30 AM', description: 'Your report was recorded for review.', department: '', kind: 'submitted' },
    ],
  },
  'CC-2026-00121': {
    id: 'CC-2026-00121',
    title: 'Water leakage on road',
    category: 'Water Leakage',
    submitted: 'Sep 27, 2026 · 1:18 PM',
    location: 'Station Road',
    status: 'In Progress',
    priority: 'Critical',
    description: 'Water is continuously leaking from a roadside pipe, creating a slippery surface and wasting clean water near the station entrance.',
    department: 'Water Supply',
    worker: 'Imran Khan · Emergency repair crew',
    eta: 'Estimated resolution: Oct 5, 2026',
    photo: false,
    timeline: [
      { title: 'Complaint Submitted', date: 'Sep 27 · 1:18 PM', description: 'Your report was received and added to the city service queue.', state: 'complete' },
      { title: 'Under Review', date: 'Sep 27 · 1:45 PM', description: 'The water service desk confirmed an active leak.', state: 'complete' },
      { title: 'Assigned / In Progress', date: 'Sep 27 · 2:05 PM', description: 'An urgent repair crew is working to isolate the leak.', department: 'Water Supply', state: 'current' },
      { title: 'Resolved', date: 'Awaiting completion', description: 'The repair team will confirm when the leak is stopped.', state: 'upcoming' },
    ],
    updates: [
      { title: 'Work in progress', date: 'Oct 4, 2026 · 10:00 AM', description: 'The repair team is replacing a damaged pipe section.', department: 'Water Supply', kind: 'work' },
      { title: 'Field worker assigned', date: 'Sep 27, 2026 · 2:05 PM', description: 'An emergency repair crew was dispatched to the location.', department: 'Water Supply', kind: 'assigned' },
      { title: 'Complaint reviewed by municipal team', date: 'Sep 27, 2026 · 1:45 PM', description: 'The active leak was confirmed and marked urgent.', department: 'Water Supply', kind: 'review' },
      { title: 'Complaint submitted successfully', date: 'Sep 27, 2026 · 1:18 PM', description: 'Your report was recorded and sent for urgent review.', department: '', kind: 'submitted' },
    ],
  },
  'CC-2026-00125': {
    id: 'CC-2026-00125',
    title: 'Blocked storm drain after rainfall',
    category: 'Drainage',
    submitted: 'Oct 3, 2026 · 7:25 AM',
    location: 'Cedar Street, Ward 8',
    status: 'Under Review',
    priority: 'Medium',
    description: 'Rainwater is pooling beside the crosswalk because the storm drain appears to be blocked with leaves and debris.',
    department: 'Roads & Infrastructure',
    worker: 'Awaiting assignment',
    eta: 'A response estimate will be shared after inspection.',
    photo: true,
    timeline: [
      { title: 'Complaint Submitted', date: 'Oct 3 · 7:25 AM', description: 'Your report was received and added to the city service queue.', state: 'complete' },
      { title: 'Under Review', date: 'Oct 3 · 9:10 AM', description: 'The service desk is confirming the location and drainage details.', state: 'current' },
      { title: 'Assigned / In Progress', date: 'Upcoming', description: 'A field team will be assigned following review.', department: 'Roads & Infrastructure', state: 'upcoming' },
      { title: 'Resolved', date: 'Awaiting completion', description: 'We will update you when the drain is clear.', state: 'upcoming' },
    ],
    updates: [
      { title: 'Complaint reviewed by municipal team', date: 'Oct 3, 2026 · 9:10 AM', description: 'The service desk is checking the reported location.', department: 'Citizen Service Desk', kind: 'review' },
      { title: 'Complaint submitted successfully', date: 'Oct 3, 2026 · 7:25 AM', description: 'Your report was recorded for review.', department: '', kind: 'submitted' },
    ],
  },
}

function ComplaintDetailsBrand() {
  return (
    <a className="dashboard-brand details-brand" href="/" aria-label="CivicComplaint home">
      <span className="dashboard-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
          <path d="M12 11h4" />
        </svg>
      </span>
      <span>Civic<span>Complaint</span></span>
    </a>
  )
}

function LocationIllustration() {
  return (
    <svg className="details-map-illustration" viewBox="0 0 700 190" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-20 53 130 90l110-58 117 42 95-57 112 48 160-37M-10 151l144-38 100 40 124-59 106 37 112-62 136 38" />
      <path d="m92-10 44 70-36 62 51 86M287-10l-26 54 55 45-32 57 49 57M507-10l-8 53 45 59-31 98M652-10l-42 57 22 70-37 74" />
      <path className="details-map-greenway" d="M-10 125c100-56 147 40 255-6s145-57 235-5 126 21 231-42" />
    </svg>
  )
}

function ComplaintPhoto() {
  return (
    <svg className="details-photo-art" viewBox="0 0 640 300" role="img" aria-label="Illustration of a road surface and a pothole near a neighborhood street">
      <defs>
        <linearGradient id="road-photo-sky" x1="320" y1="0" x2="320" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dcebe1" />
          <stop offset="1" stopColor="#edf2e9" />
        </linearGradient>
      </defs>
      <path fill="url(#road-photo-sky)" d="M0 0h640v195H0z" />
      <circle cx="514" cy="57" r="26" fill="#f0dba4" />
      <path d="M0 171c82-29 135-24 210-4 73 19 142 16 217-9 69-23 138-19 213 4v48H0v-39Z" fill="#a9c6ad" />
      <path d="M40 170V96h66v85M54 109h13v17H54zM79 109h13v17H79zM54 139h13v17H54zM79 139h13v17H79z" fill="#91ad9a" />
      <path d="M123 164V74h80v102M138 91h17v22h-17zM170 91h17v22h-17zM138 129h17v22h-17zM170 129h17v22h-17z" fill="#91a99b" />
      <path d="M0 211h640v89H0z" fill="#64776f" />
      <path d="M0 230h640M0 282h640" stroke="#85958a" strokeWidth="2" />
      <path d="M0 256h131M509 256h131" stroke="#e8dfbd" strokeWidth="4" strokeDasharray="17 14" />
      <path d="M278 239c15-7 35-8 50 0 14 7 28 19 49 20-9 14-24 19-45 18-22 0-40-5-62-2-15 2-25-4-28-13 7-13 18-18 36-23Z" fill="#364843" />
      <path d="M287 249c14-5 30-6 44 0 10 5 19 12 31 14-13 8-25 9-42 7-17-2-31-5-49-3-8 0-13-2-16-6 8-6 18-10 32-12Z" fill="#263a35" />
      <path d="M215 220h210" stroke="#d6d8c9" strokeWidth="2" strokeDasharray="5 7" />
    </svg>
  )
}

function ComplaintDetails({ complaintId }) {
  const [complaint, setComplaint] = useState(() => complaintRecords[complaintId] || null)
  const [notice, setNotice] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!supportOpen) return undefined

    dialogRef.current?.focus()
    function closeOnEscape(event) {
      if (event.key === 'Escape') setSupportOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [supportOpen])

  function downloadComplaint() {
    if (!complaint) return
    const report = [
      `CivicComplaint report ${complaint.id}`,
      `Title: ${complaint.title}`,
      `Category: ${complaint.category}`,
      `Status: ${complaint.status}`,
      `Priority: ${complaint.priority}`,
      `Location: ${complaint.location}`,
      `Submitted: ${complaint.submitted}`,
      `Department: ${complaint.department}`,
      '',
      complaint.description,
    ].join('\n')
    const url = URL.createObjectURL(new Blob([report], { type: 'text/plain' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${complaint.id}.txt`
    link.click()
    URL.revokeObjectURL(url)
    setNotice('A local copy of the complaint summary was downloaded.')
  }

  function reopenComplaint() {
    setComplaint((current) => ({
      ...current,
      status: 'Reopened',
      timeline: current.timeline.map((stage, index) => ({
        ...stage,
        state: index === 0 ? 'complete' : index === 1 ? 'current' : 'upcoming',
        date: index === 1 ? 'Just now · Reopened for follow-up' : stage.date,
      })),
      updates: [
        {
          title: 'Complaint reopened for follow-up',
          date: 'Just now',
          description: 'Your request to revisit this resolved issue was recorded locally.',
          department: 'Citizen Service Desk',
          kind: 'review',
        },
        ...current.updates,
      ],
    }))
    setNotice('Complaint reopened for follow-up. This demo update is only stored on this page.')
  }

  if (!complaint) {
    return (
      <div className="dashboard-page complaint-details-page">
        <header className="dashboard-header">
          <nav className="dashboard-nav dashboard-container" aria-label="Complaint navigation">
            <ComplaintDetailsBrand />
            <a className="details-back-button" href="/dashboard">← Back to Dashboard</a>
          </nav>
        </header>
        <main className="dashboard-container details-not-found">
          <span className="details-not-found-icon" aria-hidden="true">?</span>
          <span className="dashboard-eyebrow">CITIZEN PORTAL</span>
          <h1>Complaint not found</h1>
          <p>We couldn't find a complaint with that reference. Check the complaint ID or return to your dashboard.</p>
          <a className="dashboard-primary-button" href="/dashboard">Back to Dashboard</a>
        </main>
      </div>
    )
  }

  const currentStage = complaint.status === 'Resolved'
    ? 3
    : complaint.status === 'In Progress'
      ? 2
      : complaint.status === 'Under Review' || complaint.status === 'Reopened'
        ? 1
        : 1

  return (
    <div className="dashboard-page complaint-details-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav dashboard-container" aria-label="Complaint navigation">
          <ComplaintDetailsBrand />
          <button
            className="dashboard-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Close complaint menu' : 'Open complaint menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="complaint-details-nav"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span /><span /><span />
          </button>
          <div className={`details-header-links${mobileMenuOpen ? ' details-header-links-open' : ''}`} id="complaint-details-nav">
            <a href="/dashboard">Dashboard</a>
            <a href="/dashboard#recent-complaints">My Complaints</a>
            <a className="details-nav-report" href="/complaints/new">Report Complaint</a>
            <a className="details-back-button" href="/dashboard">← Back to Dashboard</a>
          </div>
        </nav>
      </header>

      <main className="dashboard-container complaint-details-main">
        <div className="details-breadcrumb">
          <a href="/dashboard">Dashboard</a><span aria-hidden="true">/</span><span>Complaint details</span>
        </div>

        <section className="details-title-row" aria-labelledby="details-title">
          <div>
            <span className="dashboard-eyebrow">COMPLAINT TRACKING</span>
            <h1 id="details-title">{complaint.title}</h1>
            <p className="details-reference">Reference <strong>{complaint.id}</strong></p>
          </div>
          <span className={`details-status-badge details-status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
            <i aria-hidden="true" />{complaint.status}
          </span>
        </section>

        <div className="details-main-grid">
          <div className="details-primary-column">
            <section className="details-panel details-progress-panel" aria-labelledby="progress-title">
              <div className="details-panel-heading">
                <div>
                  <span className="dashboard-eyebrow">LIVE PROGRESS</span>
                  <h2 id="progress-title">Your report, step by step</h2>
                </div>
                <span className="details-updated-label"><span aria-hidden="true" /> Updates as work progresses</span>
              </div>
              <ol className="details-progress-track">
                {complaint.timeline.map((stage, index) => {
                  const state = stage.state === 'complete' ? 'complete' : index === currentStage ? 'current' : stage.state
                  return (
                    <li className={`details-progress-step step-${state}`} key={stage.title}>
                      <span className="details-progress-marker" aria-hidden="true">
                        {state === 'complete' ? '✓' : index + 1}
                      </span>
                      <span className="details-step-copy">
                        <strong>{stage.title}</strong>
                        <small>{stage.date}</small>
                        <span>{stage.description}</span>
                        {stage.department && <em>{stage.department}</em>}
                      </span>
                    </li>
                  )
                })}
              </ol>
            </section>

            <section className="details-panel details-summary-panel" aria-labelledby="summary-title">
              <div className="details-panel-heading">
                <div>
                  <span className="dashboard-eyebrow">REPORT INFORMATION</span>
                  <h2 id="summary-title">Complaint summary</h2>
                </div>
                <span className={`details-priority priority-${complaint.priority.toLowerCase()}`}>
                  <i aria-hidden="true" />{complaint.priority} priority
                </span>
              </div>

              <div className="details-summary-facts">
                <div>
                  <span>Category</span>
                  <strong>{complaint.category}</strong>
                </div>
                <div>
                  <span>Submitted</span>
                  <strong>{complaint.submitted}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{complaint.location}</strong>
                </div>
                <div>
                  <span>Assigned department</span>
                  <strong>{complaint.department}</strong>
                </div>
              </div>
              <div className="details-description">
                <h3>Description</h3>
                <p>{complaint.description}</p>
              </div>

              {complaint.photo ? (
                <div className="details-photo">
                  <ComplaintPhoto />
                  <span><strong>Issue location photo</strong><small>Citizen-submitted reference image · Demo preview</small></span>
                </div>
              ) : (
                <div className="details-no-photo">
                  <span aria-hidden="true">▧</span>
                  <span><strong>No photo attached</strong><small>Additional photos can be included when submitting a report.</small></span>
                </div>
              )}
            </section>

            <section className="details-panel details-updates-panel" aria-labelledby="updates-title">
              <div className="details-panel-heading">
                <div>
                  <span className="dashboard-eyebrow">SERVICE ACTIVITY</span>
                  <h2 id="updates-title">Updates & activity</h2>
                </div>
                <span className="details-update-count">{complaint.updates.length} updates</span>
              </div>
              <ol className="details-activity-list">
                {complaint.updates.map((update, index) => (
                  <li className="details-activity-item" key={`${update.title}-${update.date}`}>
                    <span className={`details-activity-icon activity-${update.kind}`} aria-hidden="true">
                      {index === 0 && complaint.status === 'Resolved' ? '✓' : '•'}
                    </span>
                    <span className="details-activity-copy">
                      <strong>{update.title}</strong>
                      <small>{update.date}</small>
                      <span>{update.description}</span>
                      {update.department && <em>{update.department}</em>}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="details-sidebar">
            <section className="details-panel details-assignment-panel" aria-labelledby="assignment-title">
              <span className="details-assignment-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M8 10h.01M16 10h.01" />
                </svg>
              </span>
              <span className="dashboard-eyebrow">YOUR SERVICE TEAM</span>
              <h2 id="assignment-title">{complaint.department}</h2>
              <div className="details-assigned-worker">
                <span className="details-worker-avatar" aria-hidden="true">{complaint.worker === 'Awaiting assignment' ? '—' : complaint.worker.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span>
                <span><strong>{complaint.worker}</strong><small>Assigned response team</small></span>
              </div>
              <div className="details-eta">
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </span>
                <span><small>Resolution estimate</small><strong>{complaint.eta.replace('Estimated resolution: ', '').replace('Resolved ', '')}</strong></span>
              </div>
              <p className="details-eta-note">{complaint.eta}</p>
            </section>

            <section className="details-panel details-location-panel" aria-labelledby="location-title">
              <div className="details-panel-heading">
                <div>
                  <span className="dashboard-eyebrow">REPORTED AREA</span>
                  <h2 id="location-title">Location</h2>
                </div>
              </div>
              <div className="details-map-placeholder" role="img" aria-label={`Map preview for ${complaint.location}; this is not a live map`}>
                <LocationIllustration />
                <span className="details-map-marker" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span className="details-map-label">Approximate area</span>
              </div>
              <p className="details-address">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {complaint.location}
              </p>
              <small className="details-map-note">Map preview only · Exact location details are shared with the assigned team.</small>
            </section>

            <section className="details-panel details-actions-panel" aria-labelledby="actions-title">
              <span className="dashboard-eyebrow">NEED HELP?</span>
              <h2 id="actions-title">Complaint actions</h2>
              <button className="details-action-button" type="button" onClick={() => setSupportOpen(true)}>
                <span className="details-action-icon" aria-hidden="true">?</span>
                Contact citizen support
                <span aria-hidden="true">→</span>
              </button>
              <button className="details-action-button" type="button" onClick={downloadComplaint}>
                <span className="details-action-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v12M7 10l5 5 5-5M4 20h16" /></svg>
                </span>
                Download report summary
                <span aria-hidden="true">↓</span>
              </button>
              {complaint.status === 'Resolved' && (
                <button className="details-reopen-button" type="button" onClick={reopenComplaint}>
                  Reopen complaint
                </button>
              )}
              {notice && <p className="details-action-notice" role="status">{notice}</p>}
              <p className="details-demo-note">Actions on this demo page do not contact a service or update a database.</p>
            </section>
          </aside>
        </div>
      </main>

      <footer className="dashboard-footer details-footer">
        <div className="dashboard-container">
          <ComplaintDetailsBrand />
          <p>Working together for cleaner, safer, stronger communities.</p>
          <span className="dashboard-footer-copyright">© {new Date().getFullYear()} CivicComplaint · Complaint tracking</span>
        </div>
      </footer>

      {supportOpen && (
        <div
          className="details-support-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSupportOpen(false)
          }}
        >
          <section
            className="details-support-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-dialog-title"
            tabIndex={-1}
            ref={dialogRef}
          >
            <button className="details-support-close" type="button" aria-label="Close support information" onClick={() => setSupportOpen(false)}>×</button>
            <span className="details-support-icon" aria-hidden="true">?</span>
            <span className="dashboard-eyebrow">CITIZEN SUPPORT</span>
            <h2 id="support-dialog-title">We're here to help.</h2>
            <p>For questions about this report, contact the CivicComplaint service desk and include your reference number.</p>
            <div className="details-support-reference">
              <span>Your reference</span><strong>{complaint.id}</strong>
            </div>
            <p className="details-demo-note">Support contact is a prototype placeholder. No message has been sent.</p>
          </section>
        </div>
      )}
    </div>
  )
}

export default ComplaintDetails
