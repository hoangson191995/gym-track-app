-- Schema for GymTrack PostgreSQL Database (Supabase)

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url TEXT DEFAULT '',
  unit_weight VARCHAR(10) DEFAULT 'kg',
  unit_distance VARCHAR(10) DEFAULT 'km',
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_settings (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  sound_enabled BOOLEAN DEFAULT TRUE,
  rest_timer_default INT DEFAULT 120,
  notifications_enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS exercises (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  muscle_group VARCHAR(50) NOT NULL,
  secondary_muscles JSONB DEFAULT '[]'::jsonb,
  equipment VARCHAR(50) DEFAULT 'Barbell',
  difficulty VARCHAR(30) DEFAULT 'Intermediate',
  thumbnail TEXT DEFAULT '',
  instructions JSONB DEFAULT '[]'::jsonb,
  is_custom BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  description TEXT DEFAULT '',
  days_per_week VARCHAR(50) DEFAULT '4 days / week',
  duration VARCHAR(50) DEFAULT '8 weeks',
  image_url TEXT DEFAULT '',
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS program_days (
  id VARCHAR(64) PRIMARY KEY,
  program_id VARCHAR(64) REFERENCES programs(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  day_order INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS program_exercises (
  id VARCHAR(64) PRIMARY KEY,
  program_day_id VARCHAR(64) REFERENCES program_days(id) ON DELETE CASCADE,
  exercise_id VARCHAR(64) REFERENCES exercises(id) ON DELETE CASCADE,
  exercise_order INT DEFAULT 1,
  target_sets INT DEFAULT 4,
  target_reps INT DEFAULT 8,
  target_weight NUMERIC(6,2) DEFAULT 0,
  rest_seconds INT DEFAULT 120
);

CREATE TABLE IF NOT EXISTS workouts (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  program_id VARCHAR(64) REFERENCES programs(id) ON DELETE SET NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INT DEFAULT 0,
  total_volume NUMERIC(10,2) DEFAULT 0,
  working_volume NUMERIC(10,2) DEFAULT 0,
  status VARCHAR(30) DEFAULT 'in_progress',
  notes TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS workout_exercises (
  id VARCHAR(64) PRIMARY KEY,
  workout_id VARCHAR(64) REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id VARCHAR(64) REFERENCES exercises(id) ON DELETE CASCADE,
  exercise_order INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS sets (
  id VARCHAR(64) PRIMARY KEY,
  workout_exercise_id VARCHAR(64) REFERENCES workout_exercises(id) ON DELETE CASCADE,
  set_number INT NOT NULL,
  set_type VARCHAR(10) DEFAULT 'N',
  weight NUMERIC(6,2) NOT NULL DEFAULT 0,
  reps INT NOT NULL DEFAULT 0,
  rpe NUMERIC(3,1) DEFAULT 8.0,
  rest_seconds INT DEFAULT 120,
  completed BOOLEAN DEFAULT TRUE,
  volume NUMERIC(10,2) DEFAULT 0,
  est_1rm NUMERIC(6,2) DEFAULT 0,
  is_pr BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS personal_records (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  exercise_id VARCHAR(64) REFERENCES exercises(id) ON DELETE CASCADE,
  weight NUMERIC(6,2) NOT NULL,
  reps INT NOT NULL,
  est_1rm NUMERIC(6,2) NOT NULL,
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS goals (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) DEFAULT 'strength',
  title VARCHAR(150) NOT NULL,
  subtitle VARCHAR(150) DEFAULT '',
  target_value VARCHAR(100) NOT NULL,
  current_value VARCHAR(100) NOT NULL,
  percent INT DEFAULT 0,
  color VARCHAR(30) DEFAULT '#00E599',
  status VARCHAR(30) DEFAULT 'active',
  deadline VARCHAR(50) DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
