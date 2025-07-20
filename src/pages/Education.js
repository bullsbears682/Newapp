import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { painEducationTopics, quickTips } from '../data/educationData';

const Education = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

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
          Pain Education
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--gray-600)',
          margin: 0
        }}>
          Learn about pain management techniques and strategies for better health
        </p>
      </div>

      {/* Quick Tips */}
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
          Quick Tips
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {quickTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--gray-100)'
              }}
            >
              <span style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {tip.category}
              </span>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                margin: '1rem 0 0.5rem 0'
              }}>
                {tip.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                margin: 0
              }}>
                {tip.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Educational Topics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {painEducationTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              cursor: 'pointer',
              border: '1px solid var(--gray-100)'
            }}
            onClick={() => setSelectedTopic(topic)}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <div style={{
                background: `${topic.color}15`,
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={24} color={topic.color} />
              </div>
              <span style={{
                background: `${topic.color}15`,
                color: topic.color,
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {topic.category}
              </span>
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--gray-800)',
              marginBottom: '0.5rem'
            }}>
              {topic.title}
            </h3>

            <p style={{
              fontSize: '0.875rem',
              color: 'var(--gray-600)',
              marginBottom: '1.5rem'
            }}>
              {topic.content.introduction}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
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
                  {topic.readTime}
                </span>
              </div>
              <ArrowRight size={20} color="var(--gray-400)" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Topic Detail Modal */}
      {selectedTopic && (
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
          onClick={(e) => e.target === e.currentTarget && setSelectedTopic(null)}
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
                {selectedTopic.title}
              </h2>
              <button
                onClick={() => setSelectedTopic(null)}
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
              fontSize: '1.1rem',
              color: 'var(--gray-700)',
              marginBottom: '2rem',
              lineHeight: '1.7'
            }}>
              {selectedTopic.content.introduction}
            </p>

            {selectedTopic.content.sections.map((section, index) => (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--gray-800)',
                  marginBottom: '1rem'
                }}>
                  {section.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--gray-700)',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  {section.content}
                </p>
                <ul style={{
                  paddingLeft: '1.5rem',
                  color: 'var(--gray-700)'
                }}>
                  {section.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex} style={{
                      marginBottom: '0.5rem',
                      lineHeight: '1.6'
                    }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div style={{
              background: 'var(--gray-50)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--gray-800)',
                marginBottom: '1rem'
              }}>
                Key Takeaways
              </h3>
              <ul style={{
                paddingLeft: '1.5rem',
                color: 'var(--gray-700)'
              }}>
                {selectedTopic.content.tips.map((tip, index) => (
                  <li key={index} style={{
                    marginBottom: '0.5rem',
                    lineHeight: '1.6'
                  }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Education;