import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Clock, CheckCircle, X, Loader, Shield, RefreshCw } from 'lucide-react';

const AuthenticatorModal = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef([]);

  // Mock correct code - for presentation purposes only
  const mockCorrectCode = ['1', '2', '3', '4', '5', '6'];

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  // Countdown timer for code expiration
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
      setCode(['', '', '', '', '', '']);
      setError('');
      setIsVerifying(false);
      setVerificationComplete(false);
      setTimeLeft(30);
    }
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      // If pasting a complete code
      const pastedValues = value.split('').slice(0, 6);
      const newCode = [...code];
      
      pastedValues.forEach((digit, i) => {
        if (i < 6) newCode[i] = digit;
      });
      
      setCode(newCode);
      
      // Focus on the appropriate field
      if (pastedValues.length < 6 && inputRefs.current[pastedValues.length]) {
        inputRefs.current[pastedValues.length].focus();
      }
    } else {
      // For single digit input
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1].focus();
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyCode = () => {
    if (code.some(digit => digit === '')) {
      setError('Please enter all digits');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    // Simulate verification process
    setTimeout(() => {
      if (code.join('') === mockCorrectCode.join('')) {
        setVerificationComplete(true);
        
        // After showing success state, call onSuccess
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setError('Invalid authenticator code');
        setIsVerifying(false);
      }
    }, 1500);
  };

  const refreshCode = () => {
    // Reset code fields and refocus
    setCode(['', '', '', '', '', '']);
    setError('');
    setTimeLeft(30);
    
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
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
          <div className="bg-gradient-to-br from-teal-900/90 to-teal-800/90 border border-teal-500 rounded-lg shadow-xl overflow-hidden">
            {/* Header with icon */}
            <div className="bg-teal-800/50 px-6 py-4 flex items-center justify-between border-b border-teal-600/50">
              <div className="flex items-center">
                <motion.div
                  initial={{ rotate: -20, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mr-3"
                >
                  <Smartphone className="h-6 w-6 text-teal-400" />
                </motion.div>
                <h3 className="text-lg font-medium text-teal-100">
                  Manager Authentication
                </h3>
              </div>
              
              {!isVerifying && !verificationComplete && (
                <button
                  onClick={onClose}
                  className="text-teal-300 hover:text-teal-100 transition-colors"
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
                      className="mx-auto mb-4 bg-teal-500/20 rounded-full p-3 w-16 h-16 flex items-center justify-center"
                    >
                      <CheckCircle className="h-10 w-10 text-teal-400" />
                    </motion.div>
                    <h4 className="text-xl font-medium text-teal-200 mb-2">Authentication Successful</h4>
                    <p className="text-teal-300">Manager identity confirmed successfully!</p>
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
                        <Loader className="h-10 w-10 text-teal-400" />
                      </motion.div>
                    </div>
                    <h4 className="text-xl font-medium text-teal-200 mb-2">Verifying Code</h4>
                    <p className="text-teal-300">Please wait while we verify your manager credentials...</p>
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
                      className="mb-6"
                    >
                      <div className="flex items-center mb-3">
                        <Clock className="h-5 w-5 text-teal-400 mr-2" />
                        <p className="text-teal-200 font-medium">Time-based verification required</p>
                      </div>
                      <p className="text-teal-300">
                        Please enter the 6-digit code from your SecureAxis Authenticator app to verify your manager access:
                      </p>
                    </motion.div>
                    
                    {/* Code Input */}
                    <div className="flex justify-center gap-2 mb-6">
                      {code.map((digit, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <input
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={index === 0 ? 6 : 1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-12 bg-teal-800/50 border-2 border-teal-600 focus:border-teal-400 text-center text-xl font-bold text-teal-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all"
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
                        onClick={verifyCode}
                        disabled={code.some(digit => digit === '')}
                        className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-700/50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Shield className="h-4 w-4" />
                        Verify Authentication
                      </button>
                    </motion.div>
                    
                    {/* Timer and refresh */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 flex justify-between items-center text-sm text-teal-300"
                    >
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Code expires in: {timeLeft}s</span>
                      </div>
                      <button
                        onClick={refreshCode}
                        className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Refresh Code
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

export default AuthenticatorModal;