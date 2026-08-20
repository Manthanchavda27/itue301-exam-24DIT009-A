const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, unique: true, sparse: true },
  phone:      { type: String },
  department: { type: String, default: 'General' },
});

module.exports = mongoose.model('Member', memberSchema);
