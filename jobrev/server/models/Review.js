const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  content: String,
  userId: mongoose.Schema.Types.ObjectId,
  companyId: mongoose.Schema.Types.ObjectId,
  // additional fields?
});

module.exports = mongoose.model('Review', ReviewSchema);
