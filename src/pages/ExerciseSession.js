import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Clock, 
  Heart,
  Zap,
  CheckCircle,
  ArrowLeft,
  Music,
  Timer,
  Target,
  Star,
  Trophy,
  Flame
} from 'lucide-react';
import ExerciseSessionManager, { predefinedSessions } from '../utils/ExerciseSession';
import AudioEngine from '../utils/AudioEngine';
import toast from 'react-hot-toast';

const ExerciseSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  const [session, setSession] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentAudioSession, setCurrentAudioSession] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [selectedMusic, setSelectedMusic] = useState('528Hz'); // DNA repair frequency
  
  // Find the session by ID
  useEffect(() => {
    const foundSession = predefinedSessions.find(s => s.id === sessionId);
    if (foundSession) {
      setSession(foundSession);
    } else {
      toast.error('Session not found');
      navigate('/exercises');
    }
  }, [sessionId, navigate]);

  // Initialize audio
  useEffect(() => {
    const initAudio = async () => {
      await AudioEngine.initialize();
      AudioEngine.setMasterVolume(volume);
    };
    initAudio();

    return () => {
      if (currentAudioSession) {
        AudioEngine.stopSession(currentAudioSession);
      }
    };
  }, []);

  // Set up exercise session events
  useEffect(() => {
    if (!session) return;

    const exerciseSession = new ExerciseSessionManager();
    
    const handleSessionStarted = (data) => {
      setSessionData(data);
      setIsActive(true);
      toast.success('Exercise session started!', { icon: '🏃‍♂️' });
    };

    const handleExerciseStep = (stepData) => {
      setCurrentStep(stepData);
    };

    const handleSessionCompleted = (data) => {
      setIsActive(false);
      setSessionData(data);
      toast.success(`Session completed! Pain reduced by ${data.painReduction}%`, { 
        icon: '🎉',
        duration: 5000 
      });
    };

    const handleSessionPaused = () => {
      setIsPaused(true);
    };

    const handleSessionResumed = () => {
      setIsPaused(false);
    };

    exerciseSession.on('sessionStarted', handleSessionStarted);
    exerciseSession.on('exerciseStep', handleExerciseStep);
    exerciseSession.on('sessionCompleted', handleSessionCompleted);
    exerciseSession.on('sessionPaused', handleSessionPaused);
    exerciseSession.on('sessionResumed', handleSessionResumed);

    // Auto-start the session
    exerciseSession.startSession(session.id);

    return () => {
      exerciseSession.removeAllListeners();
    };
  }, [session]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const toggleMusic = async () => {
    if (isMusicPlaying && currentAudioSession) {
      AudioEngine.stopSession(currentAudioSession);
      setCurrentAudioSession(null);
      setIsMusicPlaying(false);
      toast.success('Music stopped');
    } else {
      await AudioEngine.resumeContext();
      let audioSessionId;
      
      if (selectedMusic.includes('Hz')) {
        audioSessionId = AudioEngine.playHealingFrequency(selectedMusic, 1800); // 30 minutes
      } else {
        audioSessionId = AudioEngine.playNatureSounds(selectedMusic, 1800);
      }
      
      if (audioSessionId) {
        setCurrentAudioSession(audioSessionId);
        setIsMusicPlaying(true);
        toast.success(`Playing ${selectedMusic} therapy music`);
      }
    }
  };

  const pauseMusic = () => {
    if (currentAudioSession) {
      const isPaused = AudioEngine.isSessionPaused(currentAudioSession);
      if (isPaused) {
        AudioEngine.resumeSession(currentAudioSession);
        toast.success('Music resumed');
      } else {
        AudioEngine.pauseSession(currentAudioSession);
        toast.success('Music paused');
      }
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    AudioEngine.setMasterVolume(newVolume);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const goBack = () => {
    if (currentAudioSession) {
      AudioEngine.stopSession(currentAudioSession);
    }
    navigate('/exercises');
  };

  const musicOptions = [
    { id: '528Hz', name: '528Hz - DNA Repair', icon: <Zap />, color: '#10b981' },
    { id: '174Hz', name: '174Hz - Pain Relief', icon: <Heart />, color: '#ef4444' },
    { id: '396Hz', name: '396Hz - Liberation', icon: <Star />, color: '#8b5cf6' },
    { id: 'rain', name: 'Rain Sounds', icon: <Music />, color: '#3b82f6' },
    { id: 'ocean', name: 'Ocean Waves', icon: <Music />, color: '#06b6d4' },
    { id: 'forest', name: 'Forest Sounds', icon: <Music />, color: '#22c55e' }
  ];

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{session.name}</h1>
                <p className="text-gray-600">{session.category} • {session.duration} minutes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-medium">{formatTime(timeElapsed)}</span>
              </div>
              
              {sessionData && (
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                  <Flame className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-medium">{sessionData.caloriesBurned} cal</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Exercise Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {/* Current Step */}
              <AnimatePresence mode="wait">
                {currentStep ? (
                  <motion.div
                    key={currentStep.step}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-center"
                  >
                    <div className="mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">{currentStep.step}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentStep.name}</h2>
                      <p className="text-gray-600 text-lg">{currentStep.instruction}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${((currentStep.step - 1) / session.exercises.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Step {currentStep.step} of {session.exercises.length}
                      </p>
                    </div>

                    {/* Duration Display */}
                    {currentStep.duration && (
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-2">
                          <Timer className="w-5 h-5 text-blue-600" />
                          <span className="text-blue-700 font-medium">
                            Hold for {currentStep.duration} seconds
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {currentStep.tips && (
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">💡 Tips:</h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          {currentStep.tips.map((tip, index) => (
                            <li key={index}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
                    <p className="text-gray-600 text-lg mb-6">{session.description}</p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-700">Target: {session.targetArea}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-700">Level: {session.difficulty}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Session Complete */}
            {sessionData && !isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg text-white p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Session Complete!</h2>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div>
                    <Trophy className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm opacity-90">Calories</p>
                    <p className="text-xl font-bold">{sessionData.caloriesBurned}</p>
                  </div>
                  <div>
                    <Heart className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm opacity-90">Pain Relief</p>
                    <p className="text-xl font-bold">{sessionData.painReduction}%</p>
                  </div>
                  <div>
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm opacity-90">Duration</p>
                    <p className="text-xl font-bold">{formatTime(timeElapsed)}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Music & Controls Sidebar */}
          <div className="space-y-6">
            {/* Music Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Music className="w-5 h-5" />
                Therapy Music
              </h3>

              {/* Music Selection */}
              <div className="space-y-3 mb-6">
                {musicOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedMusic(option.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedMusic === option.id
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: option.color }}
                      >
                        {option.icon}
                      </div>
                      <span className="font-medium">{option.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Music Control Buttons */}
              <div className="space-y-2">
                <button
                  onClick={toggleMusic}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    isMusicPlaying
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isMusicPlaying ? (
                    <>
                      <Square className="w-4 h-4 inline mr-2" />
                      Stop Music
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 inline mr-2" />
                      Play Music
                    </>
                  )}
                </button>

                {isMusicPlaying && currentAudioSession && (
                  <button
                    onClick={pauseMusic}
                    className="w-full py-2 px-4 rounded-lg font-medium bg-yellow-500 hover:bg-yellow-600 text-white transition-all"
                  >
                    {AudioEngine.isSessionPaused(currentAudioSession) ? (
                      <>
                        <Play className="w-4 h-4 inline mr-2" />
                        Resume Music
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4 inline mr-2" />
                        Pause Music
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Volume Control */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <VolumeX className="w-4 h-4 text-gray-500" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <Volume2 className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Volume: {Math.round(volume * 100)}%
                </p>
              </div>
            </motion.div>

            {/* Session Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Session Info</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium capitalize">{session.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Area:</span>
                  <span className="font-medium">{session.targetArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{session.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exercises:</span>
                  <span className="font-medium">{session.exercises.length} steps</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                <div className="space-y-2">
                  {session.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSession;