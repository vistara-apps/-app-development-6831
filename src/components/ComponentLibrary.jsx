import React, { useState } from 'react'
import { MessageSquare, Image, Zap, Database, Mail, Calendar, BarChart3, Webhook, Search, X, Plus } from 'lucide-react'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Filter components based on search term and category
  const filteredComponents = componentTypes.map(category => ({
    ...category,
    items: category.items.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === 'all' || 
    category.category === selectedCategory ||
    category.items.length > 0
  )

  const allCategories = ['all', ...componentTypes.map(cat => cat.category)]

  return (
    <div className="component-library">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Components</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredComponents.map((category) => (
          category.items.length > 0 && (
            <div key={category.category} className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="grid gap-3">
                {category.items.map((component) => (
                  <div
                    key={component.name}
                    onClick={() => onAddComponent(component.name)}
                    className="group p-4 border border-gray-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary-300 hover:shadow-soft hover:-translate-y-0.5 bg-white"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <component.icon size={20} className="text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 mb-1">
                          {component.name}
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {component.description}
                        </div>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus size={16} className="text-primary-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* No Results */}
        {filteredComponents.every(cat => cat.items.length === 0) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">No components found</h3>
            <p className="text-xs text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Voice Commands Help */}
      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <h4 className="font-semibold text-sm mb-3 text-gray-900">Voice Commands</h4>
        <div className="grid grid-cols-1 gap-2">
          <div className="text-xs text-gray-600 bg-white px-3 py-2 rounded-lg">
            💬 "Add text generator"
          </div>
          <div className="text-xs text-gray-600 bg-white px-3 py-2 rounded-lg">
            🤖 "Add chatbot"
          </div>
          <div className="text-xs text-gray-600 bg-white px-3 py-2 rounded-lg">
            🎨 "Add image generator"
          </div>
          <div className="text-xs text-gray-600 bg-white px-3 py-2 rounded-lg">
            💾 "Save workflow"
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentLibrary
