import { query } from '../db/db.js';

export async function getExercises(req, res) {
  try {
    const { category, search } = req.query;
    let sql = 'SELECT * FROM exercises WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      params.push(category.toLowerCase());
      sql += ` AND LOWER(category) = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      sql += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(muscle_group) LIKE $${params.length})`;
    }

    sql += ' ORDER BY is_custom ASC, name ASC;';
    const result = await query(sql, params);
    return res.json({ count: result.rows.length, exercises: result.rows });
  } catch (err) {
    console.error('getExercises error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function getExerciseById(req, res) {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM exercises WHERE id = $1;', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'NotFound', message: 'Exercise not found.' });
    }

    const exercise = result.rows[0];

    // Check user's PR if user is logged in
    let pr = null;
    if (req.user) {
      const prRes = await query(`
        SELECT * FROM personal_records 
        WHERE user_id = $1 AND exercise_id = $2 
        ORDER BY est_1rm DESC LIMIT 1;
      `, [req.user.id, id]);
      pr = prRes.rows[0] || null;
    }

    return res.json({ exercise, personalRecord: pr });
  } catch (err) {
    console.error('getExerciseById error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function createExercise(req, res) {
  try {
    const { name, category, muscle_group, equipment, difficulty, instructions, thumbnail } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: 'MissingFields', message: 'Name and category are required.' });
    }

    const id = `ex_${Date.now()}`;
    const result = await query(`
      INSERT INTO exercises (id, name, category, muscle_group, equipment, difficulty, instructions, thumbnail, is_custom, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TRUE, $9)
      RETURNING *;
    `, [
      id,
      name,
      category.toLowerCase(),
      muscle_group || category,
      equipment || 'Dumbbell',
      difficulty || 'Intermediate',
      JSON.stringify(instructions || []),
      thumbnail || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80',
      req.user.id
    ]);

    return res.status(201).json({ message: 'Exercise created successfully', exercise: result.rows[0] });
  } catch (err) {
    console.error('createExercise error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}
