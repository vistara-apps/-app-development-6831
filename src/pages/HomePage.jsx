import React from 'react'
import { Link } from 'react-router-dom'
import { Mic, Zap, Users, ArrowRight, Star, CheckCircle } from 'lucide-react'

const HomePage = ({ onShowAuth }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title">Build AI-powered workflows with your voice</h1>
          <p className="hero-subtitle">
            Create intelligent automation and AI applications without writing a single line of code.
            Just speak your ideas into reality.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={onShowAuth} className="btn btn-success btn-lg">
              Start Building Free
              <ArrowRight size={20} />
            </button>
            <Link to="/templates" className="btn btn-secondary btn-lg">
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <Mic size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Voice-Controlled Building</h3>
          <p className="text-gray-600">
            Create workflows naturally by speaking. Our AI understands your intentions and 
            builds the workflow components automatically.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Drag & Drop Interface</h3>
          <p className="text-gray-600">
            Visually connect AI components with an intuitive drag-and-drop interface. 
            No coding experience required.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Template Library</h3>
          <p className="text-gray-600">
            Choose from hundreds of pre-built templates for common use cases like 
            chatbots, automation, and data processing.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">Start free and scale as you grow</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3 className="text-xl font-semibold mb-4">Free Plan</h3>
            <div className="text-3xl font-bold mb-6">$0<span className="text-lg text-gray-500">/month</span></div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Up to 3 workflows
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Basic templates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Community support
              </li>
            </ul>
            <button onClick={onShowAuth} className="btn btn-secondary w-full">
              Get Started
            </button>
          </div>

          <div className="pricing-card featured">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Popular</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
            <div className="text-3xl font-bold mb-6">$10<span className="text-lg text-gray-500">/month</span></div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Unlimited workflows
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Premium templates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Advanced AI models
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Priority support
              </li>
            </ul>
            <button onClick={onShowAuth} className="btn btn-primary w-full">
              Start Pro Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage