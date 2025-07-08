import { useState, useEffect } from 'react'
import { Play, Pause, Square, Settings, Volume2, VolumeX, SkipForward } from 'lucide-react'

interface PomodoroTimerProps {
  onNavigate: (screen: string) => void
}

type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak'
type PomodoroState = 'idle' | 'running' | 'paused' | 'completed'

interface PomodoroSession {
  phase: PomodoroPhase
  duration: number // in minutes
  completed: number
  total: number
}

const PomodoroTimer = ({ onNavigate }: PomodoroTimerProps) => {
  const [state, setState] = useState<PomodoroState>('idle')
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [currentSession, setCurrentSession] = useState<PomodoroSession>({
    phase: 'work',
    duration: 25,
    completed: 0,
    total: 4
  })
  const [isPomodoroMode, setIsPomodoroMode] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [selectedSound, setSelectedSound] = useState('rain')
  const [volume, setVolume] = useState(50)
  const [showSettings, setShowSettings] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)

  // Settings
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    cyclesBeforeLongBreak: 4
  })

  const sounds = [
    { id: 'rain', name: 'Rain', emoji: '🌧️' },
    { id: 'forest', name: 'Forest', emoji: '🌲' },
    { id: 'whitenoise', name: 'White Noise', emoji: '⚪' },
    { id: 'silence', name: 'Silence', emoji: '🔇' }
  ]

  // Timer effect
  useEffect(() => {
    let interval: any
    if (state === 'running') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [state])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPhaseColor = (phase: PomodoroPhase) => {
    switch (phase) {
      case 'work': return '#EF4444'
      case 'shortBreak': return '#22C55E'
      case 'longBreak': return '#3B82F6'
    }
  }

  const getPhaseLabel = (phase: PomodoroPhase) => {
    switch (phase) {
      case 'work': return 'Focus Session'
      case 'shortBreak': return 'Short Break'
      case 'longBreak': return 'Long Break'
    }
  }

  const handleStart = () => {
    setState('running')
  }

  const handlePause = () => {
    setState('paused')
  }

  const handleResume = () => {
    setState('running')
  }

  const handleStop = () => {
    setState('idle')
    setTimeLeft(currentSession.duration * 60)
  }

  const handleSkip = () => {
    handlePhaseComplete()
  }

  const handlePhaseComplete = () => {
    setState('completed')
    
    if (currentSession.phase === 'work') {
      const newCompleted = currentSession.completed + 1
      
      if (newCompleted === settings.cyclesBeforeLongBreak) {
        // Long break time
        setCurrentSession({
          phase: 'longBreak',
          duration: settings.longBreakDuration,
          completed: 0,
          total: 4
        })
        setTimeLeft(settings.longBreakDuration * 60)
        setCompletedCycles(prev => prev + 1)
      } else {
        // Short break time
        setCurrentSession({
          phase: 'shortBreak',
          duration: settings.shortBreakDuration,
          completed: newCompleted,
          total: 4
        })
        setTimeLeft(settings.shortBreakDuration * 60)
      }
    } else {
      // Back to work
      setCurrentSession({
        phase: 'work',
        duration: settings.workDuration,
        completed: currentSession.completed,
        total: 4
      })
      setTimeLeft(settings.workDuration * 60)
    }
    
    setState('idle')
  }

  const progress = ((currentSession.duration * 60 - timeLeft) / (currentSession.duration * 60)) * 100

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header with Mode Toggle */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-background-muted rounded-full p-1 mb-6">
          <button
            onClick={() => setIsPomodoroMode(false)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              !isPomodoroMode 
                ? 'bg-background-pure text-primary-slate shadow-sm' 
                : 'text-secondary-slate-light hover:text-primary-slate'
            }`}
          >
            Regular Timer
          </button>
          <button
            onClick={() => setIsPomodoroMode(true)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              isPomodoroMode 
                ? 'bg-background-pure text-primary-slate shadow-sm' 
                : 'text-secondary-slate-light hover:text-primary-slate'
            }`}
          >
            Pomodoro Mode
          </button>
        </div>

        {isPomodoroMode && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-primary-slate mb-2">
              {getPhaseLabel(currentSession.phase)} {currentSession.phase === 'work' ? `${currentSession.completed + 1} of ${currentSession.total}` : ''}
            </h2>
            <p className="text-secondary-slate-light">
              {currentSession.phase === 'work' && 'Time to focus and get things done!'}
              {currentSession.phase === 'shortBreak' && "You've earned this break!"}
              {currentSession.phase === 'longBreak' && 'Excellent work! Take a longer break.'}
            </p>
          </div>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-12">
        <div className="relative inline-block">
          {/* Progress Ring */}
          <svg className="w-72 h-72 transform -rotate-90" viewBox="0 0 120 120">
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
              stroke={getPhaseColor(currentSession.phase)}
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
            <div className="text-center">
              <div className={`font-timer font-bold text-6xl tracking-tight mb-2 ${
                state === 'paused' ? 'opacity-70' : ''
              }`}>
                {formatTime(timeLeft)}
              </div>
              {isPomodoroMode && (
                <div className="text-sm text-secondary-slate-light">
                  {getPhaseLabel(currentSession.phase)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {state === 'idle' || state === 'completed' ? (
          <button
            onClick={handleStart}
            className="btn-timer-action flex items-center gap-3"
            style={{ backgroundColor: getPhaseColor(currentSession.phase) }}
          >
            <Play size={20} />
            Start {getPhaseLabel(currentSession.phase)}
          </button>
        ) : (
          <>
            <button
              onClick={state === 'paused' ? handleResume : handlePause}
              className="btn-primary flex items-center gap-2"
              style={{ backgroundColor: getPhaseColor(currentSession.phase) }}
            >
              {state === 'paused' ? <Play size={20} /> : <Pause size={20} />}
              {state === 'paused' ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleStop}
              className="btn-secondary flex items-center gap-2"
            >
              <Square size={20} />
              Stop
            </button>
            {isPomodoroMode && (
              <button
                onClick={handleSkip}
                className="btn-secondary flex items-center gap-2"
              >
                <SkipForward size={20} />
                Skip
              </button>
            )}
          </>
        )}
      </div>

      {/* Pomodoro Progress */}
      {isPomodoroMode && (
        <div className="card-standard mb-8">
          <h3 className="text-lg font-semibold text-primary-slate mb-4">Session Progress</h3>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: settings.cyclesBeforeLongBreak }).map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${
                  index < currentSession.completed 
                    ? 'bg-success-green' 
                    : index === currentSession.completed && currentSession.phase === 'work'
                    ? 'bg-focus-red'
                    : 'bg-background-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-slate font-timer mb-1">
              {completedCycles}
            </div>
            <div className="text-sm text-secondary-slate-light">
              Completed Cycles Today
            </div>
          </div>
        </div>
      )}

      {/* Sound Controls */}
      <div className="card-standard mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-slate">Ambient Sounds</h3>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`btn-icon ${soundEnabled ? 'text-primary-blue' : 'text-secondary-slate-light'}`}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        {soundEnabled && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {sounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => setSelectedSound(sound.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedSound === sound.id
                      ? 'border-primary-blue bg-secondary-blue-pale'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{sound.emoji}</div>
                  <div className="text-sm font-medium">{sound.name}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Volume2 size={16} className="text-secondary-slate-light" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-2 bg-background-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-secondary-slate-light w-8">{volume}</span>
            </div>
          </>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-standard text-center">
          <div className="text-2xl font-bold text-primary-slate font-timer mb-2">
            3:45:30
          </div>
          <div className="text-sm text-secondary-slate-light">
            Focus Time Today
          </div>
        </div>

        <div className="card-standard text-center">
          <div className="text-2xl font-bold text-primary-slate font-timer mb-2">
            12
          </div>
          <div className="text-sm text-secondary-slate-light">
            Sessions Completed
          </div>
        </div>

        <div className="card-standard text-center">
          <div className="text-2xl font-bold text-primary-slate font-timer mb-2">
            95%
          </div>
          <div className="text-sm text-secondary-slate-light">
            Completion Rate
          </div>
        </div>
      </div>

      {/* Settings Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowSettings(true)}
          className="w-14 h-14 bg-primary-blue text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

// Settings Modal Component
interface SettingsModalProps {
  settings: {
    workDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    cyclesBeforeLongBreak: number
  }
  onSave: (settings: any) => void
  onClose: () => void
}

const SettingsModal = ({ settings, onSave, onClose }: SettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    onSave(localSettings)
    onClose()
  }

  const handleReset = () => {
    const defaultSettings = {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      cyclesBeforeLongBreak: 4
    }
    setLocalSettings(defaultSettings)
  }

  return (
    <div className="fixed inset-0 bg-dark-elevated bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background-pure rounded-2xl p-8 w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-slate">Pomodoro Settings</h2>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary-slate mb-2">
              Work Duration: {localSettings.workDuration} minutes
            </label>
            <input
              type="range"
              min="15"
              max="60"
              value={localSettings.workDuration}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                workDuration: Number(e.target.value)
              })}
              className="w-full h-2 bg-background-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-slate mb-2">
              Short Break: {localSettings.shortBreakDuration} minutes
            </label>
            <input
              type="range"
              min="3"
              max="15"
              value={localSettings.shortBreakDuration}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                shortBreakDuration: Number(e.target.value)
              })}
              className="w-full h-2 bg-background-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-slate mb-2">
              Long Break: {localSettings.longBreakDuration} minutes
            </label>
            <input
              type="range"
              min="10"
              max="30"
              value={localSettings.longBreakDuration}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                longBreakDuration: Number(e.target.value)
              })}
              className="w-full h-2 bg-background-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-slate mb-2">
              Cycles before Long Break: {localSettings.cyclesBeforeLongBreak}
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={localSettings.cyclesBeforeLongBreak}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                cyclesBeforeLongBreak: Number(e.target.value)
              })}
              className="w-full h-2 bg-background-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="btn-primary flex-1">
              Save Changes
            </button>
            <button onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PomodoroTimer
