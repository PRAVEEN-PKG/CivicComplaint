import { useEffect, useRef, useState } from 'react'
import {
  ComplaintStorageError,
  formatComplaintDate,
  updateComplaint,
  useComplaints,
} from '../data/complaints.js'

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

function complaintProgress(complaint) {
  const stageStatuses = ['Submitted', 'Under Review', 'In Progress', 'Resolved']
  const activeIndex = complaint.status === 'Reopened'
    ? 1
    : Math.max(0, stageStatuses.indexOf(complaint.status))
  const sortedUpdates = [...complaint.updates].sort(
    (first, second) => second.timestamp.localeCompare(first.timestamp),
  )

  return stageStatuses.map((status, index) => {
    const matchingUpdate = sortedUpdates.find((update) => update.status === status)
    const current = index === activeIndex
    return {
      title: status === 'In Progress' ? 'Assigned / In Progress' : status,
      date: index > activeIndex
        ? 'Awaiting update'
        : matchingUpdate
          ? formatComplaintDate(matchingUpdate.timestamp)
          : formatComplaintDate(complaint.submittedAt),
      description: current
        ? `Current status: ${complaint.status}. ${complaint.description}`
        : status === 'Submitted'
          ? 'Your report was received and added to the city service queue.'
          : status === 'Under Review'
            ? 'The municipal team is checking the report details.'
            : status === 'In Progress'
              ? 'The assigned service team is working on the reported issue.'
              : 'The service team has completed the reported work.',
      department: status === 'In Progress' && index <= activeIndex ? complaint.department : '',
      state: index < activeIndex ? 'complete' : current ? 'current' : 'upcoming',
    }
  })
}

function ComplaintDetails({ complaintId }) {
  const complaints = useComplaints()
  const complaint = complaints.find((item) => item.id === complaintId) || null
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
      `Submitted: ${formatComplaintDate(complaint.submittedAt)}`,
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
    try {
      const updated = updateComplaint(complaint.id, { status: 'Reopened' })
      if (updated) setNotice('Complaint reopened for follow-up. The update is saved in this browser.')
    } catch (error) {
      if (!(error instanceof ComplaintStorageError)) throw error
      setNotice('The complaint could not be reopened because browser storage is unavailable. Please try again.')
    }
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

  const timeline = complaintProgress(complaint)
  const updates = [...complaint.updates].sort(
    (first, second) => second.timestamp.localeCompare(first.timestamp),
  )

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
                {timeline.map((stage, index) => {
                  const state = stage.state
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
                  <strong>{formatComplaintDate(complaint.submittedAt)}</strong>
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

              {complaint.image ? (
                <div className="details-photo">
                  <ComplaintPhoto />
                  <span><strong>Issue location photo</strong><small>{complaint.image.name} · Demo preview</small></span>
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
                <span className="details-update-count">{updates.length} updates</span>
              </div>
              <ol className="details-activity-list">
                {updates.map((update, index) => (
                  <li className="details-activity-item" key={update.id}>
                    <span className={`details-activity-icon activity-${update.status === 'Resolved' ? 'resolved' : 'review'}`} aria-hidden="true">
                      {index === 0 && update.status === 'Resolved' ? '✓' : '•'}
                    </span>
                    <span className="details-activity-copy">
                      <strong>{update.title}</strong>
                      <small>{formatComplaintDate(update.timestamp)}</small>
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
                <span className="details-worker-avatar" aria-hidden="true">{complaint.assignedWorker === 'Unassigned' ? '—' : complaint.assignedWorker.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span>
                <span><strong>{complaint.assignedWorker}</strong><small>Assigned response team</small></span>
              </div>
              <div className="details-eta">
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </span>
                <span><small>{complaint.status === 'Resolved' ? 'Resolved on' : 'Latest update'}</small><strong>{formatComplaintDate(updates[0].timestamp)}</strong></span>
              </div>
              <p className="details-eta-note">{complaint.status === 'Resolved' ? 'The assigned department has marked this report complete.' : `Current service team: ${complaint.department}.`}</p>
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
