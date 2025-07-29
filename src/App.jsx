import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import WorkflowBuilderPage from './pages/WorkflowBuilderPage'
import TemplatesPage from './pages/TemplatesPage'
import AuthModal from './components/AuthModal'
import { UserProvider } from './context/UserContext'

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          onShowAuth={(mode) => {
            setAuthMode(mode)
            setShowAuthModal(true)
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage onShowAuth={() => setShowAuthModal(true)} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workflow/:id?" element={<WorkflowBuilderPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Routes>
        {showAuthModal && (
          <AuthModal 
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSwitchMode={setAuthMode}
          />
        )}
      </div>
    </UserProvider>
  )
}

export default App
