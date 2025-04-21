import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, CheckCircle, X, Loader, Shield, RefreshCw } from 'lucide-react';

const OtpModal = ({ isOpen, onClose, onSuccess, userRole }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef([]);

  // Mock OTP code - for presentation purposes only
  const mockCorrectOtp = ['1', '2', '3', '4'];

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (isOpen && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isOpen]);

  // Reset all states when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '']);
      setError('');
      setIsVerifying(false);
      setVerificationComplete(false);
      setTimeLeft(60);
    }
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      // If pasting a complete OTP
      const pastedValues = value.split('').slice(0, 4);
      const newOtp = [...otp];
      
      pastedValues.forEach((digit, i) => {
        if (i < 4) newOtp[i] = digit;
      });
      
      setOtp(newOtp);
      
      // Focus on the appropriate field
      if (pastedValues.length < 4 && inputRefs.current[pastedValues.length]) {
        inputRefs.current[pastedValues.length].focus();
      }
    } else {
      // For single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyOtp = () => {
    if (otp.some(digit => digit === '')) {
      setError('Please enter all digits');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    // Simulate verification process
    setTimeout(() => {
      if (otp.join('') === mockCorrectOtp.join('')) {
        setVerificationComplete(true);
        
        // After showing success state, call onSuccess
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setError('Invalid OTP code');
        setIsVerifying(false);
      }
    }, 1500);
  };

  const resendOtp = () => {
    // Reset OTP fields
    setOtp(['', '', '', '']);
    setError('');
    setTimeLeft(60);
    
    // Focus on first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black"
          onClick={() => !isVerifying && !verificationComplete && onClose()}
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-md w-full mx-4"
        >
          <div className="bg-gradient-to-br from-green-900/90 to-green-800/90 border border-green-500 rounded-lg shadow-xl overflow-hidden">
            {/* Header with icon */}
            <div className="bg-green-800/50 px-6 py-4 flex items-center justify-between border-b border-green-600/50">
              <div className="flex items-center">
                <motion.div
                  initial={{ rotate: -20, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mr-3"
                >
                  <Key className="h-6 w-6 text-green-400" />
                </motion.div>
                <h3 className="text-lg font-medium text-green-100">
                  Employee Verification
                </h3>
              </div>
              
              {!isVerifying && !verificationComplete && (
                <button
                  onClick={onClose}
                  className="text-green-300 hover:text-green-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="px-6 py-5">
              {/* Content */}
              <AnimatePresence mode="wait">
                {verificationComplete ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                      className="mx-auto mb-4 bg-green-500/20 rounded-full p-3 w-16 h-16 flex items-center justify-center"
                    >
                      <CheckCircle className="h-10 w-10 text-green-400" />
                    </motion.div>
                    <h4 className="text-xl font-medium text-green-200 mb-2">Verification Complete</h4>
                    <p className="text-green-300">Identity confirmed successfully!</p>
                  </motion.div>
                ) : isVerifying ? (
                  <motion.div
                    key="verifying"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-4"
                  >
                    <div className="mx-auto mb-4 flex justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      >
                        <Loader className="h-10 w-10 text-green-400" />
                      </motion.div>
                    </div>
                    <h4 className="text-xl font-medium text-green-200 mb-2">Verifying Code</h4>
                    <p className="text-green-300">Please wait while we verify your identity...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-green-200 mb-6">
                        We've sent a verification code to your registered mobile number. Please enter the 4-digit code below:
                      </p>
                    </motion.div>
                    
                    {/* OTP Input */}
                    <div className="flex justify-center gap-3 mb-6">
                      {otp.map((digit, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <input
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            maxLength={index === 0 ? 4 : 1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-14 bg-green-800/50 border-2 border-green-600 focus:border-green-400 text-center text-xl font-bold text-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all"
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Error message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-sm mb-4 text-center"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Verify button */}
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <button
                        onClick={verifyOtp}
                        disabled={otp.some(digit => digit === '')}
                        className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-700/50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Shield className="h-4 w-4" />
                        Verify Code
                      </button>
                    </motion.div>
                    
                    {/* Timer and resend */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 flex justify-between items-center text-sm text-green-300"
                    >
                      <span>Time remaining: {formatTime(timeLeft)}</span>
                      <button
                        onClick={resendOtp}
                        disabled={timeLeft > 0}
                        className="flex items-center gap-1 text-green-400 hover:text-green-300 disabled:text-green-700 disabled:cursor-not-allowed transition-colors"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Resend Code
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OtpModal;