import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PainTracker from './pages/PainTracker';
import Exercises from './pages/Exercises';
import ExerciseSession from './pages/ExerciseSession';
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
        
        <div className="app-container">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.div 
                key="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', height: '100vh' }}
              >
                <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                
                <motion.main 
                  className="main-content"
                  animate={{ 
                    marginLeft: sidebarOpen ? '280px' : '80px',
                    width: sidebarOpen ? 'calc(100% - 280px)' : 'calc(100% - 80px)'
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{
                    overflowY: 'auto',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard currentUser={currentUser} />} />
                    <Route path="/pain-tracker" element={<PainTracker />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/exercise-session/:sessionId" element={<ExerciseSession />} />
                    <Route path="/meditation" element={<Meditation />} />
                    <Route path="/music-therapy" element={<MusicTherapy />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                  </Routes>
                </motion.main>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;