export const exerciseCategories = {
  neck: {
    title: "Neck & Cervical",
    color: "#6366f1",
    exercises: [
      {
        id: "neck-1",
        name: "Gentle Neck Rotation",
        duration: "2-3 minutes",
        difficulty: "Easy",
        description: "Slow, controlled rotations to relieve neck tension",
        instructions: [
          "Sit or stand with your spine straight",
          "Slowly turn your head to the right, hold for 5 seconds",
          "Return to center, then turn left",
          "Repeat 5-10 times each direction",
          "Keep movements slow and controlled"
        ],
        benefits: ["Reduces stiffness", "Improves range of motion", "Relieves tension"],
        precautions: ["Stop if you feel sharp pain", "Avoid sudden movements"]
      },
      {
        id: "neck-2", 
        name: "Neck Side Stretch",
        duration: "3-4 minutes",
        difficulty: "Easy",
        description: "Lateral neck stretches to release side tension",
        instructions: [
          "Sit upright with shoulders relaxed",
          "Gently tilt your head to the right ear toward shoulder",
          "Hold for 15-30 seconds",
          "Return to center and repeat on left side",
          "Repeat 3-5 times each side"
        ],
        benefits: ["Stretches neck muscles", "Reduces headaches", "Improves flexibility"],
        precautions: ["Don't force the stretch", "Breathe deeply throughout"]
      }
    ]
  },
  back: {
    title: "Back & Spine",
    color: "#10b981",
    exercises: [
      {
        id: "back-1",
        name: "Cat-Cow Stretch",
        duration: "3-5 minutes",
        difficulty: "Easy",
        description: "Gentle spinal mobility exercise",
        instructions: [
          "Start on hands and knees in tabletop position",
          "Arch your back, lifting chest and tailbone (Cow)",
          "Round your spine, tucking chin to chest (Cat)",
          "Move slowly between positions",
          "Repeat 10-15 times"
        ],
        benefits: ["Increases spinal flexibility", "Relieves back tension", "Improves posture"],
        precautions: ["Move slowly", "Don't overextend"]
      },
      {
        id: "back-2",
        name: "Knee-to-Chest Stretch",
        duration: "2-3 minutes",
        difficulty: "Easy",
        description: "Lower back decompression stretch",
        instructions: [
          "Lie on your back with knees bent",
          "Bring one knee toward your chest",
          "Hold with both hands for 20-30 seconds",
          "Switch legs and repeat",
          "Then bring both knees to chest"
        ],
        benefits: ["Relieves lower back pain", "Stretches hip flexors", "Decompresses spine"],
        precautions: ["Keep other leg bent", "Don't pull too hard"]
      }
    ]
  },
  joints: {
    title: "Joints & Arthritis",
    color: "#f472b6",
    exercises: [
      {
        id: "joint-1",
        name: "Gentle Joint Rotations",
        duration: "5-7 minutes",
        difficulty: "Easy",
        description: "Full-body joint mobility routine",
        instructions: [
          "Start with ankle rotations (10 each direction)",
          "Move to knee circles while seated",
          "Shoulder rolls and arm circles",
          "Wrist and finger movements",
          "End with gentle hip circles"
        ],
        benefits: ["Maintains joint mobility", "Reduces stiffness", "Improves circulation"],
        precautions: ["Move within pain-free range", "Start slowly"]
      },
      {
        id: "joint-2",
        name: "Water Bottle Weights",
        duration: "4-6 minutes", 
        difficulty: "Moderate",
        description: "Light resistance training for joint strength",
        instructions: [
          "Use small water bottles as weights",
          "Gentle bicep curls (10-15 reps)",
          "Shoulder raises to the side",
          "Tricep extensions overhead",
          "Rest between each exercise"
        ],
        benefits: ["Strengthens supporting muscles", "Improves joint stability", "Builds endurance"],
        precautions: ["Use very light weights", "Stop if joints hurt"]
      }
    ]
  },
  chronic: {
    title: "Chronic Pain Management",
    color: "#8b5cf6",
    exercises: [
      {
        id: "chronic-1",
        name: "Progressive Muscle Relaxation",
        duration: "10-15 minutes",
        difficulty: "Easy",
        description: "Full-body tension release technique",
        instructions: [
          "Lie down comfortably",
          "Tense and relax each muscle group for 5 seconds",
          "Start with toes, work up to head",
          "Focus on the contrast between tension and relaxation",
          "End with deep breathing"
        ],
        benefits: ["Reduces overall tension", "Improves body awareness", "Promotes relaxation"],
        precautions: ["Don't overtense muscles", "Breathe normally"]
      },
      {
        id: "chronic-2",
        name: "Gentle Yoga Flow",
        duration: "8-12 minutes",
        difficulty: "Moderate",
        description: "Modified yoga sequence for chronic pain",
        instructions: [
          "Child's pose (2 minutes)",
          "Gentle spinal twists while seated",
          "Modified downward dog against wall",
          "Standing forward fold with bent knees",
          "End in savasana (relaxation pose)"
        ],
        benefits: ["Improves flexibility", "Reduces pain perception", "Enhances mood"],
        precautions: ["Modify poses as needed", "Listen to your body"]
      }
    ]
  }
};

export const quickExercises = [
  {
    id: "quick-1",
    name: "2-Minute Desk Stretch",
    duration: "2 minutes",
    category: "neck",
    description: "Quick relief for desk workers"
  },
  {
    id: "quick-2", 
    name: "Breathing Exercise",
    duration: "3 minutes",
    category: "chronic",
    description: "Stress relief and pain management"
  },
  {
    id: "quick-3",
    name: "Shoulder Blade Squeeze",
    duration: "1 minute",
    category: "back",
    description: "Posture improvement"
  }
];