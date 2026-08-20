require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const seedDB = require('./seeder');

const bookRoutes      = require('./routes/books');
const memberRoutes    = require('./routes/members');
const borrowingRoutes = require('./routes/borrowings');

const app = express();
app.use(cors());
app.use(express.json());

// Task 3 — Custom request logger middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`);
  next();
});

// Routes
app.use('/api/v1/books',      bookRoutes);
app.use('/api/v1/members',    memberRoutes);
app.use('/api/v1/borrowings', borrowingRoutes);

// Task 3 — Global error-handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
