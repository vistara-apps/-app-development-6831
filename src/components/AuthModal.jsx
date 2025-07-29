import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useUser } from '../context/UserContext'

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'free'
  })
  const { login } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (mode === 'signup') {
      // In a real app, this would make an API call
      const userData = {
        name: formData.name,
        email: formData.email,
        plan: formData.plan
      }
      login(userData)
    } else {
      // In a real app, this would validate credentials
      const userData = {
        name: 'Demo User',
        email: formData.email,
        plan: 'free'
      }
      login(userData)
    }
    
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Plan</label>
              <select
                name="plan"
                className="form-input"
                value={formData.plan}
                onChange={handleChange}
              >
                <option value="free">Free Plan</option>
                <option value="pro">Pro Plan ($10/month)</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full mb-4">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AuthModal