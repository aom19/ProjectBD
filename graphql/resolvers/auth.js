const bcrypt = require("bcryptjs");

const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    // to not store 2 user with same email;
    //find one input - findOne where email from database = email from input
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email,
      });

      if (existingUser) {
        throw new Error("User exists alreaady!");
      }
      //we won't store password as plain string
      // will use a package bcrypt to hashing password and salting = 12 ~ (12 levels )
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();

      //as at events to receive information and distructuring id
      // to not return the password , password will be null  when i will return from database
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
