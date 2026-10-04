import { useState } from 'react'

function SignupBrandMark() {
  return (
    <span className="login-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 28 28" fill="none">
        <path d="M4 23h20M7 23V11l7-5 7 5v12M11 23v-7h6v7M4 11h20" />
        <path d="M12 11h4" />
      </svg>
    </span>
  )
}

function SignupCityScene() {
  return (
    <svg
      className="login-city-scene"
      viewBox="0 0 720 600"
      role="img"
      aria-labelledby="signup-city-title"
      preserveAspectRatio="xMidYMid slice"
    >
      <title id="signup-city-title">A welcoming city street surrounded by neighborhood buildings</title>
      <defs>
        <linearGradient id="signup-sky" x1="360" y1="0" x2="360" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3C6471" />
          <stop offset=".58" stopColor="#39786F" />
          <stop offset="1" stopColor="#1D4447" />
        </linearGradient>
        <linearGradient id="signup-street" x1="360" y1="390" x2="360" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#85958A" />
          <stop offset="1" stopColor="#526B61" />
        </linearGradient>
      </defs>
      <path fill="url(#signup-sky)" d="M0 0h720v600H0z" />
      <circle cx="548" cy="108" r="40" fill="#E9D6A6" fillOpacity=".75" />
      <circle cx="548" cy="108" r="68" fill="#E9D6A6" fillOpacity=".16" />
      <path d="M0 338c100-42 172-47 251-21 69 23 150 18 229-13 79-31 161-23 240 6v130H0V338Z" fill="#50746B" />
      <path d="M24 232h119v206H24z" fill="#31565D" />
      <path d="M42 252h22v29H42zM100 252h22v29h-22zM42 303h22v29H42zM100 303h22v29h-22zM42 354h22v29H42zM100 354h22v29h-22z" fill="#E1D4A7" fillOpacity=".78" />
      <path d="M151 181h128v258H151z" fill="#3B6163" />
      <path d="m138 184 77-52 77 52H138Z" fill="#294E55" />
      <path d="M170 203h23v32h-23zM226 203h23v32h-23zM170 257h23v32h-23zM226 257h23v32h-23zM170 311h23v32h-23zM226 311h23v32h-23z" fill="#E9DCAA" fillOpacity=".82" />
      <path d="M294 243h111v196H294z" fill="#35585A" />
      <path d="M312 262h21v29h-21zM366 262h21v29h-21zM312 315h21v29h-21zM366 315h21v29h-21z" fill="#DCCF9F" fillOpacity=".8" />
      <path d="M424 199h136v240H424z" fill="#355A5E" />
      <path d="M444 219h23v31h-23zM490 219h23v31h-23zM536 219h12v31h-12zM444 272h23v31h-23zM490 272h23v31h-23zM536 272h12v31h-12zM444 325h23v31h-23zM490 325h23v31h-23zM536 325h12v31h-12z" fill="#E7DCAE" fillOpacity=".82" />
      <path d="M576 264h112v175H576z" fill="#2C5055" />
      <path d="M595 283h20v27h-20zM643 283h20v27h-20zM595 330h20v27h-20zM643 330h20v27h-20z" fill="#E4D6A9" fillOpacity=".8" />
      <path d="M0 418h720v182H0z" fill="#365C55" />
      <path d="M284 418h152l152 182H132l152-182Z" fill="url(#signup-street)" />
      <path d="m351 438-5 26h28l-5-26h-18ZM338 489l-9 39h62l-9-39h-44ZM317 560l-7 28h100l-7-28H317Z" fill="#E3D9B8" fillOpacity=".7" />
      <path d="M0 461h190M0 505h156M530 461h190M567 505h153" stroke="#B4C29A" strokeOpacity=".52" strokeWidth="3" />
      <path d="M58 444c3-31 18-51 36-51s33 20 36 51" fill="#638568" />
      <path d="M94 446v-66" stroke="#AA8960" strokeWidth="7" strokeLinecap="round" />
      <path d="M582 444c3-29 18-48 34-48s31 19 34 48" fill="#638568" />
      <path d="M616 446v-62" stroke="#AA8960" strokeWidth="7" strokeLinecap="round" />
      <path d="M200 441v-21a14 14 0 0 1 28 0v21M487 441v-21a14 14 0 0 1 28 0v21" fill="#E0C78F" />
      <path d="M207 441v-12M221 441v-12M494 441v-12M508 441v-12" stroke="#334D4C" strokeWidth="3" />
      <path d="M267 414h24v29h-24zM431 414h24v29h-24z" fill="#2B4A4D" />
      <path d="M42 534h68M613 532h67" stroke="#D9C98E" strokeOpacity=".74" strokeWidth="3" strokeLinecap="round" />
      <path d="M0 578h720" stroke="#BCD0B0" strokeOpacity=".42" strokeWidth="2" />
    </svg>
  )
}

function Signup() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [notice, setNotice] = useState('')

  const passwordChecks = [
    { label: 'At least 8 characters', passed: password.length >= 8 },
    { label: 'An uppercase and a lowercase letter', passed: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: 'At least one number', passed: /\d/.test(password) },
  ]
  const passwordIsValid = passwordChecks.every((check) => check.passed)
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword

  function handleSubmit(event) {
    event.preventDefault()

    if (!passwordIsValid) {
      setNotice('Please meet all password requirements before continuing.')
      return
    }

    if (!passwordsMatch) {
      setNotice('Your passwords do not match yet.')
      return
    }

    setNotice('Account creation is not connected yet. Your details have not been sent.')
  }

  return (
    <main className="login-page signup-page">
      <section className="login-visual signup-visual" aria-label="CivicComplaint community">
        <SignupCityScene />
        <div className="login-visual-overlay" />
        <a className="login-brand" href="/" aria-label="CivicComplaint home">
          <SignupBrandMark />
          <span>Civic<span>Complaint</span></span>
        </a>
        <div className="login-visual-copy">
          <span className="login-kicker"><span /> BETTER CITIES, TOGETHER</span>
          <h1>Be part of a<br />better city.</h1>
          <p className="signup-visual-support">
            Report local issues, track progress, and help make your community better.
          </p>
          <span className="login-visual-rule" />
          <span className="login-visual-caption">Your voice can make a difference in your community.</span>
        </div>
        <span className="login-visual-credit">A more connected community begins with one conversation.</span>
      </section>

      <section className="login-form-side signup-form-side" aria-labelledby="signup-heading">
        <a className="login-mobile-brand" href="/" aria-label="CivicComplaint home">
          <SignupBrandMark />
          <span>Civic<span>Complaint</span></span>
        </a>
        <div className="login-form-wrap signup-form-wrap">
          <div className="login-welcome">
            <span className="login-form-kicker">CITIZEN PORTAL</span>
            <h2 id="signup-heading">Create your account</h2>
            <p>Join your neighbors in making your community better.</p>
          </div>

          <form className="login-form signup-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="signup-phone">Phone number</label>
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                autoComplete="tel"
                required
              />
            </div>

            <div className="login-field signup-password-field">
              <label htmlFor="signup-password">Password</label>
              <div className="login-password-wrap">
                <input
                  id="signup-password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  aria-describedby="password-guidance"
                  aria-invalid={password.length > 0 && !passwordIsValid}
                  onChange={(event) => setPassword(event.target.value)}
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
              <ul className="password-guidance" id="password-guidance" aria-live="polite">
                {passwordChecks.map((check) => (
                  <li className={check.passed ? 'password-check-passed' : ''} key={check.label}>
                    <span aria-hidden="true">{check.passed ? '✓' : '○'}</span>
                    {check.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="login-field signup-password-field">
              <label htmlFor="signup-confirm-password">Confirm password</label>
              <div className="login-password-wrap">
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  aria-invalid={passwordsMismatch}
                  aria-describedby={passwordsMismatch ? 'password-mismatch' : undefined}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={confirmPasswordVisible ? 'Hide confirmation password' : 'Show confirmation password'}
                  aria-pressed={confirmPasswordVisible}
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? (
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
              {passwordsMismatch && (
                <span className="password-mismatch" id="password-mismatch" role="status">
                  Passwords do not match.
                </span>
              )}
              {passwordsMatch && (
                <span className="password-match" role="status">Passwords match.</span>
              )}
            </div>

            <label className="login-remember signup-terms">
              <input type="checkbox" name="terms" required />
              <span className="login-checkbox" aria-hidden="true" />
              <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span>
            </label>

            <button className="login-submit" type="submit">
              Create Account <span aria-hidden="true">→</span>
            </button>
            <p className="login-notice" aria-live="polite">{notice}</p>
          </form>

          <p className="login-signup">
            Already have an account? <a href="/login">Login</a>
          </p>

          <div className="login-security">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p><strong>Your privacy matters.</strong> Your information is protected and handled with care.</p>
          </div>
        </div>
        <div className="login-form-footer signup-form-footer">
          <a href="/">← Back to home</a>
          <span>© {new Date().getFullYear()} CivicComplaint</span>
        </div>
      </section>
    </main>
  )
}

export default Signup
