import { useState, useEffect } from 'react'
import { Play, Pause, Square, Clock, ChevronDown, Save, Wifi, WifiOff } from 'lucide-react'

interface TimerDashboardProps {
  onNavigate: (screen: string) => void
}

interface Project {
  id: string
  name: string
  color: string
  lastUsed: Date
}

const TimerDashboard = ({ onNavigate }: TimerDashboardProps) => {
  const [time, setTime] = useState(0) // in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProjectDropdown, setShowProjectDropdown] = useState(false)
  const [showManualEntry, setShowManualEntry] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [lastSaved, setLastSaved] = useState(Date.now())

  const [projects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', color: '#2563EB', lastUsed: new Date() },
    { id: '2', name: 'Mobile App', color: '#10B981', lastUsed: new Date(Date.now() - 86400000) },
    { id: '3', name: 'Marketing Campaign', color: '#F59E0B', lastUsed: new Date(Date.now() - 172800000) },
    { id: '4', name: 'Research Project', color: '#8B5CF6', lastUsed: new Date(Date.now() - 259200000) },
  ])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isPaused])

  // Auto-save effect
  useEffect(() => {
    if (isRunning) {
      const autoSaveInterval = setInterval(() => {
        setLastSaved(Date.now())
      }, 30000)
      return () => clearInterval(autoSaveInterval)
    }
  }, [isRunning])

  // Long session warning
  useEffect(() => {
    if (time >= 28800) { // 8 hours
      // Show warning notification
    }
  }, [time])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    if (isPaused) {
      setIsPaused(false)
    } else {
      setIsRunning(true)
    }
  }

  const handlePause = () => {
    setIsPaused(true)
  }

  const handleStop = () => {
    setIsRunning(false)
    setIsPaused(false)
    setTime(0)
  }

  const progress = Math.min((time / 3600) * 100, 100) // Progress based on 1 hour sessions

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Network Status */}
      {!isOnline && (
        <div className="mb-6 p-4 bg-warning-amber bg-opacity-10 border border-warning-amber rounded-lg flex items-center gap-3">
          <WifiOff size={20} className="text-warning-amber" />
          <span className="text-warning-amber font-medium">Offline - Timer running locally</span>
        </div>
      )}

      {/* Main Timer Section */}
      <div className="text-center mb-12">
        {/* Timer Display */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Progress Ring */}
            <svg className="w-60 h-60 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#F1F5F9"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke={isRunning ? "#2563EB" : "#F1F5F9"}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>
            
            {/* Timer Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`font-timer font-bold text-timer-display tracking-timer ${
                isPaused ? 'opacity-70' : ''
              } ${isRunning && !isPaused ? 'animate-timer-pulse' : ''}`}>
                {formatTime(time)}
              </div>
            </div>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {!isRunning && !isPaused ? (
            <button
              onClick={handleStart}
              className="btn-timer-action flex items-center gap-3 animate-breathing"
              disabled={!selectedProject}
            >
              <Play size={20} />
              Start Timer
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="btn-primary flex items-center gap-2"
              >
                <Pause size={20} />
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={handleStop}
                className="btn-secondary flex items-center gap-2"
              >
                <Square size={20} />
                Stop
              </button>
            </>
          )}
        </div>

        {/* Auto-save Indicator */}
        {isRunning && (
          <div className="text-sm text-secondary-slate-light flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
            Last saved {Math.floor((Date.now() - lastSaved) / 1000)}s ago
          </div>
        )}
      </div>

      {/* Project Selection */}
      <div className="card-standard mb-8">
        <h3 className="text-lg font-semibold text-primary-slate mb-4">Project</h3>
        
        <div className="relative">
          <button
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="w-full input-standard flex items-center justify-between text-left"
          >
            {selectedProject ? (
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedProject.color }}
                />
                <span>{selectedProject.name}</span>
              </div>
            ) : (
              <span className="text-secondary-slate-light">Select a project...</span>
            )}
            <ChevronDown size={20} className="text-secondary-slate-light" />
          </button>

          {showProjectDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background-pure border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <div className="text-sm font-medium text-secondary-slate-light mb-2 px-3">
                  Recent Projects
                </div>
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project)
                      setShowProjectDropdown(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-soft transition-colors"
                  >
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="flex-1 text-left">{project.name}</span>
                    <span className="text-xs text-secondary-slate-light">
                      {project.lastUsed.toLocaleDateString()}
                    </span>
                  </button>
                ))}
                <hr className="my-2" />
                <button
                  onClick={() => onNavigate('projects')}
                  className="w-full text-left px-3 py-2 text-primary-blue hover:bg-secondary-blue-pale rounded-lg transition-colors"
                >
                  + Create New Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setShowManualEntry(true)}
          className="card-standard flex items-center gap-3 hover:shadow-lg transition-shadow"
        >
          <Clock size={24} className="text-primary-blue" />
          <div className="text-left">
            <div className="font-semibold text-primary-slate">Manual Entry</div>
            <div className="text-sm text-secondary-slate-light">Add time manually</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('pomodoro')}
          className="card-standard flex items-center gap-3 hover:shadow-lg transition-shadow"
        >
          <div className="w-6 h-6 bg-focus-red rounded-full" />
          <div className="text-left">
            <div className="font-semibold text-primary-slate">Pomodoro Timer</div>
            <div className="text-sm text-secondary-slate-light">Focus sessions</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('analytics')}
          className="card-standard flex items-center gap-3 hover:shadow-lg transition-shadow"
        >
          <div className="w-6 h-6 bg-accent-green rounded-full" />
          <div className="text-left">
            <div className="font-semibold text-primary-slate">View Analytics</div>
            <div className="text-sm text-secondary-slate-light">Track progress</div>
          </div>
        </button>
      </div>

      {/* Today's Summary */}
      <div className="card-standard">
        <h3 className="text-lg font-semibold text-primary-slate mb-4">Today's Summary</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-slate font-timer">
              4:32:15
            </div>
            <div className="text-sm text-secondary-slate-light">Total Time</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-slate font-timer">
              8
            </div>
            <div className="text-sm text-secondary-slate-light">Sessions</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-slate">
              3
            </div>
            <div className="text-sm text-secondary-slate-light">Projects</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-secondary-slate-light">Daily Goal Progress</span>
            <span className="text-sm font-medium text-primary-slate">4h 32m / 6h</span>
          </div>
          <div className="progress-mini">
            <div 
              className="progress-mini-fill" 
              style={{ width: '76%' }}
            />
          </div>
        </div>
      </div>

      {/* Manual Time Entry Modal */}
      {showManualEntry && (
        <ManualEntryModal
          onClose={() => setShowManualEntry(false)}
          projects={projects}
        />
      )}
    </div>
  )
}

// Manual Entry Modal Component
interface ManualEntryModalProps {
  onClose: () => void
  projects: Project[]
}

const ManualEntryModal = ({ onClose, projects }: ManualEntryModalProps) => {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [description, setDescription] = useState('')

  const isValid = hours || minutes || seconds

  const handleSave = () => {
    // Handle save logic
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-dark-elevated bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background-pure rounded-2xl p-8 w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-slate">Manual Time Entry</h2>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium text-primary-slate mb-3">
              Time Duration
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="input-timer w-20"
                placeholder="00"
                min="0"
                max="23"
              />
              <span className="text-secondary-slate-light">h</span>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="input-timer w-20"
                placeholder="00"
                min="0"
                max="59"
              />
              <span className="text-secondary-slate-light">m</span>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="input-timer w-20"
                placeholder="00"
                min="0"
                max="59"
              />
              <span className="text-secondary-slate-light">s</span>
            </div>
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-primary-slate mb-3">
              Project
            </label>
            <select
              value={selectedProject?.id || ''}
              onChange={(e) => {
                const project = projects.find(p => p.id === e.target.value)
                setSelectedProject(project || null)
              }}
              className="input-standard w-full"
            >
              <option value="">Select a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-primary-slate mb-3">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-standard w-full h-20 resize-none"
              placeholder="What did you work on?"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!isValid || !selectedProject}
              className={`btn-primary flex-1 ${
                (!isValid || !selectedProject) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save size={16} className="mr-2" />
              Save Entry
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

export default TimerDashboard
