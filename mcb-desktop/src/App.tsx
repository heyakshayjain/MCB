import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import CareerCounselling from './components/CareerCounselling';
import Deadlines from './components/Deadlines';
import Schools from './components/Schools';
import Account from './components/Account';
import ExamPrep from './components/ExamPrep';
import ApplicationAssistant from './components/ApplicationAssistant';
import PremiumBrowser from './components/PremiumBrowser';
import Sidebar from './components/Sidebar';
import Documents from './components/Documents';
import Community from './components/student/Community';
import HelpSupport from './components/common/HelpSupport';
import NewsFeed from './components/common/NewsFeed';
import InstituteDashboard from './components/institute/InstituteDashboard';
import InstituteLogin from './components/institute/InstituteLogin';
import FinancialAid from './components/FinancialAid';
import SchoolComparison from './components/SchoolComparison';
import './App.css';

// Protected Route Component for Institute
function ProtectedInstituteRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('instituteAuth');

  if (!isAuthenticated) {
    window.location.href = '/institute/login';
    return null;
  }

  return <>{children}</>;
}

// Component to handle route-based browser view visibility
function RouteHandler() {
  const location = useLocation();

  useEffect(() => {
    // Hide browser views when navigating away from Premium Browser
    if (location.pathname !== '/premium-browser' && window.electron) {
      window.electron.browserHideAll();
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <RouteHandler />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Dashboard />
            </main>
          </div>
        } />
        <Route path="/applications" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Applications />
            </main>
          </div>
        } />
        <Route path="/mentor" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <CareerCounselling />
            </main>
          </div>
        } />
        <Route path="/deadlines" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Deadlines />
            </main>
          </div>
        } />
        <Route path="/schools" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Schools />
            </main>
          </div>
        } />
        <Route path="/account" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Account />
            </main>
          </div>
        } />
        <Route path="/application-assistant" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <ApplicationAssistant />
            </main>
          </div>
        } />
        <Route path="/jee-guide" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <ExamPrep />
            </main>
          </div>
        } />
        <Route path="/community" element={
          <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
              <Community />
            </div>
          </div>
        } />
        <Route path="/support" element={
          <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
              <HelpSupport />
            </div>
          </div>
        } />
        <Route path="/news" element={
          <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
              <NewsFeed />
            </div>
          </div>
        } />
        <Route path="/premium-browser" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <PremiumBrowser />
            </main>
          </div>
        } />
        <Route path="/documents" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Documents />
            </main>
          </div>
        } />
        <Route path="/financial-aid" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <FinancialAid />
            </main>
          </div>
        } />
        <Route path="/school-comparison" element={
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <SchoolComparison />
            </main>
          </div>
        } />
        <Route path="/institute/login" element={<InstituteLogin />} />
        <Route path="/institute" element={
          <ProtectedInstituteRoute>
            <InstituteDashboard />
          </ProtectedInstituteRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
