const { AuthenticationError } = require('apollo-server-express');
const User = require('../../models/User');
const Company = require('../../models/Company');
const Review = require('../../models/Review');
const { signToken } = require('../../utils/auth');

const resolvers = {
    Query: {
        // Fetch all users
        users: async () => {
            return User.find({});
        },
        // Fetch single user by ID
        user: async (_, { userId }) => {
            return User.findById(userId);
        },
        // Fetch all companies
        companies: async () => {
            return Company.find({});
        },
        // Fetch single company by ID and populate associated reviews
        company: async (_, { companyId }) => {
            return Company.findById(companyId).populate('reviews');
        }
    },

    Mutation: {
        // Register new user and return signed JWT
        addUser: async (_, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);
            return { token, user };
        },
        // Authenticate user given email and password
        // If good, then return signed JWT
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, user };
        },
        // Create and return new company
        addCompany: async (_, { name, description }) => {
            const company = await Company.create({ name, description });
            return company;
        },
        // Create new review for a company by ID
        // Requires authenticated user
        addReview: async (_, { companyId, reviewText, rating }, context) => {
            if (context.user) {
                const review = await Review.create({
                    reviewText,
                    rating,
                    companyId,
                    // Assign review to user
                    reviewer: context.user._id
                });

                // Update company to include new review's ID
                await Company.findByIdAndUpdate(
                    companyId,
                    { $push: { reviews: review._id } },
                    { new: true }
                );

                return review;
            }
            throw new AuthenticationError('You need to be logged in to post a review!');
        }
    }
};

module.exports = resolvers;
