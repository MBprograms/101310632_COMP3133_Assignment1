// resolvers/userResolvers.js

const User = require('../models/user');

const userResolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        const user = new User({ username, email, password});
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      if (user && password === user.password) {
        return 'Login successful';
      } else {
        throw new Error('Invalid password');
      }
    }
  }
};

module.exports = userResolvers;
