import { useState } from 'react'
import { TrendingUp, Clock, Target, BarChart3, Download, Calendar } from 'lucide-react'

interface AnalyticsProps {
  onNavigate: (screen: string) => void
}

const Analytics = ({ onNavigate }: AnalyticsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedView, setSelectedView] = useState('overview')

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'custom', label: 'Custom' }
  ]

  const views = [
    { id: 'overview', label: 'Overview' },
    { id: 'detailed', label: 'Detailed' },
    { id: 'projects', label: 'Projects' },
    { id: 'trends', label: 'Trends' }
  ]

  const mockData = {
    totalTime: '32h 45m',
    averageSession: '1h 23m',
    topProject: 'Website Redesign',
    completionRate: '94%',
    weeklyData: [
      { day: 'Mon', hours: 6.5 },
      { day: 'Tue', hours: 7.2 },
      { day: 'Wed', hours: 5.8 },
      { day: 'Thu', hours: 8.1 },
      { day: 'Fri', hours: 6.9 },
      { day: 'Sat', hours: 3.2 },
      { day: 'Sun', hours: 2.1 }
    ],
    projectData: [
      { name: 'Website Redesign', hours: 12.5, color: '#2563EB' },
      { name: 'Mobile App', hours: 8.3, color: '#10B981' },
      { name: 'Marketing', hours: 6.1, color: '#F59E0B' },
      { name: 'Research', hours: 5.8, color: '#8B5CF6' }
    ]
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-slate mb-2">Analytics</h1>
          <p className="text-secondary-slate-light">
            Track your productivity patterns and insights
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button className="btn-secondary flex items-center gap-2">
            <Download size={20} />
            Export
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Calendar size={20} />
            Custom Range
          </button>
        </div>
      </div>

      {/* Period and View Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-primary-blue text-white'
                  : 'bg-background-soft text-secondary-slate-light hover:text-primary-slate'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedView === view.id
                  ? 'bg-primary-blue text-white'
                  : 'bg-background-soft text-secondary-slate-light hover:text-primary-slate'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-stats bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <Clock size={24} className="opacity-80" />
            <TrendingUp size={20} className="opacity-60" />
          </div>
          <div className="text-3xl font-bold font-timer mb-1">{mockData.totalTime}</div>
          <div className="text-blue-100 text-sm">Total Time This Week</div>
          <div className="text-blue-200 text-xs mt-2">+12% from last week</div>
        </div>

        <div className="card-stats bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target size={24} className="opacity-80" />
            <TrendingUp size={20} className="opacity-60" />
          </div>
          <div className="text-3xl font-bold font-timer mb-1">{mockData.averageSession}</div>
          <div className="text-green-100 text-sm">Average Session</div>
          <div className="text-green-200 text-xs mt-2">+5% from last week</div>
        </div>

        <div className="card-stats bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 size={24} className="opacity-80" />
            <TrendingUp size={20} className="opacity-60" />
          </div>
          <div className="text-2xl font-bold mb-1">{mockData.topProject}</div>
          <div className="text-purple-100 text-sm">Most Productive Project</div>
          <div className="text-purple-200 text-xs mt-2">12.5h this week</div>
        </div>

        <div className="card-stats bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target size={24} className="opacity-80" />
            <TrendingUp size={20} className="opacity-60" />
          </div>
          <div className="text-3xl font-bold font-timer mb-1">{mockData.completionRate}</div>
          <div className="text-orange-100 text-sm">Goal Completion</div>
          <div className="text-orange-200 text-xs mt-2">Above target</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Hours Chart */}
        <div className="card-standard">
          <h3 className="text-lg font-semibold text-primary-slate mb-6">Weekly Hours</h3>
          <div className="space-y-4">
            {mockData.weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm text-secondary-slate-light">{day.day}</div>
                <div className="flex-1 bg-background-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-primary-blue rounded-full transition-all duration-500"
                    style={{ width: `${(day.hours / 10) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-medium text-primary-slate text-right">
                  {day.hours}h
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Distribution */}
        <div className="card-standard">
          <h3 className="text-lg font-semibold text-primary-slate mb-6">Project Distribution</h3>
          <div className="space-y-4">
            {mockData.projectData.map((project, index) => (
              <div key={project.name} className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-primary-slate">
                      {project.name}
                    </span>
                    <span className="text-sm text-secondary-slate-light font-timer">
                      {project.hours}h
                    </span>
                  </div>
                  <div className="bg-background-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: project.color,
                        width: `${(project.hours / 15) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity Insights */}
      <div className="card-standard mb-8">
        <h3 className="text-lg font-semibold text-primary-slate mb-6">Productivity Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-info-blue bg-opacity-10 rounded-lg border border-info-blue border-opacity-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-info-blue rounded-full flex items-center justify-center">
                <Clock size={16} className="text-white" />
              </div>
              <h4 className="font-semibold text-primary-slate">Peak Hours</h4>
            </div>
            <p className="text-sm text-secondary-slate-light mb-2">
              You're most productive between 9 AM - 11 AM
            </p>
            <div className="text-xs text-info-blue font-medium">
              Consider scheduling important tasks during this time
            </div>
          </div>

          <div className="p-4 bg-success-green bg-opacity-10 rounded-lg border border-success-green border-opacity-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-success-green rounded-full flex items-center justify-center">
                <TrendingUp size={16} className="text-white" />
              </div>
              <h4 className="font-semibold text-primary-slate">Improvement</h4>
            </div>
            <p className="text-sm text-secondary-slate-light mb-2">
              Session duration improved by 15% this week
            </p>
            <div className="text-xs text-success-green font-medium">
              Great progress on focus consistency!
            </div>
          </div>

          <div className="p-4 bg-warning-amber bg-opacity-10 rounded-lg border border-warning-amber border-opacity-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-warning-amber rounded-full flex items-center justify-center">
                <Target size={16} className="text-white" />
              </div>
              <h4 className="font-semibold text-primary-slate">Suggestion</h4>
            </div>
            <p className="text-sm text-secondary-slate-light mb-2">
              Try shorter break intervals for better focus
            </p>
            <div className="text-xs text-warning-amber font-medium">
              Experiment with 5-minute breaks
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="card-standard">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary-slate">Recent Sessions</h3>
          <button
            onClick={() => onNavigate('timer')}
            className="text-primary-blue hover:underline text-sm font-medium"
          >
            View All Sessions
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { project: 'Website Redesign', duration: '2h 15m', time: '2 hours ago', color: '#2563EB' },
            { project: 'Mobile App', duration: '1h 45m', time: '4 hours ago', color: '#10B981' },
            { project: 'Marketing Campaign', duration: '1h 30m', time: '6 hours ago', color: '#F59E0B' },
            { project: 'Research Project', duration: '45m', time: '8 hours ago', color: '#8B5CF6' }
          ].map((session, index) => (
            <div key={index} className="flex items-center gap-4 p-3 hover:bg-background-soft rounded-lg transition-colors">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: session.color }}
              />
              <div className="flex-1">
                <div className="font-medium text-primary-slate">{session.project}</div>
                <div className="text-sm text-secondary-slate-light">{session.time}</div>
              </div>
              <div className="font-timer font-medium text-primary-slate">
                {session.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
