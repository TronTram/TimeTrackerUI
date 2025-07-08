import { useState } from 'react'
import { Search, Plus, Edit, Archive, Copy, MoreVertical, X, Palette } from 'lucide-react'

interface ProjectManagementProps {
  onNavigate: (screen: string) => void
}

interface Project {
  id: string
  name: string
  description?: string
  color: string
  createdAt: Date
  lastUsed: Date
  totalTime: number // in seconds
  sessionCount: number
  isArchived: boolean
}

interface Tag {
  id: string
  name: string
  color: string
  usage: number
}

const ProjectManagement = ({ onNavigate }: ProjectManagementProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('active')
  const [showProjectMenu, setShowProjectMenu] = useState<string | null>(null)

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      color: '#2563EB',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date(),
      totalTime: 14520, // 4 hours 2 minutes
      sessionCount: 12,
      isArchived: false
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'iOS and Android app for time tracking',
      color: '#10B981',
      createdAt: new Date('2024-01-10'),
      lastUsed: new Date(Date.now() - 86400000),
      totalTime: 25200, // 7 hours
      sessionCount: 18,
      isArchived: false
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      description: 'Q1 digital marketing strategy and execution',
      color: '#F59E0B',
      createdAt: new Date('2024-01-05'),
      lastUsed: new Date(Date.now() - 172800000),
      totalTime: 10800, // 3 hours
      sessionCount: 8,
      isArchived: false
    },
    {
      id: '4',
      name: 'Legacy System Migration',
      color: '#8B5CF6',
      createdAt: new Date('2023-12-20'),
      lastUsed: new Date(Date.now() - 604800000),
      totalTime: 36000, // 10 hours
      sessionCount: 15,
      isArchived: true
    }
  ])

  const [tags] = useState<Tag[]>([
    { id: '1', name: 'Frontend', color: '#3B82F6', usage: 24 },
    { id: '2', name: 'Backend', color: '#10B981', usage: 18 },
    { id: '3', name: 'Design', color: '#F59E0B', usage: 15 },
    { id: '4', name: 'Research', color: '#8B5CF6', usage: 12 },
    { id: '5', name: 'Testing', color: '#EF4444', usage: 8 }
  ])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && !project.isArchived) ||
                         (selectedFilter === 'archived' && project.isArchived)
    
    return matchesSearch && matchesFilter
  })

  const sortedProjects = filteredProjects.sort((a, b) => {
    if (selectedFilter === 'recent') {
      return b.lastUsed.getTime() - a.lastUsed.getTime()
    }
    return b.lastUsed.getTime() - a.lastUsed.getTime() // Default to recent
  })

  const handleArchiveProject = (projectId: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, isArchived: !project.isArchived }
        : project
    ))
    setShowProjectMenu(null)
  }

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setProjects(projects.filter(project => project.id !== projectId))
    }
    setShowProjectMenu(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-slate mb-2">Projects</h1>
          <p className="text-secondary-slate-light">
            Organize your work into projects and track time efficiently
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-slate-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="input-search w-full"
          />
        </div>
        
        <div className="flex gap-2">
          {[
            { id: 'active', label: 'Active' },
            { id: 'archived', label: 'Archived' },
            { id: 'all', label: 'All' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-primary-blue text-white'
                  : 'bg-background-soft text-secondary-slate-light hover:text-primary-slate'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Create New Project Card */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="card-standard border-2 border-dashed border-gray-300 hover:border-primary-blue hover:bg-secondary-blue-pale transition-all group"
        >
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-primary-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors">
              <Plus size={24} className="text-primary-blue" />
            </div>
            <h3 className="font-semibold text-primary-slate mb-1">Create New Project</h3>
            <p className="text-sm text-secondary-slate-light">Start tracking time on a new project</p>
          </div>
        </button>

        {/* Project Cards */}
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className={`card-standard hover:shadow-lg transition-all group cursor-pointer ${
              project.isArchived ? 'opacity-60' : ''
            }`}
            style={{ borderLeftColor: project.color }}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h3 className="font-semibold text-primary-slate">{project.name}</h3>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowProjectMenu(showProjectMenu === project.id ? null : project.id)}
                  className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical size={16} />
                </button>
                
                {showProjectMenu === project.id && (
                  <div className="absolute right-0 top-full mt-1 bg-background-pure border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                    <button
                      onClick={() => {/* Handle edit */}}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-background-soft rounded-t-lg"
                    >
                      <Edit size={16} />
                      Edit Project
                    </button>
                    <button
                      onClick={() => {/* Handle duplicate */}}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-background-soft"
                    >
                      <Copy size={16} />
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleArchiveProject(project.id)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-background-soft"
                    >
                      <Archive size={16} />
                      {project.isArchived ? 'Restore' : 'Archive'}
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 text-error-red rounded-b-lg"
                    >
                      <X size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-secondary-slate-light mb-4 line-clamp-2">
                {project.description}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-lg font-semibold text-primary-slate font-timer">
                  {formatTime(project.totalTime)}
                </div>
                <div className="text-xs text-secondary-slate-light">Total Time</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-primary-slate">
                  {project.sessionCount}
                </div>
                <div className="text-xs text-secondary-slate-light">Sessions</div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-secondary-slate-light">
              Last used {formatDate(project.lastUsed)}
            </div>
          </div>
        ))}
      </div>

      {/* Popular Tags Section */}
      <div className="card-standard">
        <h3 className="text-lg font-semibold text-primary-slate mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color
              }}
            >
              {tag.name}
              <span className="text-xs opacity-70">({tag.usage})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onSave={(project) => {
            setProjects([...projects, project])
            setShowCreateModal(false)
          }}
        />
      )}
    </div>
  )
}

// Create Project Modal Component
interface CreateProjectModalProps {
  onClose: () => void
  onSave: (project: Project) => void
}

const CreateProjectModal = ({ onClose, onSave }: CreateProjectModalProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState('#2563EB')

  const colors = [
    '#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ]

  const handleSave = () => {
    if (!name.trim()) return

    const newProject: Project = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim() || undefined,
      color: selectedColor,
      createdAt: new Date(),
      lastUsed: new Date(),
      totalTime: 0,
      sessionCount: 0,
      isArchived: false
    }

    onSave(newProject)
  }

  return (
    <div className="fixed inset-0 bg-dark-elevated bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background-pure rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-slate">Create New Project</h2>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-primary-slate mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-standard w-full"
              placeholder="Enter project name"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-primary-slate mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-standard w-full h-20 resize-none"
              placeholder="Brief description of the project"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-primary-slate mb-3">
              Project Color
            </label>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'border-primary-slate scale-110'
                      : 'border-gray-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Live Preview */}
          <div className="p-4 bg-background-soft rounded-lg">
            <h4 className="text-sm font-medium text-secondary-slate-light mb-2">Preview</h4>
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="font-medium text-primary-slate">
                {name || 'Project Name'}
              </span>
            </div>
            {description && (
              <p className="text-sm text-secondary-slate-light mt-2">
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className={`btn-primary flex-1 ${
                !name.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Create Project
            </button>
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectManagement
