import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Calendar, Star } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { v4 as uuidv4 } from 'uuid'

const DashboardPage = () => {
  const { user, workflows, addWorkflow, deleteWorkflow } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  const createNewWorkflow = () => {
    const newWorkflow = {
      id: uuidv4(),
      name: 'New Workflow',
      description: 'A new AI workflow',
      status: 'draft',
      lastUpdated: new Date().toISOString(),
      components: []
    }
    addWorkflow(newWorkflow)
    navigate(`/workflow/${newWorkflow.id}`)
  }

  const handleDeleteWorkflow = (workflowId) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      deleteWorkflow(workflowId)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Manage your AI workflows and create new ones.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Workflows</p>
                <p className="text-2xl font-bold">{workflows.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-2xl font-bold capitalize">{user.plan}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Plus className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Workflows Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Workflows</h2>
            <button onClick={createNewWorkflow} className="btn btn-primary">
              <Plus size={16} />
              New Workflow
            </button>
          </div>

          {workflows.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No workflows yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first AI workflow to get started.
              </p>
              <button onClick={createNewWorkflow} className="btn btn-primary">
                Create Your First Workflow
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg">{workflow.name}</h3>
                    <div className="flex gap-2">
                      <Link to={`/workflow/${workflow.id}`} className="text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{workflow.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workflow.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {workflow.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(workflow.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage