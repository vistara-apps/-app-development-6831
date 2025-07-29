import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Star, Download } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { v4 as uuidv4 } from 'uuid'

const templatesData = [
  {
    id: '1',
    name: 'Customer Support Chatbot',
    description: 'AI-powered chatbot that handles common customer inquiries and escalates complex issues to human agents.',
    category: 'Customer Service',
    difficulty: 'Beginner',
    rating: 4.8,
    downloads: 1234,
    components: ['Chatbot', 'Text Classifier', 'Database Query', 'Email Sender']
  },
  {
    id: '2',
    name: 'Social Media Content Generator',
    description: 'Generate engaging social media posts with images and captions for multiple platforms automatically.',
    category: 'Marketing',
    difficulty: 'Intermediate',
    rating: 4.6,
    downloads: 892,
    components: ['Text Generator', 'Image Generator', 'Content Scheduler', 'Platform Connector']
  },
  {
    id: '3',
    name: 'Email Marketing Automation',
    description: 'Personalized email campaigns with A/B testing, audience segmentation, and performance analytics.',
    category: 'Marketing',
    difficulty: 'Advanced',
    rating: 4.9,
    downloads: 567,
    components: ['Email Builder', 'Audience Segmenter', 'A/B Tester', 'Analytics Dashboard']
  },
  {
    id: '4', 
    name: 'Personal Task Assistant',
    description: 'Voice-controlled personal assistant that manages tasks, schedules, and reminders.',
    category: 'Productivity',
    difficulty: 'Beginner',
    rating: 4.7,
    downloads: 2103,
    components: ['Voice Recognition', 'Task Manager', 'Calendar Integration', 'Notification System']
  },
  {
    id: '5',
    name: 'Data Analysis Pipeline',
    description: 'Automated data processing and visualization pipeline for business intelligence.',
    category: 'Analytics',
    difficulty: 'Advanced',
    rating: 4.5,
    downloads: 445,
    components: ['Data Connector', 'Data Processor', 'Chart Generator', 'Report Builder']
  },
  {
    id: '6',
    name: 'Lead Generation Bot',
    description: 'Identify and qualify potential customers from various sources automatically.',
    category: 'Sales',
    difficulty: 'Intermediate',
    rating: 4.4,
    downloads: 678,
    components: ['Web Scraper', 'Lead Scorer', 'Email Validator', 'CRM Connector']
  }
]

const categories = ['All', 'Customer Service', 'Marketing', 'Productivity', 'Analytics', 'Sales']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

const TemplatesPage = () => {
  const { user, addWorkflow } = useUser()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || template.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const useTemplate = (template) => {
    if (!user) {
      alert('Please sign in to use templates')
      return
    }

    const newWorkflow = {
      id: uuidv4(),
      name: template.name,
      description: template.description,
      status: 'draft',
      lastUpdated: new Date().toISOString(),
      components: template.components.map((componentType, index) => ({
        id: `${Date.now()}-${index}`,
        type: componentType,
        name: componentType,
        config: {},
        position: { x: 100 + (index * 200), y: 100 }
      }))
    }

    addWorkflow(newWorkflow)
    navigate(`/workflow/${newWorkflow.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Workflow Templates</h1>
          <p className="text-gray-600">
            Jumpstart your AI projects with pre-built workflow templates.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search templates..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <select
                className="form-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                className="form-input"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="template-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    template.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {template.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Components:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.components.map((component, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{template.downloads}</span>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">{template.category}</span>
                </div>

                <button
                  onClick={() => useTemplate(template)}
                  className="btn btn-primary w-full"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplatesPage