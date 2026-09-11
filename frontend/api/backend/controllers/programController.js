import { query } from '../db/db.js';

export async function getPrograms(req, res) {
  try {
    const result = await query(`
      SELECT * FROM programs 
      WHERE is_template = TRUE OR user_id = $1
      ORDER BY is_template DESC, created_at DESC;
    `, [req.user.id]);

    return res.json({ count: result.rows.length, programs: result.rows });
  } catch (err) {
    console.error('getPrograms error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function getProgramById(req, res) {
  try {
    const { id } = req.params;
    const progRes = await query('SELECT * FROM programs WHERE id = $1;', [id]);
    if (progRes.rows.length === 0) {
      return res.status(404).json({ error: 'NotFound', message: 'Program not found.' });
    }

    const program = progRes.rows[0];
    const daysRes = await query(`
      SELECT pd.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'id', pe.id,
              'exercise_id', pe.exercise_id,
              'name', e.name,
              'muscle_group', e.muscle_group,
              'target_sets', pe.target_sets,
              'target_reps', pe.target_reps,
              'target_weight', pe.target_weight,
              'rest_seconds', pe.rest_seconds
            ) ORDER BY pe.exercise_order
          ) FILTER (WHERE pe.id IS NOT NULL), '[]'
        ) as exercises
      FROM program_days pd
      LEFT JOIN program_exercises pe ON pd.id = pe.program_day_id
      LEFT JOIN exercises e ON pe.exercise_id = e.id
      WHERE pd.program_id = $1
      GROUP BY pd.id
      ORDER BY pd.day_order ASC;
    `, [id]);

    program.days = daysRes.rows;
    return res.json({ program });
  } catch (err) {
    console.error('getProgramById error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function createProgram(req, res) {
  try {
    const { title, description, days_per_week, duration, image_url } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'MissingFields', message: 'Program title is required.' });
    }

    const id = `prog_${Date.now()}`;
    const result = await query(`
      INSERT INTO programs (id, user_id, title, description, days_per_week, duration, image_url, is_template)
      VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE)
      RETURNING *;
    `, [
      id,
      req.user.id,
      title,
      description || '',
      days_per_week || '4 days / week',
      duration || '8 weeks',
      image_url || 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80'
    ]);

    return res.status(201).json({ message: 'Program created successfully', program: result.rows[0] });
  } catch (err) {
    console.error('createProgram error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}
