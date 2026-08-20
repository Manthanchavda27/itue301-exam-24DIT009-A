const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  author:    { type: String, default: 'Unknown' },
  category:  { type: String, default: 'General' },
  isbn:      { type: String, unique: true, sparse: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Book', bookSchema);
