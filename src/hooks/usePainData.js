import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { format, subDays, startOfDay } from 'date-fns';

export function usePainData() {
  const [painEntries, setPainEntries] = useLocalStorage('painease_entries', []);

  // Generate sample data for demo purposes
  const generateSampleData = useCallback(() => {
    if (painEntries.length > 0) return painEntries;

    const sampleEntries = [];
    for (let i = 30; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const entry = {
        id: `entry-${i}`,
        date: format(date, 'yyyy-MM-dd'),
        timestamp: date.toISOString(),
        painLevel: Math.floor(Math.random() * 8) + 1, // 1-8 pain scale
        location: ['neck', 'back', 'joints', 'head'][Math.floor(Math.random() * 4)],
        triggers: generateRandomTriggers(),
        activities: generateRandomActivities(),
        mood: Math.floor(Math.random() * 5) + 1, // 1-5 mood scale
        sleep: Math.floor(Math.random() * 5) + 1, // 1-5 sleep quality
        notes: generateRandomNotes(),
        weather: ['sunny', 'cloudy', 'rainy', 'stormy'][Math.floor(Math.random() * 4)],
        medications: Math.random() > 0.6 ? ['ibuprofen', 'acetaminophen'][Math.floor(Math.random() * 2)] : null
      };
      sampleEntries.push(entry);
    }
    
    setPainEntries(sampleEntries);
    return sampleEntries;
  }, [painEntries, setPainEntries]);

  const addPainEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: `entry-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setPainEntries(prev => [newEntry, ...prev]);
    return newEntry;
  }, [setPainEntries]);

  const updatePainEntry = useCallback((id, updates) => {
    setPainEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  }, [setPainEntries]);

  const deletePainEntry = useCallback((id) => {
    setPainEntries(prev => prev.filter(entry => entry.id !== id));
  }, [setPainEntries]);

  const getPainSummary = useCallback(() => {
    const data = painEntries.length > 0 ? painEntries : generateSampleData();
    const recent = data.slice(0, 7); // Last 7 days
    
    const avgPain = recent.reduce((sum, entry) => sum + entry.painLevel, 0) / recent.length;
    const avgMood = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const avgSleep = recent.reduce((sum, entry) => sum + entry.sleep, 0) / recent.length;
    
    const commonTriggers = {};
    const commonLocations = {};
    
    recent.forEach(entry => {
      entry.triggers?.forEach(trigger => {
        commonTriggers[trigger] = (commonTriggers[trigger] || 0) + 1;
      });
      commonLocations[entry.location] = (commonLocations[entry.location] || 0) + 1;
    });

    return {
      averagePain: Math.round(avgPain * 10) / 10,
      averageMood: Math.round(avgMood * 10) / 10,
      averageSleep: Math.round(avgSleep * 10) / 10,
      commonTriggers: Object.entries(commonTriggers)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([trigger]) => trigger),
      commonLocations: Object.entries(commonLocations)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([location]) => location),
      totalEntries: data.length,
      streak: calculateStreak(data)
    };
  }, [painEntries, generateSampleData]);

  const getPainTrends = useCallback(() => {
    const data = painEntries.length > 0 ? painEntries : generateSampleData();
    const last30Days = data.slice(0, 30);
    
    return last30Days.map(entry => ({
      date: entry.date,
      pain: entry.painLevel,
      mood: entry.mood,
      sleep: entry.sleep
    })).reverse();
  }, [painEntries, generateSampleData]);

  return {
    painData: painEntries.length > 0 ? painEntries : generateSampleData(),
    addPainEntry,
    updatePainEntry,
    deletePainEntry,
    getPainSummary,
    getPainTrends
  };
}

// Helper functions
function generateRandomTriggers() {
  const triggers = ['stress', 'weather', 'exercise', 'work', 'sleep', 'diet'];
  const count = Math.floor(Math.random() * 3) + 1;
  const selected = [];
  
  for (let i = 0; i < count; i++) {
    const trigger = triggers[Math.floor(Math.random() * triggers.length)];
    if (!selected.includes(trigger)) {
      selected.push(trigger);
    }
  }
  
  return selected;
}

function generateRandomActivities() {
  const activities = ['walking', 'stretching', 'meditation', 'rest', 'work', 'exercise'];
  const count = Math.floor(Math.random() * 3) + 1;
  const selected = [];
  
  for (let i = 0; i < count; i++) {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    if (!selected.includes(activity)) {
      selected.push(activity);
    }
  }
  
  return selected;
}

function generateRandomNotes() {
  const notes = [
    'Sharp pain in morning, better after movement',
    'Dull ache throughout the day',
    'Pain increased after sitting too long',
    'Better day overall, manageable discomfort',
    'Stiffness upon waking, improved with stretching',
    'Stress-related tension, relaxation helped',
    ''
  ];
  
  return notes[Math.floor(Math.random() * notes.length)];
}

function calculateStreak(data) {
  let streak = 0;
  const today = startOfDay(new Date());
  
  for (let i = 0; i < data.length; i++) {
    const entryDate = startOfDay(new Date(data[i].date));
    const daysDiff = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}