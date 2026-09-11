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

// API routes
app.use('/api/v1', apiRoutes);
app.use('/v1', apiRoutes);

// Health check
app.get(['/api', '/api/health'], (req, res) => {
  res.json({
    status: 'ok',
    service: 'GymTrack Local Fullstack',
    database: 'PostgreSQL (Supabase Singapore)',
    timestamp: new Date()
  });
});

// Serve static frontend files
app.use(express.static(__dirname));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 GymTrack Local Fullstack running on http://localhost:${PORT}`);
});
