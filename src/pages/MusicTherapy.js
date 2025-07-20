import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music, 
  Brain, 
  Waves, 
  CloudRain,
  Wind,
  TreePine,
  Heart,
  Zap,
  Clock,
  Star,
  Settings,
  RotateCcw,
  Check
} from 'lucide-react';
import AudioEngine from '../utils/AudioEngine';
import toast from 'react-hot-toast';

const MusicTherapy = () => {
  const [currentSession, setCurrentSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [selectedCategory, setSelectedCategory] = useState('healing');
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [showSettings, setShowSettings] = useState(false);
  const [activeSessions, setActiveSessions] = useState(new Set());

  useEffect(() => {
    const initializeAudio = async () => {
      await AudioEngine.initialize();
    };
    initializeAudio();

    return () => {
      AudioEngine.stopAllSessions();
    };
  }, []);

  useEffect(() => {
    AudioEngine.setMasterVolume(volume);
  }, [volume]);

  const therapyCategories = {
    healing: {
      name: 'Healing Frequencies',
      icon: <Heart size={24} />,
      color: '#22c55e',
      sessions: [
        {
          id: 'pain-relief',
          name: 'Pain Relief Frequency',
          description: '174Hz - The foundational frequency for pain relief',
          frequency: '174Hz',
          benefits: ['Reduces physical pain', 'Promotes natural healing', 'Calms nervous system'],
          type: 'frequency'
        },
        {
          id: 'tissue-healing',
          name: 'Tissue Healing',
          description: '285Hz - Promotes cellular regeneration and tissue repair',
          frequency: '285Hz',
          benefits: ['Accelerates healing', 'Regenerates damaged tissue', 'Boosts immune system'],
          type: 'frequency'
        },
        {
          id: 'love-frequency',
          name: 'Love Frequency',
          description: '528Hz - The "Miracle Tone" for DNA repair and love',
          frequency: '528Hz',
          benefits: ['DNA repair', 'Increases love and compassion', 'Reduces stress'],
          type: 'frequency'
        },
        {
          id: 'pain-sequence',
          name: 'Progressive Pain Relief',
          description: 'Multi-frequency sequence for comprehensive pain management',
          benefits: ['Complete pain relief journey', 'Multiple healing frequencies', 'Progressive therapy'],
          type: 'sequence'
        }
      ]
    },
    binaural: {
      name: 'Binaural Beats',
      icon: <Brain size={24} />,
      color: '#8b5cf6',
      sessions: [
        {
          id: 'alpha-relaxation',
          name: 'Alpha Relaxation',
          description: '10Hz - Deep relaxation and stress relief',
          baseFreq: 200,
          beatFreq: 10,
          benefits: ['Deep relaxation', 'Stress reduction', 'Mental clarity'],
          type: 'binaural'
        },
        {
          id: 'theta-healing',
          name: 'Theta Healing',
          description: '6Hz - Deep healing and meditation state',
          baseFreq: 200,
          beatFreq: 6,
          benefits: ['Deep healing state', 'Enhanced meditation', 'Emotional balance'],
          type: 'binaural'
        },
        {
          id: 'delta-sleep',
          name: 'Delta Sleep Support',
          description: '2Hz - Promotes deep, restorative sleep',
          baseFreq: 150,
          beatFreq: 2,
          benefits: ['Better sleep quality', 'Physical restoration', 'Growth hormone release'],
          type: 'binaural'
        },
        {
          id: 'gamma-focus',
          name: 'Gamma Focus',
          description: '40Hz - Enhanced focus and cognitive function',
          baseFreq: 200,
          beatFreq: 40,
          benefits: ['Improved focus', 'Enhanced cognition', 'Mental sharpness'],
          type: 'binaural'
        }
      ]
    },
    nature: {
      name: 'Nature Sounds',
      icon: <TreePine size={24} />,
      color: '#059669',
      sessions: [
        {
          id: 'gentle-rain',
          name: 'Gentle Rain',
          description: 'Soothing rain sounds for deep relaxation',
          soundType: 'rain',
          benefits: ['Masks pain signals', 'Promotes relaxation', 'Improves sleep'],
          type: 'nature'
        },
        {
          id: 'ocean-waves',
          name: 'Ocean Waves',
          description: 'Rhythmic ocean sounds for stress relief',
          soundType: 'ocean',
          benefits: ['Rhythmic breathing', 'Stress reduction', 'Mental calm'],
          type: 'nature'
        },
        {
          id: 'forest-ambience',
          name: 'Forest Ambience',
          description: 'Peaceful forest sounds for grounding',
          soundType: 'forest',
          benefits: ['Grounding effect', 'Reduces anxiety', 'Natural healing'],
          type: 'nature'
        }
      ]
    }
  };

  const startSession = async (session) => {
    try {
      await AudioEngine.resumeContext();
      
      let sessionId;
      
      switch (session.type) {
        case 'frequency':
          if (session.id === 'pain-sequence') {
            sessionId = await AudioEngine.playPainReliefSequence();
          } else {
            sessionId = AudioEngine.playHealingFrequency(session.frequency, duration);
          }
          break;
        case 'binaural':
          sessionId = AudioEngine.playBinauralBeats(session.baseFreq, session.beatFreq, duration);
          break;
        case 'nature':
          sessionId = AudioEngine.playNatureSounds(session.soundType, duration);
          break;
        case 'sequence':
          sessionId = await AudioEngine.playPainReliefSequence();
          break;
        default:
          throw new Error('Unknown session type');
      }

      if (sessionId) {
        setCurrentSession({ ...session, sessionId });
        setIsPlaying(true);
        setActiveSessions(prev => new Set([...prev, sessionId]));
        
        toast.success(`Started ${session.name}`, {
          icon: '🎵',
          duration: 3000
        });

        // Auto-stop tracking
        setTimeout(() => {
          if (activeSessions.has(sessionId)) {
            stopSession();
          }
        }, duration * 1000);
      }
    } catch (error) {
      console.error('Failed to start audio session:', error);
      toast.error('Failed to start audio session. Please try again.');
    }
  };

  const stopSession = () => {
    if (currentSession?.sessionId) {
      AudioEngine.stopSession(currentSession.sessionId);
      setActiveSessions(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentSession.sessionId);
        return newSet;
      });
    }
    
    setCurrentSession(null);
    setIsPlaying(false);
    
    toast.success('Session stopped', {
      icon: '⏹️',
      duration: 2000
    });
  };

  const pauseSession = () => {
    setIsPlaying(false);
    // Note: Web Audio API doesn't support pause/resume easily
    // For now, we'll stop and restart
    toast.info('Stopping session...', { icon: '⏸️' });
    stopSession();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <div className="header-icon">
              <Music size={32} />
            </div>
            <div>
              <h1>Music Therapy</h1>
              <p>Healing frequencies and sounds for pain relief</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} />
            Settings
          </motion.button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card"
            style={{ marginBottom: '2rem' }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Audio Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Volume</label>
                <div className="volume-control">
                  <VolumeX size={20} />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                  />
                  <Volume2 size={20} />
                  <span>{Math.round(volume * 100)}%</span>
                </div>
              </div>
              <div className="setting-item">
                <label>Default Duration</label>
                <select 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="select-input"
                >
                  <option value={180}>3 minutes</option>
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                  <option value={900}>15 minutes</option>
                  <option value={1200}>20 minutes</option>
                  <option value={1800}>30 minutes</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Session */}
      <AnimatePresence>
        {currentSession && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card current-session"
          >
            <div className="session-header">
              <div className="session-info">
                <h3>{currentSession.name}</h3>
                <p>{currentSession.description}</p>
              </div>
              <div className="session-controls">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="control-btn pause"
                  onClick={pauseSession}
                >
                  <Pause size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="control-btn stop"
                  onClick={stopSession}
                >
                  <RotateCcw size={24} />
                </motion.button>
              </div>
            </div>
            
            <div className="session-progress">
              <div className="progress-info">
                <span>Playing</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: duration }}
                />
              </div>
            </div>

            {currentSession.benefits && (
              <div className="session-benefits">
                <h4>Benefits:</h4>
                <div className="benefits-list">
                  {currentSession.benefits.map((benefit, index) => (
                    <span key={index} className="benefit-tag">
                      <Check size={14} />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tabs */}
      <div className="category-tabs">
        {Object.entries(therapyCategories).map(([key, category]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`category-tab ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
            style={{
              '--category-color': category.color
            }}
          >
            {category.icon}
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="sessions-grid">
        {therapyCategories[selectedCategory].sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="session-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="session-card-header">
              <div className="session-icon">
                {session.type === 'frequency' && <Zap size={24} />}
                {session.type === 'binaural' && <Brain size={24} />}
                {session.type === 'nature' && session.soundType === 'rain' && <CloudRain size={24} />}
                {session.type === 'nature' && session.soundType === 'ocean' && <Waves size={24} />}
                {session.type === 'nature' && session.soundType === 'forest' && <TreePine size={24} />}
                {session.type === 'sequence' && <Star size={24} />}
              </div>
              <h3>{session.name}</h3>
            </div>
            
            <p className="session-description">{session.description}</p>
            
            {session.benefits && (
              <div className="session-benefits-preview">
                <div className="benefits-preview">
                  {session.benefits.slice(0, 2).map((benefit, idx) => (
                    <span key={idx} className="benefit-preview">
                      <Check size={12} />
                      {benefit}
                    </span>
                  ))}
                  {session.benefits.length > 2 && (
                    <span className="benefit-more">+{session.benefits.length - 2} more</span>
                  )}
                </div>
              </div>
            )}
            
            <div className="session-card-footer">
              <div className="session-meta">
                <span className="session-duration">
                  <Clock size={16} />
                  {formatTime(duration)}
                </span>
                {session.frequency && (
                  <span className="session-frequency">
                    <Waves size={16} />
                    {session.frequency}
                  </span>
                )}
                {session.beatFreq && (
                  <span className="session-frequency">
                    <Brain size={16} />
                    {session.beatFreq}Hz
                  </span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary session-start-btn"
                onClick={() => startSession(session)}
                disabled={isPlaying}
              >
                <Play size={20} />
                Start Session
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .current-session {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
          border: 1px solid rgba(139, 92, 246, 0.2);
          margin-bottom: 2rem;
        }

        .session-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .session-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .control-btn.pause {
          background: var(--warning);
          color: white;
        }

        .control-btn.stop {
          background: var(--danger);
          color: white;
        }

        .session-progress {
          margin-bottom: 1rem;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .setting-item label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .volume-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          outline: none;
          background: var(--surface);
          cursor: pointer;
        }

        .category-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .category-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          border: 2px solid transparent;
          border-radius: 12px;
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .category-tab.active {
          border-color: var(--category-color);
          background: var(--category-color);
          color: white;
        }

        .sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .session-card {
          background: var(--surface);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .session-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }

        .session-card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .session-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .session-card h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .session-description {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .session-benefits-preview {
          margin-bottom: 1.5rem;
        }

        .benefits-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .benefit-preview, .benefit-more {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background: rgba(34, 197, 94, 0.1);
          color: var(--success);
          border-radius: 6px;
          font-size: 0.8rem;
        }

        .benefit-more {
          background: rgba(139, 92, 246, 0.1);
          color: var(--primary);
        }

        .session-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .session-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .session-duration, .session-frequency {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .session-start-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .session-benefits h4 {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .benefits-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .benefit-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          background: rgba(34, 197, 94, 0.1);
          color: var(--success);
          border-radius: 8px;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .sessions-grid {
            grid-template-columns: 1fr;
          }
          
          .category-tabs {
            flex-direction: column;
          }
          
          .session-card-footer {
            flex-direction: column;
            align-items: stretch;
          }
          
          .session-meta {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default MusicTherapy;