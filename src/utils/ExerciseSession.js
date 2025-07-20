import { EventEmitter } from 'events';

class ExerciseSession extends EventEmitter {
  constructor() {
    super();
    this.currentSession = null;
    this.sessionTimer = null;
    this.exerciseTimer = null;
    this.currentExerciseIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.sessionData = {
      startTime: null,
      endTime: null,
      totalDuration: 0,
      exercisesCompleted: 0,
      calories: 0,
      painReduction: 0
    };
  }

  // Start a guided exercise session
  startSession(sessionConfig) {
    if (this.isRunning) {
      this.stopSession();
    }

    this.currentSession = {
      ...sessionConfig,
      progress: 0,
      currentStep: 0
    };

    this.sessionData = {
      startTime: Date.now(),
      endTime: null,
      totalDuration: 0,
      exercisesCompleted: 0,
      calories: 0,
      painReduction: 0
    };

    this.currentExerciseIndex = 0;
    this.isRunning = true;
    this.isPaused = false;

    this.emit('sessionStarted', this.currentSession);
    this.startNextExercise();

    return this.currentSession.id;
  }

  startNextExercise() {
    if (!this.isRunning || this.currentExerciseIndex >= this.currentSession.exercises.length) {
      this.completeSession();
      return;
    }

    const currentExercise = this.currentSession.exercises[this.currentExerciseIndex];
    this.emit('exerciseStarted', {
      exercise: currentExercise,
      index: this.currentExerciseIndex,
      total: this.currentSession.exercises.length
    });

    this.startExerciseGuidance(currentExercise);
  }

  startExerciseGuidance(exercise) {
    let currentStep = 0;
    const steps = this.generateExerciseSteps(exercise);
    
    const nextStep = () => {
      if (!this.isRunning || this.isPaused) return;
      
      if (currentStep >= steps.length) {
        this.completeCurrentExercise();
        return;
      }

      const step = steps[currentStep];
      this.emit('exerciseStep', {
        step,
        stepIndex: currentStep,
        totalSteps: steps.length,
        exercise
      });

      this.exerciseTimer = setTimeout(() => {
        currentStep++;
        nextStep();
      }, step.duration * 1000);
    };

    nextStep();
  }

  generateExerciseSteps(exercise) {
    const baseSteps = [];
    
    // Preparation phase
    baseSteps.push({
      type: 'preparation',
      instruction: `Prepare for ${exercise.name}. ${exercise.instructions}`,
      duration: 10,
      image: exercise.image
    });

    // Warm-up if needed
    if (exercise.warmup) {
      baseSteps.push({
        type: 'warmup',
        instruction: 'Gentle warm-up movements. Move slowly and breathe deeply.',
        duration: 30,
        breathingPattern: 'slow'
      });
    }

    // Main exercise phases
    for (let rep = 0; rep < exercise.repetitions; rep++) {
      if (exercise.type === 'stretch') {
        baseSteps.push({
          type: 'hold',
          instruction: `Hold the stretch. Feel gentle tension, breathe deeply. Rep ${rep + 1}/${exercise.repetitions}`,
          duration: exercise.holdTime || 30,
          breathingPattern: 'deep'
        });
        
        if (rep < exercise.repetitions - 1) {
          baseSteps.push({
            type: 'rest',
            instruction: 'Relax and breathe normally',
            duration: 10,
            breathingPattern: 'normal'
          });
        }
      } else if (exercise.type === 'strength') {
        baseSteps.push({
          type: 'active',
          instruction: `Perform the movement slowly and controlled. Rep ${rep + 1}/${exercise.repetitions}`,
          duration: exercise.duration || 20,
          breathingPattern: 'controlled'
        });
        
        if (rep < exercise.repetitions - 1) {
          baseSteps.push({
            type: 'rest',
            instruction: 'Rest between repetitions',
            duration: 15,
            breathingPattern: 'recovery'
          });
        }
      } else if (exercise.type === 'cardio') {
        baseSteps.push({
          type: 'active',
          instruction: `Maintain steady rhythm. Keep effort at 6-7/10. Set ${rep + 1}/${exercise.repetitions}`,
          duration: exercise.duration || 60,
          breathingPattern: 'rhythmic'
        });
        
        if (rep < exercise.repetitions - 1) {
          baseSteps.push({
            type: 'rest',
            instruction: 'Active recovery - keep moving gently',
            duration: 30,
            breathingPattern: 'recovery'
          });
        }
      }
    }

    // Cool down
    baseSteps.push({
      type: 'cooldown',
      instruction: 'Cool down with gentle movements. Well done!',
      duration: 20,
      breathingPattern: 'relaxation'
    });

    return baseSteps;
  }

  completeCurrentExercise() {
    this.sessionData.exercisesCompleted++;
    this.sessionData.calories += this.calculateCalories(this.currentSession.exercises[this.currentExerciseIndex]);
    
    this.emit('exerciseCompleted', {
      exercise: this.currentSession.exercises[this.currentExerciseIndex],
      index: this.currentExerciseIndex,
      sessionData: { ...this.sessionData }
    });

    this.currentExerciseIndex++;
    
    // Brief rest between exercises
    if (this.currentExerciseIndex < this.currentSession.exercises.length) {
      this.emit('exerciseStep', {
        step: {
          type: 'transition',
          instruction: 'Preparing for next exercise...',
          duration: 5
        },
        stepIndex: -1,
        totalSteps: 1
      });

      setTimeout(() => {
        this.startNextExercise();
      }, 5000);
    } else {
      this.completeSession();
    }
  }

  calculateCalories(exercise) {
    // Basic calorie calculation based on exercise type and duration
    const baseMET = {
      'stretch': 2.5,
      'strength': 3.5,
      'cardio': 5.0,
      'balance': 2.0,
      'mobility': 2.8
    };

    const met = baseMET[exercise.type] || 3.0;
    const durationHours = (exercise.duration || 60) / 3600;
    const weight = 70; // Average weight in kg
    
    return Math.round(met * weight * durationHours);
  }

  pauseSession() {
    if (!this.isRunning || this.isPaused) return;
    
    this.isPaused = true;
    if (this.exerciseTimer) {
      clearTimeout(this.exerciseTimer);
    }
    
    this.emit('sessionPaused');
  }

  resumeSession() {
    if (!this.isRunning || !this.isPaused) return;
    
    this.isPaused = false;
    this.emit('sessionResumed');
    
    // Resume current exercise
    if (this.currentExerciseIndex < this.currentSession.exercises.length) {
      this.startExerciseGuidance(this.currentSession.exercises[this.currentExerciseIndex]);
    }
  }

  stopSession() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.isPaused = false;
    
    if (this.exerciseTimer) {
      clearTimeout(this.exerciseTimer);
    }
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
    
    this.sessionData.endTime = Date.now();
    this.sessionData.totalDuration = this.sessionData.endTime - this.sessionData.startTime;
    
    this.emit('sessionStopped', this.sessionData);
    this.resetSession();
  }

  completeSession() {
    if (!this.isRunning) return;
    
    this.sessionData.endTime = Date.now();
    this.sessionData.totalDuration = this.sessionData.endTime - this.sessionData.startTime;
    this.sessionData.painReduction = this.calculatePainReduction();
    
    this.emit('sessionCompleted', {
      session: this.currentSession,
      data: this.sessionData,
      achievement: this.getAchievement()
    });
    
    this.resetSession();
  }

  calculatePainReduction() {
    // Estimate pain reduction based on exercises completed and types
    const completionRate = this.sessionData.exercisesCompleted / this.currentSession.exercises.length;
    const baseReduction = completionRate * 15; // Base 15% for full completion
    
    // Bonus for exercise variety
    const exerciseTypes = new Set(this.currentSession.exercises.map(e => e.type));
    const varietyBonus = (exerciseTypes.size - 1) * 2;
    
    return Math.min(25, Math.round(baseReduction + varietyBonus));
  }

  getAchievement() {
    const completionRate = this.sessionData.exercisesCompleted / this.currentSession.exercises.length;
    const duration = this.sessionData.totalDuration / (1000 * 60); // minutes
    
    if (completionRate >= 1.0 && duration >= 20) {
      return {
        title: 'Pain Warrior!',
        description: 'Completed a full exercise session',
        icon: '🏆',
        points: 100
      };
    } else if (completionRate >= 0.8) {
      return {
        title: 'Strong Progress',
        description: 'Great effort in your session',
        icon: '💪',
        points: 75
      };
    } else if (completionRate >= 0.5) {
      return {
        title: 'Good Start',
        description: 'Every step counts!',
        icon: '👍',
        points: 50
      };
    } else {
      return {
        title: 'Keep Going',
        description: 'You made an effort - that matters!',
        icon: '🌟',
        points: 25
      };
    }
  }

  resetSession() {
    this.currentSession = null;
    this.currentExerciseIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
  }

  getCurrentStatus() {
    return {
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      currentSession: this.currentSession,
      currentExerciseIndex: this.currentExerciseIndex,
      sessionData: { ...this.sessionData }
    };
  }
}

// Predefined exercise sessions
export const predefinedSessions = {
  beginnerPain: {
    id: 'beginner-pain-relief',
    name: 'Beginner Pain Relief',
    description: 'Gentle exercises for pain relief beginners',
    duration: 15,
    difficulty: 'Beginner',
    exercises: [
      {
        name: 'Neck Gentle Rolls',
        type: 'stretch',
        instructions: 'Slowly roll your head in a circle, pausing at tight spots',
        repetitions: 3,
        holdTime: 15,
        warmup: true,
        image: '🔄'
      },
      {
        name: 'Shoulder Blade Squeezes',
        type: 'strength',
        instructions: 'Squeeze shoulder blades together, hold, then release',
        repetitions: 8,
        duration: 10,
        image: '💪'
      },
      {
        name: 'Cat-Cow Stretch',
        type: 'stretch',
        instructions: 'On hands and knees, arch and round your back gently',
        repetitions: 5,
        duration: 20,
        image: '🐱'
      }
    ]
  },
  
  backPain: {
    id: 'back-pain-relief',
    name: 'Back Pain Relief',
    description: 'Targeted exercises for lower back pain',
    duration: 20,
    difficulty: 'Intermediate',
    exercises: [
      {
        name: 'Knee to Chest',
        type: 'stretch',
        instructions: 'Lying down, pull one knee to chest, feel lower back stretch',
        repetitions: 4,
        holdTime: 30,
        warmup: true,
        image: '🦵'
      },
      {
        name: 'Pelvic Tilts',
        type: 'strength',
        instructions: 'Tighten abs and tilt pelvis to flatten back against floor',
        repetitions: 10,
        duration: 15,
        image: '🔄'
      },
      {
        name: 'Child\'s Pose',
        type: 'stretch',
        instructions: 'Kneel and sit back on heels, reach arms forward',
        repetitions: 2,
        holdTime: 45,
        image: '🧘'
      }
    ]
  },
  
  arthritis: {
    id: 'arthritis-mobility',
    name: 'Arthritis Mobility',
    description: 'Joint-friendly exercises for arthritis management',
    duration: 25,
    difficulty: 'Beginner',
    exercises: [
      {
        name: 'Finger Exercises',
        type: 'mobility',
        instructions: 'Make fists, then spread fingers wide. Move each finger individually',
        repetitions: 10,
        duration: 30,
        warmup: true,
        image: '✋'
      },
      {
        name: 'Ankle Circles',
        type: 'mobility',
        instructions: 'Seated, lift one foot and rotate ankle slowly in both directions',
        repetitions: 8,
        duration: 20,
        image: '👣'
      },
      {
        name: 'Gentle Yoga Flow',
        type: 'stretch',
        instructions: 'Slow, gentle movements focusing on range of motion',
        repetitions: 3,
        holdTime: 40,
        image: '🧘‍♀️'
      }
    ]
  }
};

export default new ExerciseSession();