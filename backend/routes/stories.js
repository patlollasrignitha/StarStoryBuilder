const express = require('express');
const router = express.Router();
const db = require('../database');

// Create story
router.post('/', async (req, res) => {
  const { storyDraft, userId } = req.body;
  const { title, role, situation, task, action, result } = storyDraft;

  const fullStory = `As a ${role}, I faced ${situation}. I was responsible for ${task}. I ${action}, which resulted in ${result}. This demonstrated my skills.`;

  try {
    const resultDb = await db.query(
      `INSERT INTO stories (user_id, title, role, situation, task, action, result, full_story)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [userId, title, role, situation, task, action, result, fullStory]
    );
    res.json(resultDb.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Create story failed' });
  }
});

// Get stories
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const result = await db.query(
      'SELECT * FROM stories WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fetch stories failed' });
  }
});

// Update story
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { storyDraft, userId } = req.body;
  const { title, role, situation, task, action, result } = storyDraft;

  const fullStory = `As a ${role}, I faced ${situation}. I was responsible for ${task}. I ${action}, which resulted in ${result}.`;

  try {
    const resultDb = await db.query(
      `UPDATE stories 
       SET title = $1, role = $2, situation = $3, task = $4, action = $5, result = $6, full_story = $7, updated_at = NOW()
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
      [title, role, situation, task, action, result, fullStory, id, userId]
    );

    if (resultDb.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found or unauthorized' });
    }

    res.json(resultDb.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update story failed' });
  }
});

// Delete story
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const result = await db.query(
      'DELETE FROM stories WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Story not found or unauthorized' });
    }

    res.json({ message: 'Story deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete story failed' });
  }
});

module.exports = router;
