import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mic, User, LogOut } from 'lucide-react'
import { useUser } from '../context/UserContext'

const Navbar = ({ onShowAuth }) => {
  const { user, logout } = useUser()
  const location = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Mic className="inline mr-2" />
        Voiceflow
      </Link>
      
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/templates" className="nav-link">Templates</Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user.name} ({user.plan})
              </span>
              <button onClick={logout} className="btn btn-secondary">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/templates" className="nav-link">Templates</Link>
            <button onClick={() => onShowAuth('login')} className="nav-link">
              Login
            </button>
            <button onClick={() => onShowAuth('signup')} className="btn btn-primary">
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar