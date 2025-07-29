import React from 'react'
import { MessageSquare, Image, Zap, Database, Mail, Calendar, BarChart3, Webhook } from 'lucide-react'

const componentTypes = [
  {
    category: 'AI Components',
    items: [
      { name: 'Text Generator', icon: MessageSquare, description: 'Generate text using AI models' },
      { name: 'Image Generator', icon: Image, description: 'Create images from text prompts' },
      { name: 'Chatbot', icon: MessageSquare, description: 'Interactive conversational AI' },
      { name: 'Text Classifier', icon: Zap, description: 'Classify and categorize text' }
    ]
  },
  {
    category: 'Data & Storage',
    items: [
      { name: 'Database Query', icon: Database, description: 'Query and retrieve data' },
      { name: 'Data Processor', icon: BarChart3, description: 'Process and transform data' },
      { name: 'Data Connector', icon: Webhook, description: 'Connect to external data sources' }
    ]
  },
  {
    category: 'Communication',
    items: [
      { name: 'Email Sender', icon: Mail, description: 'Send automated emails' },
      { name: 'Notification System', icon: Calendar, description: 'Send push notifications' },
      { name: 'Webhook', icon: Webhook, description: 'HTTP webhooks and API calls' }
    ]
  }
]

const ComponentLibrary = ({ onAddComponent }) => {
  return (
    <div className="component-library p-6">
      <h2 className="text-lg font-semibold mb-4">Component Library</h2>
      
      {componentTypes.map((category) => (
        <div key={category.category} className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h3>
          <div className="space-y-2">
            {category.items.map((component) => (
              <div
                key={component.name}
                onClick={() => onAddComponent(component.name)}
                className="p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <component.icon size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">{component.name}</div>
                    <div className="text-xs text-gray-600">{component.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Voice Commands</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• "Add text generator"</li>
          <li>• "Add chatbot"</li>
          <li>• "Add image generator"</li>
          <li>• "Save workflow"</li>
        </ul>
      </div>
    </div>
  )
}

export default ComponentLibrary