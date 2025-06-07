const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_S4AYTwarqb6y@ep-super-band-a5ju1h9a-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
