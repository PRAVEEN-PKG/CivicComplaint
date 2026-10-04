import Navbar from '../components/Navbar.jsx'

const steps = [
  {
    number: '01',
    title: 'Report an Issue',
    description: 'Share what needs attention in your neighborhood. Every report helps build a clearer picture.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Authority Reviews',
    description: 'The right city team reviews the details and identifies the next steps.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Problem Gets Resolved',
    description: 'Follow the work as your local authority takes action on the issue.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        <path d="m9 10 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Citizen Verifies',
    description: 'Confirm the improvement and help keep your community moving forward.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 12 2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
]

const features = [
  {
    title: 'Easy Reporting',
    description: 'A straightforward way to let your local government know what needs attention.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Real-time Tracking',
    description: 'Stay informed as a report moves through review and toward resolution.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
        <path d="M3 3v5h5M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Transparent Resolution',
    description: 'Clear updates make it easier to understand what happens after you report.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

function CityIllustration() {
  return (
    <div className="hero-visual" aria-label="Illustration of a resident reporting a neighborhood issue">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-sun" />
      <svg className="city-art" viewBox="0 0 620 450" role="img" aria-labelledby="city-title">
        <title id="city-title">A cleaner, more connected neighborhood</title>
        <path d="M0 351c74-36 146-38 218-9 83 33 146 39 227 4 59-25 117-26 175-10v114H0V351Z" fill="#eaf2ff" />
        <path d="M0 381c91-27 154-20 225 8 66 26 120 22 185-4 71-28 135-27 210-8v73H0v-69Z" fill="#dce9fc" />
        <path d="m102 222 54-43 54 43v131H102V222Z" fill="#d7e5f8" />
        <path d="M91 224h131l-66-54-65 54Z" fill="#7e9cc7" />
        <path d="M121 243h20v27h-20zM159 243h20v27h-20zM121 291h20v27h-20zM159 291h20v27h-20z" fill="#fff" />
        <path d="m208 190 62-49 62 49v163H208V190Z" fill="#b9cdec" />
        <path d="M196 193h148l-74-61-74 61Z" fill="#6887b4" />
        <path d="M231 218h23v29h-23zM287 218h23v29h-23zM231 271h23v29h-23zM287 271h23v29h-23z" fill="#f8fbff" />
        <path d="m357 221 49-39 49 39v132h-98V221Z" fill="#c9d9ef" />
        <path d="M347 224h118l-59-49-59 49Z" fill="#809bc0" />
        <path d="M374 245h17v24h-17zM420 245h17v24h-17zM374 288h17v24h-17zM420 288h17v24h-17z" fill="#fff" />
        <path d="M45 351h530" stroke="#bacbe3" strokeWidth="3" strokeLinecap="round" />
        <path d="M61 349c5-24 20-42 36-42s31 18 36 42" fill="#91b69f" />
        <path d="M98 352v-44" stroke="#668c74" strokeWidth="5" strokeLinecap="round" />
        <path d="M491 351c5-29 20-49 36-49s31 20 36 49" fill="#91b69f" />
        <path d="M528 352v-51" stroke="#668c74" strokeWidth="5" strokeLinecap="round" />
        <path d="M250 352v-24c0-13 10-23 23-23s23 10 23 23v24" fill="#7895bd" />
        <circle cx="273" cy="290" r="10" fill="#f0bf9d" />
        <path d="M261 289c0-11 6-17 14-17 9 0 14 7 14 17-7-3-19-3-28 0Z" fill="#364c6b" />
        <path d="M269 329v-16l-13 7" stroke="#f0bf9d" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m259 319 12-11" stroke="#f0bf9d" strokeWidth="5" strokeLinecap="round" />
        <path d="M278 320h14" stroke="#f0bf9d" strokeWidth="5" strokeLinecap="round" />
        <path d="M260 352v-17M286 352v-17" stroke="#364c6b" strokeWidth="8" strokeLinecap="round" />
        <path d="M139 351v-13M153 351v-13" stroke="#d1a889" strokeWidth="6" strokeLinecap="round" />
        <circle cx="146" cy="331" r="8" fill="#e9b995" />
        <path d="M137 330c1-8 6-12 10-12 7 0 11 5 11 12-7-3-14-3-21 0Z" fill="#40536e" />
        <path d="M134 351v-10c0-7 5-12 12-12s12 5 12 12v10" fill="#5a7fb0" />
        <path d="M470 90h113a13 13 0 0 1 13 13v64a13 13 0 0 1-13 13h-57l-21 19v-19h-35a13 13 0 0 1-13-13v-64a13 13 0 0 1 13-13Z" fill="#fff" stroke="#dce6f2" strokeWidth="2" />
        <circle cx="493" cy="135" r="4" fill="#27a27b" />
        <path d="M506 135h55" stroke="#b4c3d7" strokeWidth="5" strokeLinecap="round" />
        <path d="M489 151h47" stroke="#d5dfeb" strokeWidth="4" strokeLinecap="round" />
        <circle cx="79" cy="136" r="25" fill="#fff" />
        <path d="m68 136 8 8 15-17" stroke="#27a27b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M392 106h47" stroke="#cfdaea" strokeWidth="3" strokeLinecap="round" />
        <path d="M409 94v24" stroke="#cfdaea" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="report-card">
        <span className="report-card-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </span>
        <span className="report-card-copy">
          <strong>Your neighborhood</strong>
          <span>Better, together</span>
        </span>
        <span className="report-card-status" aria-label="Active">
          <span />
        </span>
      </div>
      <span className="visual-caption">A better city starts with you.</span>
    </div>
  )
}

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero-section" id="home">
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span /> YOUR VOICE. YOUR COMMUNITY.</div>
              <h1>REPORT.<br />TRACK.<br /><span>IMPROVE.</span></h1>
              <p className="hero-description">
                Report civic issues in your community, track their progress, and help make your city better.
              </p>
              <div className="hero-actions">
                <a className="button" href="#report">
                  Report a Complaint <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-secondary" href="#how-it-works">
                  <span className="play-icon" aria-hidden="true">▶</span> Track Complaint
                </a>
              </div>
              <div className="hero-note">
                <span className="note-check" aria-hidden="true">✓</span>
                <span>A more responsive community starts here</span>
              </div>
            </div>
            <CityIllustration />
          </div>
          <div className="container trust-strip" aria-label="Platform values">
            <span>BUILT FOR BETTER COMMUNITIES</span>
            <span className="trust-divider" />
            <span>Simple to use</span>
            <span className="trust-dot">·</span>
            <span>Open to everyone</span>
            <span className="trust-dot">·</span>
            <span>Focused on progress</span>
          </div>
        </section>

        <section className="process-section section-padding" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">A CLEAR PATH FORWARD</span>
              <h2>From report to resolution</h2>
              <p>A simple, transparent process that brings citizens and local authorities together.</p>
            </div>
            <div className="steps-grid">
              {steps.map((step) => (
                <article className="step-card" key={step.number}>
                  <div className="step-card-top">
                    <span className="icon-tile">{step.icon}</span>
                    <span className="step-number">{step.number}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section section-padding" id="about">
          <div className="container features-layout">
            <div className="features-intro">
              <span className="section-kicker">MADE FOR EVERY NEIGHBORHOOD</span>
              <h2>Small actions.<br /><span>Meaningful change.</span></h2>
              <p>
                Civic Complaint makes it easier for people and local authorities to work together on the things that make a community feel like home.
              </p>
              <a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">→</span></a>
            </div>
            <div className="feature-list">
              {features.map((feature, index) => (
                <article className="feature-card" key={feature.title}>
                  <span className={`feature-icon feature-icon-${index + 1}`}>{feature.icon}</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                  <span className="feature-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" id="report">
          <div className="container cta-inner">
            <div>
              <span className="section-kicker">LET'S MAKE THINGS BETTER</span>
              <h2>Your community is worth showing up for.</h2>
              <p>Be part of a more connected, responsive neighborhood.</p>
            </div>
            <a className="button button-light" href="#how-it-works">
              Get started <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="login">
        <div className="container footer-main">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 28 28" fill="none">
                  <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
                  <path d="M12 11h4" />
                </svg>
              </span>
              <span className="brand-name">Civic<span>Complaint</span></span>
            </a>
            <p>Working together for cleaner, safer, stronger communities.</p>
          </div>
          <div className="footer-links">
            <div>
              <h2>Explore</h2>
              <a href="#home">Home</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#about">About</a>
            </div>
            <div>
              <h2>Get involved</h2>
              <a href="#report">Report an issue</a>
              <a href="#how-it-works">Track a complaint</a>
              <a href="#login">Citizen access</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Civic Complaint. A better community starts together.</span>
          <span className="footer-note">Designed for citizens. Built for progress.</span>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
