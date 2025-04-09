import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Users, Shield, Settings, LogOut, User, Search, Bell, 
  Check, X, Clock, FileText, Clipboard, AlertTriangle
} from 'lucide-react';

export default function ManagerDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Mock data for team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', position: 'Developer', status: 'Active', project: 'Frontend' },
    { id: 2, name: 'Sarah Wilson', username: 'sarahw', email: 'sarah@example.com', position: 'Designer', status: 'Active', project: 'UI/UX' },
    { id: 3, name: 'Mike Johnson', username: 'mikej', email: 'mike@example.com', position: 'QA Engineer', status: 'Active', project: 'Testing' },
    { id: 4, name: 'Lisa Brown', username: 'lisab', email: 'lisa@example.com', position: 'Developer', status: 'On Leave', project: 'Backend' },
    { id: 5, name: 'David Chen', username: 'davidc', email: 'david@example.com', position: 'Tech Lead', status: 'Active', project: 'Architecture' },
  ]);

  // Mock data for pending requests
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, user: 'John Doe', requestType: 'Access to Finance Portal', requestedOn: '2025-04-05', status: 'Pending' },
    { id: 2, user: 'Sarah Wilson', requestType: 'VPN Access', requestedOn: '2025-04-06', status: 'Pending' },
    { id: 3, user: 'Mike Johnson', requestType: 'Leave Request', requestedOn: '2025-04-06', status: 'Pending' },
  ]);

  // Mock data for team stats - Updated the first stat color to teal
  const teamStats = [
    { title: 'Team Members', value: 5, icon: <Users className="h-8 w-8 text-teal-400" />, change: '+1', color: 'bg-teal-500/10' },
    { title: 'Active Projects', value: 3, icon: <FileText className="h-8 w-8 text-green-400" />, change: 'No change', color: 'bg-green-500/10' },
    { title: 'Pending Requests', value: pendingRequests.length, icon: <Clock className="h-8 w-8 text-yellow-400" />, change: '+2', color: 'bg-yellow-500/10' },
    { title: 'Dept Resources', value: 8, icon: <Clipboard className="h-8 w-8 text-purple-400" />, change: '+1', color: 'bg-purple-500/10' },
  ];

  // Mock data for recent department activities
  const recentActivities = [
    { id: 1, user: 'Mike Johnson', action: 'Completed code review for project Alpha', time: '1 hour ago', type: 'Work' },
    { id: 2, user: 'Sarah Wilson', action: 'Submitted new design mockups', time: '3 hours ago', type: 'Work' },
    { id: 3, user: 'John Doe', action: 'Deployed hotfix to production', time: '5 hours ago', type: 'Work' },
    { id: 4, user: 'David Chen', action: 'Updated architecture documentation', time: '1 day ago', type: 'Work' },
    { id: 5, user: 'Lisa Brown', action: 'Started sick leave', time: '2 days ago', type: 'Leave' },
  ];

  const handleApproveRequest = (requestId) => {
    setPendingRequests(pendingRequests.map(request => 
      request.id === requestId ? { ...request, status: 'Approved' } : request
    ));
  };

  const handleRejectRequest = (requestId) => {
    setPendingRequests(pendingRequests.map(request => 
      request.id === requestId ? { ...request, status: 'Rejected' } : request
    ));
  };

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Manager Dashboard | SecureAxis</title>
        <meta name="description" content="SecureAxis Manager Dashboard" />
      </Head>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="h-16 flex items-center px-4 border-b border-gray-700">
            <svg className="h-8 w-8 text-teal-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V12C4 16.42 7.36 20.44 12 22C16.64 20.44 20 16.42 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor" />
              <path d="M12 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="ml-2 text-xl font-bold text-white">SecureAxis</span>
          </div>
          
          <nav className="flex-grow py-4">
            <div className="px-4 py-2 text-xs text-gray-400">MANAGEMENT</div>
            <a onClick={() => setSelectedTab('overview')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'overview' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Shield className="mr-3 h-5 w-5" />
              Department Overview
            </a>
            <a onClick={() => setSelectedTab('team')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'team' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Users className="mr-3 h-5 w-5" />
              Team Management
            </a>
            <a onClick={() => setSelectedTab('requests')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'requests' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Clock className="mr-3 h-5 w-5" />
              Pending Requests
            </a>
            <a onClick={() => setSelectedTab('resources')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'resources' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Clipboard className="mr-3 h-5 w-5" />
              Department Resources
            </a>
            
            <div className="px-4 pt-6 pb-2 text-xs text-gray-400">ACCOUNT</div>
            <a onClick={() => setSelectedTab('profile')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'profile' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
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
                <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
                  <span className="font-bold text-sm">M</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">Jane Smith</div>
                <div className="text-xs text-gray-400">Marketing Manager</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-white">Manager Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-700 text-gray-300 rounded-md pl-8 pr-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
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
                <h2 className="text-2xl font-bold mb-6">Department Overview</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {teamStats.map((stat, index) => (
                    <div key={index} className={`${stat.color} border border-gray-700 rounded-lg p-6 shadow-lg`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <div>{stat.icon}</div>
                      </div>
                      <div className="mt-2 text-sm font-medium text-green-400">{stat.change} this week</div>
                    </div>
                  ))}
                </div>
                
                {/* Recent Activities */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Recent Department Activities</h3>
                    <button className="text-sm text-teal-400 hover:text-teal-300">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="bg-gray-700/40 p-3 rounded-md border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                            activity.type === 'Leave' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {activity.type === 'Leave' ? <Clock className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{activity.action}</p>
                            <p className="text-xs text-gray-400">By {activity.user} • {activity.time}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          activity.type === 'Leave' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {activity.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'team' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Team Management</h2>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search team members..."
                        className="bg-transparent text-sm focus:outline-none text-gray-300"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select className="bg-gray-700 text-sm rounded-md border border-gray-600 text-gray-300 px-2 py-1">
                        <option>All Positions</option>
                        <option>Developer</option>
                        <option>Designer</option>
                        <option>Tech Lead</option>
                      </select>
                      <select className="bg-gray-700 text-sm rounded-md border border-gray-600 text-gray-300 px-2 py-1">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>On Leave</option>
                      </select>
                    </div>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium">
                                {member.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{member.name}</div>
                                <div className="text-xs text-gray-400">@{member.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{member.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              member.position === 'Tech Lead' ? 'bg-purple-500/20 text-purple-400' :
                              member.position === 'Developer' ? 'bg-teal-500/20 text-teal-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {member.position}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{member.project}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              member.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button className="px-3 py-1 text-xs bg-teal-600 text-white rounded-md hover:bg-teal-700">
                              View Details
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
                <h2 className="text-2xl font-bold mb-6">Pending Requests</h2>
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-lg font-medium">Access and Resource Requests</h3>
                    <p className="text-sm text-gray-400">Review and approve team member requests</p>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Request Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requested On</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {pendingRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{request.user}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{request.requestType}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{request.requestedOn}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              request.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              request.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            {request.status === 'Pending' && (
                              <div className="flex justify-center space-x-2">
                                <button 
                                  onClick={() => handleApproveRequest(request.id)} 
                                  className="p-1 text-green-500 hover:text-green-400 bg-green-500/10 rounded"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleRejectRequest(request.id)} 
                                  className="p-1 text-red-500 hover:text-red-400 bg-red-500/10 rounded"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            {request.status !== 'Pending' && (
                              <span className="text-gray-400">{request.status}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {pendingRequests.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                      <p>No pending requests at this time</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {selectedTab === 'resources' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Department Resources</h2>
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Resource Management</h3>
                    <p className="text-gray-400">Manage access to department resources and assets</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-700/40 p-4 rounded-md border border-gray-700">
                      <h4 className="font-medium mb-2">Marketing Materials Repository</h4>
                      <p className="text-sm text-gray-400 mb-3">Brand guidelines, templates, and assets</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">5 Team Members</span>
                        <button className="text-xs text-teal-400 hover:text-teal-300">Manage Access</button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/40 p-4 rounded-md border border-gray-700">
                      <h4 className="font-medium mb-2">Department Budget Portal</h4>
                      <p className="text-sm text-gray-400 mb-3">Financial tracking and expense management</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">3 Team Members</span>
                        <button className="text-xs text-teal-400 hover:text-teal-300">Manage Access</button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/40 p-4 rounded-md border border-gray-700">
                      <h4 className="font-medium mb-2">Client Database</h4>
                      <p className="text-sm text-gray-400 mb-3">Contact information and account history</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">4 Team Members</span>
                        <button className="text-xs text-teal-400 hover:text-teal-300">Manage Access</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-teal-600 flex items-center justify-center text-xl font-bold mr-4">
                      J
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Jane Smith</h3>
                      <p className="text-gray-400">Marketing Manager</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          value="jane@example.com"
                          readOnly
                          className="bg-gray-700 w-full px-3 py-2 border border-gray-600 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                          type="text"
                          value="janesmith"
                          readOnly
                          className="bg-gray-700 w-full px-3 py-2 border border-gray-600 rounded-md text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-sm">
                        Update Profile
                      </button>
                      <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm ml-2">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}