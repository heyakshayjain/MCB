import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import Mentor from './components/Mentor';
import Deadlines from './components/Deadlines';
import Schools from './components/Schools';
import Account from './components/Account';
import JEEApplication from './components/JEEApplication';
import ApplicationAssistant from './components/ApplicationAssistant';
import PremiumBrowser from './components/PremiumBrowser';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <Dashboard />
            </main>
          </div>
        } />
        <Route path="/applications" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <Applications />
            </main>
          </div>
        } />
        <Route path="/mentor" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <Mentor />
            </main>
          </div>
        } />
        <Route path="/deadlines" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <Deadlines />
            </main>
          </div>
        } />
        <Route path="/schools" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <Schools />
            </main>
          </div>
        } />
        <Route path="/account" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <Account />
            </main>
          </div>
        } />
        <Route path="/application-assistant" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <ApplicationAssistant />
            </main>
          </div>
        } />
        <Route path="/jee-guide" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <JEEApplication />
            </main>
          </div>
        } />
        <Route path="/premium-browser" element={
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64">
              <PremiumBrowser />
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
