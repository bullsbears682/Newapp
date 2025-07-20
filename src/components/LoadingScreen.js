import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 2rem;
  animation: ${pulse} 2s ease-in-out infinite;
  
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
  }
`;

const AppName = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 3px;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 1px;
  animation: ${float} 3s ease-in-out infinite 0.5s;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  
  span {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: ${pulse} 1.5s ease-in-out infinite;
    opacity: 0.6;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const PainEaseLogo = () => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:'#764ba2', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#f093fb', stopOpacity:1}} />
      </linearGradient>
      
      <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#f8fafc', stopOpacity:0.9}} />
      </linearGradient>
      
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:'#10b981', stopOpacity:0.8}} />
        <stop offset="50%" style={{stopColor:'#3b82f6', stopOpacity:0.6}} />
        <stop offset="100%" style={{stopColor:'#8b5cf6', stopOpacity:0.4}} />
      </linearGradient>
      
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Main background circle */}
    <circle cx="256" cy="256" r="240" fill="url(#backgroundGradient)" filter="url(#glow)"/>
    
    {/* Healing wave patterns */}
    <g opacity="0.3">
      <path d="M 80 256 Q 130 200 180 256 T 280 256 T 380 256 T 432 256" 
            stroke="url(#waveGradient)" strokeWidth="3" fill="none" opacity="0.6"/>
      <path d="M 90 280 Q 140 230 190 280 T 290 280 T 390 280 T 422 280" 
            stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M 100 304 Q 150 260 200 304 T 300 304 T 400 304 T 412 304" 
            stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.3"/>
    </g>
    
    {/* Central "P" letter */}
    <g transform="translate(256, 256)">
      <path d="M -60 -80 L -60 80 L -40 80 L -40 10 L 20 10 Q 50 10 65 -5 Q 80 -20 80 -50 Q 80 -80 65 -95 Q 50 -110 20 -110 Z M -40 -90 L 20 -90 Q 35 -90 42.5 -82.5 Q 50 -75 50 -60 Q 50 -45 42.5 -37.5 Q 35 -30 20 -30 L -40 -30 Z" 
            fill="url(#letterGradient)" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="1"/>
    </g>
    
    {/* Subtle medical cross elements */}
    <g opacity="0.2">
      <g transform="translate(380, 140)">
        <rect x="-8" y="-2" width="16" height="4" fill="white" rx="2"/>
        <rect x="-2" y="-8" width="4" height="16" fill="white" rx="2"/>
      </g>
      <g transform="translate(140, 380)">
        <rect x="-6" y="-1.5" width="12" height="3" fill="white" rx="1.5"/>
        <rect x="-1.5" y="-6" width="3" height="12" fill="white" rx="1.5"/>
      </g>
    </g>
    
    {/* Subtle pulse rings */}
    <g opacity="0.1">
      <circle cx="256" cy="256" r="200" stroke="white" strokeWidth="1" fill="none"/>
      <circle cx="256" cy="256" r="180" stroke="white" strokeWidth="0.5" fill="none"/>
    </g>
    
    {/* Zen/healing dots */}
    <g opacity="0.4">
      <circle cx="340" cy="200" r="3" fill="white"/>
      <circle cx="180" cy="320" r="2" fill="white"/>
      <circle cx="350" cy="350" r="2.5" fill="white"/>
      <circle cx="160" cy="180" r="2" fill="white"/>
    </g>
  </svg>
);

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LogoContainer>
        <PainEaseLogo />
      </LogoContainer>
      <AppName>PainEase</AppName>
      <LoadingText>Advanced Pain Management & Wellness</LoadingText>
      <LoadingDots>
        <span></span>
        <span></span>
        <span></span>
      </LoadingDots>
    </LoadingContainer>
  );
};

export default LoadingScreen;