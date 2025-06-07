const express = require('express');
const router = express.Router();
const db = require('../database');

// Sign Up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = Buffer.from(password).toString('base64'); // Not secure! Replace in real apps

  try {
    const result = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = Buffer.from(password).toString('base64');

  try {
    const result = await db.query(
      'SELECT id, email, created_at FROM users WHERE email = $1 AND password_hash = $2',
      [email, hashedPassword]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signin failed' });
  }
});

module.exports = router;
