import React, { useEffect, useState } from 'react';
import { CheckCircle, User, Shield, Users, Coffee, Scan, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginAlertModal = ({ isOpen, onClose, userRole, isWelcomeBack = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setScanComplete(false);
      
      // Only perform scanning animation if this is NOT the welcome back alert
      // and if the role is manager or employee
      if (!isWelcomeBack && (userRole === 'manager' || userRole === 'employee')) {
        // After scanning animation, show welcome message
        const scanTimer = setTimeout(() => {
          setScanComplete(true);
        }, 2500);
        
        // Auto close after scanning animation completes
        const closeTimer = setTimeout(() => {
          handleClose();
        }, 4000); // Give enough time to see completion
        
        return () => {
          clearTimeout(scanTimer);
          clearTimeout(closeTimer);
        };
      } else {
        // For admin, guest, or welcome back alerts, just show message
        const timer = setTimeout(() => {
          handleClose();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, userRole, isWelcomeBack]);

  const handleClose = () => {
    setIsAnimating(false);
    // Call the onClose callback after exit animation completes
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  // Role-specific settings with updated themes
  const roleConfig = {
    admin: {
      icon: <Shield className="h-12 w-12 text-blue-400" />,
      title: "Administrator Login Successful",
      message: "Welcome back, Administrator. Full system access granted.",
      color: "blue",
      bgGradient: "from-gray-800 to-gray-900",
      borderColor: "border-blue-600"
    },
    manager: {
      icon: <Users className="h-12 w-12 text-teal-400" />,
      scanningTitle: "Verifying Manager Credentials",
      scanningMessage: "Validating team management permissions...",
      title: "Manager Login Successful",
      message: "Welcome back, Manager. Your team dashboard is ready.",
      color: "teal",
      bgGradient: "from-teal-900/90 to-teal-800/90",
      borderColor: "border-teal-500"
    },
    employee: {
      icon: <User className="h-12 w-12 text-green-400" />,
      scanningTitle: "Verifying Employee Access",
      scanningMessage: "Validating workspace permissions...",
      title: "Employee Login Successful",
      message: "Welcome back. Your workspace is ready.",
      color: "green",
      bgGradient: "from-green-900/90 to-green-800/90",
      borderColor: "border-green-500"
    },
    guest: {
      icon: <Coffee className="h-12 w-12 text-stone-600" />,
      title: "Guest Access Granted",
      message: "Welcome to the guest view. Limited access provided.",
      color: "gray",
      bgGradient: "from-gray-200/90 to-gray-300/90",
      borderColor: "border-gray-300"
    }
  };

  const config = roleConfig[userRole] || roleConfig.guest;
  
  // Handle welcome back or initial scanning based on props
  // If isWelcomeBack is true, skip scanning animation regardless of role
  const needsScanning = !isWelcomeBack && (userRole === 'manager' || userRole === 'employee') && !scanComplete;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black"
            onClick={handleClose}
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
            className="relative max-w-lg w-full"
          >
            <div className={`bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} rounded-lg shadow-xl p-6`}>
              <div className="flex items-start space-x-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                  className="flex-shrink-0"
                >
                  {needsScanning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    >
                      <Scan className={`h-12 w-12 text-${config.color}-400`} />
                    </motion.div>
                  ) : (
                    config.icon
                  )}
                </motion.div>
                <div className="flex-1">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center mb-2"
                  >
                    {needsScanning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="mr-2"
                      >
                        <Loader className={`h-5 w-5 text-${config.color}-400`} />
                      </motion.div>
                    ) : (
                      <CheckCircle className={`h-5 w-5 text-${config.color}-400 mr-2`} />
                    )}
                    <h3 className={`text-lg font-medium ${userRole === 'guest' ? 'text-gray-700' : `text-${config.color}-300`}`}>
                      {needsScanning ? config.scanningTitle : config.title}
                    </h3>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`${userRole === 'guest' ? 'text-gray-600' : 'text-gray-300'}`}
                  >
                    {needsScanning ? config.scanningMessage : config.message}
                  </motion.p>
                  
                  {/* Loading Progress Bar */}
                  <motion.div 
                    key={`progress-${userRole}-${scanComplete}-${isWelcomeBack}`}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`mt-4 w-full ${userRole === 'guest' ? 'bg-gray-300' : 'bg-gray-700'} rounded-full h-1.5 overflow-hidden`}
                  >
                    <motion.div 
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ 
                        duration: needsScanning ? 2.3 : 3, 
                        ease: "linear" 
                      }}
                      className={`bg-${config.color}-500 h-1.5 rounded-full`}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginAlertModal;