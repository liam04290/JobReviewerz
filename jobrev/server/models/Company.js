const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  description: String,
  // additional fields?
});

module.exports = mongoose.model('Company', CompanySchema);
