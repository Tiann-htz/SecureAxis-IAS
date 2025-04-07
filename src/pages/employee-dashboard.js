import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  User, Key, Shield, Settings, LogOut, Search, Bell, 
  FileText, Clock, AlertCircle, CheckCircle, XCircle, PlusCircle
} from 'lucide-react';

export default function EmployeeDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Mock data for access requests
  const [accessRequests, setAccessRequests] = useState([
    { id: 1, resource: 'Marketing Analytics Portal', requestDate: '2025-04-01', status: 'Approved', approvedBy: 'Jane Smith', accessUntil: '2025-06-30' },
    { id: 2, resource: 'Finance Documents Repository', requestDate: '2025-03-25', status: 'Pending', approvedBy: null, accessUntil: null },
    { id: 3, resource: 'Customer Database', requestDate: '2025-03-10', status: 'Denied', approvedBy: 'Robert Johnson', accessUntil: null },
    { id: 4, resource: 'Project Management Tool', requestDate: '2025-02-15', status: 'Approved', approvedBy: 'Emily Davis', accessUntil: '2025-12-31' },
  ]);

  // Mock data for authorized resources
  const authorizedResources = [
    { id: 1, name: 'Employee Portal', type: 'Application', accessLevel: 'Full', expiresOn: 'Never' },
    { id: 2, name: 'Marketing Analytics Portal', type: 'Dashboard', accessLevel: 'Read', expiresOn: '2025-06-30' },
    { id: 3, name: 'Project Management Tool', type: 'Application', accessLevel: 'Edit', expiresOn: '2025-12-31' },
    { id: 4, name: 'Company Documents', type: 'Repository', accessLevel: 'Read', expiresOn: 'Never' },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, action: 'Changed password', date: '2025-04-05', time: '09:23 AM' },
    { id: 2, action: 'Logged in from new device', date: '2025-04-03', time: '08:45 AM' },
    { id: 3, action: 'Requested access to Finance Documents Repository', date: '2025-03-25', time: '02:17 PM' },
    { id: 4, action: 'Updated profile information', date: '2025-03-20', time: '11:05 AM' },
  ];

  // Mock user profile data
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    role: 'Software Developer',
    manager: 'Jane Smith',
    lastLogin: '2025-04-07, 08:32 AM',
    mfa: true,
    passwordLastChanged: '2025-04-05'
  };

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = '/login';
  };

  // Function to determine status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-500/20 text-green-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'Denied': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Employee Dashboard | SecureAxis</title>
        <meta name="description" content="SecureAxis Employee Dashboard" />
      </Head>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="h-16 flex items-center px-4 border-b border-gray-700">
            <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V12C4 16.42 7.36 20.44 12 22C16.64 20.44 20 16.42 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor" />
              <path d="M12 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="ml-2 text-xl font-bold text-white">SecureAxis</span>
          </div>
          
          <nav className="flex-grow py-4">
            <div className="px-4 py-2 text-xs text-gray-400">MAIN</div>
            <a onClick={() => setSelectedTab('overview')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Shield className="mr-3 h-5 w-5" />
              Overview
            </a>
            <a onClick={() => setSelectedTab('resources')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'resources' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <FileText className="mr-3 h-5 w-5" />
              My Resources
            </a>
            <a onClick={() => setSelectedTab('requests')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'requests' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Clock className="mr-3 h-5 w-5" />
              Access Requests
            </a>
            <a onClick={() => setSelectedTab('security')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'security' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Key className="mr-3 h-5 w-5" />
              Security Settings
            </a>
            
            <div className="px-4 pt-6 pb-2 text-xs text-gray-400">ACCOUNT</div>
            <a onClick={() => setSelectedTab('profile')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <User className="mr-3 h-5 w-5" />
              My Profile
            </a>
            <a onClick={handleLogout} className="px-4 py-2 flex items-center text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </a>
          </nav>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="font-bold text-sm">J</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">{userProfile.name}</div>
                <div className="text-xs text-gray-400">{userProfile.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-white">Employee Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="bg-gray-700 text-gray-300 rounded-md pl-8 pr-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-500" />
              </div>
              <button className="relative p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
            {selectedTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Authorized Resources</p>
                        <p className="text-2xl font-bold text-white">{authorizedResources.length}</p>
                      </div>
                      <div className="bg-blue-500/10 rounded-full p-2">
                        <FileText className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Pending Requests</p>
                        <p className="text-2xl font-bold text-white">
                          {accessRequests.filter(req => req.status === 'Pending').length}
                        </p>
                      </div>
                      <div className="bg-yellow-500/10 rounded-full p-2">
                        <Clock className="h-6 w-6 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Security Score</p>
                        <p className="text-2xl font-bold text-white">85%</p>
                      </div>
                      <div className="bg-green-500/10 rounded-full p-2">
                        <Shield className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activities */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Recent Activities</h3>
                    <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                  </div>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="bg-gray-700/40 p-3 rounded-md border border-gray-700">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mr-3">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{activity.action}</p>
                            <p className="text-xs text-gray-400">{activity.date} at {activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Security Tips */}
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <Shield className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Security Tips</h3>
                      <p className="text-sm text-blue-200 mb-3">Keep your account secure with these best practices:</p>
                      <ul className="text-sm text-blue-100 space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-blue-400" />
                          Use a strong, unique password that you don't use elsewhere
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-blue-400" />
                          Enable two-factor authentication for additional security
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-blue-400" />
                          Don't share your login information with others
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'resources' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Authorized Resources</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Request Access
                  </button>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search resources..."
                        className="bg-transparent text-sm focus:outline-none text-gray-300"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select className="bg-gray-700 text-sm rounded-md border border-gray-600 text-gray-300 px-2 py-1">
                        <option>All Types</option>
                        <option>Application</option>
                        <option>Dashboard</option>
                        <option>Repository</option>
                      </select>
                      <select className="bg-gray-700 text-sm rounded-md border border-gray-600 text-gray-300 px-2 py-1">
                        <option>All Access Levels</option>
                        <option>Read</option>
                        <option>Edit</option>
                        <option>Full</option>
                      </select>
                    </div>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Access Level</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Expires On</th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {authorizedResources.map((resource) => (
                        <tr key={resource.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{resource.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{resource.type}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              resource.accessLevel === 'Full' ? 'bg-green-500/20 text-green-400' :
                              resource.accessLevel === 'Edit' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {resource.accessLevel}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{resource.expiresOn}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-md hover:bg-blue-600/40 transition-colors">
                              Access
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {selectedTab === 'requests' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Access Requests</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Request
                  </button>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden mb-8">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-semibold">My Request History</h3>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Request Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Approved By</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Access Until</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {accessRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{request.resource}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{request.requestDate}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{request.approvedBy || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{request.accessUntil || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* New Request Form */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <h3 className="font-semibold mb-4">Request New Access</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Resource</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>-- Select Resource --</option>
                        <option>Finance Documents Repository</option>
                        <option>HR Portal</option>
                        <option>Customer Database</option>
                        <option>Sales Dashboard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Access Level</label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Read</option>
                        <option>Edit</option>
                        <option>Full</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Justification</label>
                      <textarea 
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows="3"
                        placeholder="Explain why you need access to this resource..."
                      ></textarea>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Needed Until</label>
                        <input 
                          type="date" 
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Business Purpose</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          <option>Project Work</option>
                          <option>Reporting</option>
                          <option>Analysis</option>
                          <option>Maintenance</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {selectedTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                
                {/* Password Settings */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Password Settings</h3>
                    <span className="text-xs text-gray-400">Last changed: {userProfile.passwordLastChanged}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="pt-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Two-Factor Authentication */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${userProfile.mfa ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {userProfile.mfa ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">
                    Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.
                  </p>
                  
                  {userProfile.mfa ? (
                    <button className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-md hover:bg-red-600/30 transition-colors">
                      Disable Two-Factor Authentication
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/30 rounded-md hover:bg-green-600/30 transition-colors">
                        Enable Two-Factor Authentication
                    </button>
                  )}
                </div>
                
                {/* Login Devices */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
                  <h3 className="font-semibold mb-4">Login Devices</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-700/40 p-3 rounded-md border border-gray-700 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">MacBook Pro (Current Device)</p>
                          <p className="text-xs text-gray-400">Last active: Today, 08:32 AM</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Active</span>
                    </div>
                    
                    <div className="bg-gray-700/40 p-3 rounded-md border border-gray-700 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">iPhone 15 Pro</p>
                          <p className="text-xs text-gray-400">Last active: Yesterday, 03:14 PM</p>
                        </div>
                      </div>
                      <button className="px-2 py-1 text-xs rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                        Revoke
                      </button>
                    </div>
                    
                    <div className="bg-gray-700/40 p-3 rounded-md border border-gray-700 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-500/20 text-gray-400 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Windows Desktop</p>
                          <p className="text-xs text-gray-400">Last active: April 2, 2025, 10:45 AM</p>
                        </div>
                      </div>
                      <button className="px-2 py-1 text-xs rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Activity Alerts */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <h3 className="font-semibold mb-4">Activity Alerts</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <LogOut className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-300">Login from new device</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Key className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-300">Password changes</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Shield className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-300">Security settings changes</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-300">Access request status changes</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Bell className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-300">Access expiration reminders</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                
                {/* User Info */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-green-600 flex items-center justify-center text-3xl font-bold">
                        J
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold">{userProfile.name}</h3>
                      <p className="text-gray-400">{userProfile.email}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm bg-blue-900/30 text-blue-400 px-2 py-1 rounded-md">{userProfile.role}</span>
                        <span className="mx-2 text-gray-600">•</span>
                        <span className="text-sm text-gray-400">{userProfile.department}</span>
                      </div>
                      <div className="mt-4 text-sm text-gray-400">
                        <div className="flex items-center mb-1">
                          <span className="mr-2">Manager:</span>
                          <span className="text-white">{userProfile.manager}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">Last Login:</span>
                          <span className="text-white">{userProfile.lastLogin}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <button className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-md hover:bg-blue-600/30 transition-colors">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Profile Details Form */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <h3 className="font-semibold mb-4">Profile Details</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={userProfile.name}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={userProfile.email}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                        <input 
                          type="text" 
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={userProfile.department}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                        <input 
                          type="text" 
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          value={userProfile.role}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Office Location</label>
                        <input 
                          type="text" 
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter your office location"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                      <textarea 
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows="3"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 p-4 text-sm text-gray-400 text-center">
            <p>&copy; 2025 SecureAxis. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}