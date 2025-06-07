import { Pool } from 'pg';

// Create a connection pool for PostgreSQL
const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export { pool };

// Database query helper
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};