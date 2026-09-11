import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './src/routes/api.js';
import { initDatabase } from './src/db/initDb.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static files for API Test Console & Swagger UI
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Mount API routes
app.use('/api/v1', apiRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(err.status || 500).json({
    error: 'InternalServerError',
    message: err.message || 'Something went wrong on the server'
  });
});

// Start Server
async function start() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🚀 GYMTRACK BACKEND REST API IS RUNNING!`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`📡 Database: Supabase PostgreSQL (Singapore)`);
      console.log(`🛠️  Interactive API Testing Console: http://localhost:${PORT}`);
      console.log(`======================================================\n`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
