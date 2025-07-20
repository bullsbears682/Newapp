import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, Zap, Smile, Moon, Save, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const PainTracker = ({ painData, onAddEntry }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    painLevel: 5,
    location: 'neck',
    mood: 3,
    sleep: 3,
    triggers: [],
    activities: [],
    notes: '',
    weather: 'sunny'
  });

  const painLevels = [
    { value: 1, label: 'No Pain', color: '#10b981' },
    { value: 2, label: 'Mild', color: '#06d6a0' },
    { value: 3, label: 'Mild', color: '#84cc16' },
    { value: 4, label: 'Moderate', color: '#eab308' },
    { value: 5, label: 'Moderate', color: '#f59e0b' },
    { value: 6, label: 'Moderate-Severe', color: '#f97316' },
    { value: 7, label: 'Severe', color: '#ef4444' },
    { value: 8, label: 'Severe', color: '#dc2626' },
    { value: 9, label: 'Very Severe', color: '#b91c1c' },
    { value: 10, label: 'Unbearable', color: '#991b1b' }
  ];

  const locations = ['neck', 'back', 'head', 'joints', 'chest', 'abdomen', 'legs', 'arms'];
  const triggers = ['stress', 'weather', 'exercise', 'work', 'sleep', 'diet', 'posture', 'medication'];
  const activities = ['walking', 'stretching', 'meditation', 'rest', 'work', 'exercise', 'therapy'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      ...formData,
      date: format(new Date(), 'yyyy-MM-dd'),
      timestamp: new Date().toISOString()
    };
    
    onAddEntry(entry);
    toast.success('Pain entry recorded successfully!');
    setShowForm(false);
    setFormData({
      painLevel: 5,
      location: 'neck',
      mood: 3,
      sleep: 3,
      triggers: [],
      activities: [],
      notes: '',
      weather: 'sunny'
    });
  };

  const handleTriggerToggle = (trigger) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const handleActivityToggle = (activity) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const recentData = painData.slice(0, 7).reverse();

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
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--gray-800)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-secondary)'
          }}>
            Pain Tracker
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--gray-600)',
            margin: 0
          }}>
            Monitor your pain patterns and identify triggers
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2rem',
            background: 'var(--gradient-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <Plus size={20} />
          Log Pain
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}
        >
          <div style={{
            background: '#ef444415',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <TrendingUp size={24} color="#ef4444" />
          </div>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#ef4444',
            margin: '0 0 0.5rem 0'
          }}>
            {painData.length > 0 ? painData[0].painLevel : 0}/10
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
            margin: 0
          }}>
            Latest Pain Level
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}
        >
          <div style={{
            background: '#10b98115',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Calendar size={24} color="#10b981" />
          </div>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#10b981',
            margin: '0 0 0.5rem 0'
          }}>
            {painData.length}
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
            margin: 0
          }}>
            Total Entries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}
        >
          <div style={{
            background: '#8b5cf615',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
                            <Smile size={24} color="#8b5cf6" />
          </div>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#8b5cf6',
            margin: '0 0 0.5rem 0'
          }}>
            {painData.length > 0 ? painData[0].mood : 0}/5
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
            margin: 0
          }}>
            Latest Mood
          </p>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem'
        }}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--gray-800)',
          marginBottom: '2rem'
        }}>
          Recent Pain Trends
        </h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={recentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--gray-400)"
              fontSize={12}
              tickFormatter={(value) => format(new Date(value), 'MM/dd')}
            />
            <YAxis stroke="var(--gray-400)" fontSize={12} />
            <Tooltip 
              contentStyle={{
                background: 'var(--white)',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
            <Line
              type="monotone"
              dataKey="painLevel"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
              name="Pain Level"
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
              name="Mood"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--gray-800)',
          marginBottom: '1.5rem'
        }}>
          Recent Entries
        </h2>

        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {painData.slice(0, 5).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              style={{
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: `${painLevels[entry.painLevel - 1]?.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: painLevels[entry.painLevel - 1]?.color
              }}>
                {entry.painLevel}
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--gray-800)',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}>
                    {entry.location} Pain
                  </h3>
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-500)'
                  }}>
                    {format(new Date(entry.date), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  {entry.triggers?.slice(0, 3).map(trigger => (
                    <span
                      key={trigger}
                      style={{
                        background: 'var(--gray-100)',
                        color: 'var(--gray-700)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        textTransform: 'capitalize'
                      }}
                    >
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                                      <Smile size={16} color="#8b5cf6" />
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-600)'
                  }}>
                    {entry.mood}/5
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Moon size={16} color="#06d6a0" />
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-600)'
                  }}>
                    {entry.sleep}/5
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pain Entry Form Modal */}
      {showForm && (
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
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
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
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--gray-800)',
              marginBottom: '2rem'
            }}>
              Log Your Pain
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Pain Level */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--gray-700)',
                  marginBottom: '1rem'
                }}>
                  Pain Level: {formData.painLevel}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, painLevel: parseInt(e.target.value) }))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: `linear-gradient(to right, ${painLevels[formData.painLevel - 1]?.color} 0%, ${painLevels[formData.painLevel - 1]?.color} ${formData.painLevel * 10}%, var(--gray-200) ${formData.painLevel * 10}%, var(--gray-200) 100%)`,
                    outline: 'none',
                    appearance: 'none'
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--gray-500)'
                }}>
                  <span>No Pain</span>
                  <span>Unbearable</span>
                </div>
              </div>

              {/* Location */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--gray-700)',
                  marginBottom: '1rem'
                }}>
                  Pain Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1rem',
                    background: 'var(--white)'
                  }}
                >
                  {locations.map(location => (
                    <option key={location} value={location} style={{ textTransform: 'capitalize' }}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Triggers */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--gray-700)',
                  marginBottom: '1rem'
                }}>
                  Triggers
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '0.5rem'
                }}>
                  {triggers.map(trigger => (
                    <button
                      key={trigger}
                      type="button"
                      onClick={() => handleTriggerToggle(trigger)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: `1px solid ${formData.triggers.includes(trigger) ? 'var(--primary)' : 'var(--gray-300)'}`,
                        borderRadius: 'var(--radius-lg)',
                        background: formData.triggers.includes(trigger) ? 'var(--primary)' : 'var(--white)',
                        color: formData.triggers.includes(trigger) ? 'white' : 'var(--gray-700)',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {trigger}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood and Sleep */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--gray-700)',
                    marginBottom: '1rem'
                  }}>
                    Mood: {formData.mood}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.mood}
                    onChange={(e) => setFormData(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${formData.mood * 20}%, var(--gray-200) ${formData.mood * 20}%, var(--gray-200) 100%)`,
                      outline: 'none',
                      appearance: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--gray-700)',
                    marginBottom: '1rem'
                  }}>
                    Sleep: {formData.sleep}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.sleep}
                    onChange={(e) => setFormData(prev => ({ ...prev, sleep: parseInt(e.target.value) }))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      background: `linear-gradient(to right, #06d6a0 0%, #06d6a0 ${formData.sleep * 20}%, var(--gray-200) ${formData.sleep * 20}%, var(--gray-200) 100%)`,
                      outline: 'none',
                      appearance: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--gray-700)',
                  marginBottom: '1rem'
                }}>
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional details about your pain..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1rem',
                    background: 'var(--white)',
                    resize: 'vertical',
                    minHeight: '100px'
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--white)',
                    color: 'var(--gray-700)',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
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
                  Save Entry
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PainTracker;