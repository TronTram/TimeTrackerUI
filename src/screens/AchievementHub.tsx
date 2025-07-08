import { useState } from 'react'
import { Trophy, Flame, Target, Star, Award, Calendar, TrendingUp, CheckCircle } from 'lucide-react'

interface AchievementHubProps {
  onNavigate: (screen: string) => void
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'consistency' | 'focus' | 'time' | 'projects'
  earned: boolean
  progress: number
  maxProgress: number
  earnedDate?: Date
}

const AchievementHub = ({ onNavigate }: AchievementHubProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentStreak, setCurrentStreak] = useState(15)
  const [longestStreak, setLongestStreak] = useState(28)

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first time tracking session',
      icon: '🏁',
      category: 'time',
      earned: true,
      progress: 1,
      maxProgress: 1,
      earnedDate: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Consistency Champion',
      description: 'Track time for 7 consecutive days',
      icon: '🏆',
      category: 'consistency',
      earned: true,
      progress: 7,
      maxProgress: 7,
      earnedDate: new Date('2024-01-22')
    },
    {
      id: '3',
      name: 'Focus Master',
      description: 'Complete 25 Pomodoro sessions',
      icon: '🎯',
      category: 'focus',
      earned: true,
      progress: 25,
      maxProgress: 25,
      earnedDate: new Date('2024-02-01')
    },
    {
      id: '4',
      name: 'Marathon Runner',
      description: 'Track 100 hours total',
      icon: '⏱️',
      category: 'time',
      earned: false,
      progress: 67,
      maxProgress: 100
    },
    {
      id: '5',
      name: 'Project Juggler',
      description: 'Work on 10 different projects',
      icon: '🤹',
      category: 'projects',
      earned: false,
      progress: 6,
      maxProgress: 10
    },
    {
      id: '6',
      name: 'Deep Work',
      description: 'Complete a 4-hour focused session',
      icon: '🧘',
      category: 'focus',
      earned: false,
      progress: 3.2,
      maxProgress: 4
    },
    {
      id: '7',
      name: 'Streak Legend',
      description: 'Maintain a 30-day tracking streak',
      icon: '🔥',
      category: 'consistency',
      earned: false,
      progress: 15,
      maxProgress: 30
    },
    {
      id: '8',
      name: 'Time Lord',
      description: 'Track 500 hours total',
      icon: '⚡',
      category: 'time',
      earned: false,
      progress: 67,
      maxProgress: 500
    }
  ]

  const categories = [
    { id: 'all', label: 'All', icon: Trophy },
    { id: 'consistency', label: 'Consistency', icon: Flame },
    { id: 'focus', label: 'Focus', icon: Target },
    { id: 'time', label: 'Time Tracking', icon: CheckCircle },
    { id: 'projects', label: 'Projects', icon: Star }
  ]

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  )

  const earnedCount = achievements.filter(a => a.earned).length
  const totalCount = achievements.length

  // Mock streak calendar data
  const streakData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    completed: i >= 15 // Last 15 days completed
  }))

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary-slate mb-2">Achievement Hub</h1>
        <p className="text-secondary-slate-light mb-6">
          Track your progress and unlock achievements as you build better time tracking habits
        </p>
        
        {/* Overall Progress */}
        <div className="inline-flex items-center gap-4 bg-background-pure rounded-2xl p-6 shadow-card">
          <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center">
            <Trophy size={32} className="text-white" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-primary-slate">
              {earnedCount} / {totalCount}
            </div>
            <div className="text-secondary-slate-light">Achievements Unlocked</div>
          </div>
        </div>
      </div>

      {/* Current Streak Section */}
      <div className="card-standard mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-slate">Current Streak</h2>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-slate font-timer">{currentStreak}</div>
              <div className="text-sm text-secondary-slate-light">Current</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-orange font-timer">{longestStreak}</div>
              <div className="text-sm text-secondary-slate-light">Best</div>
            </div>
          </div>
        </div>

        {/* Streak Calendar */}
        <div className="grid grid-cols-10 gap-2 mb-4">
          {streakData.map((day, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                day.completed
                  ? 'bg-success-green text-white'
                  : 'bg-background-muted text-secondary-slate-light'
              }`}
              title={day.date.toLocaleDateString()}
            >
              {day.date.getDate()}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success-green rounded" />
            <span className="text-secondary-slate-light">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-background-muted rounded" />
            <span className="text-secondary-slate-light">Missed</span>
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-standard">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-slate">Daily Goal</h3>
              <p className="text-sm text-secondary-slate-light">6 hours per day</p>
            </div>
          </div>
          <div className="progress-mini mb-2">
            <div className="progress-mini-fill" style={{ width: '75%' }} />
          </div>
          <div className="text-sm text-secondary-slate-light">4.5h / 6h today</div>
        </div>

        <div className="card-standard">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent-orange rounded-lg flex items-center justify-center">
              <Target size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-slate">Focus Sessions</h3>
              <p className="text-sm text-secondary-slate-light">8 sessions per day</p>
            </div>
          </div>
          <div className="progress-mini mb-2">
            <div className="progress-mini-fill" style={{ width: '62%' }} />
          </div>
          <div className="text-sm text-secondary-slate-light">5 / 8 sessions today</div>
        </div>

        <div className="card-standard">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent-green rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-slate">Weekly Target</h3>
              <p className="text-sm text-secondary-slate-light">40 hours per week</p>
            </div>
          </div>
          <div className="progress-mini mb-2">
            <div className="progress-mini-fill" style={{ width: '82%' }} />
          </div>
          <div className="text-sm text-secondary-slate-light">32.8h / 40h this week</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-blue text-white'
                  : 'bg-background-soft text-secondary-slate-light hover:text-primary-slate'
              }`}
            >
              <Icon size={16} />
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`card-standard transition-all hover:shadow-lg ${
              achievement.earned 
                ? 'border-success-green border-2 bg-success-green bg-opacity-5' 
                : 'opacity-75 hover:opacity-100'
            }`}
          >
            {/* Achievement Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`text-3xl ${!achievement.earned ? 'grayscale' : ''}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary-slate">{achievement.name}</h3>
                {achievement.earned && achievement.earnedDate && (
                  <div className="text-xs text-success-green font-medium">
                    Earned {achievement.earnedDate.toLocaleDateString()}
                  </div>
                )}
              </div>
              {achievement.earned && (
                <CheckCircle size={20} className="text-success-green" />
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-secondary-slate-light mb-4">
              {achievement.description}
            </p>

            {/* Progress */}
            {!achievement.earned && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary-slate-light">Progress</span>
                  <span className="text-sm font-medium text-primary-slate">
                    {achievement.maxProgress > 10 
                      ? Math.round(achievement.progress) 
                      : achievement.progress} / {achievement.maxProgress}
                  </span>
                </div>
                <div className="progress-mini">
                  <div 
                    className="progress-mini-fill" 
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {achievement.earned && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 text-success-green font-medium">
                  <Award size={16} />
                  <span>Achievement Unlocked!</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('timer')}
          className="btn-primary px-8 py-4 text-lg"
        >
          Continue Tracking Time
        </button>
      </div>
    </div>
  )
}

export default AchievementHub
