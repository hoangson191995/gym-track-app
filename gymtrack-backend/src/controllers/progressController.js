import { query } from '../db/db.js';

export async function getStrengthProgress(req, res) {
  try {
    const exerciseId = req.query.exercise || 'bench_press';
    const prsRes = await query(`
      SELECT pr.*, e.name as exercise_name, e.thumbnail
      FROM personal_records pr
      JOIN exercises e ON pr.exercise_id = e.id
      WHERE pr.user_id = $1 AND pr.exercise_id = $2
      ORDER BY pr.achieved_at ASC;
    `, [req.user.id, exerciseId]);

    // Calculate max and current
    const latest = prsRes.rows[prsRes.rows.length - 1] || null;
    const oldest = prsRes.rows[0] || null;
    let growthPercent = 0;
    if (oldest && latest && oldest.est_1rm > 0) {
      growthPercent = parseFloat((((latest.est_1rm - oldest.est_1rm) / oldest.est_1rm) * 100).toFixed(1));
    }

    return res.json({
      exerciseId,
      exerciseName: latest ? latest.exercise_name : 'Bench Press',
      growthPercent,
      currentPR: latest,
      history: prsRes.rows
    });
  } catch (err) {
    console.error('getStrengthProgress error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function getVolumeProgress(req, res) {
  try {
    const { timeframe } = req.query; // 7d, 1m, 3m, all
    let daysInterval = 30;
    if (timeframe === '7d') daysInterval = 7;
    else if (timeframe === '3m') daysInterval = 90;
    else if (timeframe === 'all') daysInterval = 3650;

    const result = await query(`
      SELECT 
        e.muscle_group as group,
        COALESCE(SUM(s.volume), 0) as volume_kg
      FROM sets s
      JOIN workout_exercises we ON s.workout_exercise_id = we.id
      JOIN workouts w ON we.workout_id = w.id
      JOIN exercises e ON we.exercise_id = e.id
      WHERE w.user_id = $1 
        AND s.completed = TRUE
        AND w.started_at >= NOW() - ($2 || ' days')::INTERVAL
      GROUP BY e.muscle_group
      ORDER BY volume_kg DESC;
    `, [req.user.id, daysInterval.toString()]);

    const colors = {
      'Chest': '#00E599',
      'Back': '#00C2FF',
      'Legs': '#A855F7',
      'Shoulders': '#F59E0B',
      'Arms': '#EC4899',
      'Core': '#3B82F6'
    };

    const total = result.rows.reduce((sum, r) => sum + parseFloat(r.volume_kg), 0);
    const distribution = result.rows.map(r => {
      const vol = parseFloat(r.volume_kg);
      return {
        group: r.group,
        volume: `${vol.toLocaleString()} kg`,
        percent: total > 0 ? Math.round((vol / total) * 100) : 0,
        color: colors[r.group] || '#00E599'
      };
    });

    return res.json({
      timeframe: timeframe || '1m',
      totalVolumeKg: total,
      distribution
    });
  } catch (err) {
    console.error('getVolumeProgress error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function getGoals(req, res) {
  try {
    const result = await query('SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC;', [req.user.id]);
    return res.json({ count: result.rows.length, goals: result.rows });
  } catch (err) {
    console.error('getGoals error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function createGoal(req, res) {
  try {
    const { title, subtitle, target_value, current_value, percent, category, color } = req.body;
    if (!title || !target_value) {
      return res.status(400).json({ error: 'MissingFields', message: 'Title and target value are required.' });
    }

    const id = `goal_${Date.now()}`;
    const result = await query(`
      INSERT INTO goals (id, user_id, title, subtitle, target_value, current_value, percent, category, color)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `, [
      id,
      req.user.id,
      title,
      subtitle || '',
      target_value,
      current_value || '0',
      percent || 0,
      category || 'strength',
      color || '#00E599'
    ]);

    return res.status(201).json({ message: 'Goal created', goal: result.rows[0] });
  } catch (err) {
    console.error('createGoal error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}
