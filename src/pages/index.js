import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Shield, Users, Key, Lock } from 'lucide-react';

export default function Home() {
  // Smooth scroll implementation
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>SecureAxis | Identity & Access Management</title>
        <meta name="description" content="Enterprise-grade identity and access management solution" />
      </Head>

      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V12C4 16.42 7.36 20.44 12 22C16.64 20.44 20 16.42 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="ml-2 text-xl font-bold text-white">SecureAxis</span>
            </div>
            <div className="flex items-center">
              <a href="#features" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#roles" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Solutions
              </a>
              <Link href="/login" className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                Secure Access Control Made Simple
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                Streamline your organization's identity management with our comprehensive IAM solution.
              </p>
              <div className="mt-10">
                <Link href="/login" className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
              <div className="bg-gray-800 p-10 rounded-lg shadow-2xl transform transition-all hover:scale-105">
                <svg className="h-32 w-32 text-blue-500 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V12C4 16.42 7.36 20.44 12 22C16.64 20.44 20 16.42 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor" />
                  <path d="M12 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div> 
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">
            Key Features
          </h2>
          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-2">
              <Users className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-medium text-white">User Management</h3>
              <p className="mt-2 text-gray-300">
                Create and manage user accounts with role-based access control.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-2">
              <Key className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-medium text-white">Access Control</h3>
              <p className="mt-2 text-gray-300">
                Define precise permissions and approval workflows.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-2">
              <Lock className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-medium text-white">Security Logging</h3>
              <p className="mt-2 text-gray-300">
                Monitor and audit all system access for compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Information */}
      <section id="roles" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">
            Tailored for Every Role
          </h2>
          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-2">
              <h3 className="text-lg font-medium text-white">Administrators</h3>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Complete system management</li>
                <li>• User provisioning and deprovisioning</li>
                <li>• Access policy configuration</li>
                <li>• System-wide audit capabilities</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-2">
              <h3 className="text-lg font-medium text-white">Managers</h3>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Department-level control</li>
                <li>• Team access approvals</li>
                <li>• Resource allocation</li>
                <li>• Access request management</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transition-all hover:shadow-blue-500/20 hover:-translate-y-2">
              <h3 className="text-lg font-medium text-white">Employees</h3>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Self-service profile management</li>
                <li>• Secure password controls</li>
                <li>• Resource access requests</li>
                <li>• Personal access dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V12C4 16.42 7.36 20.44 12 22C16.64 20.44 20 16.42 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor" />
                <path d="M12 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="ml-2 text-lg font-bold">SecureAxis</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400">
                © 2025 SecureAxis. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}