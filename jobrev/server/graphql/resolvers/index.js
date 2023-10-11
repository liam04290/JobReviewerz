const User = require('../../models/User');
const Company = require('../../models/Company');
const Review = require('../../models/Review');

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getCompanies: async () => {
      return await Company.find();
    },
    getReviews: async () => {
      return await Review.find();
    },
  },
  // Mutation resolvers for creating, updating, deleting data
};

module.exports = resolvers;
