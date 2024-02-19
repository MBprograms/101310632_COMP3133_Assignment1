// resolvers/userResolvers.js

const User = require('../models/user');

const userResolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
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
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }
      return 'Login successful';
    }
  }
};

module.exports = userResolvers;
