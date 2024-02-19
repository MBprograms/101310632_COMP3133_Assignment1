const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const resolvers = {
    Mutation: {
      signup: async (_, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        return user;
      }
    }
  };
  
  module.exports = resolvers;
module.exports = User;
