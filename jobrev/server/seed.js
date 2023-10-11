const mongoose = require('mongoose');
const User = require('./models/User');
const Company = require('./models/Company');
const Review = require('./models/Review');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const saltRounds = 10;


mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Clear out existing data
async function clearDatabase() {
    await mongoose.connection.dropCollection('users');
    await mongoose.connection.dropCollection('companies');
    await mongoose.connection.dropCollection('reviews');
}

clearDatabase().then(() => {

// User data
const users = [
  { name: 'Alice', email: 'alice@email.com', password: 'password123' },
  { name: 'Bob', email: 'bob@email.com', password: 'password123' },
];

// Hash passwords
for (let user of users) {
    user.password = bcrypt.hashSync(user.password, saltRounds);
}

// Insert Users
User.insertMany(users)
  .then(insertedUsers => {
    // Company data
    const companies = [
      { name: 'MegaCorp', description: 'Not nice.', user: insertedUsers[0]._id },
      { name: 'Small Business', description: 'Nice.', user: insertedUsers[1]._id },
    ];

    // Insert Companies
    return Company.insertMany(companies)
      .then(insertedCompanies => {
        // Review data
        const reviews = [
          { reviewText: 'Did not vibe.', rating: 2, companyId: insertedCompanies[0]._id, reviewer: insertedUsers[0]._id },
          { reviewText: 'Vibed.', rating: 5, companyId: insertedCompanies[1]._id, reviewer: insertedUsers[1]._id },
        ];

        // Insert Reviews
        return Review.insertMany(reviews);
      });
  })
  .then(() => {
    console.log('Data seeded!');
    mongoose.connection.close();
  })
  .catch((error) => console.log(error));
});