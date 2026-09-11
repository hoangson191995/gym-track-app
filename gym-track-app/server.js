import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import apiRoutes from './api/backend/routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount API routes at /api/v1 and /v1
app.use('/api/v1', apiRoutes);
app.use('/v1', apiRoutes);

app.get(['/api', '/api/health'], (req, res) => {
  res.json({
    status: 'ok',
    service: 'GymTrack Fullstack API (Express + Supabase)',
    database: 'PostgreSQL (Supabase Singapore)',
    timestamp: new Date()
  });
});

// Serve static frontend files
app.use(express.static(__dirname));

// Fallback to index.html for Single Page App navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listener for local runtime
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 GymTrack Fullstack running on http://localhost:${PORT}`);
  });
}

export default app;
