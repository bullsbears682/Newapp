import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Clock, 
  User, 
  X, 
  Zap, 
  Heart, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Star,
  Trophy,
  Target,
  Flame,
  Timer,
  Settings,
  Volume2
} from 'lucide-react';
import { exerciseCategories, quickExercises } from '../data/exerciseData';
import ExerciseSession, { predefinedSessions } from '../utils/ExerciseSession';
import toast from 'react-hot-toast';

const Exercises = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionStatus, setSessionStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [completedSessions, setCompletedSessions] = useState([]);

  useEffect(() => {
    // Set up ExerciseSession event listeners
    const handleSessionStarted = (session) => {
      setCurrentSession(session);
      setShowSessionModal(true);
      toast.success(`Started ${session.name}`, { icon: '🏃‍♂️' });
    };

    const handleExerciseStep = (stepData) => {
      setCurrentStep(stepData);
    };

    const handleSessionCompleted = (data) => {
      setCompletedSessions(prev => [...prev, data]);
      setCurrentSession(null);
      setCurrentStep(null);
      setShowSessionModal(false);
      
      toast.success(`Session completed! ${data.achievement.title}`, {
        icon: data.achievement.icon,
        duration: 5000
      });
    };

    const handleSessionStopped = () => {
      setCurrentSession(null);
      setCurrentStep(null);
      setShowSessionModal(false);
      toast.info('Session stopped', { icon: '⏹️' });
    };

    ExerciseSession.on('sessionStarted', handleSessionStarted);
    ExerciseSession.on('exerciseStep', handleExerciseStep);
    ExerciseSession.on('sessionCompleted', handleSessionCompleted);
    ExerciseSession.on('sessionStopped', handleSessionStopped);

    return () => {
      ExerciseSession.removeAllListeners();
    };
  }, []);

  const startQuickSession = (sessionKey) => {
    const session = predefinedSessions[sessionKey];
    if (session) {
      toast.success(`Starting ${session.name}`, { icon: '🏃‍♂️' });
      // Use the sessionKey instead of session.id since that's how we'll find it
      navigate(`/exercise-session/${sessionKey}`);
    } else {
      toast.error('Session not found');
    }
  };

  const pauseSession = () => {
    ExerciseSession.pauseSession();
  };

  const resumeSession = () => {
    ExerciseSession.resumeSession();
  };

  const stopSession = () => {
    ExerciseSession.stopSession();
  };

  const categories = Object.keys(exerciseCategories);

  const filteredExercises = selectedCategory === 'all' 
    ? Object.values(exerciseCategories).flat()
    : exerciseCategories[selectedCategory] || [];

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
              <Zap size={32} />
            </div>
            <div>
              <h1>Interactive Exercises</h1>
              <p>Guided exercise sessions for pain relief and mobility</p>
            </div>
          </div>
          {completedSessions.length > 0 && (
            <div className="achievement-badge">
              <Trophy size={20} />
              <span>{completedSessions.length} Sessions</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Start Sessions */}
      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Quick Start Programs</h3>
        <div className="quick-sessions-grid">
          {Object.entries(predefinedSessions).map(([key, session]) => (
            <motion.div
              key={key}
              className="quick-session-card"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="session-header">
                <div className="session-icon">
                  {key === 'beginnerPain' && <Heart size={24} />}
                  {key === 'backPain' && <Target size={24} />}
                  {key === 'arthritis' && <Zap size={24} />}
                </div>
                <div className="session-info">
                  <h4>{session.name}</h4>
                  <p>{session.description}</p>
                </div>
              </div>
              
              <div className="session-meta">
                <span className="session-duration">
                  <Clock size={16} />
                  {session.duration} min
                </span>
                <span className="session-difficulty">
                  <Star size={16} />
                  {session.difficulty}
                </span>
                <span className="session-exercises">
                  <Target size={16} />
                  {session.exercises.length} exercises
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary session-start-btn"
                onClick={() => startQuickSession(key)}
                disabled={currentSession !== null}
              >
                <Play size={20} />
                Start Session
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filters">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Exercises
        </motion.button>
        {categories.map(category => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Exercises Grid */}
      <div className="exercises-grid">
        {filteredExercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="exercise-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="exercise-header">
              <div className="exercise-icon">
                <Zap size={24} />
              </div>
              <div className="exercise-info">
                <h3>{exercise.name}</h3>
                <p>{exercise.category}</p>
              </div>
            </div>
            
            <p className="exercise-description">{exercise.description}</p>
            
            <div className="exercise-meta">
              <span className="exercise-duration">
                <Clock size={16} />
                {exercise.duration || '2-3'} min
              </span>
              <span className="exercise-difficulty">
                <Star size={16} />
                {exercise.difficulty || 'Beginner'}
              </span>
            </div>

            <div className="exercise-benefits">
              {exercise.benefits?.slice(0, 2).map((benefit, idx) => (
                <span key={idx} className="benefit-tag">
                  <CheckCircle size={12} />
                  {benefit}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary exercise-detail-btn"
              onClick={() => setSelectedExercise(exercise)}
            >
              View Details
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Exercise Detail Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExercise(null)}
          >
            <motion.div
              className="modal-content exercise-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{selectedExercise.name}</h2>
                <button
                  className="modal-close"
                  onClick={() => setSelectedExercise(null)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body">
                <div className="exercise-details">
                  <p>{selectedExercise.description}</p>
                  
                  <div className="detail-section">
                    <h4>Instructions:</h4>
                    <ol>
                      {selectedExercise.instructions?.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      )) || [selectedExercise.instructions]}
                    </ol>
                  </div>

                  {selectedExercise.benefits && (
                    <div className="detail-section">
                      <h4>Benefits:</h4>
                      <ul>
                        {selectedExercise.benefits.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedExercise.precautions && (
                    <div className="detail-section">
                      <h4>Precautions:</h4>
                      <ul>
                        {selectedExercise.precautions.map((precaution, idx) => (
                          <li key={idx}>{precaution}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Modal */}
      <AnimatePresence>
        {showSessionModal && currentSession && (
          <motion.div
            className="modal-overlay session-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content session-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="session-modal-header">
                <h2>{currentSession.name}</h2>
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

              <div className="session-modal-body">
                {currentStep && (
                  <div className="current-step">
                    <div className="step-header">
                      <h3>{currentStep.exercise?.name || 'Exercise Session'}</h3>
                      <span className="step-counter">
                        Step {currentStep.stepIndex + 1} of {currentStep.totalSteps}
                      </span>
                    </div>
                    
                    <div className="step-content">
                      <div className="step-icon">
                        {currentStep.step.type === 'preparation' && <Settings size={48} />}
                        {currentStep.step.type === 'warmup' && <Flame size={48} />}
                        {currentStep.step.type === 'active' && <Zap size={48} />}
                        {currentStep.step.type === 'hold' && <Timer size={48} />}
                        {currentStep.step.type === 'rest' && <Heart size={48} />}
                        {currentStep.step.type === 'cooldown' && <CheckCircle size={48} />}
                      </div>
                      <p className="step-instruction">{currentStep.step.instruction}</p>
                      
                      {currentStep.step.breathingPattern && (
                        <div className="breathing-guide">
                          <h4>Breathing: {currentStep.step.breathingPattern}</h4>
                        </div>
                      )}
                    </div>

                    <div className="step-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{
                            width: `${((currentStep.stepIndex + 1) / currentStep.totalSteps) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .achievement-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, var(--success), var(--primary));
          color: white;
          border-radius: 12px;
          font-weight: 600;
        }

        .quick-sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .quick-session-card {
          background: var(--surface);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .quick-session-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }

        .session-header {
          display: flex;
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

        .session-info h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .session-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .session-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .session-duration, .session-difficulty, .session-exercises {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .session-start-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .category-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid transparent;
          border-radius: 12px;
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .filter-btn.active {
          border-color: var(--primary);
          background: var(--primary);
          color: white;
        }

        .exercises-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .exercise-card {
          background: var(--surface);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .exercise-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }

        .exercise-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .exercise-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .exercise-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .exercise-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.85rem;
          text-transform: capitalize;
        }

        .exercise-description {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .exercise-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .exercise-duration, .exercise-difficulty {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .exercise-benefits {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .benefit-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background: rgba(34, 197, 94, 0.1);
          color: var(--success);
          border-radius: 6px;
          font-size: 0.8rem;
        }

        .exercise-detail-btn {
          width: 100%;
        }

        .exercise-modal {
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .detail-section {
          margin-bottom: 1.5rem;
        }

        .detail-section h4 {
          margin-bottom: 0.5rem;
          color: var(--primary);
        }

        .detail-section ol, .detail-section ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .detail-section li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .session-modal-overlay {
          background: rgba(0, 0, 0, 0.8);
        }

        .session-modal {
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          background: var(--background);
        }

        .session-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
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

        .session-modal-body {
          padding: 2rem;
        }

        .current-step {
          text-align: center;
        }

        .step-header {
          margin-bottom: 2rem;
        }

        .step-header h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }

        .step-counter {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .step-content {
          margin-bottom: 2rem;
        }

        .step-icon {
          margin-bottom: 1rem;
          color: var(--primary);
        }

        .step-instruction {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .breathing-guide {
          padding: 1rem;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .breathing-guide h4 {
          margin: 0;
          color: var(--success);
          text-transform: capitalize;
        }

        .step-progress {
          margin-top: 2rem;
        }

        .progress-bar {
          height: 8px;
          background: var(--surface);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.3s ease;
        }

        @media (max-width: 768px) {
          .quick-sessions-grid {
            grid-template-columns: 1fr;
          }
          
          .exercises-grid {
            grid-template-columns: 1fr;
          }
          
          .category-filters {
            flex-direction: column;
          }
          
          .session-modal {
            width: 95%;
          }
          
          .session-modal-header {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Exercises;