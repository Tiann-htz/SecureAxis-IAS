import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Users, Shield, Settings, LogOut, User, Search, Bell, 
  PlusCircle, Edit, Trash2, BarChart4, AlertTriangle, Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', role: 'Employee', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com', role: 'Manager', department: 'Marketing', status: 'Active' },
    { id: 3, name: 'Robert Johnson', username: 'robert', email: 'robert@example.com', role: 'Employee', department: 'Finance', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', username: 'emily', email: 'emily@example.com', role: 'Manager', department: 'HR', status: 'Active' },
    { id: 5, name: 'Michael Brown', username: 'michael', email: 'michael@example.com', role: 'Employee', department: 'IT', status: 'Active' },
  ]);

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Jane Smith', action: 'Requested access to Finance portal', time: '5 minutes ago', status: 'Pending' },
    { id: 2, user: 'Michael Brown', action: 'Changed password', time: '1 hour ago', status: 'Completed' },
    { id: 3, user: 'Robert Johnson', action: 'Account locked due to multiple failed attempts', time: '3 hours ago', status: 'Alert' },
    { id: 4, user: 'Emily Davis', action: 'Approved access request from John Doe', time: '5 hours ago', status: 'Completed' },
    { id: 5, user: 'Admin', action: 'System maintenance performed', time: '1 day ago', status: 'Completed' },
  ];

  // Mock data for system stats
  const systemStats = [
    { title: 'Total Users', value: 243, icon: <Users className="h-8 w-8 text-blue-400" />, change: '+12%', color: 'bg-blue-500/10' },
    { title: 'Active Sessions', value: 58, icon: <Shield className="h-8 w-8 text-green-400" />, change: '+5%', color: 'bg-green-500/10' },
    { title: 'Failed Logins', value: 7, icon: <AlertTriangle className="h-8 w-8 text-red-400" />, change: '-2%', color: 'bg-red-500/10' },
    { title: 'Access Requests', value: 15, icon: <Clock className="h-8 w-8 text-yellow-400" />, change: '+8%', color: 'bg-yellow-500/10' },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Admin Dashboard | SecureAxis</title>
        <meta name="description" content="SecureAxis Admin Dashboard" />
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
              <BarChart4 className="mr-3 h-5 w-5" />
              Overview
            </a>
            <a onClick={() => setSelectedTab('users')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'users' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Users className="mr-3 h-5 w-5" />
              User Management
            </a>
            <a onClick={() => setSelectedTab('activity')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'activity' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Clock className="mr-3 h-5 w-5" />
              Activity Logs
            </a>
            <a onClick={() => setSelectedTab('settings')} className={`px-4 py-2 flex items-center text-sm font-medium transition-colors cursor-pointer ${selectedTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Settings className="mr-3 h-5 w-5" />
              System Settings
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
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="font-bold text-sm">A</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">Admin User</div>
                <div className="text-xs text-gray-400">Administrator</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
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
                <h2 className="text-2xl font-bold mb-6">System Overview</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {systemStats.map((stat, index) => (
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
                    <h3 className="text-lg font-semibold">Recent Activities</h3>
                    <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="bg-gray-700/40 p-3 rounded-md border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                            activity.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                            activity.status === 'Alert' ? 'bg-red-500/20 text-red-400' : 
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {activity.status === 'Pending' ? <Clock className="h-4 w-4" /> : 
                             activity.status === 'Alert' ? <AlertTriangle className="h-4 w-4" /> : 
                             <Shield className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{activity.action}</p>
                            <p className="text-xs text-gray-400">By {activity.user} • {activity.time}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          activity.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                          activity.status === 'Alert' ? 'bg-red-500/20 text-red-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add User
                  </button>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search users..."
                        className="bg-transparent text-sm focus:outline-none text-gray-300"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <select className="bg-gray-700 text-sm rounded-md border border-gray-600 text-gray-300 px-2 py-1">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Employee</option>
                      </select>
                      <select className="bg-gray-700 text-sm rounded-md border border-gray-600 text-gray-300 px-2 py-1">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{user.name}</div>
                                <div className="text-xs text-gray-400">@{user.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
                              user.role === 'Manager' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{user.department}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="p-1 text-blue-400 hover:text-blue-300">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-3 border-t border-gray-700 flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
                    </div>
                    <div className="flex space-x-1">
                      <button className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">Previous</button>
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">1</button>
                      <button className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">2</button>
                      <button className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">3</button>
                      <button className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'activity' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Activity Logs</h2>
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <p className="text-gray-400 mb-4">This page will display detailed system activity logs.</p>
                </div>
              </div>
            )}
            
            {selectedTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">System Settings</h2>
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <p className="text-gray-400 mb-4">System configuration panel will appear here.</p>
                </div>
              </div>
            )}
            
            {selectedTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <p className="text-gray-400 mb-4">Admin profile settings will appear here.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}