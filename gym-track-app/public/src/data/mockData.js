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
  { day: "Mon", fullDay: "Monday", date: "Sep 08", completed: true },
  { day: "Tue", fullDay: "Tuesday", date: "Sep 09", completed: true },
  { day: "Wed", fullDay: "Wednesday", date: "Sep 10", completed: true },
  { day: "Thu", fullDay: "Thursday", date: "Sep 11", completed: true },
  { day: "Fri", fullDay: "Friday", date: "Sep 12", completed: true, isToday: true },
  { day: "Sat", fullDay: "Saturday", date: "Sep 13", completed: false },
  { day: "Sun", fullDay: "Sunday", date: "Sep 14", completed: false },
];

export const HOME_STATS = {
  workoutsThisWeek: 4,
  totalVolumeKg: 12450,
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
    lastTime: "75 kg × 8",
    bestSet: "80 kg × 8",
    est1RM: "101 kg",
    instructions: [
      "Lie on the bench with your feet flat on the floor.",
      "Grab the bar with a slightly wider than shoulder width grip.",
      "Keep your back flat and tight.",
      "Lower the bar to your mid-chest.",
      "Press back up and repeat."
    ],
    videoGuide: {
      title: "How to Bench Press",
      duration: "1:24"
    }
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
  },
  {
    id: "bicep_curl",
    name: "Barbell Bicep Curl",
    category: "arms",
    muscleGroup: "Arms",
    secondaryMuscles: ["Forearms"],
    equipment: "Barbell",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80",
    lastTime: "35 kg × 10",
    bestSet: "40 kg × 8",
    est1RM: "48 kg"
  },
  {
    id: "tricep_pushdown",
    name: "Tricep Pushdown",
    category: "arms",
    muscleGroup: "Arms",
    secondaryMuscles: ["Chest"],
    equipment: "Cable",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80",
    lastTime: "35 kg × 12",
    bestSet: "40 kg × 10",
    est1RM: "51 kg"
  },
  {
    id: "plank",
    name: "Plank",
    category: "core",
    muscleGroup: "Core",
    secondaryMuscles: ["Shoulders", "Glutes"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop&q=80",
    lastTime: "90 sec",
    bestSet: "120 sec",
    est1RM: "-"
  }
];

export const WORKOUT_PROGRAMS = [
  {
    id: "ppl",
    title: "Push Pull Legs",
    daysPerWeek: "3-6 days / week",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80",
    isTemplate: true,
  },
  {
    id: "upper_lower",
    title: "Upper Lower",
    daysPerWeek: "4 days / week",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80",
    isTemplate: true,
  },
  {
    id: "full_body",
    title: "Full Body",
    daysPerWeek: "3 days / week",
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80",
    isTemplate: true,
  },
  {
    id: "custom",
    title: "Custom Program",
    daysPerWeek: "Create your own",
    duration: "Flexible",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80",
    isTemplate: false,
  }
];

export const INITIAL_ACTIVE_WORKOUT = {
  id: "workout_push_01",
  name: "Push Day",
  estimatedTime: "~60 min",
  exercisesCount: 6,
  secondsElapsed: 42 * 60 + 31, // 42:31
  currentExercise: {
    id: "bench_press",
    name: "Bench Press",
    lastTime: "75kg × 8",
    sets: [
      { id: "s1", setNumber: 1, weight: 80, reps: 8, rpe: 8, completed: true, setType: "working" },
      { id: "s2", setNumber: 2, weight: 80, reps: 8, rpe: 8, completed: true, setType: "working" },
      { id: "s3", setNumber: 3, weight: 80, reps: 7, rpe: 8, completed: true, setType: "working" },
      { id: "s4", setNumber: 4, weight: 75, reps: 10, rpe: 8, completed: true, setType: "working" },
    ]
  },
  upcomingExercises: [
    { name: "Incline DB Press", last: "30 kg × 10" },
    { name: "Shoulder Press", last: "50 kg × 8" },
    { name: "Lateral Raise", last: "12 kg × 15" },
    { name: "Tricep Pushdown", last: "35 kg × 12" }
  ]
};

export const PROGRESS_DATA = {
  exercise: "Bench Press",
  growthPercent: 14,
  period: "vs. 3 months ago",
  current: "80 kg × 8",
  bestSet: "80 kg × 8",
  est1RM: "101 kg",
  totalVolume: "3,840 kg",
  historyPoints: [
    { month: "Jan", weight: 68 },
    { month: "Feb", weight: 70 },
    { month: "Mar", weight: 72 },
    { month: "Apr", weight: 75 },
    { month: "May", weight: 78 },
    { month: "Jun", weight: 80 },
  ],
  muscleVolume: [
    { group: "Chest", volume: "6,480 kg", percent: 85, color: "#00E599" },
    { group: "Back", volume: "7,240 kg", percent: 92, color: "#00C2FF" },
    { group: "Legs", volume: "11,420 kg", percent: 100, color: "#00E599" },
    { group: "Shoulders", volume: "4,320 kg", percent: 65, color: "#00C2FF" },
  ]
};

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
