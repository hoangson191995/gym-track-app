import jwt from 'jsonwebtoken';
import { query } from '../db/db.js';

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'No authentication token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gymtrack_jwt_secret');
    const userRes = await query('SELECT id, name, email, avatar_url, unit_weight, current_streak FROM users WHERE id = $1', [decoded.userId]);
    
    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User does not exist' });
    }

    req.user = userRes.rows[0];
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden', message: 'Token is invalid or expired' });
  }
}
