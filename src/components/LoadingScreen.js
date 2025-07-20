import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'var(--gradient-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))'
          }}
        >
          <img 
            src="/logo.svg" 
            alt="PainEase Logo" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: 'var(--white)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-secondary)'
          }}
        >
          PainEase
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '3rem',
            maxWidth: '400px'
          }}
        >
          Your comprehensive pain management companion
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: 'flex',
            gap: '0.5rem'
          }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--white)'
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.9rem'
        }}
      >
        Loading your wellness journey...
      </motion.div>
    </div>
  );
};

export default LoadingScreen;