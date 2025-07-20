import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock, Brain, Heart } from 'lucide-react';
import { meditationSessions, quickMeditations } from '../data/meditationData';

const Meditation = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '2rem',
        maxWidth: '1400px',
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
          Guided Meditation
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--gray-600)',
          margin: 0
        }}>
          Mindfulness practices to help manage pain and reduce stress
        </p>
      </div>

      {/* Quick Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '2rem' }}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--gray-800)',
          marginBottom: '1rem'
        }}>
          Quick Sessions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {quickMeditations.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--gray-100)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#8b5cf615',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Brain size={24} color="#8b5cf6" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--gray-800)',
                    margin: 0
                  }}>
                    {session.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.25rem'
                  }}>
                    <Clock size={16} color="var(--gray-500)" />
                    <span style={{
                      fontSize: '0.875rem',
                      color: 'var(--gray-500)'
                    }}>
                      {session.duration}
                    </span>
                  </div>
                </div>
                <Play size={20} color="var(--gray-400)" />
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                margin: 0
              }}>
                {session.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Sessions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {meditationSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--gray-100)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: `${session.color}15`,
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Brain size={24} color={session.color} />
              </div>
              <span style={{
                background: `${session.color}15`,
                color: session.color,
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {session.difficulty}
              </span>
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--gray-800)',
              marginBottom: '0.5rem'
            }}>
              {session.title}
            </h3>

            <p style={{
              fontSize: '0.875rem',
              color: 'var(--gray-600)',
              marginBottom: '1.5rem'
            }}>
              {session.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Clock size={16} color="var(--gray-500)" />
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)'
                }}>
                  {session.duration}
                </span>
              </div>
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                textTransform: 'capitalize'
              }}>
                {session.type}
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {session.benefits.slice(0, 3).map((benefit, index) => (
                <span
                  key={index}
                  style={{
                    background: 'var(--gray-100)',
                    color: 'var(--gray-700)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem'
                  }}
                >
                  {benefit}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSession(session)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '1rem',
                background: session.color,
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Play size={20} />
              Start Session
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Session Modal */}
      {selectedSession && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={(e) => e.target === e.currentTarget && setSelectedSession(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                margin: 0
              }}>
                {selectedSession.title}
              </h2>
              <button
                onClick={() => setSelectedSession(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--gray-500)',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${selectedSession.color}15, ${selectedSession.color}05)`,
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                background: selectedSession.color,
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                {isPlaying ? (
                  <Pause size={32} color="white" />
                ) : (
                  <Play size={32} color="white" />
                )}
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                marginBottom: '0.5rem'
              }}>
                {selectedSession.duration}
              </h3>
              
              <p style={{
                fontSize: '1rem',
                color: 'var(--gray-600)',
                marginBottom: '2rem'
              }}>
                {selectedSession.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: selectedSession.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  margin: '0 auto'
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Start'} Meditation
              </motion.button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                marginBottom: '1rem'
              }}>
                Guided Script
              </h3>
              <div style={{
                maxHeight: '300px',
                overflow: 'auto',
                padding: '1rem',
                background: 'var(--gray-50)',
                borderRadius: 'var(--radius-lg)'
              }}>
                {selectedSession.script.map((line, index) => (
                  <p key={index} style={{
                    fontSize: '1rem',
                    color: 'var(--gray-700)',
                    lineHeight: '1.8',
                    marginBottom: '1rem'
                  }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                marginBottom: '1rem'
              }}>
                Benefits
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {selectedSession.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    style={{
                      background: `${selectedSession.color}15`,
                      color: selectedSession.color,
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Meditation;