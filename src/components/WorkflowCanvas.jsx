import React from 'react'
import { Trash2, Settings } from 'lucide-react'

const WorkflowCanvas = ({ 
  components, 
  selectedComponent, 
  onSelectComponent, 
  onDeleteComponent,
  onUpdateComponent 
}) => {
  const handleComponentClick = (component) => {
    onSelectComponent(component)
  }

  const handleDeleteClick = (e, componentId) => {
    e.stopPropagation()
    onDeleteComponent(componentId)
  }

  return (
    <div className="workflow-canvas p-6 relative">
      {components.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Start Building Your Workflow</h3>
            <p className="text-gray-600">
              Drag components from the library or use voice commands to add components.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {components.map((component) => (
            <div
              key={component.id}
              className={`workflow-node absolute ${
                selectedComponent?.id === component.id ? 'selected' : ''
              }`}
              style={{
                left: component.position.x,
                top: component.position.y
              }}
              onClick={() => handleComponentClick(component)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{component.name}</h4>
                <div className="flex gap-1">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <Settings size={14} className="text-gray-500" />
                  </button>
                  <button 
                    onClick={(e) => handleDeleteClick(e, component.id)}
                    className="p-1 rounded hover:bg-red-100"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{component.type}</p>
              
              {/* Connection points */}
              <div className="absolute -left-2 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute -right-2 top-1/2 w-4 h-4 bg-green-500 rounded-full transform -translate-y-1/2"></div>
            </div>
          ))}
        </div>
      )}
      
      {/* Selected Component Details Panel */}
      {selectedComponent && (
        <div className="absolute top-4 right-4 w-80 bg-white border rounded-lg shadow-lg p-4">
          <h3 className="font-semibold mb-3">{selectedComponent.name}</h3>
          <div className="space-y-3">
            <div>
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
            <div>
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                rows="3"
                placeholder="Describe what this component does..."
                value={selectedComponent.description || ''}
                onChange={(e) => 
                  onUpdateComponent(selectedComponent.id, { description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label">Configuration</label>
              <textarea
                className="form-input"
                rows="4"
                placeholder='{"setting1": "value1", "setting2": "value2"}'
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
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowCanvas