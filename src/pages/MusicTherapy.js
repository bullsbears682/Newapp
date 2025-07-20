import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Music } from 'lucide-react';

const MusicTherapy = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const musicCategories = [
    { id: 1, name: 'Nature Sounds', description: 'Calming sounds of rain, ocean, and forest', color: '#10b981' },
    { id: 2, name: 'Ambient Music', description: 'Gentle electronic sounds for relaxation', color: '#6366f1' },
    { id: 3, name: 'Classical', description: 'Peaceful classical compositions', color: '#8b5cf6' },
    { id: 4, name: 'Binaural Beats', description: 'Scientifically designed frequencies for pain relief', color: '#f472b6' }
  ];

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
          Music Therapy
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--gray-600)',
          margin: 0
        }}>
          Healing sounds and music designed to reduce pain and promote relaxation
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {musicCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              textAlign: 'center'
            }}
          >
            <div style={{
              background: `${category.color}15`,
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Music size={32} color={category.color} />
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--gray-800)',
              marginBottom: '1rem'
            }}>
              {category.name}
            </h3>

            <p style={{
              fontSize: '1rem',
              color: 'var(--gray-600)',
              marginBottom: '2rem'
            }}>
              {category.description}
            </p>

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
                background: category.color,
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Play size={20} />
              Play Music
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MusicTherapy;