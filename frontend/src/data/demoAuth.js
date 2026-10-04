const SESSION_KEY = 'civic-complaint-demo-session'

const demoAccounts = [
  { email: 'citizen@civiccomplaint.com', password: 'Citizen@123', role: 'citizen' },
  { email: 'admin@civiccomplaint.com', password: 'Admin@123', role: 'admin' },
]

export function getDemoSession() {
  try {
    const serializedSession = localStorage.getItem(SESSION_KEY)
    if (!serializedSession) return null
    const session = JSON.parse(serializedSession)
    return ['citizen', 'admin'].includes(session?.role) ? session : null
  } catch {
    return null
  }
}

export function loginDemoUser(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') return null
  const normalizedEmail = email.trim().toLowerCase()
  const account = demoAccounts.find(
    (demoAccount) => demoAccount.email === normalizedEmail && demoAccount.password === password,
  )
  if (!account) return null

  const session = { role: account.role, email: account.email }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function logoutDemoUser() {
  localStorage.removeItem(SESSION_KEY)
}
