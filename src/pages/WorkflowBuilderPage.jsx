import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import ComponentLibrary from '../components/ComponentLibrary'
import WorkflowCanvas from '../components/WorkflowCanvas'
import VoiceControl from '../components/VoiceControl'
import { Save, Play, Settings } from 'lucide-react'

const WorkflowBuilderPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, workflows, updateWorkflow, addWorkflow } = useUser()
  const [currentWorkflow, setCurrentWorkflow] = useState(null)
  const [selectedComponent, setSelectedComponent] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    if (id) {
      const workflow = workflows.find(w => w.id === id)
      if (workflow) {
        setCurrentWorkflow(workflow)
      } else {
        navigate('/dashboard')
      }
    }
  }, [id, workflows, user, navigate])

  const handleSave = () => {
    if (currentWorkflow) {
      updateWorkflow(currentWorkflow.id, {
        ...currentWorkflow,
        lastUpdated: new Date().toISOString()
      })
      alert('Workflow saved successfully!')
    }
  }

  const handleAddComponent = (componentType) => {
    const newComponent = {
      id: Date.now().toString(),
      type: componentType,
      name: componentType,
      config: {},
      position: { x: 100, y: 100 }
    }

    setCurrentWorkflow(prev => ({
      ...prev,
      components: [...(prev?.components || []), newComponent]
    }))
  }

  const handleDeleteComponent = (componentId) => {
    setCurrentWorkflow(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== componentId)
    }))
  }

  const handleVoiceCommand = (command) => {
    // Simple voice command processing
    const lowerCommand = command.toLowerCase()
    
    if (lowerCommand.includes('add') && lowerCommand.includes('text')) {
      handleAddComponent('Text Generator')
    } else if (lowerCommand.includes('add') && lowerCommand.includes('image')) {
      handleAddComponent('Image Generator')
    } else if (lowerCommand.includes('add') && lowerCommand.includes('chat')) {
      handleAddComponent('Chatbot')
    } else if (lowerCommand.includes('save')) {
      handleSave()
    } else {
      alert(`Voice command recognized: "${command}"\nTry commands like "Add text generator" or "Save workflow"`)
    }
  }

  if (!currentWorkflow) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="h-screen flex">
      {/* Component Library Sidebar */}
      <div className="w-80">
        <ComponentLibrary onAddComponent={handleAddComponent} />
      </div>

      {/* Main Workflow Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{currentWorkflow.name}</h1>
            <p className="text-sm text-gray-600">{currentWorkflow.description}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-primary">
              <Save size={16} />
              Save
            </button>
            <button className="btn btn-success">
              <Play size={16} />
              Run
            </button>
            <button className="btn btn-secondary">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>

        {/* Canvas */}
        <WorkflowCanvas
          components={currentWorkflow.components || []}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          onDeleteComponent={handleDeleteComponent}
          onUpdateComponent={(componentId, updates) => {
            setCurrentWorkflow(prev => ({
              ...prev,
              components: prev.components.map(c =>
                c.id === componentId ? { ...c, ...updates } : c
              )
            }))
          }}
        />
      </div>

      {/* Voice Control */}
      <VoiceControl onVoiceCommand={handleVoiceCommand} />
    </div>
  )
}

export default WorkflowBuilderPage