// Data Models matching GymTrack Architecture Document & 12 Mockup Screens

export const USER_PROFILE = {
  id: "user_alex_01",
  name: "Alex Nguyen",
  email: "alexnguyen@gmail.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  currentWeight: 71.5,
  targetWeight: 75.0,
  unitWeight: "kg",
  unitDistance: "km",
  notifications: true,
  currentStreak: 5,
  longestStreak: 21,
  totalWorkoutsMonth: 14,
  monthlyVolume: 32450,
  targetMonthlyVolume: 50000,
};

export const WEEKLY_ACTIVITY = [
  { day: "Mon", date: "Sep 08", completed: true },
  { day: "Tue", date: "Sep 09", completed: true },
  { day: "Wed", date: "Sep 10", completed: true },
  { day: "Thu", date: "Sep 11", completed: true },
  { day: "Fri", date: "Sep 12", completed: true, isToday: true },
  { day: "Sat", date: "Sep 13", completed: false },
  { day: "Sun", date: "Sep 14", completed: false },
];

export const HOME_STATS = {
  workoutsThisWeek: 4,
  totalVolumeKg: "12,450",
  prsCount: 3,
  latestPR: {
    exercise: "Bench Press",
    weight: 80,
    reps: 8,
    date: "Today",
    improvement: "+5 kg",
  }
};

export const EXERCISE_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "chest", label: "Chest" },
  { id: "back", label: "Back" },
  { id: "shoulders", label: "Shoulders" },
  { id: "legs", label: "Legs" },
  { id: "arms", label: "Arms" },
  { id: "core", label: "Core" }
];

export const EXERCISES = [
  {
    id: "bench_press",
    name: "Bench Press",
    category: "chest",
    muscleGroup: "Chest",
    secondaryMuscles: ["Triceps", "Front Delts"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80",
    lastTime: "75kg × 8",
    bestSet: "80 kg × 8",
    est1RM: "101 kg",
    instructions: [
      "Lie on the bench with your feet flat on the floor.",
      "Grab the bar with a slightly wider than shoulder width grip.",
      "Keep your back flat and tight.",
      "Lower the bar to your mid-chest.",
      "Press back up and repeat."
    ]
  },
  {
    id: "incline_db_press",
    name: "Incline Dumbbell Press",
    category: "chest",
    muscleGroup: "Chest",
    secondaryMuscles: ["Front Delts", "Triceps"],
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80",
    lastTime: "30 kg × 10",
    bestSet: "32 kg × 8",
    est1RM: "39 kg"
  },
  {
    id: "squat",
    name: "Squat",
    category: "legs",
    muscleGroup: "Legs",
    secondaryMuscles: ["Glutes", "Hamstrings", "Core"],
    equipment: "Barbell",
    difficulty: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=80",
    lastTime: "120 kg × 5",
    bestSet: "140 kg × 1",
    est1RM: "140 kg"
  },
  {
    id: "deadlift",
    name: "Deadlift",
    category: "back",
    muscleGroup: "Back",
    secondaryMuscles: ["Hamstrings", "Glutes", "Forearms"],
    equipment: "Barbell",
    difficulty: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80",
    lastTime: "160 kg × 4",
    bestSet: "180 kg × 1",
    est1RM: "180 kg"
  },
  {
    id: "lat_pulldown",
    name: "Lat Pulldown",
    category: "back",
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps", "Rear Delts"],
    equipment: "Machine",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=300&auto=format&fit=crop&q=80",
    lastTime: "70 kg × 10",
    bestSet: "80 kg × 8",
    est1RM: "98 kg"
  },
  {
    id: "shoulder_press",
    name: "Shoulder Press",
    category: "shoulders",
    muscleGroup: "Shoulders",
    secondaryMuscles: ["Triceps", "Upper Chest"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=80",
    lastTime: "50 kg × 8",
    bestSet: "55 kg × 6",
    est1RM: "64 kg"
  },
  {
    id: "lateral_raise",
    name: "Lateral Raise",
    category: "shoulders",
    muscleGroup: "Shoulders",
    secondaryMuscles: ["Traps"],
    equipment: "Dumbbell",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&auto=format&fit=crop&q=80",
    lastTime: "12 kg × 15",
    bestSet: "14 kg × 12",
    est1RM: "18 kg"
  }
];

export const WORKOUT_PROGRAMS = [
  {
    id: "ppl",
    title: "Push Pull Legs",
    daysPerWeek: "3-6 days / week",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "upper_lower",
    title: "Upper Lower",
    daysPerWeek: "4 days / week",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "full_body",
    title: "Full Body",
    daysPerWeek: "3 days / week",
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "custom",
    title: "Custom Program",
    daysPerWeek: "Create your own",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80",
  }
];

export const SET_TYPES = [
  { id: "N", label: "Normal", code: "N", name: "Working Set", color: "#00E599", bg: "rgba(0, 229, 153, 0.15)", border: "rgba(0, 229, 153, 0.35)", desc: "Standard working set" },
  { id: "W", label: "Warmup", code: "W", name: "Warmup", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.35)", desc: "Low load preparation set" },
  { id: "D", label: "Drop Set", code: "D", name: "Drop Set", color: "#A855F7", bg: "rgba(168, 85, 247, 0.15)", border: "rgba(168, 85, 247, 0.35)", desc: "Reduced weight with no rest" },
  { id: "F", label: "Failure", code: "F", name: "Failure", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)", border: "rgba(239, 68, 68, 0.35)", desc: "Pushed to complete muscular failure" },
  { id: "S", label: "Superset", code: "S", name: "Superset", color: "#06B6D4", bg: "rgba(6, 182, 212, 0.15)", border: "rgba(6, 182, 212, 0.35)", desc: "Paired with back-to-back exercise" },
];

export const INITIAL_SETS = [
  { id: "s1", setNumber: 1, weight: 50, reps: 12, rpe: 6, completed: true, setType: "W" },
  { id: "s2", setNumber: 2, weight: 80, reps: 8, rpe: 8, completed: true, setType: "N" },
  { id: "s3", setNumber: 3, weight: 80, reps: 8, rpe: 8.5, completed: true, setType: "N" },
  { id: "s4", setNumber: 4, weight: 75, reps: 7, rpe: 9.5, completed: true, setType: "F" },
  { id: "s5", setNumber: 5, weight: 55, reps: 11, rpe: 10, completed: false, setType: "D" },
];

export const PROGRESS_TIMEFRAMES = {
  "7d": {
    period: "Last 7 Days",
    growthPercent: 3.5,
    growthText: "+3.5% vs. previous week",
    totalVolume: "8,920 kg",
    current: "80 kg × 8",
    bestSet: "80 kg × 8",
    est1RM: "101 kg",
    exercise: "Bench Press",
    historyPoints: [
      { month: "Sat", weight: 75, x: 20, y: 85 },
      { month: "Sun", weight: 75, x: 75, y: 85 },
      { month: "Mon", weight: 77.5, x: 130, y: 65 },
      { month: "Tue", weight: 77.5, x: 185, y: 65 },
      { month: "Wed", weight: 80, x: 240, y: 35 },
      { month: "Thu", weight: 80, x: 285, y: 35 },
    ],
    svgPath: "M 20 85 L 75 85 L 130 65 L 185 65 L 240 35 L 285 35",
    svgArea: "M 20 85 L 75 85 L 130 65 L 185 65 L 240 35 L 285 35 L 285 105 L 20 105 Z",
    muscleVolume: [
      { group: "Chest", volume: "3,120 kg", percent: 35, color: "#00E599" },
      { group: "Back", volume: "2,480 kg", percent: 28, color: "#00C2FF" },
      { group: "Legs", volume: "1,850 kg", percent: 21, color: "#A855F7" },
      { group: "Shoulders", volume: "950 kg", percent: 11, color: "#F59E0B" },
      { group: "Arms", volume: "520 kg", percent: 5, color: "#EC4899" },
    ]
  },
  "1m": {
    period: "Last 30 Days",
    growthPercent: 8.2,
    growthText: "+8.2% vs. last month",
    totalVolume: "34,250 kg",
    current: "80 kg × 8",
    bestSet: "80 kg × 8",
    est1RM: "101 kg",
    exercise: "Bench Press",
    historyPoints: [
      { month: "W1", weight: 72.5, x: 30, y: 92 },
      { month: "W2", weight: 75, x: 115, y: 75 },
      { month: "W3", weight: 77.5, x: 200, y: 52 },
      { month: "W4", weight: 80, x: 285, y: 25 },
    ],
    svgPath: "M 30 92 Q 80 82, 115 75 T 200 52 T 285 25",
    svgArea: "M 30 92 Q 80 82, 115 75 T 200 52 T 285 25 L 285 105 L 30 105 Z",
    muscleVolume: [
      { group: "Chest", volume: "11,640 kg", percent: 34, color: "#00E599" },
      { group: "Back", volume: "9,590 kg", percent: 28, color: "#00C2FF" },
      { group: "Legs", volume: "6,510 kg", percent: 19, color: "#A855F7" },
      { group: "Shoulders", volume: "4,110 kg", percent: 12, color: "#F59E0B" },
      { group: "Arms", volume: "2,400 kg", percent: 7, color: "#EC4899" },
    ]
  },
  "3m": {
    period: "vs. 3 months ago",
    growthPercent: 14,
    growthText: "+14% strength increase",
    totalVolume: "98,400 kg",
    current: "80 kg × 8",
    bestSet: "80 kg × 8",
    est1RM: "101 kg",
    exercise: "Bench Press",
    historyPoints: [
      { month: "Jan", weight: 68, x: 20, y: 95 },
      { month: "Feb", weight: 70, x: 75, y: 84 },
      { month: "Mar", weight: 72, x: 130, y: 73 },
      { month: "Apr", weight: 75, x: 185, y: 58 },
      { month: "May", weight: 78, x: 235, y: 40 },
      { month: "Jun", weight: 80, x: 285, y: 20 },
    ],
    svgPath: "M 20 95 Q 60 88, 75 84 T 130 73 T 185 58 T 235 40 T 285 20",
    svgArea: "M 20 95 Q 60 88, 75 84 T 130 73 T 185 58 T 235 40 T 285 20 L 285 105 L 20 105 Z",
    muscleVolume: [
      { group: "Chest", volume: "32,480 kg", percent: 33, color: "#00E599" },
      { group: "Back", volume: "27,240 kg", percent: 28, color: "#00C2FF" },
      { group: "Legs", volume: "21,420 kg", percent: 22, color: "#A855F7" },
      { group: "Shoulders", volume: "11,320 kg", percent: 11, color: "#F59E0B" },
      { group: "Arms", volume: "5,940 kg", percent: 6, color: "#EC4899" },
    ]
  },
  "all": {
    period: "All-Time Records",
    growthPercent: 28.5,
    growthText: "+28.5% total career gain",
    totalVolume: "248,150 kg",
    current: "80 kg × 8",
    bestSet: "80 kg × 8",
    est1RM: "101 kg",
    exercise: "Bench Press",
    historyPoints: [
      { month: "2023", weight: 55, x: 25, y: 98 },
      { month: "2024", weight: 65, x: 110, y: 78 },
      { month: "2025", weight: 72, x: 195, y: 52 },
      { month: "2026", weight: 80, x: 285, y: 18 },
    ],
    svgPath: "M 25 98 Q 70 88, 110 78 T 195 52 T 285 18",
    svgArea: "M 25 98 Q 70 88, 110 78 T 195 52 T 285 18 L 285 105 L 25 105 Z",
    muscleVolume: [
      { group: "Chest", volume: "78,200 kg", percent: 31, color: "#00E599" },
      { group: "Back", volume: "68,400 kg", percent: 28, color: "#00C2FF" },
      { group: "Legs", volume: "55,200 kg", percent: 22, color: "#A855F7" },
      { group: "Shoulders", volume: "28,150 kg", percent: 11, color: "#F59E0B" },
      { group: "Arms", volume: "18,200 kg", percent: 8, color: "#EC4899" },
    ]
  }
};

export const PROGRESS_DATA = PROGRESS_TIMEFRAMES["3m"];

export const CALENDAR_DAYS = [
  { day: 1, hasWorkout: false },
  { day: 2, hasWorkout: true },
  { day: 3, hasWorkout: false },
  { day: 4, hasWorkout: true },
  { day: 5, hasWorkout: true },
  { day: 6, hasWorkout: false },
  { day: 7, hasWorkout: false },
  { day: 8, hasWorkout: true },
  { day: 9, hasWorkout: true },
  { day: 10, hasWorkout: true, isSelected: true },
  { day: 11, hasWorkout: true },
  { day: 12, hasWorkout: true },
  { day: 13, hasWorkout: false },
  { day: 14, hasWorkout: false },
  { day: 15, hasWorkout: true },
  { day: 16, hasWorkout: false },
  { day: 17, hasWorkout: true },
  { day: 18, hasWorkout: true },
  { day: 19, hasWorkout: false },
  { day: 20, hasWorkout: false },
  { day: 21, hasWorkout: true },
  { day: 22, hasWorkout: true },
  { day: 23, hasWorkout: false },
  { day: 24, hasWorkout: true },
  { day: 25, hasWorkout: false },
  { day: 26, hasWorkout: true },
  { day: 27, hasWorkout: false },
  { day: 28, hasWorkout: false },
  { day: 29, hasWorkout: true },
  { day: 30, hasWorkout: true },
];

export const RECENT_WORKOUTS = [
  {
    id: "w_sep10",
    name: "Push Day",
    date: "Sep 10, 2025",
    duration: "58 min",
    volume: "8,240 kg",
    exercises: [
      { name: "Bench Press", setsText: "80 × 8, 80 × 8, 80 × 7, 75 × 10" },
      { name: "Incline DB Press", setsText: "30 × 10, 30 × 10, 27.5 × 10" },
      { name: "Shoulder Press", setsText: "40 × 8, 35 × 10, 35 × 8" }
    ]
  },
  {
    id: "w_sep09",
    name: "Pull Day",
    date: "Sep 9, 2025",
    duration: "64 min",
    volume: "9,180 kg",
    exercises: [
      { name: "Deadlift", setsText: "140 × 5, 150 × 4, 160 × 2" },
      { name: "Lat Pulldown", setsText: "70 × 10, 75 × 8, 75 × 8" },
      { name: "Barbell Row", setsText: "60 × 10, 65 × 8, 65 × 8" }
    ]
  },
  {
    id: "w_sep08",
    name: "Leg Day",
    date: "Sep 8, 2025",
    duration: "71 min",
    volume: "10,450 kg",
    exercises: [
      { name: "Squat", setsText: "100 × 8, 110 × 8, 120 × 6, 125 × 5" },
      { name: "Leg Press", setsText: "200 × 12, 220 × 10, 240 × 8" },
      { name: "Leg Extension", setsText: "60 × 12, 65 × 12, 70 × 10" }
    ]
  }
];

export const GOALS_DATA = [
  {
    id: "g1",
    title: "Bench Press",
    subtitle: "Reach 100 kg",
    current: "82",
    target: "100 kg",
    percent: 82,
    color: "#00E599",
    category: "strength"
  },
  {
    id: "g2",
    title: "Target Weight",
    subtitle: "Reach 75 kg",
    current: "71.5",
    target: "75 kg",
    percent: 85,
    color: "#00C2FF",
    category: "weight"
  },
  {
    id: "g3",
    title: "Consistency",
    subtitle: "Workout 4× / week",
    current: "3",
    target: "4",
    percent: 75,
    color: "#8B5CF6",
    category: "consistency"
  },
  {
    id: "g4",
    title: "Volume",
    subtitle: "50,000 kg / month",
    current: "32,450",
    target: "50,000 kg",
    percent: 65,
    color: "#F97316",
    category: "volume"
  }
];
