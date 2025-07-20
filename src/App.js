import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PainTracker from './pages/PainTracker';
import Exercises from './pages/Exercises';
import Meditation from './pages/Meditation';
import MusicTherapy from './pages/MusicTherapy';
import Education from './pages/Education';
import Profile from './pages/Profile';
import LoadingScreen from './components/LoadingScreen';

// Hooks
import { usePainData } from './hooks/usePainData';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useLocalStorage('painease_user', {
    name: 'Welcome',
    joinDate: new Date().toISOString(),
    preferences: {
      theme: 'light',
      notifications: true,
      reminderFrequency: 'daily'
    }
  });

  const { painData, addPainEntry, updatePainEntry } = usePainData();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="app">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--white)',
              color: 'var(--gray-800)',
              border: '1px solid var(--gray-200)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: 'var(--shadow-lg)'
            }
          }}
        />
        
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar 
            isOpen={sidebarOpen} 
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            currentUser={currentUser}
          />
          
          <motion.main 
            className="main-content"
            style={{
              flex: 1,
              marginLeft: sidebarOpen ? '280px' : '80px',
              transition: 'margin-left 0.3s ease',
              padding: '0',
              background: 'var(--gray-50)',
              minHeight: '100vh'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Dashboard 
                      painData={painData}
                      currentUser={currentUser}
                    />
                  } 
                />
                <Route 
                  path="/pain-tracker" 
                  element={
                    <PainTracker 
                      painData={painData}
                      onAddEntry={addPainEntry}
                      onUpdateEntry={updatePainEntry}
                    />
                  } 
                />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/meditation" element={<Meditation />} />
                <Route path="/music" element={<MusicTherapy />} />
                <Route path="/education" element={<Education />} />
                <Route 
                  path="/profile" 
                  element={
                    <Profile 
                      currentUser={currentUser}
                      onUpdateUser={setCurrentUser}
                    />
                  } 
                />
              </Routes>
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
    </Router>
  );
}

export default App;