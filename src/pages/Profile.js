import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Save } from 'lucide-react';

const Profile = ({ currentUser, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    preferences: { ...currentUser.preferences }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      ...formData
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '100vh'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: 'var(--gray-800)',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-secondary)'
        }}>
          Profile Settings
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--gray-600)',
          margin: 0
        }}>
          Manage your account and preferences
        </p>
      </div>

      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: '700'
          }}>
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--gray-800)',
              margin: 0
            }}>
              {currentUser.name}
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--gray-600)',
              margin: '0.25rem 0 0 0'
            }}>
              Member since {new Date(currentUser.joinDate).getFullYear()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--gray-700)',
              marginBottom: '0.5rem'
            }}>
              Display Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--gray-800)',
              marginBottom: '1rem'
            }}>
              Preferences
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      notifications: e.target.checked
                    }
                  }))}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--primary)'
                  }}
                />
                <span style={{
                  fontSize: '1rem',
                  color: 'var(--gray-700)'
                }}>
                  Enable notifications
                </span>
              </label>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--gray-700)',
                marginBottom: '0.5rem'
              }}>
                Reminder Frequency
              </label>
              <select
                value={formData.preferences.reminderFrequency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    reminderFrequency: e.target.value
                  }
                }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '1rem',
                  background: 'var(--white)'
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Save size={20} />
            Save Changes
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;