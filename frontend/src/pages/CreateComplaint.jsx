import { useEffect, useRef, useState } from 'react'
import { ComplaintStorageError, createComplaint } from '../data/complaints.js'
import { logoutDemoUser } from '../data/demoAuth.js'

const DESCRIPTION_LIMIT = 600
const PHOTO_LIMIT = 10 * 1024 * 1024

const categories = [
  {
    name: 'Pothole / Road Damage',
    shortName: 'Road damage',
    description: 'Roads, sidewalks and surfaces',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 19h18M6 19l2.2-13h7.6L18 19M10 6l-.5 4h5l-.5-4M9 14h6" />
        <path d="M11 10v1M13 10v1" />
      </svg>
    ),
  },
  {
    name: 'Garbage & Waste',
    shortName: 'Garbage & waste',
    description: 'Missed pickups and litter',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3" />
      </svg>
    ),
  },
  {
    name: 'Streetlight',
    shortName: 'Streetlight',
    description: 'Street and public lighting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3a5 5 0 0 0-3 9v3h6v-3a5 5 0 0 0-3-9ZM9 18h6M10 21h4" />
        <path d="M12 1v1M4.2 4.2l1.4 1.4M19.8 4.2l-1.4 1.4" />
      </svg>
    ),
  },
  {
    name: 'Water Leakage',
    shortName: 'Water leakage',
    description: 'Leaks, pipes and water supply',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3s6 7.1 6 11a6 6 0 0 1-12 0c0-3.9 6-11 6-11Z" />
        <path d="M9 15a3 3 0 0 0 3 3" />
      </svg>
    ),
  },
  {
    name: 'Traffic Signal',
    shortName: 'Traffic signal',
    description: 'Signals, signs and road safety',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 3h8v18H8zM12 7h.01M12 12h.01M12 17h.01" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: 'Drainage',
    shortName: 'Drainage',
    description: 'Blocked drains and flooding',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 8h16M6 12h12M8 16h8M10 20h4" />
        <path d="M12 3v3M9 4l3 3 3-3" />
      </svg>
    ),
  },
  {
    name: 'Public Safety',
    shortName: 'Public safety',
    description: 'Hazards in shared spaces',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    name: 'Other',
    shortName: 'Other issue',
    description: 'Something else in your area',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </svg>
    ),
  },
]

function ComplaintBrand() {
  return (
    <a className="dashboard-brand" href="/" aria-label="CivicComplaint home">
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

function MapPlaceholder() {
  return (
    <div className="complaint-map-placeholder" role="img" aria-label="Map location preview placeholder">
      <svg className="complaint-map-lines" viewBox="0 0 700 190" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 53 130 90l110-58 117 42 95-57 112 48 160-37M-10 151l144-38 100 40 124-59 106 37 112-62 136 38" />
        <path d="m92-10 44 70-36 62 51 86M287-10l-26 54 55 45-32 57 49 57M507-10l-8 53 45 59-31 98M652-10l-42 57 22 70-37 74" />
        <path className="complaint-map-greenway" d="M-10 125c100-56 147 40 255-6s145-57 235-5 126 21 231-42" />
      </svg>
      <span className="complaint-map-pin" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>
      <strong>Map location preview</strong>
      <span>Location will appear here</span>
      <small>Map preview only · No location is shared</small>
    </div>
  )
}

function CreateComplaint() {
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoError, setPhotoError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [locationNotice, setLocationNotice] = useState('')
  const [notice, setNotice] = useState('')
  const [success, setSuccess] = useState(false)
  const [submittedComplaintId, setSubmittedComplaintId] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [touched, setTouched] = useState({})
  const fileInputRef = useRef(null)
  const successDialogRef = useRef(null)
  const selectedCategory = categories.find((item) => item.name === category)
  const formIsComplete = Boolean(
    category && title.trim() && description.trim() && location.trim(),
  )

  useEffect(() => {
    if (!success) return undefined

    successDialogRef.current?.focus()

    function closeOnEscape(event) {
      if (event.key === 'Escape') setSuccess(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [success])

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  function markTouched(field) {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  function selectPhoto(file) {
    if (!file) return

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setPhotoError('Choose a PNG, JPG, or WEBP image.')
      return
    }

    if (file.size > PHOTO_LIMIT) {
      setPhotoError('The image must be 10MB or smaller.')
      return
    }

    setPhoto(file)
    setPreviewUrl(URL.createObjectURL(file))
    setPhotoError('')
    setNotice('')
  }

  function handleFileChange(event) {
    selectPhoto(event.target.files?.[0])
    event.target.value = ''
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    selectPhoto(event.dataTransfer.files?.[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    setNotice('')

    if (!formIsComplete) {
      setTouched({ category: true, title: true, description: true, location: true })
      setNotice('Please complete the required fields before submitting.')
      return
    }

    try {
      const createdComplaint = createComplaint({
        title,
        category: category === 'Pothole / Road Damage' ? 'Road Damage' : category,
        description,
        location,
        image: photo,
      })
      setSubmittedComplaintId(createdComplaint.id)
      setSuccess(true)
    } catch (error) {
      if (!(error instanceof ComplaintStorageError)) throw error
      setNotice('Your complaint could not be saved in this browser. Check that browser storage is available, then try again.')
    }
  }

  function saveDraft() {
    setNotice('Draft saved in this page only. It has not been sent or stored.')
  }

  function handleLogout(event) {
    event.preventDefault()
    logoutDemoUser()
    window.location.href = '/login'
  }

  function categoryError() {
    return touched.category && !category
  }

  function fieldError(field, value) {
    return touched[field] && !value.trim()
  }

  return (
    <div className="dashboard-page create-complaint-page">
      <header className="dashboard-header">
        <nav className="dashboard-nav dashboard-container" aria-label="Dashboard navigation">
          <ComplaintBrand />
          <button
            className="dashboard-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close dashboard menu' : 'Open dashboard menu'}
            aria-expanded={menuOpen}
            aria-controls="complaint-dashboard-links"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
          <div
            className={`dashboard-nav-links${menuOpen ? ' dashboard-nav-links-open' : ''}`}
            id="complaint-dashboard-links"
          >
            <a href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
            <a href="/dashboard#recent-complaints" onClick={() => setMenuOpen(false)}>My Complaints</a>
            <a className="dashboard-nav-report complaint-nav-active" href="/complaints/new" aria-current="page" onClick={() => setMenuOpen(false)}>
              Report Complaint
            </a>
            <a href="/login" onClick={() => setMenuOpen(false)}>Profile</a>
            <a className="dashboard-logout" href="/login" onClick={handleLogout}>Logout</a>
          </div>
        </nav>
      </header>

      <main className="dashboard-container complaint-create-main">
        <a className="complaint-back-link" href="/dashboard">← Back to Dashboard</a>

        <section className="complaint-page-heading" aria-labelledby="complaint-page-title">
          <span className="dashboard-eyebrow">REPORT A CIVIC ISSUE</span>
          <div className="complaint-heading-row">
            <div>
              <h1 id="complaint-page-title">Help improve your neighborhood.</h1>
              <p>Tell us what's happening and we'll help get it to the right people.</p>
            </div>
            <span className="complaint-step-note"><span>01</span> of 01 · New report</span>
          </div>
        </section>

        <form className="complaint-form" onSubmit={handleSubmit} noValidate>
          <div className="complaint-form-layout">
            <div className="complaint-form-primary">
              <section className="complaint-form-section" aria-labelledby="issue-section-title">
                <div className="complaint-section-heading">
                  <span className="complaint-section-number">01</span>
                  <div>
                    <h2 id="issue-section-title">What's the issue?</h2>
                    <p>Choose the category that best describes what you noticed.</p>
                  </div>
                </div>
                <fieldset
                  className="complaint-category-fieldset"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) markTouched('category')
                  }}
                >
                  <legend className="visually-hidden">Choose a complaint category</legend>
                  <div className="complaint-category-grid">
                    {categories.map((item) => (
                      <label
                        className={`complaint-category-option${category === item.name ? ' category-selected' : ''}`}
                        key={item.name}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={item.name}
                          checked={category === item.name}
                          onChange={() => {
                            setCategory(item.name)
                            setNotice('')
                          }}
                          required
                        />
                        <span className="complaint-category-check" aria-hidden="true">
                          {category === item.name ? '✓' : ''}
                        </span>
                        <span className="report-category-icon">{item.icon}</span>
                        <span className="complaint-category-text">
                          <strong>{item.name}</strong>
                          <small>{item.description}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {categoryError() && <p className="complaint-field-error" role="alert">Choose a category to continue.</p>}
              </section>

              <section className="complaint-form-section" aria-labelledby="details-section-title">
                <div className="complaint-section-heading">
                  <span className="complaint-section-number">02</span>
                  <div>
                    <h2 id="details-section-title">Tell us more</h2>
                    <p>A clear title and description help the right team understand the issue.</p>
                  </div>
                </div>

                <div className="complaint-fields">
                  <div className="complaint-field">
                    <label htmlFor="complaint-title">Complaint title <span>*</span></label>
                    <input
                      id="complaint-title"
                      name="title"
                      type="text"
                      maxLength={100}
                      placeholder="e.g. Large pothole near Main Road"
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value)
                        setNotice('')
                      }}
                      onBlur={() => markTouched('title')}
                      aria-invalid={fieldError('title', title)}
                      aria-describedby={fieldError('title', title) ? 'title-error' : undefined}
                      required
                    />
                    {fieldError('title', title) && (
                      <span className="complaint-field-error" id="title-error">Enter a title for this issue.</span>
                    )}
                  </div>
                  <div className="complaint-field">
                    <div className="complaint-label-row">
                      <label htmlFor="complaint-description">Description <span>*</span></label>
                      <span>Include helpful details</span>
                    </div>
                    <textarea
                      id="complaint-description"
                      name="description"
                      rows="6"
                      maxLength={DESCRIPTION_LIMIT}
                      placeholder="Describe what you noticed, where it is, and how it affects the area..."
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value)
                        setNotice('')
                      }}
                      onBlur={() => markTouched('description')}
                      aria-invalid={fieldError('description', description)}
                      aria-describedby={fieldError('description', description)
                        ? 'description-error description-counter'
                        : 'description-counter'}
                      required
                    />
                    <div className="complaint-description-footer">
                      {fieldError('description', description)
                        ? <span className="complaint-field-error" id="description-error">Add a short description of the issue.</span>
                        : <span>Be specific. Please avoid sharing private information.</span>}
                      <span id="description-counter" aria-live="polite">
                        {description.length} / {DESCRIPTION_LIMIT}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="complaint-form-section complaint-photo-section" aria-labelledby="photo-section-title">
                <div className="complaint-section-heading">
                  <span className="complaint-section-number">03</span>
                  <div>
                    <h2 id="photo-section-title">Add a photo <span className="complaint-optional">(optional)</span></h2>
                    <p>A photo can help the response team assess the situation.</p>
                  </div>
                </div>

                {photo ? (
                  <div className="complaint-photo-preview">
                    <img src={previewUrl} alt={`Selected complaint photo: ${photo.name}`} />
                    <div className="complaint-photo-info">
                      <strong>{photo.name}</strong>
                      <span>{(photo.size / (1024 * 1024)).toFixed(2)} MB · Preview only</span>
                    </div>
                    <button
                      className="complaint-remove-photo"
                      type="button"
                      onClick={() => {
                        setPhoto(null)
                        setPreviewUrl('')
                        setPhotoError('')
                      }}
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <div
                    className={`complaint-upload-zone${isDragging ? ' upload-dragging' : ''}`}
                    onDragOver={(event) => {
                      event.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setIsDragging(false)
                    }}
                    onDrop={handleDrop}
                  >
                    <span className="complaint-upload-icon" aria-hidden="true">📷</span>
                    <strong>Upload a photo of the issue</strong>
                    <span>PNG, JPG or WEBP up to 10MB</span>
                    <button
                      className="complaint-choose-file"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose a photo
                    </button>
                    <input
                      ref={fileInputRef}
                      className="visually-hidden"
                      id="complaint-photo"
                      name="photo"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      aria-label="Choose an image of the issue"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
                {photoError && <p className="complaint-field-error" role="alert">{photoError}</p>}
                <p className="complaint-photo-privacy">Your photo stays on this device and is not uploaded.</p>
              </section>

              <section className="complaint-form-section complaint-location-section" aria-labelledby="location-section-title">
                <div className="complaint-section-heading">
                  <span className="complaint-section-number">04</span>
                  <div>
                    <h2 id="location-section-title">Where is the issue?</h2>
                    <p>Give us a clear address or landmark to help locate the issue.</p>
                  </div>
                </div>

                <div className="complaint-field complaint-address-field">
                  <div className="complaint-label-row">
                    <label htmlFor="complaint-location">Location <span>*</span></label>
                    <button
                      className="complaint-location-button"
                      type="button"
                      onClick={() => setLocationNotice('Current location is not enabled in this demo. Enter an address or landmark instead.')}
                    >
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      Use my current location
                    </button>
                  </div>
                  <input
                    id="complaint-location"
                    name="location"
                    type="text"
                    placeholder="Enter an address or landmark"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value)
                      setNotice('')
                    }}
                    onBlur={() => markTouched('location')}
                    aria-invalid={fieldError('location', location)}
                    aria-describedby={fieldError('location', location) ? 'location-error' : undefined}
                    required
                  />
                  {locationNotice && (
                    <span className="complaint-location-placeholder-note" role="status">
                      {locationNotice}
                    </span>
                  )}
                  {fieldError('location', location) && (
                    <span className="complaint-field-error" id="location-error">Enter an address or nearby landmark.</span>
                  )}
                </div>
                <MapPlaceholder />
                <p className="complaint-location-note">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 11v5M12 8h.01" />
                  </svg>
                  Accurate location helps the right team respond faster.
                </p>
              </section>
            </div>

            <aside className="complaint-form-aside">
              <section className="complaint-review-card" aria-labelledby="review-title">
                <div className="complaint-review-heading">
                  <span className="complaint-review-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
                    </svg>
                  </span>
                  <div>
                    <span className="dashboard-eyebrow">BEFORE YOU SUBMIT</span>
                    <h2 id="review-title">Review your report</h2>
                  </div>
                </div>
                <dl className="complaint-review-list">
                  <div>
                    <dt>Category</dt>
                    <dd>{selectedCategory?.shortName || 'Not selected'}</dd>
                  </div>
                  <div>
                    <dt>Title</dt>
                    <dd className={title.trim() ? '' : 'review-placeholder'}>
                      {title.trim() || 'Add a complaint title'}
                    </dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd className={location.trim() ? '' : 'review-placeholder'}>
                      {location.trim() || 'Add an address or landmark'}
                    </dd>
                  </div>
                  <div>
                    <dt>Photo</dt>
                    <dd>{photo ? 'Photo attached' : 'No photo added'}</dd>
                  </div>
                </dl>
                <p className="complaint-review-note">
                  You can review everything before sending your report.
                </p>
              </section>

              <section className="complaint-aside-tip">
                <span className="complaint-tip-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3a6 6 0 0 0-3.5 10.9c.9.6 1.5 1.3 1.5 2.1h4c0-.8.6-1.5 1.5-2.1A6 6 0 0 0 12 3ZM10 19h4M10.5 22h3" />
                  </svg>
                </span>
                <h3>A helpful tip</h3>
                <p>Clear details and a nearby landmark can help your local team respond more effectively.</p>
              </section>
            </aside>
          </div>

          <div className="complaint-submit-area">
            <div className="complaint-submit-message" aria-live="polite" role={notice ? 'status' : undefined}>
              {notice && <span>{notice}</span>}
              {!formIsComplete && !notice && (
                <span>Complete the required fields to submit your complaint.</span>
              )}
            </div>
            <div className="complaint-submit-buttons">
              <button
                className="complaint-draft-button"
                type="button"
                onClick={saveDraft}
              >
                Save as Draft
              </button>
              <button
                className="complaint-submit-button"
                type="submit"
                disabled={!formIsComplete}
                aria-describedby="complaint-submit-help"
              >
                Submit Complaint <span aria-hidden="true">→</span>
              </button>
            </div>
            <span className="visually-hidden" id="complaint-submit-help">
              The submit button becomes available when category, title, description, and location are provided.
            </span>
          </div>
        </form>
      </main>

      <footer className="dashboard-footer complaint-footer">
        <div className="dashboard-container">
          <ComplaintBrand />
          <p>Working together for cleaner, safer, stronger communities.</p>
          <span className="dashboard-footer-copyright">
            © {new Date().getFullYear()} CivicComplaint · Your report helps make a difference.
          </span>
        </div>
      </footer>

      {success && (
        <div
          className="complaint-success-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSuccess(false)
          }}
        >
          <section
            className="complaint-success-dialog"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            ref={successDialogRef}
            aria-labelledby="complaint-success-title"
            aria-describedby="complaint-success-description"
          >
            <button
              className="complaint-success-close"
              type="button"
              aria-label="Close confirmation"
              onClick={() => setSuccess(false)}
            >
              ×
            </button>
            <span className="complaint-success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m6 12 4 4L18 8" />
              </svg>
            </span>
            <span className="dashboard-eyebrow">THANK YOU FOR SPEAKING UP</span>
            <h2 id="complaint-success-title">Complaint submitted successfully.</h2>
            <p id="complaint-success-description">
              Your report has been recorded for review. You can track its progress from your dashboard.
            </p>
            <div className="complaint-success-id">
              <span>Demo complaint ID</span>
              <strong>{submittedComplaintId}</strong>
            </div>
            <div className="complaint-success-actions">
              <a href="/dashboard" className="complaint-submit-button">
                View My Complaints
              </a>
              <a href="/dashboard" className="complaint-success-secondary">
                Back to Dashboard
              </a>
            </div>
            <p className="complaint-success-demo-note">
              Demo only — complaint details are saved in this browser and are not sent to a server.
            </p>
          </section>
        </div>
      )}
    </div>
  )
}

export default CreateComplaint
