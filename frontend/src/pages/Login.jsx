import { useState } from 'react'
import { loginDemoUser } from '../data/demoAuth.js'

function CivicMark() {
  return (
    <span className="login-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 28 28" fill="none">
        <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
        <path d="M12 11h4" />
      </svg>
    </span>
  )
}

function CityScene() {
  return (
    <svg
      className="login-city-scene"
      viewBox="0 0 720 600"
      role="img"
      aria-labelledby="login-city-title"
      preserveAspectRatio="xMidYMid slice"
    >
      <title id="login-city-title">A thriving city neighborhood at dusk</title>
      <defs>
        <linearGradient id="sky" x1="360" y1="0" x2="360" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#315E73" />
          <stop offset=".56" stopColor="#34746F" />
          <stop offset="1" stopColor="#173D48" />
        </linearGradient>
        <linearGradient id="ground" x1="360" y1="390" x2="360" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#355E5C" />
          <stop offset="1" stopColor="#183A42" />
        </linearGradient>
        <linearGradient id="road" x1="360" y1="443" x2="360" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78908A" />
          <stop offset="1" stopColor="#405E5D" />
        </linearGradient>
      </defs>
      <path fill="url(#sky)" d="M0 0h720v600H0z" />
      <circle cx="547" cy="116" r="63" fill="#D1BA7C" fillOpacity=".19" />
      <circle cx="547" cy="116" r="39" fill="#E8D5A3" fillOpacity=".64" />
      <path d="M0 335c87-38 153-47 229-24 71 21 143 14 218-13 90-32 177-17 273 22v146H0V335Z" fill="#426968" />
      <path d="M36 217h108v213H36z" fill="#2A4E58" />
      <path d="M52 236h19v24H52zM91 236h19v24H91zM52 281h19v24H52zM91 281h19v24H91zM52 326h19v24H52zM91 326h19v24H91z" fill="#D5C98F" fillOpacity=".75" />
      <path d="M146 175h124v267H146z" fill="#355C62" />
      <path d="M161 196h22v30h-22zM203 196h22v30h-22zM161 249h22v30h-22zM203 249h22v30h-22zM161 302h22v30h-22zM203 302h22v30h-22z" fill="#E5D7A8" fillOpacity=".78" />
      <path d="m137 176 71-46 71 46H137Z" fill="#284C55" />
      <path d="M286 245h112v198H286z" fill="#31535A" />
      <path d="M303 264h21v28h-21zM359 264h21v28h-21zM303 315h21v28h-21zM359 315h21v28h-21z" fill="#D9D2A7" fillOpacity=".8" />
      <path d="M421 193h135v250H421z" fill="#31555B" />
      <path d="M440 214h23v31h-23zM486 214h23v31h-23zM532 214h12v31h-12zM440 267h23v31h-23zM486 267h23v31h-23zM532 267h12v31h-12zM440 320h23v31h-23zM486 320h23v31h-23zM532 320h12v31h-12z" fill="#E3D9AF" fillOpacity=".8" />
      <path d="M574 269h98v174h-98z" fill="#284B53" />
      <path d="M591 287h19v26h-19zM630 287h19v26h-19zM591 331h19v26h-19zM630 331h19v26h-19z" fill="#E1D5A6" fillOpacity=".75" />
      <path d="M0 403h720v197H0z" fill="url(#ground)" />
      <path d="M284 404h152l153 196H131l153-196Z" fill="url(#road)" />
      <path d="m351 426-5 29h28l-5-29h-18ZM338 478l-9 43h62l-9-43h-44ZM317 557l-7 31h100l-7-31H317Z" fill="#E4D9AC" fillOpacity=".65" />
      <path d="M0 444h198M0 490h161M522 444h198M557 490h163" stroke="#A4B99D" strokeOpacity=".47" strokeWidth="3" />
      <path d="M61 435c3-32 19-55 37-55s34 23 37 55" fill="#517A61" />
      <path d="M98 437v-69" stroke="#A6845B" strokeWidth="7" strokeLinecap="round" />
      <path d="M581 435c3-29 18-49 34-49s31 20 34 49" fill="#517A61" />
      <path d="M615 437v-63" stroke="#A6845B" strokeWidth="7" strokeLinecap="round" />
      <path d="M202 436v-23a14 14 0 0 1 28 0v23M472 436v-23a14 14 0 0 1 28 0v23" fill="#D2B775" />
      <path d="M209 436v-14M223 436v-14M479 436v-14M493 436v-14" stroke="#314A4D" strokeWidth="3" />
      <path d="M265 412h24v31h-24zM432 412h24v31h-24z" fill="#28464D" />
      <path d="M40 487h42M38 505h62M635 483h38M618 502h60" stroke="#D2B775" strokeOpacity=".65" strokeWidth="3" strokeLinecap="round" />
      <path d="M0 574h720" stroke="#9BB3A0" strokeOpacity=".38" strokeWidth="2" />
    </svg>
  )
}

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const session = loginDemoUser(formData.get('email'), formData.get('password'))

    if (!session) {
      setNotice('The email address or password is incorrect. Check your details and try again.')
      return
    }

    const destinationByRole = {
      citizen: '/dashboard',
      admin: '/admin',
      worker: '/worker',
    }
    window.location.href = destinationByRole[session.role]
  }

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="CivicComplaint community">
        <CityScene />
        <div className="login-visual-overlay" />
        <a className="login-brand" href="/" aria-label="CivicComplaint home">
          <CivicMark />
          <span>Civic<span>Complaint</span></span>
        </a>
        <div className="login-visual-copy">
          <span className="login-kicker"><span /> BETTER CITIES, TOGETHER</span>
          <h1>A better city<br />starts with you.</h1>
          <p>Report. Track. Resolve.</p>
          <span className="login-visual-rule" />
          <span className="login-visual-caption">Your voice can make a difference in your community.</span>
        </div>
        <span className="login-visual-credit">A more connected community begins with one conversation.</span>
      </section>

      <section className="login-form-side" aria-labelledby="login-heading">
        <a className="login-mobile-brand" href="/" aria-label="CivicComplaint home">
          <CivicMark />
          <span>Civic<span>Complaint</span></span>
        </a>
        <div className="login-form-wrap">
          <div className="login-welcome">
            <span className="login-form-kicker">CITIZEN PORTAL</span>
            <h2 id="login-heading">Welcome back</h2>
            <p>Sign in to continue making a difference in your community.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                onChange={() => setNotice('')}
                required
              />
            </div>

            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="login-password">Password</label>
                <a className="login-quiet-link" href="#forgot-password">Forgot password?</a>
              </div>
              <div className="login-password-wrap">
                <input
                  id="login-password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={() => setNotice('')}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  aria-pressed={passwordVisible}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 5 8.5 7a8.5 8.5 0 0 1-2.2 3.4M6.2 6.2C4.5 7.5 3.5 9.3 3.5 12c0 2 3.5 7 8.5 7 1 0 1.9-.2 2.8-.6" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3.5 12s3.5-7 8.5-7 8.5 7 8.5 7-3.5 7-8.5 7-8.5-7-8.5-7Z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="login-remember">
              <input type="checkbox" name="remember" />
              <span className="login-checkbox" aria-hidden="true" />
              <span>Remember me</span>
            </label>

            <button className="login-submit" type="submit">
              Login <span aria-hidden="true">→</span>
            </button>
            <p className={`login-notice${notice ? ' login-notice-error' : ''}`} aria-live="polite" role={notice ? 'alert' : undefined}>{notice}</p>
          </form>

          <div className="login-demo-credentials" aria-label="Demo credentials">
            <strong>Demo credentials</strong>
            <span>Citizen: citizen@civiccomplaint.com · Citizen@123</span>
            <span>Admin: admin@civiccomplaint.com · Admin@123</span>
            <span>Worker: worker@civiccomplaint.com · Worker@123</span>
          </div>

          <p className="login-signup">
            New to CivicComplaint?             <a href="/signup">Create an account</a>
          </p>

          <div className="login-security">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p><strong>Your privacy matters.</strong> Your information is protected and handled with care.</p>
          </div>
        </div>
        <div className="login-form-footer">
          <a href="/">← Back to home</a>
          <span>© {new Date().getFullYear()} CivicComplaint</span>
        </div>
      </section>
    </main>
  )
}

export default Login
