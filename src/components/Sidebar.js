import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Activity, 
  Dumbbell, 
  Brain, 
  Music, 
  BookOpen, 
  User, 
  Menu,
  Heart,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, currentUser }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, color: '#6366f1' },
    { path: '/pain-tracker', label: 'Pain Tracker', icon: Activity, color: '#ef4444' },
    { path: '/exercises', label: 'Exercises', icon: Dumbbell, color: '#10b981' },
    { path: '/meditation', label: 'Meditation', icon: Brain, color: '#8b5cf6' },
    { path: '/music-therapy', label: 'Music Therapy', icon: Music, color: '#f472b6' },
    { path: '/education', label: 'Education', icon: BookOpen, color: '#06d6a0' },
    { path: '/profile', label: 'Profile', icon: User, color: '#f59e0b' }
  ];

  return (
    <>
      <motion.nav
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: isOpen ? '280px' : '80px',
          background: 'var(--white)',
          borderRight: '1px solid var(--gray-200)',
          boxShadow: 'var(--shadow-lg)',
          transition: 'width 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--gray-100)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'var(--gradient-primary)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={onToggle}
          >
            {isOpen ? <Menu size={20} color="white" /> : <Heart size={20} color="white" />}
          </motion.div>
          
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--gray-800)',
                fontFamily: 'var(--font-secondary)'
              }}>
                PainEase
              </h1>
            </motion.div>
          )}
        </div>

        {/* User Info */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--gray-100)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--gradient-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '1.2rem'
              }}>
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--gray-800)',
                  marginBottom: '0.25rem'
                }}>
                  {currentUser?.name || 'User'}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-500)',
                  margin: 0
                }}>
                  Wellness Journey
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Menu */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <NavLink
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: isOpen ? '0.875rem 1.5rem' : '0.875rem',
                    margin: '0.25rem 1rem',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                    color: isActive ? 'var(--white)' : 'var(--gray-600)',
                    background: isActive ? item.color : 'transparent',
                    transition: 'all var(--transition-fast)',
                    position: 'relative',
                    overflow: 'hidden',
                    justifyContent: isOpen ? 'flex-start' : 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = `${item.color}15`;
                      e.target.style.color = item.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'var(--gray-600)';
                    }
                  }}
                >
                  <Icon size={20} />
                  {isOpen && (
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.label}
                    </span>
                  )}
                  {isOpen && isActive && (
                    <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--gray-100)',
              textAlign: 'center'
            }}
          >
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--gray-400)',
              margin: 0
            }}>
              © 2024 PainEase
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--gray-400)',
              margin: '0.25rem 0 0 0'
            }}>
              Your wellness companion
            </p>
          </motion.div>
        )}
      </motion.nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'none'
          }}
          onClick={onToggle}
          className="mobile-overlay"
        />
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-overlay {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;