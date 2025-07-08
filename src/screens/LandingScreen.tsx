import { useState } from 'react'
import { X, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

interface LandingScreenProps {
  onAuthenticated: () => void
}

interface AuthModalProps {
  type: 'login' | 'register' | 'reset'
  onClose: () => void
  onAuthenticated: () => void
  onSwitchType: (type: 'login' | 'register' | 'reset') => void
}

const AuthModal = ({ type, onClose, onAuthenticated, onSwitchType }: AuthModalProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validations, setValidations] = useState({
    emailValid: false,
    passwordValid: false,
    passwordsMatch: false
  })

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setTimeout(() => {
      setValidations(prev => ({ ...prev, emailValid: validateEmail(value) }))
    }, 300)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setTimeout(() => {
      setValidations(prev => ({ 
        ...prev, 
        passwordValid: validatePassword(value),
        passwordsMatch: type === 'register' ? value === confirmPassword : true
      }))
    }, 300)
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    setTimeout(() => {
      setValidations(prev => ({ ...prev, passwordsMatch: password === value }))
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    onAuthenticated()
  }

  const canSubmit = () => {
    if (type === 'reset') return validateEmail(email)
    if (type === 'login') return validations.emailValid && password.length > 0
    return validations.emailValid && validations.passwordValid && validations.passwordsMatch
  }

  const getTitle = () => {
    switch (type) {
      case 'login': return 'Welcome Back'
      case 'register': return 'Create Your Account'
      case 'reset': return 'Reset Password'
    }
  }

  return (
    <div className="fixed inset-0 bg-dark-elevated bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-background-pure rounded-3xl p-8 w-full max-w-md mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-primary-slate tracking-tight">
            {getTitle()}
          </h2>
          <button
            onClick={onClose}
            className="btn-icon"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary-slate">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="input-standard w-full pr-10"
                placeholder="Enter your email"
                autoFocus
              />
              {email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validations.emailValid ? (
                    <CheckCircle size={20} className="text-success-green" />
                  ) : (
                    <AlertCircle size={20} className="text-error-red" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Password Field */}
          {type !== 'reset' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-slate">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="input-standard w-full pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-slate-light hover:text-primary-slate"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password Field */}
          {type === 'register' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-slate">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  className="input-standard w-full pr-10"
                  placeholder="Confirm your password"
                />
                {confirmPassword && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validations.passwordsMatch ? (
                      <CheckCircle size={20} className="text-success-green" />
                    ) : (
                      <AlertCircle size={20} className="text-error-red" />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Remember Me */}
          {type === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue"
                />
                <span className="ml-2 text-sm text-secondary-slate-light">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() => onSwitchType('reset')}
                className="text-sm text-primary-blue hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit() || isLoading}
            className={`btn-primary w-full flex items-center justify-center ${
              (!canSubmit() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                {type === 'reset' ? 'Send Reset Link' : 
                 type === 'login' ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          {type === 'login' && (
            <p className="text-sm text-secondary-slate-light">
              Don't have an account?{' '}
              <button
                onClick={() => onSwitchType('register')}
                className="text-primary-blue hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          )}
          {type === 'register' && (
            <p className="text-sm text-secondary-slate-light">
              Already have an account?{' '}
              <button
                onClick={() => onSwitchType('login')}
                className="text-primary-blue hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          )}
          {type === 'reset' && (
            <button
              onClick={() => onSwitchType('login')}
              className="text-sm text-primary-blue hover:underline font-medium"
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const LandingScreen = ({ onAuthenticated }: LandingScreenProps) => {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'login' | 'register' | 'reset'>('register')

  const handleGetStarted = () => {
    setModalType('register')
    setShowModal(true)
  }

  const handleSignIn = () => {
    setModalType('login')
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-background-soft flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* Hero Section */}
        <div className="space-y-8">
          <h1 className="text-5xl font-bold text-primary-slate tracking-tight leading-tight">
            Transform Time Tracking Into a{' '}
            <span className="text-primary-blue">Productivity Ritual</span>
          </h1>
          
          <p className="text-xl text-secondary-slate-light max-w-2xl mx-auto leading-relaxed">
            A web-based time tracking app that transforms tedious logging into an engaging 
            productivity ritual by combining proven focus techniques with gamified motivation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={handleGetStarted}
              className="btn-primary-lg animate-breathing"
            >
              Get Started
            </button>
            <button
              onClick={handleSignIn}
              className="btn-secondary-lg"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-standard text-center">
            <div className="w-16 h-16 bg-accent-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="text-lg font-semibold text-primary-slate mb-2">
              Smart Timer
            </h3>
            <p className="text-secondary-slate-light text-sm">
              Advanced Pomodoro techniques with intelligent break suggestions
            </p>
          </div>

          <div className="card-standard text-center">
            <div className="w-16 h-16 bg-accent-green rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-primary-slate mb-2">
              Analytics
            </h3>
            <p className="text-secondary-slate-light text-sm">
              Deep insights into your productivity patterns and trends
            </p>
          </div>

          <div className="card-standard text-center">
            <div className="w-16 h-16 bg-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-primary-slate mb-2">
              Gamification
            </h3>
            <p className="text-secondary-slate-light text-sm">
              Achievement system that makes time tracking engaging and rewarding
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showModal && (
        <AuthModal
          type={modalType}
          onClose={() => setShowModal(false)}
          onAuthenticated={onAuthenticated}
          onSwitchType={setModalType}
        />
      )}
    </div>
  )
}

export default LandingScreen
