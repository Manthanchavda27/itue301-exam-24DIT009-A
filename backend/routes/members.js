const router = require('express').Router();
const Member = require('../models/Member');

// GET all members
router.get('/', async (req, res, next) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
});

// GET single member
router.get('/:id', async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
});

// POST create member
router.post('/', async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation failed', details: messages });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

// PUT update member
router.put('/:id', async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
});

// DELETE member
router.delete('/:id', async (req, res, next) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
