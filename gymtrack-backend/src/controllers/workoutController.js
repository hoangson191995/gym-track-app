import { query } from '../db/db.js';

export async function startWorkout(req, res) {
  try {
    const { name, program_id } = req.body;
    const workoutId = `wo_${Date.now()}`;

    const result = await query(`
      INSERT INTO workouts (id, user_id, name, program_id, started_at, status)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 'in_progress')
      RETURNING *;
    `, [workoutId, req.user.id, name || 'Today Workout', program_id || null]);

    return res.status(201).json({ message: 'Workout started', workout: result.rows[0] });
  } catch (err) {
    console.error('startWorkout error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function addExerciseToWorkout(req, res) {
  try {
    const { workoutId } = req.params;
    const { exercise_id, exercise_order } = req.body;

    const weId = `we_${Date.now()}`;
    const result = await query(`
      INSERT INTO workout_exercises (id, workout_id, exercise_id, exercise_order)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [weId, workoutId, exercise_id, exercise_order || 1]);

    const exInfo = await query('SELECT name, muscle_group, thumbnail FROM exercises WHERE id = $1', [exercise_id]);

    return res.status(201).json({
      message: 'Exercise added to workout',
      workoutExercise: {
        ...result.rows[0],
        exercise: exInfo.rows[0]
      }
    });
  } catch (err) {
    console.error('addExerciseToWorkout error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

// Section 18: CORE FLOW - GHI MỘT SET
export async function logSet(req, res) {
  try {
    const { workout_exercise_id } = req.params;
    const { set_number, set_type, weight, reps, rpe, rest_seconds, completed } = req.body;

    if (weight === undefined || reps === undefined) {
      return res.status(400).json({ error: 'MissingFields', message: 'Weight and reps are required.' });
    }

    const numWeight = parseFloat(weight);
    const numReps = parseInt(reps, 10);
    const setType = set_type || 'N';
    const isCompleted = completed !== undefined ? completed : true;

    // 1. Calculate Volume
    const volume = isCompleted ? (numWeight * numReps) : 0;

    // 2. Calculate Estimated 1RM via Epley Formula: 1RM = Weight * (1 + Reps / 30)
    const est1rm = numReps > 1 ? parseFloat((numWeight * (1 + numReps / 30)).toFixed(1)) : numWeight;

    // 3. Find Exercise & Workout IDs
    const weRes = await query(`
      SELECT we.exercise_id, we.workout_id, w.user_id 
      FROM workout_exercises we
      JOIN workouts w ON we.workout_id = w.id
      WHERE we.id = $1;
    `, [workout_exercise_id]);

    if (weRes.rows.length === 0) {
      return res.status(404).json({ error: 'NotFound', message: 'Workout exercise session not found.' });
    }

    const { exercise_id, workout_id, user_id } = weRes.rows[0];

    // 4. Check Personal Record (PR)
    let isPR = false;
    if (isCompleted && setType !== 'W' && numWeight > 0) {
      const prevPrRes = await query(`
        SELECT * FROM personal_records 
        WHERE user_id = $1 AND exercise_id = $2 
        ORDER BY est_1rm DESC LIMIT 1;
      `, [user_id, exercise_id]);

      if (prevPrRes.rows.length === 0 || est1rm > parseFloat(prevPrRes.rows[0].est_1rm)) {
        isPR = true;
        // Insert new PR record
        const prId = `pr_${Date.now()}`;
        await query(`
          INSERT INTO personal_records (id, user_id, exercise_id, weight, reps, est_1rm, achieved_at)
          VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP);
        `, [prId, user_id, exercise_id, numWeight, numReps, est1rm]);
      }
    }

    // 5. Save the Set
    const setId = `s_${Date.now()}`;
    const setRes = await query(`
      INSERT INTO sets (id, workout_exercise_id, set_number, set_type, weight, reps, rpe, rest_seconds, completed, volume, est_1rm, is_pr)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `, [
      setId,
      workout_exercise_id,
      set_number || 1,
      setType,
      numWeight,
      numReps,
      rpe || 8.0,
      rest_seconds || 120,
      isCompleted,
      volume,
      est1rm,
      isPR
    ]);

    // 6. Update Workout Volumes
    await query(`
      UPDATE workouts
      SET 
        total_volume = (
          SELECT COALESCE(SUM(s.volume), 0)
          FROM sets s
          JOIN workout_exercises we ON s.workout_exercise_id = we.id
          WHERE we.workout_id = $1 AND s.completed = TRUE
        ),
        working_volume = (
          SELECT COALESCE(SUM(s.volume), 0)
          FROM sets s
          JOIN workout_exercises we ON s.workout_exercise_id = we.id
          WHERE we.workout_id = $1 AND s.completed = TRUE AND s.set_type != 'W'
        )
      WHERE id = $1;
    `, [workout_id]);

    const updatedWorkout = await query('SELECT total_volume, working_volume FROM workouts WHERE id = $1;', [workout_id]);

    return res.status(201).json({
      message: isPR ? 'New Personal Record achieved! 🔥' : 'Set recorded successfully',
      set: setRes.rows[0],
      volume,
      est1RM: est1rm,
      isPR,
      workoutVolume: updatedWorkout.rows[0]
    });
  } catch (err) {
    console.error('logSet error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function completeWorkout(req, res) {
  try {
    const { id } = req.params;
    const { notes, duration_seconds } = req.body;

    const result = await query(`
      UPDATE workouts
      SET 
        completed_at = CURRENT_TIMESTAMP,
        duration_seconds = COALESCE($1, duration_seconds),
        notes = COALESCE($2, notes),
        status = 'completed'
      WHERE id = $3 AND user_id = $4
      RETURNING *;
    `, [duration_seconds || 3600, notes || '', id, req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'NotFound', message: 'Workout not found.' });
    }

    // Update streak for user
    await query(`
      UPDATE users 
      SET 
        current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1)
      WHERE id = $1;
    `, [req.user.id]);

    const userRes = await query('SELECT current_streak, longest_streak FROM users WHERE id = $1;', [req.user.id]);

    return res.json({
      message: 'Workout completed successfully! Great job!',
      workout: result.rows[0],
      streak: userRes.rows[0]
    });
  } catch (err) {
    console.error('completeWorkout error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function getWorkouts(req, res) {
  try {
    const result = await query(`
      SELECT w.*, 
        (SELECT COUNT(DISTINCT we.exercise_id) FROM workout_exercises we WHERE we.workout_id = w.id) as exercises_count,
        (SELECT COUNT(s.id) FROM sets s JOIN workout_exercises we ON s.workout_exercise_id = we.id WHERE we.workout_id = w.id) as total_sets
      FROM workouts w
      WHERE w.user_id = $1
      ORDER BY w.started_at DESC;
    `, [req.user.id]);

    return res.json({ count: result.rows.length, workouts: result.rows });
  } catch (err) {
    console.error('getWorkouts error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}
