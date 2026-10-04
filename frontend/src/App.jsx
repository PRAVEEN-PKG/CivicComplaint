import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateComplaint from './pages/CreateComplaint.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ComplaintDetails from './pages/ComplaintDetails.jsx'
import WorkerDashboard from './pages/WorkerDashboard.jsx'
import { getDemoSession } from './data/demoAuth.js'
import { Navigate, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const currentPath = location.pathname.replace(/\/+$/, '')
  const session = getDemoSession()

  if (currentPath === '/dashboard' && session?.role !== 'citizen') {
    window.location.replace('/login')
    return null
  }

  if (currentPath === '/admin' && session?.role !== 'admin') {
    window.location.replace('/login')
    return null
  }

  if (currentPath === '/worker' && session?.role !== 'worker') {
    window.location.replace('/login')
    return null
  }

  if (currentPath === '/complaints/new') {
    return <CreateComplaint />
  }

  const complaintDetailsMatch = currentPath.match(/^\/complaints\/([^/]+)$/)
  if (complaintDetailsMatch) {
    return <ComplaintDetails complaintId={complaintDetailsMatch[1]} />
  }

  if (currentPath === '/admin') {
    return <AdminDashboard />
  }

  if (currentPath === '/worker') {
    return <WorkerDashboard />
  }

  if (currentPath === '/dashboard') {
    return <Dashboard />
  }

  if (currentPath === '/login') {
    return <Login />
  }

  if (currentPath === '/signup') {
    return <Signup />
  }

  if (currentPath === '') {
    return <Navigate to="/login" replace />
  }

  return <LandingPage />
}

export default App
