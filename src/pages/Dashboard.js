import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Heart, 
  Activity, 
  Brain,
  Dumbbell,
  Music,
  Plus,
  ChevronRight,
  Sun,
  Moon,
  Cloud,
  CloudRain
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { usePainData } from '../hooks/usePainData';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ currentUser }) => {
  const navigate = useNavigate();
  const { getPainSummary, getPainTrends } = usePainData();
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setSummary(getPainSummary());
    setTrends(getPainTrends());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [getPainSummary, getPainTrends]);

  const quickActions = [
    { 
      title: 'Log Pain', 
      icon: Activity, 
      color: '#ef4444', 
      path: '/pain-tracker',
      description: 'Track your current pain level'
    },
    { 
      title: 'Exercise', 
      icon: Dumbbell, 
      color: '#10b981', 
      path: '/exercises',
      description: 'Gentle exercises for relief'
    },
    { 
      title: 'Meditate', 
      icon: Brain, 
      color: '#8b5cf6', 
      path: '/meditation',
      description: 'Mindfulness and relaxation'
    },
    { 
      title: 'Music Therapy', 
      icon: Music, 
      color: '#f472b6', 
      path: '/music',
      description: 'Healing sounds and music'
    }
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'sunny': return <Sun size={20} color="#f59e0b" />;
      case 'cloudy': return <Cloud size={20} color="#6b7280" />;
      case 'rainy': return <CloudRain size={20} color="#3b82f6" />;
      default: return <Sun size={20} color="#f59e0b" />;
    }
  };

  if (!summary) return null;

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          marginBottom: '2rem'
        }}
      >
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: 'var(--gray-800)',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-secondary)'
        }}>
          {getGreeting()}, {currentUser.name}!
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--gray-600)',
          margin: 0
        }}>
          {format(currentTime, 'EEEE, MMMM do, yyyy')} • {format(currentTime, 'h:mm a')}
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--gray-100)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--gray-700)',
              margin: 0
            }}>
              Average Pain Level
            </h3>
            <div style={{
              background: '#ef444415',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={20} color="#ef4444" />
            </div>
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ef4444',
            marginBottom: '0.5rem'
          }}>
            {summary.averagePain}/10
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-500)',
            margin: 0
          }}>
            Last 7 days
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
            border: '1px solid var(--gray-100)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--gray-700)',
              margin: 0
            }}>
              Tracking Streak
            </h3>
            <div style={{
              background: '#10b98115',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={20} color="#10b981" />
            </div>
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#10b981',
            marginBottom: '0.5rem'
          }}>
            {summary.streak}
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-500)',
            margin: 0
          }}>
            Days in a row
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--gray-100)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--gray-700)',
              margin: 0
            }}>
              Mood Score
            </h3>
            <div style={{
              background: '#8b5cf615',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={20} color="#8b5cf6" />
            </div>
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#8b5cf6',
            marginBottom: '0.5rem'
          }}>
            {summary.averageMood}/5
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-500)',
            margin: 0
          }}>
            Average this week
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--gray-100)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--gray-700)',
              margin: 0
            }}>
              Sleep Quality
            </h3>
            <div style={{
              background: '#06d6a015',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Moon size={20} color="#06d6a0" />
            </div>
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#06d6a0',
            marginBottom: '0.5rem'
          }}>
            {summary.averageSleep}/5
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-500)',
            margin: 0
          }}>
            Average this week
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginBottom: '2rem' }}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--gray-800)',
          marginBottom: '1rem'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--gray-100)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onClick={() => navigate(action.path)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    background: `${action.color}15`,
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color={action.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'var(--gray-800)',
                      margin: 0
                    }}>
                      {action.title}
                    </h3>
                  </div>
                  <ChevronRight size={20} color="var(--gray-400)" />
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)',
                  margin: 0
                }}>
                  {action.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Pain Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--gray-100)',
          marginBottom: '2rem'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--gray-800)',
            margin: 0
          }}>
            Pain Trends (Last 30 Days)
          </h2>
          <div style={{
            background: '#6366f115',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={20} color="#6366f1" />
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trends}>
            <defs>
              <linearGradient id="colorPain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="pain"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorPain)"
              strokeWidth={2}
              name="Pain Level"
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorMood)"
              strokeWidth={2}
              name="Mood Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}
      >
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--gray-100)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--gray-800)',
            marginBottom: '1rem'
          }}>
            Common Triggers
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {summary.commonTriggers.map((trigger, index) => (
              <div key={trigger} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: ['#ef4444', '#f59e0b', '#10b981'][index] || '#6b7280'
                }} />
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-700)',
                  textTransform: 'capitalize'
                }}>
                  {trigger}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--gray-100)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--gray-800)',
            marginBottom: '1rem'
          }}>
            Pain Locations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {summary.commonLocations.map((location, index) => (
              <div key={location} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: ['#6366f1', '#8b5cf6', '#f472b6'][index] || '#6b7280'
                }} />
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-700)',
                  textTransform: 'capitalize'
                }}>
                  {location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;