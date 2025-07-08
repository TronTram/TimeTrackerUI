import { useState } from 'react'
import LandingScreen from './screens/LandingScreen'
import TimerDashboard from './screens/TimerDashboard'
import PomodoroTimer from './screens/PomodoroTimer'
import ProjectManagement from './screens/ProjectManagement'
import Analytics from './screens/Analytics'
import AchievementHub from './screens/AchievementHub'

type Screen = 'landing' | 'timer' | 'pomodoro' | 'projects' | 'analytics' | 'achievements'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAuthentication = () => {
    setIsAuthenticated(true)
    setCurrentScreen('timer')
  }

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  if (!isAuthenticated) {
    return <LandingScreen onAuthenticated={handleAuthentication} />
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'timer':
        return <TimerDashboard onNavigate={navigateToScreen} />
      case 'pomodoro':
        return <PomodoroTimer onNavigate={navigateToScreen} />
      case 'projects':
        return <ProjectManagement onNavigate={navigateToScreen} />
      case 'analytics':
        return <Analytics onNavigate={navigateToScreen} />
      case 'achievements':
        return <AchievementHub onNavigate={navigateToScreen} />
      default:
        return <TimerDashboard onNavigate={navigateToScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-background-soft">
      {/* Navigation Bar */}
      <nav className="bg-background-pure border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-primary-slate">Time Tracker</h1>
            <div className="flex space-x-1">
              <button
                onClick={() => navigateToScreen('timer')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentScreen === 'timer'
                    ? 'bg-primary-blue text-white'
                    : 'text-secondary-slate-light hover:text-primary-slate hover:bg-background-soft'
                }`}
              >
                Timer
              </button>
              <button
                onClick={() => navigateToScreen('pomodoro')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentScreen === 'pomodoro'
                    ? 'bg-primary-blue text-white'
                    : 'text-secondary-slate-light hover:text-primary-slate hover:bg-background-soft'
                }`}
              >
                Pomodoro
              </button>
              <button
                onClick={() => navigateToScreen('projects')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentScreen === 'projects'
                    ? 'bg-primary-blue text-white'
                    : 'text-secondary-slate-light hover:text-primary-slate hover:bg-background-soft'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => navigateToScreen('analytics')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentScreen === 'analytics'
                    ? 'bg-primary-blue text-white'
                    : 'text-secondary-slate-light hover:text-primary-slate hover:bg-background-soft'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => navigateToScreen('achievements')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentScreen === 'achievements'
                    ? 'bg-primary-blue text-white'
                    : 'text-secondary-slate-light hover:text-primary-slate hover:bg-background-soft'
                }`}
              >
                Achievements
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn-icon">
              <span className="text-sm">👤</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {renderScreen()}
      </main>
    </div>
  )
}

export default App
