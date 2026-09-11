import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './backend/routes/api.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Support both /api/v1 and /v1 paths (depending on Vercel rewrite prefix)
app.use('/api/v1', apiRoutes);
app.use('/v1', apiRoutes);

// Health check endpoint at /api or /api/health
app.get(['/api', '/api/health'], (req, res) => {
  res.json({
    status: 'ok',
    service: 'GymTrack Fullstack Vercel Serverless API',
    database: 'PostgreSQL (Supabase Singapore)',
    timestamp: new Date()
  });
});

export default app;
