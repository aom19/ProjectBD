const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        phoneNumber: args.userInput.phoneNumber,
        address: args.userInput.address,
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
  // destructuring the object args => ({ email, password })
  login: async ({ email, password }) => {
    const adminId = await User.findById("605851d78057ed0071223973");

    const user = await User.findOne({ email: email });

    const isAdmin = adminId.equals(user);

    if (!user) {
      throw new Error("User does not exist");
    }
    //compare the password typed with the password from database
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect");
    }
    //generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: isAdmin },
      //key to hash the token
      "somesupersecretkey",
      { expiresIn: "1h" }
    );
    return {
      // userId: user.id,
      token: token,
      tokenExpiration: 1,
      // isAdmin: isAdmin,
      // email: email,
    };
  },
};
