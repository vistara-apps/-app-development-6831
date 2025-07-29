import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [workflows, setWorkflows] = useState([])

  const login = (userData) => {
    setUser(userData)
    // Load user's workflows
    const savedWorkflows = JSON.parse(localStorage.getItem(`workflows_${userData.email}`) || '[]')
    setWorkflows(savedWorkflows)
  }

  const logout = () => {
    setUser(null)
    setWorkflows([])
  }

  const addWorkflow = (workflow) => {
    const newWorkflows = [...workflows, workflow]
    setWorkflows(newWorkflows)
    if (user) {
      localStorage.setItem(`workflows_${user.email}`, JSON.stringify(newWorkflows))
    }
  }

  const updateWorkflow = (workflowId, updates) => {
    const updatedWorkflows = workflows.map(w => 
      w.id === workflowId ? { ...w, ...updates } : w
    )
    setWorkflows(updatedWorkflows)
    if (user) {
      localStorage.setItem(`workflows_${user.email}`, JSON.stringify(updatedWorkflows))
    }
  }

  const deleteWorkflow = (workflowId) => {
    const filteredWorkflows = workflows.filter(w => w.id !== workflowId)
    setWorkflows(filteredWorkflows)
    if (user) {
      localStorage.setItem(`workflows_${user.email}`, JSON.stringify(filteredWorkflows))
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      workflows,
      login,
      logout,
      addWorkflow,
      updateWorkflow,
      deleteWorkflow
    }}>
      {children}
    </UserContext.Provider>
  )
}