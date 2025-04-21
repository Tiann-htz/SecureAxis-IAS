import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Shield, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import LoginAlertModal from '../components/LoginAlertModal';
import PinModal from '../components/PinModal';
import AuthenticatorModal from '../components/AuthenticatorModal';
import OtpModal from '../components/OtpModal';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showAuthenticatorModal, setShowAuthenticatorModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentRole, setCurrentRole] = useState('');
  const [redirectPath, setRedirectPath] = useState('');

  // Built-in accounts for demo purposes
  const accounts = [
    { username: 'admin', password: '@secured_admin123', role: 'admin' },
    { username: 'manager', password: 'manager123', role: 'manager' },
    { username: 'employee', password: 'employee123', role: 'employee' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const account = accounts.find(acc => acc.username === username && acc.password === password);
      
      if (account) {
        // Set role 
        setCurrentRole(account.role);
        
        // Set redirect path based on role
        if (account.role === 'admin') {
          setRedirectPath('/admin-dashboard');
          // For admin role, show PIN verification first
          setShowPinModal(true);
          setIsLoading(false);
        } else if (account.role === 'manager') {
          setRedirectPath('/manager-dashboard');
          // Show Authenticator modal for manager
          setShowAuthenticatorModal(true);
          setIsLoading(false);
        } else if (account.role === 'employee') {
          setRedirectPath('/employee-dashboard');
          // Show OTP modal for employee
          setShowOtpModal(true);
          setIsLoading(false);
        }
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
  };

  const continueAsGuest = () => {
    // Set role to guest and redirect path
    setCurrentRole('guest');
    setRedirectPath('/guest-dashboard');
    
    // Show the guest alert modal (without scanning)
    setShowAlert(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle PIN verification success
  const handlePinSuccess = () => {
    setShowPinModal(false);
    // Show login success alert after PIN verification
    setShowAlert(true);
  };

  // Handle pin modal close (on cancel)
  const handlePinModalClose = () => {
    setShowPinModal(false);
    setIsLoading(false);
  };

  // Handle Authenticator verification success
  const handleAuthenticatorSuccess = () => {
    setShowAuthenticatorModal(false);
    // Show login success alert after authenticator verification
    setShowAlert(true);
  };

  // Handle Authenticator modal close (on cancel)
  const handleAuthenticatorModalClose = () => {
    setShowAuthenticatorModal(false);
    setIsLoading(false);
  };

  // Handle OTP verification success
  const handleOtpSuccess = () => {
    setShowOtpModal(false);
    // Show login success alert after OTP verification
    setShowAlert(true);
  };

  // Handle OTP modal close (on cancel)
  const handleOtpModalClose = () => {
    setShowOtpModal(false);
    setIsLoading(false);
  };

  // Handle modal close and navigation
  const handleModalClose = () => {
    setShowAlert(false);
    setIsLoading(false);
    
    // Only navigate if we have a redirect path
    if (redirectPath) {
      router.push(redirectPath);
      // Reset the redirect path
      setRedirectPath('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center">
      <Head>
        <title>Login | SecureAxis</title>
        <meta name="description" content="SecureAxis login page" />
      </Head>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-blue-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Access your SecureAxis dashboard
            </p>
          </div>
          
          <div className="mt-8 bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-700">
            {error && (
              <div className="mb-4 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            <form id="login-form" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    placeholder="Username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 block w-full pl-10 pr-10 py-2 border border-gray-600 rounded-md leading-5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              
              <div className="relative flex items-center justify-center mt-4">
                <div className="border-t border-gray-600 w-full"></div>
                <div className="bg-gray-800 px-2 text-sm text-gray-400">or</div>
                <div className="border-t border-gray-600 w-full"></div>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={continueAsGuest}
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-gray-600
                  rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors
                  disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Continue as Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* PIN Verification Modal for Admin */}
      <PinModal 
        isOpen={showPinModal} 
        onClose={handlePinModalClose} 
        onSuccess={handlePinSuccess} 
      />

      {/* Authenticator Modal for Manager */}
      <AuthenticatorModal
        isOpen={showAuthenticatorModal}
        onClose={handleAuthenticatorModalClose}
        onSuccess={handleAuthenticatorSuccess}
      />

      {/* OTP Modal for Employee */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={handleOtpModalClose}
        onSuccess={handleOtpSuccess}
        userRole={currentRole}
      />

      {/* Success Alert Modal */}
      <LoginAlertModal 
        isOpen={showAlert} 
        onClose={handleModalClose} 
        userRole={currentRole} 
      />
    </div>
  );
}