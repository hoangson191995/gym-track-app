import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { pool, query } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDatabase() {
  console.log('[DB] Initializing Supabase PostgreSQL schema...');
  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8').replace(/^\uFEFF/, '');
  await query(schemaSql);
  console.log('[DB] Schema verified & all tables created.');

  // Seed Default Exercises if empty
  const exCount = await query('SELECT count(*) FROM exercises;');
  if (parseInt(exCount.rows[0].count, 10) === 0) {
    console.log('[DB] Seeding default exercises...');
    const exercises = [
      {
        id: 'bench_press',
        name: 'Bench Press',
        category: 'chest',
        muscle_group: 'Chest',
        secondary_muscles: JSON.stringify(['Triceps', 'Front Delts']),
        equipment: 'Barbell',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80',
        instructions: JSON.stringify([
          'Lie on the bench with your feet flat on the floor.',
          'Grab the bar with a slightly wider than shoulder width grip.',
          'Keep your back flat and tight.',
          'Lower the bar to your mid-chest.',
          'Press back up and repeat.'
        ])
      },
      {
        id: 'incline_db_press',
        name: 'Incline Dumbbell Press',
        category: 'chest',
        muscle_group: 'Chest',
        secondary_muscles: JSON.stringify(['Front Delts', 'Triceps']),
        equipment: 'Dumbbell',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80',
        instructions: JSON.stringify([
          'Set incline bench to 30-45 degrees.',
          'Hold dumbbells at chest level and press upwards smoothly.'
        ])
      },
      {
        id: 'squat',
        name: 'Barbell Back Squat',
        category: 'legs',
        muscle_group: 'Legs',
        secondary_muscles: JSON.stringify(['Glutes', 'Hamstrings', 'Core']),
        equipment: 'Barbell',
        difficulty: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=80',
        instructions: JSON.stringify([
          'Rest barbell across upper traps.',
          'Hinge hips and bend knees until thighs are parallel to floor.',
          'Drive through heels to stand back up.'
        ])
      },
      {
        id: 'deadlift',
        name: 'Barbell Deadlift',
        category: 'back',
        muscle_group: 'Back',
        secondary_muscles: JSON.stringify(['Hamstrings', 'Glutes', 'Forearms']),
        equipment: 'Barbell',
        difficulty: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80',
        instructions: JSON.stringify([
          'Stand with feet hip-width under the bar.',
          'Grip the bar, brace core, and drive through the floor to lockout hips.'
        ])
      },
      {
        id: 'lat_pulldown',
        name: 'Lat Pulldown',
        category: 'back',
        muscle_group: 'Back',
        secondary_muscles: JSON.stringify(['Biceps', 'Rear Delts']),
        equipment: 'Machine',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=300&auto=format&fit=crop&q=80',
        instructions: JSON.stringify([
          'Grip wide bar, pull down to upper chest while squeezing back lats.'
        ])
      },
      {
        id: 'shoulder_press',
        name: 'Overhead Shoulder Press',
        category: 'shoulders',
        muscle_group: 'Shoulders',
        secondary_muscles: JSON.stringify(['Triceps', 'Upper Chest']),
        equipment: 'Barbell',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=80',
        instructions: JSON.stringify([
          'Press bar directly overhead until arms lock out vertically.'
        ])
      },
      {
        id: 'lateral_raise',
        name: 'Dumbbell Lateral Raise',
        category: 'shoulders',
        muscle_group: 'Shoulders',
        secondary_muscles: JSON.stringify(['Traps']),
        equipment: 'Dumbbell',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&auto=format&fit=crop&q=80',
        instructions: JSON.stringify([
          'Raise dumbbells laterally to shoulder height with slight elbow bend.'
        ])
      }
    ];

    for (const ex of exercises) {
      await query(`
        INSERT INTO exercises (id, name, category, muscle_group, secondary_muscles, equipment, difficulty, thumbnail, instructions, is_custom)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, FALSE)
        ON CONFLICT (id) DO NOTHING;
      `, [ex.id, ex.name, ex.category, ex.muscle_group, ex.secondary_muscles, ex.equipment, ex.difficulty, ex.thumbnail, ex.instructions]);
    }
    console.log(`[DB] Seeded ${exercises.length} standard exercises.`);
  }

  // Seed Default User (Alex Nguyen) if not exists
  const userCheck = await query('SELECT * FROM users WHERE email = $1;', ['alexnguyen@gmail.com']);
  let alexId = 'user_alex_01';
  if (userCheck.rows.length === 0) {
    console.log('[DB] Seeding default user Alex Nguyen...');
    const hashedPwd = await bcrypt.hash('password123', 10);
    await query(`
      INSERT INTO users (id, name, email, password_hash, avatar_url, unit_weight, unit_distance, current_streak, longest_streak)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO NOTHING;
    `, [
      alexId,
      'Alex Nguyen',
      'alexnguyen@gmail.com',
      hashedPwd,
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'kg',
      'km',
      5,
      21
    ]);

    await query(`
      INSERT INTO user_settings (id, user_id, sound_enabled, rest_timer_default, notifications_enabled)
      VALUES ($1, $2, TRUE, 120, TRUE)
      ON CONFLICT (id) DO NOTHING;
    `, ['set_alex_01', alexId]);

    // Seed Default Programs for Alex
    await query(`
      INSERT INTO programs (id, user_id, title, description, days_per_week, duration, image_url, is_template)
      VALUES 
      ('ppl', $1, 'Push Pull Legs', 'Classic bodybuilding hypertrophy split', '3-6 days / week', '8 weeks', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80', TRUE),
      ('upper_lower', $1, 'Upper Lower', '4-day powerbuilding strength split', '4 days / week', '8 weeks', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80', TRUE),
      ('full_body', $1, 'Full Body', 'Full body stimulus 3 days weekly', '3 days / week', '12 weeks', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80', TRUE)
      ON CONFLICT (id) DO NOTHING;
    `, [alexId]);

    // Seed Personal Records
    await query(`
      INSERT INTO personal_records (id, user_id, exercise_id, weight, reps, est_1rm)
      VALUES 
      ('pr_bench', $1, 'bench_press', 80.0, 8, 101.3),
      ('pr_squat', $1, 'squat', 140.0, 1, 140.0),
      ('pr_deadlift', $1, 'deadlift', 180.0, 1, 180.0)
      ON CONFLICT (id) DO NOTHING;
    `, [alexId]);

    // Seed Goals
    await query(`
      INSERT INTO goals (id, user_id, category, title, subtitle, target_value, current_value, percent, color, status)
      VALUES 
      ('g1', $1, 'strength', 'Bench Press', 'Reach 100 kg', '100 kg', '80 kg', 82, '#00E599', 'active'),
      ('g2', $1, 'weight', 'Target Weight', 'Reach 75 kg', '75 kg', '71.5 kg', 85, '#00C2FF', 'active'),
      ('g3', $1, 'consistency', 'Consistency', 'Workout 4x / week', '4 days', '3 days', 75, '#F59E0B', 'active'),
      ('g4', $1, 'volume', 'Monthly Volume', '50,000 kg / month', '50,000 kg', '34,250 kg', 68, '#A855F7', 'active')
      ON CONFLICT (id) DO NOTHING;
    `, [alexId]);

    console.log('[DB] Seeded Alex Nguyen demo data & PRs.');
  }
}
