const SESSION_KEY = 'civic-complaint-demo-session'

const demoAccounts = [
  { email: 'citizen@civiccomplaint.com', password: 'Citizen@123', role: 'citizen' },
  { email: 'admin@civiccomplaint.com', password: 'Admin@123', role: 'admin' },
  { email: 'worker@civiccomplaint.com', password: 'Worker@123', role: 'worker', name: 'Ravi Kumar' },
]

export function getDemoSession() {
  try {
    const serializedSession = localStorage.getItem(SESSION_KEY)
    if (!serializedSession) return null
    const session = JSON.parse(serializedSession)
    return ['citizen', 'admin', 'worker'].includes(session?.role) ? session : null
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

  const session = { role: account.role, email: account.email, name: account.name || '' }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function logoutDemoUser() {
  localStorage.removeItem(SESSION_KEY)
}
