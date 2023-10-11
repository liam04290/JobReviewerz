const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  description: String,
  
});

module.exports = mongoose.model('Company', CompanySchema);
