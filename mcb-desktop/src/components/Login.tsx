import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Extend Window interface for Google API
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'institute'>('student');
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google Sign-In
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
          callback: handleCredentialResponse,
          use_fedcm_for_prompt: false,
        });
        const buttonElement = document.getElementById('google-signin-button');
        if (buttonElement) {
          window.google.accounts.id.renderButton(
            buttonElement,
            {
              theme: 'outline',
              size: 'large',
              shape: 'rectangular',
              width: '100%',
              text: 'continue_with'
            }
          );
        }
      }
    };

    // Load Google API script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    setTimeout(() => {
      window.location.href = `${process.env.REACT_APP_API_BASE_URL}/login/google`;
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSignup) {
      // Signup validation
      if (!firstName.trim() || !lastName.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Simulate signup
      setTimeout(() => {
        alert('Account created successfully! You can now log in.');
        setIsSignup(false);
        setFirstName('');
        setLastName('');
        setPassword('');
        setConfirmPassword('');
        setLoading(false);
      }, 1000);
    } else {
      // Login
      setTimeout(() => {
        if (userType === 'student') {
          if (email === 'student@mcb.edu' && password === 'student') {
            localStorage.setItem('mockUser', JSON.stringify({
              email: 'student@mcb.edu',
              name: 'Demo Student',
              type: 'student'
            }));
            navigate('/dashboard');
          } else {
            setError('Invalid credentials. Try student@mcb.edu / student');
          }
        } else {
          if (email === 'admin@mcb.edu' && password === 'admin') {
            localStorage.setItem('instituteAuth', JSON.stringify({
              email: 'admin@mcb.edu',
              name: 'Admin User',
              instituteName: 'MCB Institute'
            }));
            navigate('/institute');
          } else {
            setError('Invalid credentials. Try admin@mcb.edu / admin');
          }
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Left Side - Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-50 p-12 flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">MCB</span>
            </div>

            {/* Main message */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                Simplify your path to
                <br />
                college success
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Join thousands of students and institutes using MCB to streamline college applications.
              </p>

              {/* Benefits */}
              <div className="space-y-3 pt-4">
                {[
                  'Track all applications in one place',
                  'Never miss a deadline',
                  'Get AI-powered guidance',
                  'Connect with top colleges'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-700 text-sm italic mb-3">
              "MCB made my college application process so much easier. I got into my dream school!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-gray-900 text-sm font-semibold">Sarah Johnson</p>
                <p className="text-gray-500 text-xs">Stanford University, Class of 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">MCB</span>
            </div>

            {/* User Type Toggle */}
            <div className="mb-6">
              <div className="bg-gray-100 p-1 rounded-xl inline-flex w-full">
                <button
                  onClick={() => setUserType('student')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${userType === 'student'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setUserType('institute')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${userType === 'institute'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Institute
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isSignup
                  ? 'Get started with MCB today'
                  : 'Sign in to continue'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {isSignup && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {!isSignup && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isSignup ? 'Creating account...' : 'Signing in...'}
                  </span>
                ) : (
                  isSignup ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <div id="google-signin-button" className="hidden"></div>
            <button
              type="button"
              onClick={() => {
                if (window.google) {
                  handleCredentialResponse({});
                } else {
                  alert('Google Sign-In is not available. Please use email/password login.');
                }
              }}
              className="w-full mb-6 py-2.5 px-4 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Demo Credentials */}
            {!isSignup && (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-1.5">Demo Credentials:</p>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <p><strong>Student:</strong> student@mcb.edu / student</p>
                  <p><strong>Institute:</strong> admin@mcb.edu / admin</p>
                </div>
              </div>
            )}

            {/* Toggle */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isSignup ? (
                  <>Already have an account? <span className="font-semibold text-gray-900">Sign in</span></>
                ) : (
                  <>Don't have an account? <span className="font-semibold text-gray-900">Sign up</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;