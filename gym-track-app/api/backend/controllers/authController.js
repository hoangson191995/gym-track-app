import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/db.js';

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'gymtrack_jwt_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'MissingFields', message: 'Name, email and password are required.' });
    }

    const check = await query('SELECT id FROM users WHERE email = $1;', [email.toLowerCase().trim()]);
    if (check.rows.length > 0) {
      return res.status(409).json({ error: 'UserExists', message: 'An account with this email already exists.' });
    }

    const id = `user_${Date.now()}`;
    const hash = await bcrypt.hash(password, 10);

    await query(`
      INSERT INTO users (id, name, email, password_hash)
      VALUES ($1, $2, $3, $4);
    `, [id, name, email.toLowerCase().trim(), hash]);

    await query(`
      INSERT INTO user_settings (id, user_id)
      VALUES ($1, $2);
    `, [`set_${id}`, id]);

    const token = generateToken(id);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id,
        name,
        email: email.toLowerCase().trim(),
        unit_weight: 'kg',
        unit_distance: 'km',
        current_streak: 0
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'MissingFields', message: 'Email and password are required.' });
    }

    const result = await query('SELECT * FROM users WHERE email = $1;', [email.toLowerCase().trim()]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'InvalidCredentials', message: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'InvalidCredentials', message: 'Invalid email or password.' });
    }

    const token = generateToken(user.id);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        unit_weight: user.unit_weight,
        unit_distance: user.unit_distance,
        current_streak: user.current_streak,
        longest_streak: user.longest_streak
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function getMe(req, res) {
  try {
    const statsRes = await query(`
      SELECT 
        (SELECT COUNT(*) FROM workouts WHERE user_id = $1 AND status = 'completed') as total_workouts,
        (SELECT COALESCE(SUM(total_volume), 0) FROM workouts WHERE user_id = $1) as total_volume,
        (SELECT COUNT(*) FROM personal_records WHERE user_id = $1) as prs_count
    `, [req.user.id]);

    const latestPrRes = await query(`
      SELECT pr.*, e.name as exercise_name 
      FROM personal_records pr
      JOIN exercises e ON pr.exercise_id = e.id
      WHERE pr.user_id = $1
      ORDER BY pr.achieved_at DESC LIMIT 1;
    `, [req.user.id]);

    return res.json({
      user: req.user,
      stats: {
        totalWorkouts: parseInt(statsRes.rows[0].total_workouts || 0, 10),
        totalVolumeKg: parseFloat(statsRes.rows[0].total_volume || 0),
        prsCount: parseInt(statsRes.rows[0].prs_count || 0, 10),
        latestPR: latestPrRes.rows[0] || null
      }
    });
  } catch (err) {
    console.error('getMe error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

export async function updateMe(req, res) {
  try {
    const { name, avatar_url, unit_weight, unit_distance } = req.body;
    await query(`
      UPDATE users 
      SET 
        name = COALESCE($1, name),
        avatar_url = COALESCE($2, avatar_url),
        unit_weight = COALESCE($3, unit_weight),
        unit_distance = COALESCE($4, unit_distance),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5;
    `, [name, avatar_url, unit_weight, unit_distance, req.user.id]);

    const updated = await query('SELECT id, name, email, avatar_url, unit_weight, unit_distance FROM users WHERE id = $1', [req.user.id]);
    return res.json({ message: 'Profile updated', user: updated.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}
