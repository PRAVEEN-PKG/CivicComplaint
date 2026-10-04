import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateComplaint from './pages/CreateComplaint.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '')

  if (currentPath === '/complaints/new') {
    return <CreateComplaint />
  }

  if (currentPath === '/admin') {
    return <AdminDashboard />
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

  return <LandingPage />
}

export default App
