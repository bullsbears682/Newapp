import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, ChevronRight, Filter } from 'lucide-react';
import { exerciseCategories, quickExercises } from '../data/exerciseData';

const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const categories = Object.keys(exerciseCategories);

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
          Therapeutic Exercises
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--gray-600)',
          margin: 0
        }}>
          Gentle movements designed to reduce pain and improve mobility
        </p>
      </div>

      {/* Quick Exercises */}
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
          Quick Relief
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {quickExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
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
                  background: `${exerciseCategories[exercise.category]?.color}15`,
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play size={24} color={exerciseCategories[exercise.category]?.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--gray-800)',
                    margin: 0
                  }}>
                    {exercise.name}
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
                      {exercise.duration}
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} color="var(--gray-400)" />
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                margin: 0
              }}>
                {exercise.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '0.75rem 1.5rem',
            border: `1px solid ${selectedCategory === 'all' ? 'var(--primary)' : 'var(--gray-300)'}`,
            borderRadius: 'var(--radius-lg)',
            background: selectedCategory === 'all' ? 'var(--primary)' : 'var(--white)',
            color: selectedCategory === 'all' ? 'white' : 'var(--gray-700)',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          All Exercises
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '0.75rem 1.5rem',
              border: `1px solid ${selectedCategory === category ? 'var(--primary)' : 'var(--gray-300)'}`,
              borderRadius: 'var(--radius-lg)',
              background: selectedCategory === category ? 'var(--primary)' : 'var(--white)',
              color: selectedCategory === category ? 'white' : 'var(--gray-700)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              textTransform: 'capitalize'
            }}
          >
            {exerciseCategories[category].title}
          </button>
        ))}
      </motion.div>

      {/* Exercise Categories */}
      <div style={{
        display: 'grid',
        gap: '2rem'
      }}>
        {categories
          .filter(category => selectedCategory === 'all' || selectedCategory === category)
          .map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * categoryIndex }}
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: `${exerciseCategories[category].color}15`,
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: exerciseCategories[category].color,
                    borderRadius: '50%'
                  }} />
                </div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--gray-800)',
                  margin: 0
                }}>
                  {exerciseCategories[category].title}
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {exerciseCategories[category].exercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    style={{
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--gray-800)',
                        margin: 0
                      }}>
                        {exercise.name}
                      </h3>
                      <span style={{
                        background: `${exerciseCategories[category].color}15`,
                        color: exerciseCategories[category].color,
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {exercise.difficulty}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--gray-600)',
                      marginBottom: '1rem'
                    }}>
                      {exercise.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
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
                          {exercise.duration}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            size={16}
                            color="#f59e0b"
                            fill={star <= 4 ? "#f59e0b" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={(e) => e.target === e.currentTarget && setSelectedExercise(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                margin: 0
              }}>
                {selectedExercise.name}
              </h2>
              <button
                onClick={() => setSelectedExercise(null)}
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

            <p style={{
              fontSize: '1rem',
              color: 'var(--gray-600)',
              marginBottom: '2rem'
            }}>
              {selectedExercise.description}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                marginBottom: '1rem'
              }}>
                Instructions
              </h3>
              <ol style={{
                paddingLeft: '1.5rem',
                color: 'var(--gray-700)'
              }}>
                {selectedExercise.instructions.map((instruction, index) => (
                  <li key={index} style={{
                    marginBottom: '0.5rem',
                    lineHeight: '1.6'
                  }}>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ marginBottom: '2rem' }}>
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
                {selectedExercise.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'var(--gray-100)',
                      color: 'var(--gray-700)',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem'
                    }}
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                marginBottom: '1rem'
              }}>
                Precautions
              </h3>
              <ul style={{
                paddingLeft: '1.5rem',
                color: 'var(--gray-700)'
              }}>
                {selectedExercise.precautions.map((precaution, index) => (
                  <li key={index} style={{
                    marginBottom: '0.5rem',
                    lineHeight: '1.6'
                  }}>
                    {precaution}
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '1rem',
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedExercise(null)}
            >
              <Play size={20} />
              Start Exercise
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Exercises;