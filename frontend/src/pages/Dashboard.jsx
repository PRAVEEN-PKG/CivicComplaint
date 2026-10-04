import { useState } from 'react'

const stats = [
  {
    label: 'Total Complaints',
    value: '12',
    detail: 'Across your community',
    kind: 'total',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: 'Pending',
    value: '4',
    detail: 'Awaiting review',
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
    value: '3',
    detail: 'Being worked on',
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
    value: '5',
    detail: 'Community improvements',
    kind: 'resolved',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16.5 9" />
      </svg>
    ),
  },
]

const complaints = [
  {
    category: 'Pothole',
    title: 'Large pothole near Main Road',
    location: 'Main Road, Sector 5',
    date: '2 days ago',
    status: 'In Progress',
    type: 'progress',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 17h18M5 17l2-7h10l2 7M8 10l1-4h6l1 4M4 20h2M18 20h2" />
      </svg>
    ),
  },
  {
    category: 'Streetlight',
    title: 'Streetlight not working',
    location: 'Park Avenue',
    date: '4 days ago',
    status: 'Pending',
    type: 'pending',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3a5 5 0 0 0-3 9v3h6v-3a5 5 0 0 0-3-9ZM9 18h6M10 21h4" />
        <path d="M12 1v1M4.2 4.2l1.4 1.4M19.8 4.2l-1.4 1.4" />
      </svg>
    ),
  },
  {
    category: 'Garbage',
    title: 'Garbage collection issue',
    location: 'Green Park',
    date: '1 week ago',
    status: 'Resolved',
    type: 'resolved',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3" />
      </svg>
    ),
  },
  {
    category: 'Water',
    title: 'Water leakage on road',
    location: 'Station Road',
    date: '1 week ago',
    status: 'Resolved',
    type: 'resolved',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3s6 7.1 6 11a6 6 0 0 1-12 0c0-3.9 6-11 6-11Z" />
        <path d="M9 15a3 3 0 0 0 3 3" />
      </svg>
    ),
  },
]

const quickActions = [
  {
    title: 'Report an Issue',
    description: 'Let your city know what needs attention.',
    href: '/complaints/new',
    kind: 'report',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    title: 'Track My Complaints',
    description: 'Follow updates on your submitted reports.',
    href: '#recent-complaints',
    kind: 'track',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'View Resolved Issues',
    description: 'See the positive changes already made.',
    href: '#recent-complaints',
    kind: 'resolved',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m5 12 4 4L19 6" />
        <path d="M20 12a8 8 0 1 1-4-6.9" />
      </svg>
    ),
  },
]

function BrandMark() {
  return (
    <span className="dashboard-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 28 28" fill="none">
        <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
        <path d="M12 11h4" />
      </svg>
    </span>
  )
}

function ImpactIllustration() {
  return (
    <svg
      className="impact-illustration"
      viewBox="0 0 440 220"
      role="img"
      aria-labelledby="impact-illustration-title"
    >
      <title id="impact-illustration-title">Residents and city workers making their neighborhood better</title>
      <path d="M0 171c76-28 141-20 199 2 72 28 150 10 241-6v53H0v-49Z" fill="#e1eee5" />
      <path d="M21 171V93h64v78M31 106h14v17H31zM59 106h14v17H59zM31 135h14v17H31zM59 135h14v17H59z" fill="#c8dcd0" />
      <path d="m13 94 40-31 40 31H13Z" fill="#739c89" />
      <path d="M105 170V72h82v98M117 88h18v21h-18zM157 88h18v21h-18zM117 125h18v21h-18zM157 125h18v21h-18z" fill="#d3e3d8" />
      <path d="m96 74 50-37 50 37H96Z" fill="#648d7b" />
      <path d="M203 170V105h55v65M214 117h13v16h-13zM236 117h13v16h-13zM214 143h13v16h-13zM236 143h13v16h-13z" fill="#bbd4c6" />
      <path d="M279 170V88h64v82M291 101h14v17h-14zM317 101h14v17h-14zM291 132h14v17h-14zM317 132h14v17h-14z" fill="#d2e2d7" />
      <path d="m270 90 41-31 41 31h-82Z" fill="#739c89" />
      <path d="M365 169c4-27 18-44 34-44s30 17 34 44" fill="#83a98d" />
      <path d="M399 170v-48" stroke="#6c876b" strokeWidth="5" strokeLinecap="round" />
      <path d="M15 178h413" stroke="#aac6b2" strokeWidth="2" />
      <path d="M183 171v-19a13 13 0 0 1 26 0v19M244 171v-19a13 13 0 0 1 26 0v19" fill="#517f6d" />
      <circle cx="196" cy="140" r="8" fill="#d9ad88" />
      <path d="M187 141c0-7 4-11 9-11s9 4 9 11c-5-2-13-2-18 0Z" fill="#334f4b" />
      <circle cx="257" cy="140" r="8" fill="#d9ad88" />
      <path d="M248 141c0-7 4-11 9-11s9 4 9 11c-5-2-13-2-18 0Z" fill="#40545d" />
      <path d="M191 171v-13M202 171v-13M252 171v-13M263 171v-13" stroke="#344e49" strokeWidth="6" strokeLinecap="round" />
      <path d="M143 172h155" stroke="#f7fbf7" strokeWidth="4" strokeDasharray="9 8" />
    </svg>
  )
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav dashboard-container" aria-label="Dashboard navigation">
          <a className="dashboard-brand" href="/" aria-label="CivicComplaint home">
            <BrandMark />
            <span>Civic<span>Complaint</span></span>
          </a>

          <button
            className="dashboard-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close dashboard menu' : 'Open dashboard menu'}
            aria-expanded={menuOpen}
            aria-controls="dashboard-links"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            className={`dashboard-nav-links${menuOpen ? ' dashboard-nav-links-open' : ''}`}
            id="dashboard-links"
          >
            <a className="dashboard-nav-active" href="/dashboard" aria-current="page" onClick={closeMenu}>
              Dashboard
            </a>
            <a href="#recent-complaints" onClick={closeMenu}>My Complaints</a>
            <a className="dashboard-nav-report" href="/complaints/new" onClick={closeMenu}>
              <span aria-hidden="true">+</span> Report Complaint
            </a>
            <a href="/login" onClick={closeMenu}>Profile</a>
            <a className="dashboard-logout" href="/login" onClick={closeMenu}>Logout</a>
          </div>
        </nav>
      </header>

      <main className="dashboard-container dashboard-main">
        <section className="dashboard-welcome" aria-labelledby="dashboard-title">
          <div>
            <span className="dashboard-eyebrow">YOUR CITIZEN PORTAL</span>
            <h1 id="dashboard-title">Good morning, Citizen <span aria-hidden="true">👋</span></h1>
            <p>Help make your city better, one report at a time.</p>
          </div>
          <a className="dashboard-primary-button" href="/complaints/new">
            <span aria-hidden="true">+</span> Report a Complaint
          </a>
        </section>

        <section className="dashboard-stats" aria-label="Complaint statistics">
          {stats.map((stat) => (
            <article className={`dashboard-stat-card stat-${stat.kind}`} key={stat.label}>
              <div className="dashboard-stat-top">
                <span className="dashboard-stat-icon">{stat.icon}</span>
                <span className="dashboard-stat-indicator" aria-hidden="true" />
              </div>
              <strong className="dashboard-stat-value">{stat.value}</strong>
              <h2>{stat.label}</h2>
              <p>{stat.detail}</p>
            </article>
          ))}
        </section>

        <section className="dashboard-quick-section" aria-labelledby="quick-actions-title">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-eyebrow">TAKE THE NEXT STEP</span>
              <h2 id="quick-actions-title">Quick Actions</h2>
            </div>
          </div>
          <div className="dashboard-quick-grid">
            {quickActions.map((action) => (
              <a className={`dashboard-quick-card quick-${action.kind}`} href={action.href} key={action.title}>
                <span className="dashboard-quick-icon">{action.icon}</span>
                <span className="dashboard-quick-copy">
                  <strong>{action.title}</strong>
                  <span>{action.description}</span>
                </span>
                <span className="dashboard-quick-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="dashboard-recent-section" id="recent-complaints" aria-labelledby="recent-title">
          <div className="dashboard-section-heading recent-heading">
            <div>
              <span className="dashboard-eyebrow">YOUR COMMUNITY UPDATES</span>
              <h2 id="recent-title">Recent Complaints</h2>
            </div>
            <a className="dashboard-text-link" href="#recent-complaints">
              View all complaints <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="dashboard-complaint-list">
            {complaints.map((complaint) => (
              <article className="dashboard-complaint-card" key={complaint.title}>
                <span className={`complaint-category-icon complaint-${complaint.type}`}>
                  {complaint.icon}
                </span>
                <div className="complaint-main">
                  <span className="complaint-category">{complaint.category}</span>
                  <h3>{complaint.title}</h3>
                  <p className="complaint-meta">
                    <span className="complaint-location">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {complaint.location}
                    </span>
                    <span className="complaint-meta-dot" aria-hidden="true">·</span>
                    <span>{complaint.date}</span>
                  </p>
                </div>
                <span className={`complaint-status status-${complaint.type}`}>
                  <span className="status-indicator" aria-hidden="true" />
                  {complaint.status}
                </span>
                <a className="complaint-details-link" href="#recent-complaints">
                  View Details <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-lower-grid">
          <article className="dashboard-impact-card" aria-labelledby="impact-title">
            <div className="impact-copy">
              <span className="dashboard-eyebrow">COMMUNITY IN ACTION</span>
              <h2 id="impact-title">Your reports create real impact.</h2>
              <p>Every report helps build a safer, cleaner, more connected city.</p>
              <div className="impact-metrics">
                <div>
                  <strong>12</strong>
                  <span>issues reported</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>issues resolved</span>
                </div>
                <div>
                  <strong>28</strong>
                  <span>hours saved</span>
                </div>
              </div>
            </div>
            <ImpactIllustration />
          </article>

          <aside className="dashboard-help-card">
            <span className="help-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <span className="dashboard-eyebrow">MAKE A DIFFERENCE</span>
            <h2>See something that needs attention?</h2>
            <p>Report it and help improve your neighborhood.</p>
            <a href="/complaints/new" className="dashboard-help-link">
              Report an issue <span aria-hidden="true">→</span>
            </a>
          </aside>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="dashboard-container">
          <a className="dashboard-brand dashboard-footer-brand" href="/">
            <BrandMark />
            <span>Civic<span>Complaint</span></span>
          </a>
          <p>Working together for cleaner, safer, stronger communities.</p>
          <span className="dashboard-footer-copyright">
            © {new Date().getFullYear()} CivicComplaint · Designed for citizens. Built for progress.
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
