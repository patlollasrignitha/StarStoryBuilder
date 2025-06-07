const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your Neon DB connection
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get('/api/test', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});