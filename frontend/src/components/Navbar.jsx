import { useState } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Civic Complaint home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none">
              <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
              <path d="M12 11h4" />
            </svg>
          </span>
          <span className="brand-name">Civic<span>Complaint</span></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`nav-content${menuOpen ? ' nav-content-open' : ''}`}
          id="primary-navigation"
        >
          <div className="nav-links">
            {links.map((link) => (
              <a href={link.href} key={link.label} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a className="nav-login" href="/login" onClick={closeMenu}>Login</a>
            <a className="button button-small" href="#report" onClick={closeMenu}>
              Report a Complaint
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
