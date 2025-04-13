import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, Shield, X, AlertCircle, Scan, CheckCircle } from 'lucide-react';

const PinModal = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  // For demo purposes, the correct PIN is "123456"
  const correctPin = "123456";

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Check if all PIN digits are filled
    if (pin.every(digit => digit !== '')) {
      // Verify PIN after all digits are entered
      verifyPin();
    }
  }, [pin]);

  const handleDigitChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Take only the last character if multiple are pasted
    setPin(newPin);
    setError('');

    // Move to next input if current input is filled
    if (value && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (pin[index] === '' && index > 0) {
        setActiveInput(index - 1);
        inputRefs.current[index - 1].focus();
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyPin = () => {
    const enteredPin = pin.join('');
    
    setIsScanning(true);
    setError('');
    
    // Simulate verification process
    setTimeout(() => {
      setIsScanning(false);
      
      if (enteredPin === correctPin) {
        setIsVerified(true);
        
        // After showing success message, proceed
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setError('Invalid security PIN. Please try again.');
        setPin(['', '', '', '', '', '']);
        setActiveInput(0);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    }, 2500);
  };

  const handleClose = () => {
    // Reset the state
    setPin(['', '', '', '', '', '']);
    setActiveInput(0);
    setError('');
    setIsScanning(false);
    setIsVerified(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black"
          onClick={isScanning || isVerified ? null : handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3
          }}
          className="relative max-w-md w-full mx-4"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-700 rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Admin Security Verification</h3>
              </div>
              {!isScanning && !isVerified && (
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {isScanning ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mb-4"
                  >
                    <Scan className="h-16 w-16 text-blue-400" />
                  </motion.div>
                  <h4 className="text-lg font-medium text-gray-200 mb-2">Verifying Security Credentials</h4>
                  <p className="text-gray-400 text-center">Please wait while we verify your administrator access...</p>
                  
                  {/* Progress bar */}
                  <div className="w-full max-w-xs mt-6 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, ease: "linear" }}
                      className="bg-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ) : isVerified ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="mb-4 bg-blue-500/20 p-3 rounded-full"
                  >
                    <CheckCircle className="h-12 w-12 text-blue-400" />
                  </motion.div>
                  <h4 className="text-lg font-medium text-blue-300 mb-2">Authentication Successful</h4>
                  <p className="text-gray-300 text-center">Administrator access granted. Redirecting to dashboard...</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="bg-blue-500/10 mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4">
                      <KeyRound className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-200">Enter Security PIN</h4>
                    <p className="text-gray-400 mt-1">Please enter your 6-digit administrator PIN</p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md flex items-center"
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <div className="flex justify-center space-x-2 mb-6">
                    {pin.map((digit, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        <input
                          ref={el => inputRefs.current[index] = el}
                          type="text"
                          value={digit}
                          onChange={e => handleDigitChange(index, e.target.value)}
                          onKeyDown={e => handleKeyDown(index, e)}
                          onFocus={() => setActiveInput(index)}
                          maxLength={1}
                          className={`w-12 h-14 text-center text-xl font-bold bg-gray-700 border ${
                            activeInput === index ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-600'
                          } text-white rounded-md focus:outline-none transition-colors`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-gray-500 text-center text-sm">For enhanced security, this PIN changes every 24 hours</p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PinModal;