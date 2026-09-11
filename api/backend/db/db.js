import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.obpvcgosumyjehkhgshv:justkidding1904s@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('[PostgreSQL Pool Error]:', err.message);
});

export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // console.log(`Executed query: ${duration}ms | rows: ${res.rowCount}`);
    return res;
  } catch (err) {
    console.error(`Query failed: "${text.slice(0, 80)}..."`, err.message);
    throw err;
  }
}
