import React, { useState } from 'react'
import { Trash2, Settings, X, MessageSquare, Image, Zap, Database, Mail, Calendar, BarChart3, Webhook, Move, ArrowRight } from 'lucide-react'

// Icon mapping for different component types
const componentIcons = {
  'Text Generator': MessageSquare,
  'Image Generator': Image,
  'Chatbot': MessageSquare,
  'Text Classifier': Zap,
  'Database Query': Database,
  'Data Processor': BarChart3,
  'Data Connector': Webhook,
  'Email Sender': Mail,
  'Notification System': Calendar,
  'Webhook': Webhook,
}

const WorkflowCanvas = ({ 
  components, 
  selectedComponent, 
  onSelectComponent, 
  onDeleteComponent,
  onUpdateComponent 
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleComponentClick = (component) => {
    onSelectComponent(component)
  }

  const handleDeleteClick = (e, componentId) => {
    e.stopPropagation()
    onDeleteComponent(componentId)
  }

  const handleMouseDown = (e, component) => {
    if (e.target.closest('.component-actions')) return
    
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    onSelectComponent(component)
  }

  const getComponentIcon = (componentName) => {
    return componentIcons[componentName] || Zap
  }

  const getComponentColor = (componentName) => {
    if (componentName.includes('Text') || componentName.includes('Chat')) return 'blue'
    if (componentName.includes('Image')) return 'purple'
    if (componentName.includes('Database') || componentName.includes('Data')) return 'green'
    if (componentName.includes('Email') || componentName.includes('Notification')) return 'orange'
    return 'gray'
  }

  return (
    <div className="workflow-canvas relative">
      {components.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Move className="text-primary-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Building Your Workflow</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Drag components from the library or use voice commands to add components to your workflow.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                Drag & Drop
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Voice Commands
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative p-6 h-full">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {components.map((component, index) => {
              if (index === components.length - 1) return null
              const nextComponent = components[index + 1]
              return (
                <line
                  key={`connection-${component.id}-${nextComponent.id}`}
                  x1={component.position.x + 200}
                  y1={component.position.y + 40}
                  x2={nextComponent.position.x}
                  y2={nextComponent.position.y + 40}
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  markerEnd="url(#arrowhead)"
                />
              )
            })}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#e5e7eb" />
              </marker>
            </defs>
          </svg>

          {/* Workflow Nodes */}
          {components.map((component) => {
            const IconComponent = getComponentIcon(component.name)
            const colorScheme = getComponentColor(component.name)
            
            return (
              <div
                key={component.id}
                className={`absolute transition-all duration-200 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                  left: component.position.x,
                  top: component.position.y,
                  zIndex: selectedComponent?.id === component.id ? 10 : 2
                }}
                onMouseDown={(e) => handleMouseDown(e, component)}
              >
                <div className={`
                  bg-white rounded-xl shadow-soft border-2 p-4 min-w-[240px] transition-all duration-200
                  ${selectedComponent?.id === component.id 
                    ? 'border-primary-500 shadow-medium ring-2 ring-primary-100' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-medium'
                  }
                `}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        ${colorScheme === 'blue' ? 'bg-blue-100 text-blue-600' :
                          colorScheme === 'purple' ? 'bg-purple-100 text-purple-600' :
                          colorScheme === 'green' ? 'bg-green-100 text-green-600' :
                          colorScheme === 'orange' ? 'bg-orange-100 text-orange-600' :
                          'bg-gray-100 text-gray-600'
                        }
                      `}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{component.name}</h4>
                        <p className="text-xs text-gray-500">{component.type}</p>
                      </div>
                    </div>
                    
                    <div className="component-actions flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleComponentClick(component)
                        }}
                      >
                        <Settings size={14} className="text-gray-500" />
                      </button>
                      <button 
                        onClick={(e) => handleDeleteClick(e, component.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-500">Ready</span>
                  </div>

                  {/* Connection Points */}
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-white border-2 border-primary-300 rounded-full flex items-center justify-center shadow-sm">
                      <ArrowRight size={12} className="text-primary-500" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {/* Selected Component Properties Panel */}
      {selectedComponent && (
        <div className="absolute top-6 right-6 w-80 bg-white border border-gray-200 rounded-xl shadow-strong p-6 z-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${getComponentColor(selectedComponent.name) === 'blue' ? 'bg-blue-100 text-blue-600' :
                  getComponentColor(selectedComponent.name) === 'purple' ? 'bg-purple-100 text-purple-600' :
                  getComponentColor(selectedComponent.name) === 'green' ? 'bg-green-100 text-green-600' :
                  getComponentColor(selectedComponent.name) === 'orange' ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-600'
                }
              `}>
                {React.createElement(getComponentIcon(selectedComponent.name), { size: 20 })}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedComponent.name}</h3>
                <p className="text-sm text-gray-500">Component Properties</p>
              </div>
            </div>
            <button
              onClick={() => onSelectComponent(null)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Component Name</label>
              <input
                type="text"
                className="form-input"
                value={selectedComponent.name}
                onChange={(e) => 
                  onUpdateComponent(selectedComponent.id, { name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Describe what this component does..."
                value={selectedComponent.description || ''}
                onChange={(e) => 
                  onUpdateComponent(selectedComponent.id, { description: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select">
                <option>Ready</option>
                <option>Running</option>
                <option>Error</option>
                <option>Disabled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Configuration</label>
              <textarea
                className="form-textarea font-mono text-xs"
                rows="6"
                placeholder='{\n  "setting1": "value1",\n  "setting2": "value2"\n}'
                value={JSON.stringify(selectedComponent.config, null, 2)}
                onChange={(e) => {
                  try {
                    const config = JSON.parse(e.target.value)
                    onUpdateComponent(selectedComponent.id, { config })
                  } catch {
                    // Invalid JSON, ignore
                  }
                }}
              />
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button className="btn btn-primary flex-1">
                Save Changes
              </button>
              <button className="btn btn-secondary">
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowCanvas
