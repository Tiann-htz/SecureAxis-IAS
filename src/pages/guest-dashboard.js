import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Shield, Lock, Info, Search, ChevronRight, AlertTriangle, ExternalLink } from 'lucide-react';

export default function GuestDashboard() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [sessionTime, setSessionTime] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    // Update the clock
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Session countdown timer
    const sessionInterval = setInterval(() => {
      setSessionTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(sessionInterval);
          // In a real app, you would redirect to login page here
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(sessionInterval);
    };
  }, []);

  // Format session time as MM:SS
  const formatSessionTime = () => {
    const minutes = Math.floor(sessionTime / 60);
    const seconds = sessionTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const documentationItems = [
    { title: "System Overview", description: "Learn about SecureAxis facial scanning technology", icon: <Info size={18} /> },
    { title: "Data Privacy Policy", description: "How we protect and handle biometric data", icon: <Lock size={18} /> },
    { title: "Security Protocols", description: "Our approach to securing facial recognition data", icon: <Shield size={18} /> },
    { title: "Guest User Guide", description: "Making the most of your guest access", icon: <Info size={18} /> },
  ];

  const filteredDocumentation = documentationItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // SecureAxis Logo component with guest theme colors
  const SecureAxisLogo = () => (
    <div className="flex items-center">
      <Shield className="h-6 w-6 text-stone-600 mr-2" />
      <div className="font-medium text-stone-700">
        Secure<span className="text-stone-500">Axis</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Head>
        <title>Guest Access | SecureAxis</title>
        <meta name="description" content="SecureAxis guest portal" />
      </Head>

      {/* Header with session timer */}
      <header className="bg-stone-200 border-b border-stone-300 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <SecureAxisLogo />
            <span className="ml-2 px-2 py-1 text-xs bg-stone-300 text-stone-600 rounded-md">
              Guest Mode
            </span>
          </div>
          <div className="flex items-center text-sm text-stone-600">
            <div className="mr-4">
              <span>Current time: {currentTime}</span>
            </div>
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-1" />
              <span className={`${sessionTime < 300 ? 'text-red-600 font-medium' : ''}`}>
                Session expires in: {formatSessionTime()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Welcome banner */}
        {welcomeOpen && (
          <div className="mb-6 bg-gradient-to-br from-stone-200 to-stone-300 border border-stone-300 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <Shield className="h-10 w-10 text-stone-600 mt-1" />
                <div>
                  <h2 className="text-lg font-medium text-stone-700">Welcome to Guest Access</h2>
                  <p className="text-stone-600 mt-1">
                    You have limited access to SecureAxis resources. Explore available documentation about our facial recognition system.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setWelcomeOpen(false)}
                className="text-stone-500 hover:text-stone-700"
                aria-label="Close welcome message"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-stone-200 p-6">
              <h2 className="text-xl font-medium text-stone-700 mb-4">Available Documentation</h2>
              
              {/* Search bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  className="bg-stone-50 border border-stone-300 text-stone-700 pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-stone-400 shadow-inner"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Documentation list */}
              <div className="space-y-4">
                {filteredDocumentation.length > 0 ? (
                  filteredDocumentation.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-4 border border-stone-200 rounded-md hover:bg-stone-50 transition-colors cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="p-2 bg-stone-100 rounded-full mr-4 shadow-inner">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-stone-700 font-medium">{item.title}</h3>
                        <p className="text-stone-500 text-sm">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-stone-400" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-stone-500">
                    No documentation found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request access card */}
            <div className="bg-white rounded-lg shadow-lg border border-stone-200 p-6">
              <h3 className="text-lg font-medium text-stone-700 mb-3">Need More Access?</h3>
              <p className="text-stone-600 text-sm mb-4">
                Request elevated privileges to access more features of the SecureAxis facial recognition system.
              </p>
              <Link 
                href="/access-request"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-stone-600 text-white rounded-md hover:bg-stone-700 transition-colors shadow-md hover:shadow-lg"
              >
                Request Access
              </Link>
            </div>
            
            {/* System status */}
            <div className="bg-white rounded-lg shadow-lg border border-stone-200 p-6">
              <h3 className="text-lg font-medium text-stone-700 mb-3">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-md">
                  <span className="text-stone-600 text-sm">Facial Recognition API</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2 shadow-sm"></span>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-md">
                  <span className="text-stone-600 text-sm">User Authentication</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2 shadow-sm"></span>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-md">
                  <span className="text-stone-600 text-sm">Data Processing</span>
                  <span className="flex items-center text-yellow-600 text-sm">
                    <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2 shadow-sm"></span>
                    Degraded
                  </span>
                </div>
              </div>
            </div>
            
            {/* Demo access notice */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 shadow-md">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-stone-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-stone-700 text-sm">Guest Account Limitations</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    This account provides read-only access to public documentation. No access to facial recognition data or system configuration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-stone-200 border-t border-stone-300 py-4 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-stone-600 text-sm mb-4 md:mb-0">
              © 2025 SecureAxis. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-stone-600 hover:text-stone-800 text-sm flex items-center">
                Privacy Policy <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link href="/terms" className="text-stone-600 hover:text-stone-800 text-sm flex items-center">
                Terms of Service <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link href="/contact" className="text-stone-600 hover:text-stone-800 text-sm flex items-center">
                Contact <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}